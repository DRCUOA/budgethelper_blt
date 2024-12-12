import { defineStore } from 'pinia';

export const useThemeStore = defineStore('theme', {
  state: () => ({
    isDark: window.matchMedia('(prefers-color-scheme: dark)').matches
  }),

  actions: {
    toggleTheme() {
      this.isDark = !this.isDark;
      document.documentElement.classList.toggle('dark');
    },

    initTheme() {
      if (this.isDark) {
        document.documentElement.classList.add('dark');
      }
    }
  }
});