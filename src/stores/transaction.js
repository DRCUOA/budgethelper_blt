import { defineStore } from 'pinia'
import axios from 'axios'

export const useTransactionStore = defineStore('transaction', {
  state: () => ({
    transactions: [],
    categories: [],
    loading: false,
    error: null
  }),

  getters: {
    monthlyTotal: (state) => (type) => {
      return state.transactions
        .filter(t => t.type === type && new Date(t.date).getMonth() === new Date().getMonth())
        .reduce((sum, t) => sum + t.amount, 0)
    },
    
    netSavings: (state) => {
      const currentMonth = new Date().getMonth()
      const monthlyTransactions = state.transactions.filter(t => 
        new Date(t.date).getMonth() === currentMonth
      )
      
      const income = monthlyTransactions
        .filter(t => t.type === 'INCOME')
        .reduce((sum, t) => sum + t.amount, 0)
      
      const expenses = monthlyTransactions
        .filter(t => t.type === 'EXPENSE')
        .reduce((sum, t) => sum + t.amount, 0)
      
      return income - expenses
    }
  },

  actions: {
    async fetchTransactions() {
      try {
        this.loading = true
        const response = await axios.get('/api/transactions')
        this.transactions = response.data
      } catch (error) {
        this.error = 'Failed to fetch transactions'
        console.error(error)
      } finally {
        this.loading = false
      }
    },

    async fetchCategories() {
      try {
        const response = await axios.get('/api/categories')
        this.categories = response.data
      } catch (error) {
        console.error('Failed to fetch categories:', error)
      }
    },

    async addTransaction(transaction) {
      try {
        const response = await axios.post('/api/transactions', transaction)
        this.transactions.push(response.data)
      } catch (error) {
        throw new Error('Failed to add transaction')
      }
    },

    async deleteTransaction(id) {
      try {
        await axios.delete(`/api/transactions/${id}`)
        this.transactions = this.transactions.filter(t => t.id !== id)
      } catch (error) {
        throw new Error('Failed to delete transaction')
      }
    }
  }
})