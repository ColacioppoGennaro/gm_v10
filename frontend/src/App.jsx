import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import Login from './pages/Login'
import Register from './pages/Register'
import Home from './pages/Home'
import Calendar from './pages/Calendar'
import Documents from './pages/Documents'
import Setup from './pages/Setup'
import BottomNav from './components/BottomNav'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is authenticated
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token)
    setLoading(false)
  }, [])

  if (loading) {
    return <div className="loading">Caricamento...</div>
  }

  return (
    <Router basename="/gm_v10">
      <div className="app">
        <Routes>
          <Route path="/login" element={
            isAuthenticated ? <Navigate to="/home" /> : <Login setAuth={setIsAuthenticated} />
          } />
          <Route path="/register" element={
            isAuthenticated ? <Navigate to="/home" /> : <Register setAuth={setIsAuthenticated} />
          } />
          <Route path="/home" element={
            isAuthenticated ? <Home /> : <Navigate to="/login" />
          } />
          <Route path="/calendar" element={
            isAuthenticated ? <Calendar /> : <Navigate to="/login" />
          } />
          <Route path="/documents" element={
            isAuthenticated ? <Documents /> : <Navigate to="/login" />
          } />
          <Route path="/setup" element={
            isAuthenticated ? <Setup setAuth={setIsAuthenticated} /> : <Navigate to="/login" />
          } />
          <Route path="*" element={<Navigate to={isAuthenticated ? "/home" : "/login"} />} />
        </Routes>
        {isAuthenticated && <BottomNav />}
      </div>
    </Router>
  )
}

export default App
