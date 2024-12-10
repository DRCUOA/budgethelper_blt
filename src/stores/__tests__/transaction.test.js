import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTransactionStore } from '../transaction'
import axios from 'axios'

vi.mock('axios')

describe('Transaction Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('fetchTransactions', () => {
    it('successfully fetches transactions', async () => {
      const store = useTransactionStore()
      const mockTransactions = [
        { id: 1, type: 'INCOME', amount: 1000 },
        { id: 2, type: 'EXPENSE', amount: 500 }
      ]
      
      axios.get.mockResolvedValueOnce({ data: mockTransactions })
      
      await store.fetchTransactions()
      
      expect(store.transactions).toEqual(mockTransactions)
      expect(store.loading).toBe(false)
      expect(store.error).toBeNull()
    })

    it('handles fetch error', async () => {
      const store = useTransactionStore()
      axios.get.mockRejectedValueOnce(new Error('Network error'))
      
      await store.fetchTransactions()
      
      expect(store.transactions).toEqual([])
      expect(store.loading).toBe(false)
      expect(store.error).toBe('Failed to fetch transactions')
    })
  })

  describe('monthlyTotal', () => {
    it('calculates monthly total correctly', () => {
      const store = useTransactionStore()
      const currentMonth = new Date().getMonth()
      
      store.transactions = [
        {
          type: 'INCOME',
          amount: 1000,
          date: new Date(2024, currentMonth, 1)
        },
        {
          type: 'INCOME',
          amount: 500,
          date: new Date(2024, currentMonth, 15)
        },
        {
          type: 'INCOME',
          amount: 750,
          date: new Date(2024, currentMonth - 1, 1)
        }
      ]
      
      expect(store.monthlyTotal('INCOME')).toBe(1500)
    })
  })

  describe('netSavings', () => {
    it('calculates net savings correctly', () => {
      const store = useTransactionStore()
      const currentMonth = new Date().getMonth()
      
      store.transactions = [
        {
          type: 'INCOME',
          amount: 2000,
          date: new Date(2024, currentMonth, 1)
        },
        {
          type: 'EXPENSE',
          amount: 800,
          date: new Date(2024, currentMonth, 15)
        }
      ]
      
      expect(store.netSavings).toBe(1200)
    })
  })
})