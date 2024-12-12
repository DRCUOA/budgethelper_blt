<template>
  <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center">
    <div class="card max-w-md w-full">
      <h2 class="text-2xl font-bold text-center mb-6">Register</h2>
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <div>
          <label class="block text-sm font-medium text-gray-700">Name</label>
          <input
            type="text"
            v-model="form.name"
            required
            class="input mt-1"
            placeholder="Your name"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Email</label>
          <input
            type="email"
            v-model="form.email"
            required
            class="input mt-1"
            placeholder="your.email@example.com"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Password</label>
          <input
            type="password"
            v-model="form.password"
            required
            class="input mt-1"
            placeholder="••••••••"
          />
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700">Confirm Password</label>
          <input
            type="password"
            v-model="form.confirmPassword"
            required
            class="input mt-1"
            placeholder="••••••••"
          />
        </div>
        <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
        <button type="submit" class="btn btn-primary w-full">Register</button>
        <p class="text-center text-sm text-gray-600">
          Already have an account?
          <router-link to="/login" class="text-blue-600 hover:text-blue-700">Login</router-link>
        </p>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  name: '',
  email: '',
  password: '',
  confirmPassword: ''
});

const error = ref('');

const handleSubmit = async () => {
  error.value = '';

  if (form.value.password !== form.value.confirmPassword) {
    error.value = 'Passwords do not match';
    return;
  }

  try {
    await authStore.register({
      name: form.value.name,
      email: form.value.email,
      password: form.value.password
    });
    router.push('/');
  } catch (err) {
    error.value = err.response?.data?.message || 'Registration failed';
  }
};
</script>