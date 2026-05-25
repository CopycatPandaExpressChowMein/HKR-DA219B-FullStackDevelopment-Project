import { useState, useEffect } from 'react'

function getSessionId() {
  let id = localStorage.getItem('sessionId')
  if (!id) {
    id = Math.random().toString(36).slice(2)
    localStorage.setItem('sessionId', id)
  }
  return id
}

function getCurrentUser() {
  const token = localStorage.getItem('token')
  if (!token) return null
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch {
    return null
  }
}

function CommentSection({ eventId }) {
  const [comments, setComments] = useState([])
  const [text, setText] = useState('')
  const [loading, setLoading] = useState(true)
  const sessionId = getSessionId()
  const user = getCurrentUser()
  const authorName = user?.username || 'Anonym'

  useEffect(() => {
    fetch(`/CRUD/comments/${eventId}`)
      .then(res => res.json())
      .then(data => { setComments(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [eventId])

  const postComment = async () => {
    if (!text.trim()) return
    const res = await fetch(`/CRUD/comments`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ eventId, text, author: authorName, sessionId }),
    })
    const newComment = await res.json()
    setComments(prev => [...prev, newComment])
    setText('')
  }

  const deleteComment = async (commentId, commentSessionId) => {
    if (commentSessionId !== sessionId) return
    await fetch(`/CRUD/comments/${commentId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ sessionId }),
    })
    setComments(prev => prev.filter(c => c._id !== commentId))
  }

  const isOwn = (c) => c.sessionId === sessionId

  return (
    <div className="comment-section">
      <h4>Kommentarer ({comments.length})</h4>

      {loading && <p>Laddar kommentarer...</p>}
      {!loading && comments.length === 0 && (
        <p className="comment-empty">Inga kommentarer</p>
      )}

      {comments.map(c => (
        <div key={c._id} className={`comment-item${isOwn(c) ? ' own' : ''}`}>
          <div className="comment-meta">
            <span className="comment-author">
              {c.author}
              {isOwn(c) && <span className="comment-author-label">(du)</span>}
            </span>
            <span className="comment-time">
              {new Date(c.createdAt).toLocaleString('sv-SE')}
            </span>
          </div>
          <p className="comment-text">{c.text}</p>
          {isOwn(c) && (
            <button
              className="comment-delete-btn"
              onClick={() => deleteComment(c._id, c.sessionId)}
            >
              Ta bort
            </button>
          )}
        </div>
      ))}

      <div className="comment-input-row">
        <input
          className="login-input"
          type="text"
          placeholder="Skriv en kommentar."
          value={text}
          onChange={e => setText(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') postComment() }}
          style={{ margin: 0 }}
        />
        <button className="comment-submit-btn" onClick={postComment}>
          Skicka
        </button>
      </div>
    </div>
  )
}

function Current() {
	const [events, setEvents] = useState([]);
	const [hasMore, setHasMore] = useState(true);
	const [selected, setSelected] = useState(null);

	const fetchMore = async () => {
		const res = await fetch(
			`${window.location.origin}/CRUD/current_events?offset=${events.length}`,
		);
		const next = await res.json();
		if (next.length === 0) {
			setHasMore(false);
			return;
		}
		setEvents((prev) => [...prev, ...next]);
	};

	return (
		<div className="page">
			<h2>Aktuellt</h2>
			<p>Aktuella polishändelser i Sverige</p>

			<InfiniteScroll
				className="card-grid feed-grid"
				dataLength={events.length}
				next={fetchMore}
				hasMore={hasMore}
				loader={<p style={{ textAlign: "center" }}>Laddar händelser...</p>}
				endMessage={
					<p style={{ textAlign: "center" }}>Inga händelser hittades.</p>
				}
				style={{ overflow: "visible" }}
			>
				{events.map((event) => (
					<article
						className="event-card"
						key={event.eventId}
						onClick={() => setSelected(event)}
						style={{ cursor: "pointer" }}
					>
						<span className="card-pill">{event.type}</span>
						<h4>{event.summary}</h4>
						<p>{event.location?.name}</p>
						<p>{new Date(event.datetime).toLocaleDateString()}</p>
					</article>
				))}
			</InfiniteScroll>

			{selected && (
				<div className="modal-overlay" onClick={() => setSelected(null)}>
					<div
						className="modal-card modal-large"
						onClick={(e) => e.stopPropagation()}
					>
						<span className="card-pill">{selected.type}</span>
						<h3>{selected.summary}</h3>
						<p>
							{selected.location?.name} —{" "}
							{new Date(selected.datetime).toLocaleDateString()}
						</p>

            {selected.location?.gps && (
              <iframe
                title="karta"
                width="100%"
                height="300"
                style={{ border: 0, borderRadius: '10px', marginTop: '15px' }}
                src={`https://maps.google.com/maps?q=${selected.location.gps}&z=13&output=embed`}
              />
            )}

            <CommentSection eventId={selected.eventId} />

            <button className="modal-close" onClick={() => setSelected(null)} style={{ marginTop: '20px' }}>
              Stäng
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Current;
