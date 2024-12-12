<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Welcome, {{ authStore.user?.name || 'User' }}!</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <router-link to="/transactions" class="card hover:shadow-lg transition-shadow">
        <h2 class="text-xl font-semibold mb-2">Transactions</h2>
        <p class="text-gray-600">Manage your income and expenses</p>
      </router-link>
      
      <router-link to="/categories" class="card hover:shadow-lg transition-shadow">
        <h2 class="text-xl font-semibold mb-2">Categories</h2>
        <p class="text-gray-600">Organize your transactions</p>
      </router-link>
      
      <router-link to="/analytics" class="card hover:shadow-lg transition-shadow">
        <h2 class="text-xl font-semibold mb-2">Analytics</h2>
        <p class="text-gray-600">View insights and reports</p>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/auth';

const authStore = useAuthStore();
</script>