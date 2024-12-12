import { defineStore } from 'pinia';
import { auth } from '../api/client';

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    isAuthenticated: false,
    loading: false,
    error: null
  }),

  actions: {
    async login(email, password) {
      this.loading = true;
      try {
        const { data } = await auth.login(email, password);
        this.user = data.user;
        this.isAuthenticated = true;
        this.error = null;
      } catch (error) {
        this.error = error.response?.data?.message || 'Login failed';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async register(userData) {
      this.loading = true;
      try {
        const { data } = await auth.register(userData);
        this.user = data.user;
        this.isAuthenticated = true;
        this.error = null;
      } catch (error) {
        this.error = error.response?.data?.message || 'Registration failed';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async logout() {
      try {
        await auth.logout();
        this.user = null;
        this.isAuthenticated = false;
        this.error = null;
      } catch (error) {
        this.error = error.response?.data?.message || 'Logout failed';
        throw error;
      }
    },

    async fetchProfile() {
      this.loading = true;
      try {
        const { data } = await auth.getProfile();
        this.user = data;
        this.isAuthenticated = true;
        this.error = null;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch profile';
        this.user = null;
        this.isAuthenticated = false;
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async updateProfile(userData) {
      this.loading = true;
      try {
        const { data } = await auth.updateProfile(userData);
        this.user = data;
        this.error = null;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update profile';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async deleteAccount() {
      try {
        await auth.deleteAccount();
        this.user = null;
        this.isAuthenticated = false;
        this.error = null;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to delete account';
        throw error;
      }
    }
  }
});