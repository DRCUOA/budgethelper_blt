import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.js'
import transactionRoutes from './routes/transactions.js'
import categoryRoutes from './routes/categories.js'
import { authenticateToken } from './middleware/auth.js'

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(express.json())
app.use(cookieParser())

// Routes
app.use('/api/auth', authRoutes)
app.use('/api/transactions', authenticateToken, transactionRoutes)
app.use('/api/categories', authenticateToken, categoryRoutes)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})