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
  const savedUser = JSON.parse(localStorage.getItem('user')) || {}

  const user = {
    name: savedUser.name || 'Ingen användare',
    email: savedUser.email || 'Ingen email',
   
  }

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
          <p>Namn: {user.name}</p>
          <p>Email: {user.email}</p>
          

          <button
            className="modal-close"
            onClick={() => {
              localStorage.removeItem('token')
              localStorage.removeItem('user')
              window.location.href = '/'
            }}
          >
            Logga ut
          </button>
        </div>

      

      </div>
    </div>
  )
}

export default MinaSidor;
