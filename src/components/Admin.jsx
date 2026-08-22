import { useState, useEffect } from 'react'

function Admin() {
    const [comments, setComments] = useState([])
    const [events, setEvents] = useState([])
    const [loading, setLoading] = useState(true)
    const [activeTab, setActiveTab] = useState('comments')

    useEffect(() => {
        const token = localStorage.getItem('token')
        const headers = { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` }
        Promise.all([
            fetch(`${window.location.origin}/CRUD/admin/comments`, { headers }).then(r => r.json()),
            fetch(`${window.location.origin}/CRUD/events`).then(r => r.json()),
        ])
            .then(([c, e]) => { setComments(c); setEvents(e); setLoading(false) })
            .catch(() => setLoading(false))
    }, [])

    const deleteComment = async (id) => {
        if (!window.confirm('Ta bort kommentaren?')) return
        const token = localStorage.getItem('token')
        await fetch(`${window.location.origin}/CRUD/admin/comments/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        })
        setComments(prev => prev.filter(c => c._id !== id))
    }

    const deleteEvent = async (eventId) => {
        if (!window.confirm('Ta bort händelsen?')) return
        const token = localStorage.getItem('token')
        await fetch(`${window.location.origin}/CRUD/admin/events/${eventId}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token}` },
        })
        setEvents(prev => prev.filter(e => e.eventId !== eventId))
    }

    return (
        <div className="page">
            <h2>Admin</h2>
            <p>Adminpanel: hantera händelser och kommentarer</p>

            <div className="admin-tabs">
                <button
                    className={`admin-tab-btn${activeTab === 'comments' ? ' active' : ''}`}
                    onClick={() => setActiveTab('comments')}
                >
                    Kommentarer ({comments.length})
                </button>
                <button
                    className={`admin-tab-btn${activeTab === 'events' ? ' active' : ''}`}
                    onClick={() => setActiveTab('events')}
                >
                    Händelser ({events.length})
                </button>
            </div>

            {loading && <p>Laddar</p>}

            {!loading && activeTab === 'comments' && (
                <>
                    {comments.length === 0 && <p>Inga kommentarer.</p>}
                    {comments.map(c => (
                        <div key={c._id} className="admin-row">
                            <div className="admin-row-info">
                                <p className="admin-row-title">
                                    {c.author}
                                    <span className="admin-comment-eventid">
                                        Händelse: {c.eventId}
                                    </span>
                                </p>
                                <p className="admin-row-text">{c.text}</p>
                                <p className="admin-row-sub">{new Date(c.createdAt).toLocaleString('sv-SE')}</p>
                            </div>
                            <button className="admin-delete-btn" onClick={() => deleteComment(c._id)}>
                                Ta bort
                            </button>
                        </div>
                    ))}
                </>
            )}

            {!loading && activeTab === 'events' && (
                <>
                    {events.length === 0 && <p>Inga händelser.</p>}
                    {events.map(e => (
                        <div key={e.eventId} className="admin-row">
                            <div className="admin-row-info">
                                <span className="card-pill" style={{ marginBottom: '8px', fontSize: '0.82rem' }}>{e.type}</span>
                                <p className="admin-row-title">{e.summary}</p>
                                <p className="admin-row-sub">
                                    {e.location?.name} — {new Date(e.datetime).toLocaleDateString('sv-SE')}
                                </p>
                            </div>
                            <button className="admin-delete-btn" onClick={() => deleteEvent(e.eventId)}>
                                Ta bort
                            </button>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}

export default Admin