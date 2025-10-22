import express from 'express'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// All routes require authentication
router.use(authenticateToken)

// Get all documents for user
router.get('/', async (req, res) => {
  // TODO: Implement document fetching
  res.json({ documents: [] })
})

// Upload document
router.post('/', async (req, res) => {
  // TODO: Implement document upload
  res.status(501).json({ error: 'Not implemented yet' })
})

// Delete document
router.delete('/:id', async (req, res) => {
  // TODO: Implement document deletion
  res.status(501).json({ error: 'Not implemented yet' })
})

export default router
