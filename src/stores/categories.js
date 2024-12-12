import { defineStore } from 'pinia';
import { categories } from '../api/client';

export const useCategoriesStore = defineStore('categories', {
  state: () => ({
    items: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchCategories() {
      this.loading = true;
      try {
        const { data } = await categories.getAll();
        this.items = data;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async createCategory(categoryData) {
      try {
        const { data } = await categories.create(categoryData);
        this.items.push(data);
        return data;
      } catch (error) {
        throw error;
      }
    },

    async updateCategory(id, categoryData) {
      try {
        const { data } = await categories.update(id, categoryData);
        const index = this.items.findIndex(item => item.id === id);
        if (index !== -1) {
          this.items[index] = data;
        }
        return data;
      } catch (error) {
        throw error;
      }
    },

    async deleteCategory(id) {
      try {
        await categories.delete(id);
        this.items = this.items.filter(item => item.id !== id);
      } catch (error) {
        throw error;
      }
    }
  }
});