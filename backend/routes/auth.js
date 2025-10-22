import express from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import db from '../config/db.js'

const router = express.Router()

// Register
router.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e password sono obbligatori' })
    }

    if (password.length < 8) {
      return res.status(400).json({ error: 'La password deve contenere almeno 8 caratteri' })
    }

    // Check if user exists
    const [existingUsers] = await db.query('SELECT id FROM users WHERE email = ?', [email])
    if (existingUsers.length > 0) {
      return res.status(400).json({ error: 'Email già registrata' })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)

    // Create user
    const [result] = await db.query(
      'INSERT INTO users (email, password, plan) VALUES (?, ?, ?)',
      [email, hashedPassword, 'free']
    )

    // Create token
    const token = jwt.sign(
      { id: result.insertId, email, plan: 'free' },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    res.status(201).json({
      token,
      user: { id: result.insertId, email, plan: 'free' }
    })
  } catch (error) {
    console.error('Register error:', error)
    res.status(500).json({ error: 'Errore durante la registrazione' })
  }
})

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    if (!email || !password) {
      return res.status(400).json({ error: 'Email e password sono obbligatori' })
    }

    // Find user
    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [email])
    if (users.length === 0) {
      return res.status(401).json({ error: 'Credenziali non valide' })
    }

    const user = users[0]

    // Check password
    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(401).json({ error: 'Credenziali non valide' })
    }

    // Create token
    const token = jwt.sign(
      { id: user.id, email: user.email, plan: user.plan },
      process.env.JWT_SECRET,
      { expiresIn: '30d' }
    )

    res.json({
      token,
      user: { id: user.id, email: user.email, plan: user.plan }
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ error: 'Errore durante il login' })
  }
})

export default router
