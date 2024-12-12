<template>
  <div class="max-w-2xl mx-auto space-y-6">
    <h1 class="text-2xl font-bold">Profile Settings</h1>

    <div class="card">
      <form @submit.prevent="handleSubmit" class="space-y-6">
        <div class="space-y-4">
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
            <label class="block text-sm font-medium text-gray-700">Currency</label>
            <select v-model="form.currency" required class="input mt-1">
              <option value="USD">USD ($)</option>
              <option value="EUR">EUR (€)</option>
              <option value="GBP">GBP (£)</option>
              <!-- Add more currencies as needed -->
            </select>
          </div>

          <div class="pt-4 border-t">
            <h3 class="text-lg font-medium mb-4">Change Password</h3>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium text-gray-700">Current Password</label>
                <input
                  type="password"
                  v-model="form.currentPassword"
                  class="input mt-1"
                  placeholder="Enter current password"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">New Password</label>
                <input
                  type="password"
                  v-model="form.newPassword"
                  class="input mt-1"
                  placeholder="Enter new password"
                />
              </div>

              <div>
                <label class="block text-sm font-medium text-gray-700">Confirm New Password</label>
                <input
                  type="password"
                  v-model="form.confirmPassword"
                  class="input mt-1"
                  placeholder="Confirm new password"
                />
              </div>
            </div>
          </div>
        </div>

        <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
        <div v-if="success" class="text-green-600 text-sm">{{ success }}</div>

        <div class="flex justify-end space-x-2">
          <button type="submit" class="btn btn-primary" :disabled="loading">
            <span v-if="loading">Saving...</span>
            <span v-else>Save Changes</span>
          </button>
        </div>
      </form>
    </div>

    <div class="card bg-red-50">
      <h3 class="text-lg font-medium text-red-800 mb-4">Danger Zone</h3>
      <p class="text-sm text-red-600 mb-4">
        Once you delete your account, there is no going back. Please be certain.
      </p>
      <button
        @click="confirmDeleteAccount"
        class="btn bg-red-600 text-white hover:bg-red-700"
      >
        Delete Account
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth';

const router = useRouter();
const authStore = useAuthStore();

const form = ref({
  name: '',
  email: '',
  currency: 'USD',
  currentPassword: '',
  newPassword: '',
  confirmPassword: ''
});

const loading = ref(false);
const error = ref('');
const success = ref('');

onMounted(() => {
  if (authStore.user) {
    form.value.name = authStore.user.name || '';
    form.value.email = authStore.user.email || '';
    form.value.currency = authStore.user.currency || 'USD';
  }
});

const handleSubmit = async () => {
  loading.value = true;
  error.value = '';
  success.value = '';

  try {
    // Validate password change if attempted
    if (form.value.newPassword) {
      if (!form.value.currentPassword) {
        throw new Error('Current password is required to set a new password');
      }
      if (form.value.newPassword !== form.value.confirmPassword) {
        throw new Error('New passwords do not match');
      }
    }

    const updateData = {
      name: form.value.name,
      email: form.value.email,
      currency: form.value.currency
    };

    if (form.value.newPassword) {
      updateData.currentPassword = form.value.currentPassword;
      updateData.newPassword = form.value.newPassword;
    }

    await authStore.updateProfile(updateData);
    success.value = 'Profile updated successfully';
    
    // Clear password fields
    form.value.currentPassword = '';
    form.value.newPassword = '';
    form.value.confirmPassword = '';
  } catch (err) {
    error.value = err.response?.data?.message || err.message;
  } finally {
    loading.value = false;
  }
};

const confirmDeleteAccount = async () => {
  if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
    try {
      await authStore.deleteAccount();
      router.push('/login');
    } catch (err) {
      error.value = err.response?.data?.message || err.message;
    }
  }
};
</script>