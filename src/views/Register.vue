<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import InputField from '../components/forms/InputField.vue'

const router = useRouter()
const authStore = useAuthStore()

const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const error = ref('')

const handleSubmit = async () => {
  try {
    error.value = ''
    
    if (password.value !== confirmPassword.value) {
      error.value = 'Passwords do not match'
      return
    }
    
    await authStore.register(email.value, password.value)
    router.push('/')
  } catch (err) {
    error.value = 'Registration failed. Please try again.'
  }
}
</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
      <div>
        <h2 class="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Create your account
        </h2>
      </div>
      <form class="mt-8 space-y-6" @submit.prevent="handleSubmit">
        <div class="space-y-4 rounded-md shadow-sm">
          <InputField
            v-model="email"
            label="Email address"
            type="email"
          />
          <InputField
            v-model="password"
            label="Password"
            type="password"
          />
          <InputField
            v-model="confirmPassword"
            label="Confirm Password"
            type="password"
          />
        </div>

        <div v-if="error" class="text-red-500 text-center">
          {{ error }}
        </div>

        <div>
          <button
            type="submit"
            class="group relative flex w-full justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign up
          </button>
        </div>

        <div class="text-center">
          <router-link
            to="/login"
            class="text-sm text-indigo-600 hover:text-indigo-500"
          >
            Already have an account? Sign in
          </router-link>
        </div>
      </form>
    </div>
  </div>
</template>