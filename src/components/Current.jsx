import { useState, useEffect } from 'react'

function Current() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch(`http://localhost:${process.env.PORT}/CRUD/events`)
      .then(res => res.json())
      .then(data => {
        setEvents(data)
        setLoading(false)
      })
      .catch(err => {
        console.log(err)
        setLoading(false)
      })
  }, [])

  const filtered = events.filter(event =>
    event.type?.toLowerCase().includes(search.toLowerCase()) ||
    event.summary?.toLowerCase().includes(search.toLowerCase()) ||
    event.location?.name?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="page">
      <h2>Aktuellt</h2>
      <p>Aktuella polishändelser i Sverige</p>

      <input
        className="login-input"
        type="text"
        placeholder="Sök på typ, plats eller händelse"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ marginBottom: '24px', maxWidth: '400px' }}
      />

      {loading && <p>Laddar händelser</p>}

      {!loading && filtered.length === 0 && <p>Inga händelser hittades.</p>}

      <div className="card-grid feed-grid">
        {filtered.map((event) => (
          <article
            className="event-card"
            key={event.eventId}
            onClick={() => setSelected(event)}
            style={{ cursor: 'pointer' }}
          >
            <span className="card-pill">{event.type}</span>
            <h4>{event.summary}</h4>
            <p>{event.location?.name}</p>
            <p>{new Date(event.datetime).toLocaleDateString()}</p>
          </article>
        ))}
      </div>

      {selected && (
        <div className="modal-overlay" onClick={() => setSelected(null)}>
          <div className="modal-card modal-large" onClick={(e) => e.stopPropagation()}>
            <span className="card-pill">{selected.type}</span>
            <h3>{selected.summary}</h3>
            <p>{selected.location?.name} — {new Date(selected.datetime).toLocaleDateString()}</p>

            {selected.location?.gps && (
              <iframe
                title="karta"
                width="100%"
                height="500"
                style={{ border: 0, borderRadius: '10px', marginTop: '15px' }}
                src={`https://maps.google.com/maps?q=${selected.location.gps}&z=13&output=embed`}
              />
            )}

            <button className="modal-close" onClick={() => setSelected(null)} style={{ marginTop: '15px' }}>
              Stäng
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Current