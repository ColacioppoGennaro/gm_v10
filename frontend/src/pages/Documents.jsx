import { useState } from 'react'
import './Documents.css'

function Documents() {
  const [documents, setDocuments] = useState([])
  const [categoryFilter, setCategoryFilter] = useState('all')

  return (
    <div className="page">
      <header className="page-header">
        <h1>Documenti</h1>
        <button className="btn btn-primary">+ Aggiungi</button>
      </header>

      <div className="filters">
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="filter-select"
        >
          <option value="all">Tutte le categorie</option>
          <option value="lavoro">Lavoro</option>
          <option value="personali">Personali</option>
          <option value="famiglia">Famiglia</option>
        </select>
      </div>

      <div className="documents-list">
        {documents.length === 0 ? (
          <div className="empty-state">
            <p>Nessun documento caricato</p>
            <p className="text-secondary">Carica il tuo primo documento!</p>
          </div>
        ) : (
          documents.map((doc) => (
            <div key={doc.id} className="document-card">
              {/* Document content will go here */}
            </div>
          ))
        )}
      </div>
    </div>
  )
}

export default Documents
