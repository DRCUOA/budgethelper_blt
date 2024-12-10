import express from 'express'
import { PrismaClient } from '@prisma/client'

const router = express.Router()
const prisma = new PrismaClient()

// Get all categories for the authenticated user
router.get('/', async (req, res) => {
  try {
    const categories = await prisma.category.findMany({
      where: {
        userId: req.user.userId
      }
    })
    res.json(categories)
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch categories' })
  }
})

// Add a new category
router.post('/', async (req, res) => {
  try {
    const { name } = req.body
    const category = await prisma.category.create({
      data: {
        name,
        userId: req.user.userId
      }
    })
    res.status(201).json(category)
  } catch (error) {
    res.status(500).json({ message: 'Failed to create category' })
  }
})

export default router