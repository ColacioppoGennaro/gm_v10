import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import './Setup.css'

function Setup({ setAuth }) {
  const [user, setUser] = useState(null)
  const [categories, setCategories] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user') || '{}')
    setUser(userData)
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    setAuth(false)
    navigate('/login')
  }

  return (
    <div className="page">
      <header className="page-header">
        <h1>Impostazioni</h1>
      </header>

      <div className="setup-section">
        <h2>Account</h2>
        <div className="card">
          <div className="info-row">
            <span className="label">Email:</span>
            <span className="value">{user?.email || 'N/A'}</span>
          </div>
          <div className="info-row">
            <span className="label">Piano:</span>
            <span className="value badge">{user?.plan || 'FREE'}</span>
          </div>
          {user?.plan === 'free' && (
            <button className="btn btn-primary">⬆️ Passa a PRO</button>
          )}
        </div>
      </div>

      <div className="setup-section">
        <h2>Integrazioni</h2>
        <div className="card">
          <button className="btn btn-secondary btn-full">
            📅 Collega Google Calendar
          </button>
        </div>
      </div>

      <div className="setup-section">
        <h2>Categorie</h2>
        <div className="card">
          <p className="text-secondary">Gestisci le categorie per eventi e documenti</p>
          <button className="btn btn-secondary">Modifica Categorie</button>
        </div>
      </div>

      <div className="setup-section">
        <button className="btn btn-danger btn-full" onClick={handleLogout}>
          🚪 Logout
        </button>
      </div>
    </div>
  )
}

export default Setup
