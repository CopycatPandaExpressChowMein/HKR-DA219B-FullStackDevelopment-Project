import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Status from './components/Status'
import Current from './components/Current'
import Arkiv from './components/Arkiv'
import AboutUs from './components/AboutUs'
import MinaSidor from './components/MinaSidor'
import Admin from './components/Admin'
import Login from './components/Login'


// den här får vi ändra till true sen när vi kopplat ihop backend
// för att kunna se den nu så är den false
const isAdmin = false

const starterCards = [
  {
    title: 'About Us',
    text: 'This is infromation about the creators of the application',
    link: '/about-us',
  },
  {
    title: 'Arkiv',
    text: 'The following is a compilation of emergency and police incidents that took place recently in Sweden.',
    link: '/arkiv',
  },
  {
    title: 'Current',
    text: 'Current events happening in Sweden with police information and locations.',
    link: '/current',
  },

]




function App() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [events, setEvents] = useState([])
  const [loginOpen, setLoginOpen] = useState(false)


  useEffect(() => {
    fetch('http://localhost:3000/CRUD/events')
      .then(res => res.json())
      .then(data => { console.log(data), setEvents(data) })
      .catch(err => console.log(err))
  }, [])
  return (
    <BrowserRouter>
      <div className="app-shell">
        <a className="skip-link" href="#main-content">Hoppa till innehåll</a>

        <header className="site-header">
          <div className="brand-block">
            <span className="brand-kicker">Sverige</span>
            <Link to="/" style={{ textDecoration: 'none', color: 'white' }}>
              <h1>Police Event Tracker</h1>

            </Link>
          </div>



          <div className="header-actions">
            <Link to="/mina-sidor">
              <button className="header-link" type="button" onClick={() => setLoginOpen(true)}>
                <img src="http://localhost:3000/img/login.png" alt="Mina sidor" className="header-icon login-icon" />              </button>
            </Link>

            {isAdmin && (
              <Link to="/admin">
                <button className="header-link" type="button">Admin</button>
              </Link>
            )}

            <div className="menu-wrapper">
              <button
                className="menu-button"
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <img src="http://localhost:3000/img/list.png" alt="Menu" className="header-icon" />              </button>

              {menuOpen && (
                <nav className="dropdown-menu">
                  <Link to="/status" onClick={() => setMenuOpen(false)}>Status</Link>
                  <Link to="/current" onClick={() => setMenuOpen(false)}>Current</Link>
                  <Link to="/arkiv" onClick={() => setMenuOpen(false)}>Arkiv</Link>
                  <Link to="/about-us" onClick={() => setMenuOpen(false)}>About Us</Link>
                </nav>
              )}
            </div>
          </div>
        </header>

        <main id="main-content">
          <Routes>
            <Route path="/" element={
              <>
                <section className="hero-section">
                  <p className="hero-tag"> Police incidents</p>
                  <h2>Current events in Sweden</h2>
                  <p className="hero-text">
                    Here you can follow current police incidents across Sweden,
                    including crimes, accidents, emergencies, and their locations.
                  </p>
                </section>

                <section className="featured-section">
                  <div className="section-heading">
                    <p>Info</p>
                    <h3>Om sidan</h3>
                  </div>
                  <div className="card-grid featured-grid">
                    {starterCards.map((card) => (
                      <Link to={card.link} key={card.title} style={{ textDecoration: 'none' }}>
                        <article className="event-card">
                          <span className="card-pill">Info</span>
                          <h4>{card.title}</h4>
                          <p>{card.text}</p>
                        </article>
                      </Link>
                    ))}
                  </div>
                </section>

                {events.map((event) => (
                  <article className="event-card feed-card" key={event.eventId}>
                    <span className="card-number">{event.type}</span>
                    <h4>{event.summary}</h4>
                    <p>{event.location?.name} — {new Date(event.datetime).toLocaleDateString()}</p>
                  </article>
                ))}
              </>
            } />
            <Route path="/status" element={<Status />} />
            <Route path="/current" element={<Current />} />
            <Route path="/arkiv" element={<Arkiv />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/mina-sidor" element={<MinaSidor />} />
            <Route path="/admin" element={<Admin />} />

          </Routes>
        </main>

        <footer className="site-footer">
          <p>2026 Police Event Tracker</p>
          <p>Kontakt</p>
        </footer>
      </div>
      {loginOpen && <Login onClose={() => setLoginOpen(false)} />}
    </BrowserRouter>
  )
}

export default App