<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700">Name</label>
      <input
        type="text"
        v-model="form.name"
        required
        class="input mt-1"
        placeholder="Enter category name"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Type</label>
      <select v-model="form.type" required class="input mt-1">
        <option value="expense">Expense</option>
        <option value="income">Income</option>
        <option value="both">Both</option>
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Description</label>
      <textarea
        v-model="form.description"
        class="input mt-1"
        rows="3"
        placeholder="Enter category description (optional)"
      ></textarea>
    </div>

    <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>

    <div class="flex justify-end space-x-2">
      <button type="button" @click="$emit('cancel')" class="btn btn-secondary">
        Cancel
      </button>
      <button type="submit" class="btn btn-primary">
        {{ category ? 'Update' : 'Create' }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const props = defineProps({
  category: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['submit', 'cancel']);
const error = ref('');

const form = ref({
  name: '',
  type: 'expense',
  description: ''
});

onMounted(() => {
  if (props.category) {
    form.value = { ...props.category };
  }
});

const handleSubmit = () => {
  try {
    emit('submit', { ...form.value });
  } catch (err) {
    error.value = err.message;
  }
};
</script>