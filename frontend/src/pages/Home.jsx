import { useState, useEffect } from 'react'
import './Home.css'

function Home() {
  const [events, setEvents] = useState([])
  const [filter, setFilter] = useState('all')
  const [category, setCategory] = useState('all')

  useEffect(() => {
    // TODO: Fetch events from API
    // Placeholder data
    setEvents([])
  }, [])

  return (
    <div className="page">
      <header className="page-header">
        <h1>I Tuoi Eventi</h1>
        <button className="btn btn-primary">🤖 Interroga AI</button>
      </header>

      <div className="filters">
        <button
          className={`filter-btn ${filter === 'all' ? 'active' : ''}`}
          onClick={() => setFilter('all')}
        >
          Tutti
        </button>
        <button
          className={`filter-btn ${filter === 'todo' ? 'active' : ''}`}
          onClick={() => setFilter('todo')}
        >
          Da fare
        </button>
        <button
          className={`filter-btn ${filter === 'completed' ? 'active' : ''}`}
          onClick={() => setFilter('completed')}
        >
          Completati
        </button>
        <button
          className="filter-btn"
          onClick={() => {/* TODO: scroll to today */}}
        >
          📍 Oggi
        </button>
      </div>

      <div className="events-list">
        {events.length === 0 ? (
          <div className="empty-state">
            <p>Nessun evento trovato</p>
            <p className="text-secondary">Vai al calendario per aggiungerne uno!</p>
          </div>
        ) : (
          events.map((event) => (
            <div key={event.id} className="event-card">
              {/* Event content will go here */}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Home
