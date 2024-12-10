import { defineStore } from 'pinia'
import axios from 'axios'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: null
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token
  },
  
  actions: {
    async login(email, password) {
      try {
        const response = await axios.post('/api/auth/login', { email, password })
        this.user = response.data.user
        this.token = response.data.token
        return true
      } catch (error) {
        console.error('Login failed:', error)
        throw error
      }
    },
    
    async register(email, password) {
      try {
        const response = await axios.post('/api/auth/register', { email, password })
        this.user = response.data.user
        this.token = response.data.token
        return true
      } catch (error) {
        console.error('Registration failed:', error)
        throw error
      }
    },
    
    logout() {
      this.user = null
      this.token = null
      axios.post('/api/auth/logout')
    }
  }
})