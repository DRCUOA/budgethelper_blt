import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// Get all transactions for the authenticated user
router.get('/', async (req, res) => {
  try {
    const transactions = await prisma.transaction.findMany({
      where: {
        userId: req.user.userId
      },
      include: {
        category: true
      },
      orderBy: {
        date: 'desc'
      }
    })
    res.json(transactions)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch transactions' })
  }
})

// Add a new transaction
router.post('/', async (req, res) => {
  try {
    const { type, amount, description, categoryId, date } = req.body
    const transaction = await prisma.transaction.create({
      data: {
        type,
        amount,
        description,
        date,
        userId: req.user.userId,
        categoryId
      },
      include: {
        category: true
      }
    })
    res.status(201).json(transaction)
  } catch (error) {
    res.status(500).json({ message: 'Failed to create transaction' })
  }
})

// Delete a transaction
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params
    await prisma.transaction.deleteMany({
      where: {
        id: parseInt(id),
        userId: req.user.userId
      }
    })
    res.status(204).send()
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete transaction' })
  }
})

export default router