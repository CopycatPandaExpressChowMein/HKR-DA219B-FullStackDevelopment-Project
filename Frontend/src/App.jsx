import { useState } from 'react'

const navItems = ['Status', 'Current', 'Arkiv', 'About Us']

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
    <div className="app-shell">
      <a className="skip-link" href="#main-content">Hoppa till innehåll</a>

      <header className="site-header">
        <div className="brand-block">
          <span className="brand-kicker">Sverige</span>
          <h1>Police Event Tracker</h1>
        </div>

        <div className="header-actions">
          <button className="header-link" type="button">Mina sidor</button>

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
                {navItems.map((item) => (
                  <a key={item} href="#">
                    {item}
                  </a>
                ))}
              </nav>
            )}
          </div>
        </div>
      </header>

      <main id="main-content">
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
      </main>

      <footer className="site-footer">
        <p>2026 Police Event Tracker</p>
        <p>Kontakt</p>
      </footer>
    </div>
  )
}

export default App