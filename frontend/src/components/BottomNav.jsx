import { Link, useLocation } from 'react-router-dom'
import './BottomNav.css'

function BottomNav() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="bottom-nav">
      <Link to="/home" className={`nav-item ${isActive('/home') ? 'active' : ''}`}>
        <span className="icon">🏠</span>
        <span className="label">Home</span>
      </Link>
      <Link to="/calendar" className={`nav-item ${isActive('/calendar') ? 'active' : ''}`}>
        <span className="icon">📅</span>
        <span className="label">Calendario</span>
      </Link>
      <Link to="/documents" className={`nav-item ${isActive('/documents') ? 'active' : ''}`}>
        <span className="icon">📄</span>
        <span className="label">Documenti</span>
      </Link>
      <Link to="/setup" className={`nav-item ${isActive('/setup') ? 'active' : ''}`}>
        <span className="icon">⚙️</span>
        <span className="label">Setup</span>
      </Link>
    </nav>
  )
}

export default BottomNav
