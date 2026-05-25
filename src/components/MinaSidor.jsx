import { useNavigate } from 'react-router-dom'

function getCurrentUser() {
  const token = localStorage.getItem('token')
  if (!token) return null
  try {
    return JSON.parse(atob(token.split('.')[1]))
  } catch {
    return null
  }
}

function MinaSidor() {
  const user = getCurrentUser()
  const navigate = useNavigate()
  const comments = []
  const savedEvents = []

  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  if (!user) {
    return (
      <div className="page">
        <h2>Mina sidor</h2>
        <p>Du är inte inloggad. Logga in för att se din profil.</p>
      </div>
    )
  }

  return (
    <div className="page">
      <h2>Mina sidor</h2>
      <p>Din profil och dina inställningar</p>

      <div className="team-grid">

        <div className="team-card">
          <h3>Min information</h3>
          <span className="team-role">Profil</span>
          <p>Användarnamn: {user.username}</p>
          <p>Email: {user.email}</p>
          <p>Roll: {user.role || 'användare'}</p>
          <button
            className="modal-close"
            onClick={handleLogout}
            style={{ marginTop: '16px', alignSelf: 'flex-start' }}
          >
            Logga ut
          </button>
        </div>

        <div className="team-card">
          <h3>Kommentarer</h3>
          <span className="team-role">Aktivitet</span>
          {comments.length === 0
            ? <p>Inga kommentarer ännu.</p>
            : comments.map((c, i) => <p key={i}>{c}</p>)
          }
        </div>

        <div className="team-card">
          <h3>Sparade händelser</h3>
          <span className="team-role">Sparade</span>
          {savedEvents.length === 0
            ? <p>Inga sparade händelser ännu.</p>
            : savedEvents.map((e, i) => <p key={i}>{e}</p>)
          }
        </div>

      </div>
    </div>
  )
}

export default MinaSidor