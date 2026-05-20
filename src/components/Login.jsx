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

        <button className="modal-close">
          {isRegister ? 'Registrera' : 'Logga in'}
        </button>

        <p
          className="login-switch"
          onClick={() => setIsRegister(!isRegister)}
        >
          {isRegister ? 'Logga in' : 'Registrera dig här.'}
        </p>

        <button className="modal-close" onClick={onClose}>Stäng</button>
      </div>
    </div>
  )
}

export default Login