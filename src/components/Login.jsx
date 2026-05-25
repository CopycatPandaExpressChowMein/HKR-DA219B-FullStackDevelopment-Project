import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

function Login({ onClose, onLoginSuccess }) {
  const [isRegister, setIsRegister] = useState(false)
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const navigate = useNavigate()

  const handleSubmit = async () => {
    if (!email || !password) {
      alert('Fyll i email och lösenord')
      return
    }

    if (isRegister && !username) {
      alert('Fyll i användarnamn')
      return
    }

    if (isRegister && password !== confirmPassword) {
      alert('Lösenorden matchar inte')
      return
    }

    const url = isRegister
      ? `${window.location.origin}/login/register`
      : `${window.location.origin}/login/login`

    const body = isRegister
      ? { username, email, password }
      : { email, password }

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      const data = await res.json()

      if (!res.ok) {
        alert(data.message || 'Något gick fel')
        return
      }

      if (isRegister) {
        alert('Registrerad! Logga in nu.')
        setIsRegister(false)
        return
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data.user))

      onLoginSuccess()
      onClose()
      navigate('/mina-sidor')
    } catch (err) {
      alert('Server error: ' + err.message)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>
        <h3>{isRegister ? 'Registrera dig' : 'Logga in'}</h3>

        {isRegister && (
          <input className="login-input" placeholder="Användarnamn" value={username} onChange={(e) => setUsername(e.target.value)} />
        )}

        <input className="login-input" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <input className="login-input" type="password" placeholder="Lösenord" value={password} onChange={(e) => setPassword(e.target.value)} />

        {isRegister && (
          <input className="login-input" type="password" placeholder="Bekräfta lösenord" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
        )}

        <div className="login-actions">
          <button className="modal-close" type="button" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Har konto? Logga in' : 'Registrera dig'}
          </button>

          <button className="modal-close" type="button" onClick={handleSubmit}>
            {isRegister ? 'Registrera' : 'Logga in'}
          </button>
        </div>

        <button className="modal-close login-close" type="button" onClick={onClose}>
          Stäng
        </button>
      </div>
    </div>
  )
}

export default Login
