import { useState } from 'react'

function Login({ onClose }) {
  const [isRegister, setIsRegister] = useState(false)

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={(e) => e.stopPropagation()}>

        <h3>{isRegister ? 'Registrera dig' : 'Logga in'}</h3>

        <input
          className="login-input"
          type="email"
          placeholder="Email"
        />

        <input
          className="login-input"
          type="password"
          placeholder="Lösenord"
        />

        {isRegister && (
          <input
            className="login-input"
            type="password"
            placeholder="Bekräfta lösenord"
          />
        )}
        <div className="login-actions">
          <button className="modal-close" onClick={() => setIsRegister(!isRegister)}>
            {isRegister ? 'Har konto? Logga in' : 'Registrera dig'}
          </button>
          <button className="modal-close">
            {isRegister ? 'Registrera' : 'Logga in'}
          </button>
        </div>

        <button className="modal-close login-close" onClick={onClose}>
          Stäng
        </button>
      </div>
    </div>
  )
}

export default Login