import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import Status from './components/Status'
import Current from './components/Current'
import Arkiv from './components/Arkiv'
import AboutUs from './components/AboutUs'
import MinaSidor from './components/MinaSidor'
import Admin from './components/Admin'

// den här får vi ändra till true sen när vi kopplat ihop backend
// för att kunna se den nu så är den false
const isAdmin = false  

const starterCards = [
  {
    title: 'Händelser',
    text: 'Visar händelser från polisen.',
  },
  {
    title: 'Karta',
    text: 'Händelser visas på karta.',
  },
  {
    title: 'Kommentarer',
    text: 'Användare kan kommentera.',
  },
]

const feedCards = [
  'Händelse 1',
  'Händelse 2',
  'Händelse 3',
  'Händelse 4',
  'Händelse 5',
  'Händelse 6',
]

function App() {
  const [menuOpen, setMenuOpen] = useState(false)

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
              <button className="header-link" type="button">Mina sidor</button>
            </Link>
            {isAdmin && ( <Link to="/admin">
            <button className="header-link" type="button">Admin</button>
            </Link>)}
          

            <div className="menu-wrapper">
              <button
                className="menu-button"
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                Menu
              </button>

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
                  <p className="hero-tag">Polisens händelser</p>
                  <h2>Aktuella händelser i Sverige</h2>
                  <p className="hero-text">
                    Här visas polisens händelser i realtid.
                  </p>
                </section>

                <section className="featured-section">
                  <div className="section-heading">
                    <p>Info</p>
                    <h3>Om sidan</h3>
                  </div>
                  <div className="card-grid featured-grid">
                    {starterCards.map((card) => (
                      <article className="event-card" key={card.title}>
                        <span className="card-pill">Info</span>
                        <h4>{card.title}</h4>
                        <p>{card.text}</p>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="feed-section">
                  <div className="section-heading">
                    <p>Flöde</p>
                    <h3>Senaste händelser</h3>
                  </div>
                  <div className="card-grid feed-grid">
                    {feedCards.map((item, index) => (
                      <article className="event-card feed-card" key={item}>
                        <span className="card-number">0{index + 1}</span>
                        <h4>{item}</h4>
                        <p>Datum, plats och typ visas här.</p>
                      </article>
                    ))}
                  </div>
                </section>
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
    </BrowserRouter>
  )
}

export default App