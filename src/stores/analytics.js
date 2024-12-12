import { defineStore } from 'pinia';
import { analytics } from '../api/client';

export const useAnalyticsStore = defineStore('analytics', {
  state: () => ({
    monthlySummary: null,
    categoryBreakdown: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchMonthlySummary(month) {
      this.loading = true;
      try {
        const { data } = await analytics.getMonthlySummary(month);
        this.monthlySummary = data;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    },

    async fetchCategoryBreakdown(month) {
      this.loading = true;
      try {
        const { data } = await analytics.getCategoryBreakdown(month);
        this.categoryBreakdown = data;
      } catch (error) {
        this.error = error.message;
      } finally {
        this.loading = false;
      }
    }
  }
});