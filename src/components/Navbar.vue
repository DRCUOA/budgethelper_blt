<script setup>
import { useAuthStore } from '../stores/auth'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

const handleLogout = async () => {
  await authStore.logout()
  router.push('/login')
}
</script>

<template>
  <nav class="bg-white shadow-lg">
    <div class="container mx-auto px-4">
      <div class="flex justify-between items-center h-16">
        <div class="flex items-center space-x-4">
          <router-link to="/" class="text-gray-800 font-semibold">Budget App</router-link>
          <router-link to="/transactions" class="text-gray-600 hover:text-gray-800">Transactions</router-link>
          <router-link to="/import" class="text-gray-600 hover:text-gray-800">Import</router-link>
        </div>
        <button
          @click="handleLogout"
          class="text-gray-600 hover:text-gray-800"
        >
          Logout
        </button>
      </div>
    </div>
  </nav>
</template>