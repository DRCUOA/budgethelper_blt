import { defineStore } from 'pinia';
import { transactions } from '../api/client';

export const useTransactionsStore = defineStore('transactions', {
  state: () => ({
    items: [],
    filters: {
      month: new Date().toISOString().slice(0, 7),
      category: ''
    },
    loading: false,
    error: null
  }),

  actions: {
    async fetchTransactions() {
      this.loading = true;
      try {
        const { data } = await transactions.getAll(this.filters);
        this.items = data;
        this.error = null;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to fetch transactions';
        throw error;
      } finally {
        this.loading = false;
      }
    },

    async createTransaction(transactionData) {
      try {
        const { data } = await transactions.create(transactionData);
        this.items.unshift(data);
        this.error = null;
        return data;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to create transaction';
        throw error;
      }
    },

    async updateTransaction(id, transactionData) {
      try {
        const { data } = await transactions.update(id, transactionData);
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
          this.items[index] = data;
        }
        this.error = null;
        return data;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to update transaction';
        throw error;
      }
    },

    async deleteTransaction(id) {
      try {
        await transactions.delete(id);
        this.items = this.items.filter(item => item.id !== id);
        this.error = null;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to delete transaction';
        throw error;
      }
    },

    async importTransactions(transactionsData) {
      try {
        const { data } = await transactions.import(transactionsData);
        this.items.push(...data);
        this.error = null;
        return data;
      } catch (error) {
        this.error = error.response?.data?.message || 'Failed to import transactions';
        throw error;
      }
    },

    setFilters(filters) {
      this.filters = { ...this.filters, ...filters };
    }
  }
});