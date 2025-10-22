import jwt from 'jsonwebtoken'

export const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization']
  const token = authHeader && authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ error: 'Token di autenticazione mancante' })
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Token non valido' })
    }
    req.user = user
    next()
  })
}

export const checkPlan = (requiredPlan) => {
  return (req, res, next) => {
    if (requiredPlan === 'pro' && req.user.plan !== 'pro') {
      return res.status(403).json({ error: 'Funzionalità disponibile solo per utenti PRO' })
    }
    next()
  }
}
