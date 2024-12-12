import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config/index.js'
import { findUserByEmail, createUser } from '../dao/userDao.js'

export const register = async (req, res) => {
  try {
    const { email, password } = req.body

    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const user = await createUser(email, hashedPassword)

    const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '24h' })
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: 'strict',
      domain: config.cookieDomain,
      maxAge: 24 * 60 * 60 * 1000
    })

    res.json({
      user: { id: user.id, email: user.email },
      token
    })
  } catch (error) {
    console.error('Registration error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await findUserByEmail(email)
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const token = jwt.sign({ userId: user.id }, config.jwtSecret, { expiresIn: '24h' })
    
    res.cookie('token', token, {
      httpOnly: true,
      secure: config.nodeEnv === 'production',
      sameSite: 'strict',
      domain: config.cookieDomain,
      maxAge: 24 * 60 * 60 * 1000
    })

    res.json({
      user: { id: user.id, email: user.email },
      token
    })
  } catch (error) {
    console.error('Login error:', error)
    res.status(500).json({ message: 'Server error' })
  }
}

export const logout = (req, res) => {
  res.clearCookie('token', {
    domain: config.cookieDomain,
    secure: config.nodeEnv === 'production',
    httpOnly: true
  })
  res.json({ message: 'Logged out successfully' })
}