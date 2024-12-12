<template>
  <div class="min-h-screen bg-gray-50 dark:bg-dark-surface text-gray-900 dark:text-gray-100 transition-colors">
    <nav class="bg-white dark:bg-dark-card border-b border-gray-200 dark:border-dark-border shadow-sm">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <router-link to="/" class="flex items-center">
              <span class="text-xl font-bold text-gray-900 dark:text-white">Budget App</span>
            </router-link>
            <div class="ml-10 flex items-center space-x-4">
              <router-link to="/transactions" class="nav-link">Transactions</router-link>
              <router-link to="/categories" class="nav-link">Categories</router-link>
              <router-link to="/analytics" class="nav-link">Analytics</router-link>
              <router-link to="/import" class="nav-link">Import</router-link>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <ThemeToggle />
            <router-link to="/profile" class="nav-link">Profile</router-link>
            <button @click="logout" class="nav-link">Logout</button>
          </div>
        </div>
      </div>
    </nav>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <router-view></router-view>
    </main>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from './stores/auth';
import { useThemeStore } from './stores/theme';
import ThemeToggle from './components/shared/ThemeToggle.vue';

const router = useRouter();
const authStore = useAuthStore();
const themeStore = useThemeStore();

const logout = async () => {
  try {
    await authStore.logout();
    router.push('/login');
  } catch (error) {
    console.error('Logout failed:', error);
  }
};

onMounted(async () => {
  themeStore.initTheme();
  try {
    await authStore.fetchProfile();
  } catch (error) {
    console.error('Failed to fetch profile:', error);
  }
});
</script>

<style>
.nav-link {
  @apply px-3 py-2 rounded-md text-sm font-medium text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-dark-surface transition-colors;
}

.card {
  @apply bg-white dark:bg-dark-card border border-gray-200 dark:border-dark-border rounded-lg shadow-sm p-6 transition-colors;
}

.input {
  @apply w-full px-3 py-2 bg-white dark:bg-dark-surface border border-gray-300 dark:border-dark-border rounded-md text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-accent dark:focus:ring-accent/50 transition-colors;
}

.btn {
  @apply px-4 py-2 rounded-md font-medium transition-colors;
}

.btn-primary {
  @apply bg-accent text-white hover:bg-accent/90;
}

.btn-secondary {
  @apply bg-gray-200 dark:bg-dark-surface text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-dark-card;
}
</style>