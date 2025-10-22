import { useState } from 'react'
import './Calendar.css'

function Calendar() {
  const [showModal, setShowModal] = useState(false)

  return (
    <div className="page">
      <header className="page-header">
        <h1>Calendario</h1>
      </header>

      <div className="calendar-container">
        <div className="calendar-placeholder">
          <p>Calendario Google integrato</p>
          <p className="text-secondary">Implementazione in arrivo...</p>
        </div>
      </div>

      <button
        className="fab"
        onClick={() => setShowModal(true)}
      >
        +
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <h2>Nuovo Evento</h2>
            <div className="modal-buttons">
              <button className="btn btn-primary">✍️ Inserimento Manuale</button>
              <button className="btn btn-secondary">📸 Inserimento da Foto</button>
            </div>
            <button className="btn-close" onClick={() => setShowModal(false)}>✕</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default Calendar
