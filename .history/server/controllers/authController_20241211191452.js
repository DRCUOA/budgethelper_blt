import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import config from '../config/index.js'
import { findUserByEmail, createUser } from '../dao/userDao.js'

export const register = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log(`Register attempt for email: ${email}`)

    const existingUser = await findUserByEmail(email)
    if (existingUser) {
      console.error(`User already exists: ${email}`)
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
    console.error(`Registration error: ${error.message}`)
    res.status(500).json({ message: 'Server error' })
  }
}

export const login = async (req, res) => {
  try {
    const { email, password } = req.body
    console.log(`Login attempt for email: ${email}`)

    const user = await findUserByEmail(email)
    if (!user) {
      console.error(`Invalid credentials for email: ${email}`)
      return res.status(401).json({ message: 'Invalid credentials' })
    }

    const validPassword = await bcrypt.compare(password, user.password)
    if (!validPassword) {
      console.error(`Invalid password for email: ${email}`)
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
    console.error(`Login error: ${error.message}`)
    res.status(500).json({ message: 'Server error' })
  }
}

export const logout = (req, res) => {
  try {
    res.clearCookie('token', {
      domain: config.cookieDomain,
      secure: config.nodeEnv === 'production',
      httpOnly: true
    })
    res.json({ message: 'Logged out successfully' })
  } catch (error) {
    console.error(`Logout error: ${error.message}`)
    res.status(500).json({ message: 'Server error' })
  }
}