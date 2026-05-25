import { useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import Status from './components/Status'
import Current from './components/Current'
import Arkiv from './components/Arkiv'
import AboutUs from './components/AboutUs'
import MinaSidor from './components/MinaSidor'
import Admin from './components/Admin'
import Login from './components/Login'

import imgPerson from './img/person.png'
import imgList from './img/list.png'

const isAdmin = false

const starterCards = [
  { title: 'Om oss', text: 'Detta är information om utvecklarna till aplikationen', link: '/about-us' },
  { title: 'Arkiv', text: 'Arkiv över polishändelser i Sverige.', link: '/arkiv' },
  { title: 'Aktuellt', text: 'Aktuella händelser i Sverige med polisinformation och platser.', link: '/current' },
]

function AppContent() {
  const navigate = useNavigate()
  const [menuOpen, setMenuOpen] = useState(false)
  const [loginOpen, setLoginOpen] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(() => !!localStorage.getItem('token'))

  const handleMinaSidor = () => {
    if (localStorage.getItem('token')) {
      setIsLoggedIn(true)
      navigate('/mina-sidor')
    } else {
      setLoginOpen(true)
    }
  }

  return (
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
          <button className="header-link" type="button" onClick={handleMinaSidor}>
            <img src={imgPerson} alt="Mina sidor" className="header-icon login-icon" />
          </button>

          {loginOpen && (
            <Login
              onClose={() => setLoginOpen(false)}
              onLoginSuccess={() => {
                setIsLoggedIn(true)
                setLoginOpen(false)
              }}
            />
          )}

          {isAdmin && (
            <Link to="/admin">
              <button className="header-link" type="button">Admin</button>
            </Link>
          )}

          <div className="menu-wrapper">
            <button className="menu-button" type="button" onClick={() => setMenuOpen(!menuOpen)}>
              <img src={imgList} alt="Menu" className="header-icon" />
            </button>

            {menuOpen && (
              <nav className="dropdown-menu">
                <Link to="/current" onClick={() => setMenuOpen(false)}>Aktuellt</Link>
                <Link to="/arkiv" onClick={() => setMenuOpen(false)}>Arkiv</Link>
                <Link to="/about-us" onClick={() => setMenuOpen(false)}>Om oss</Link>
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
                <p className="hero-tag">Polishändelser</p>
                <h2>Aktuella händelser i Sverige</h2>
                <p className="hero-text">
                  Här kan du följa aktuella polishändelser runt om i Sverige,
                  inklusive brott, olyckor, nödsituationer och deras platser.
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
  )
}

function App() {
	const [menuOpen, setMenuOpen] = useState(false);
	const [loginOpen, setLoginOpen] = useState(false);

	return (
		<BrowserRouter>
			<div className="app-shell">
				<a className="skip-link" href="#main-content">
					Hoppa till innehåll
				</a>

				<header className="site-header">
					<div className="brand-block">
						<span className="brand-kicker">Sverige</span>
						<Link to="/" style={{ textDecoration: "none", color: "white" }}>
							<h1>Police Event Tracker</h1>
						</Link>
					</div>

					<div className="header-actions">
						<Link to="/mina-sidor">
							<button
								className="header-link"
								type="button"
								onClick={() => setLoginOpen(true)}
							>
								<img
									src={imgPerson}
									alt="Mina sidor"
									className="header-icon login-icon"
								/>
							</button>
						</Link>

						{isAdmin && (
							<Link to="/admin">
								<button className="header-link" type="button">
									Admin
								</button>
							</Link>
						)}

						<div className="menu-wrapper">
							<button
								className="menu-button"
								type="button"
								onClick={() => setMenuOpen(!menuOpen)}
							>
								<img src={imgList} alt="Menu" className="header-icon" />
							</button>

							{menuOpen && (
								<nav className="dropdown-menu">
									<Link to="/current" onClick={() => setMenuOpen(false)}>
										Aktuellt
									</Link>
									<Link to="/arkiv" onClick={() => setMenuOpen(false)}>
										Arkiv
									</Link>
									<Link to="/about-us" onClick={() => setMenuOpen(false)}>
										Om oss
									</Link>
								</nav>
							)}
						</div>
					</div>
				</header>

				<main id="main-content">
					<Routes>
						<Route
							path="/"
							element={
								<>
									<section className="hero-section">
										<p className="hero-tag"> Polishändelser</p>
										<h2>Aktuella händelser i Sverige</h2>
										<p className="hero-text">
											Här kan du följa aktuella polishändelser runt om i
											Sverige, inklusive brott, olyckor, nödsituationer och
											deras platser.
										</p>
									</section>

									<section className="featured-section">
										<div className="section-heading">
											<p>Info</p>
											<h3>Om sidan</h3>
										</div>
										<div className="card-grid featured-grid">
											{starterCards.map((card) => (
												<Link
													to={card.link}
													key={card.title}
													style={{ textDecoration: "none" }}
												>
													<article className="event-card">
														<span className="card-pill">Info</span>
														<h4>{card.title}</h4>
														<p>{card.text}</p>
													</article>
												</Link>
											))}
										</div>
									</section>
								</>
							}
						/>
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
	);
}

export default App;
