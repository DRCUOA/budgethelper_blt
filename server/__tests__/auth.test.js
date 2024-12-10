import request from 'supertest'
import express from 'express'
import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'
import authRoutes from '../routes/auth.js'

const app = express()
app.use(express.json())
app.use('/api/auth', authRoutes)

vi.mock('@prisma/client')
vi.mock('bcryptjs')

describe('Auth Routes', () => {
  let prisma

  beforeEach(() => {
    prisma = {
      user: {
        findUnique: vi.fn(),
        create: vi.fn()
      }
    }
    PrismaClient.mockImplementation(() => prisma)
  })

  describe('POST /api/auth/register', () => {
    it('registers a new user successfully', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword'
      }

      prisma.user.findUnique.mockResolvedValue(null)
      prisma.user.create.mockResolvedValue(mockUser)
      bcrypt.hash.mockResolvedValue('hashedPassword')

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123'
        })

      expect(response.status).toBe(200)
      expect(response.body.user).toBeDefined()
      expect(response.body.token).toBeDefined()
    })

    it('prevents duplicate email registration', async () => {
      prisma.user.findUnique.mockResolvedValue({ id: 1, email: 'test@example.com' })

      const response = await request(app)
        .post('/api/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123'
        })

      expect(response.status).toBe(400)
      expect(response.body.message).toBe('User already exists')
    })
  })

  describe('POST /api/auth/login', () => {
    it('logs in user with valid credentials', async () => {
      const mockUser = {
        id: 1,
        email: 'test@example.com',
        password: 'hashedPassword'
      }

      prisma.user.findUnique.mockResolvedValue(mockUser)
      bcrypt.compare.mockResolvedValue(true)

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'password123'
        })

      expect(response.status).toBe(200)
      expect(response.body.user).toBeDefined()
      expect(response.body.token).toBeDefined()
    })

    it('rejects invalid credentials', async () => {
      prisma.user.findUnique.mockResolvedValue(null)

      const response = await request(app)
        .post('/api/auth/login')
        .send({
          email: 'test@example.com',
          password: 'wrongpassword'
        })

      expect(response.status).toBe(401)
      expect(response.body.message).toBe('Invalid credentials')
    })
  })
})