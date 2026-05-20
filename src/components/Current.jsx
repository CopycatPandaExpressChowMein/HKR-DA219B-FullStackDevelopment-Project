import { useState, useEffect } from 'react'

function Current() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('http://localhost:3000/CRUD/events')
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

  return (
    <div className="page">
      <h2>Aktuellt</h2>
      <p>Aktuella polishändelser i Sverige</p>

      {loading && <p>Laddar händelser...</p>}

      <div className="card-grid feed-grid">
        {events.map((event) => (
          <article className="event-card" key={event.eventId}>
            <span className="card-pill">{event.type}</span>
            <h4>{event.summary}</h4>
            <p>{event.location?.name}</p>
            <p>{new Date(event.datetime).toLocaleDateString()}</p>
          </article>
        ))}
      </div>
    </div>
  )
}

export default Current