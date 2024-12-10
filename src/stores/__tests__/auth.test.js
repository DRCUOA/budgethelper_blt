import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useAuthStore } from '../auth'
import axios from 'axios'

vi.mock('axios')

describe('Auth Store', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('login', () => {
    it('successfully logs in user', async () => {
      const store = useAuthStore()
      const mockResponse = {
        data: {
          user: { id: 1, email: 'test@example.com' },
          token: 'mock-token'
        }
      }
      
      axios.post.mockResolvedValueOnce(mockResponse)
      
      await store.login('test@example.com', 'password')
      
      expect(store.user).toEqual(mockResponse.data.user)
      expect(store.token).toBe(mockResponse.data.token)
      expect(store.isAuthenticated).toBe(true)
    })

    it('handles login failure', async () => {
      const store = useAuthStore()
      axios.post.mockRejectedValueOnce(new Error('Invalid credentials'))
      
      await expect(store.login('test@example.com', 'wrong-password'))
        .rejects.toThrow('Invalid credentials')
      
      expect(store.user).toBeNull()
      expect(store.token).toBeNull()
      expect(store.isAuthenticated).toBe(false)
    })
  })

  describe('logout', () => {
    it('clears user data on logout', async () => {
      const store = useAuthStore()
      store.user = { id: 1, email: 'test@example.com' }
      store.token = 'mock-token'
      
      axios.post.mockResolvedValueOnce({})
      
      await store.logout()
      
      expect(store.user).toBeNull()
      expect(store.token).toBeNull()
      expect(store.isAuthenticated).toBe(false)
    })
  })
})