import express from 'express'
import { authenticateToken } from '../middleware/auth.js'

const router = express.Router()

// All routes require authentication
router.use(authenticateToken)

// Chat with AI
router.post('/chat', async (req, res) => {
  // TODO: Implement AI chat with Gemini
  res.status(501).json({ error: 'Not implemented yet' })
})

// Process image with AI (OCR)
router.post('/process-image', async (req, res) => {
  // TODO: Implement image processing with Gemini
  res.status(501).json({ error: 'Not implemented yet' })
})

export default router
