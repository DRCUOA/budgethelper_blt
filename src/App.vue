<script setup>
import { RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue'
import { useAuthStore } from './stores/auth'

const authStore = useAuthStore()
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <Navbar v-if="authStore.isAuthenticated" />
    <main class="container mx-auto px-4 py-8 max-w-7xl">
      <RouterView />
    </main>
  </div>
</template>