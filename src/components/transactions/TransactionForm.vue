<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label class="block text-sm font-medium text-gray-700">Description</label>
      <input
        type="text"
        v-model="form.description"
        required
        class="input mt-1"
        placeholder="Enter description"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Amount</label>
      <input
        type="number"
        v-model="form.amount"
        required
        step="0.01"
        class="input mt-1"
        placeholder="0.00"
      />
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Category</label>
      <select v-model="form.categoryId" required class="input mt-1">
        <option value="">Select a category</option>
        <option v-for="category in categories" :key="category.id" :value="category.id">
          {{ category.name }}
        </option>
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Type</label>
      <select v-model="form.type" required class="input mt-1">
        <option value="expense">Expense</option>
        <option value="income">Income</option>
      </select>
    </div>

    <div>
      <label class="block text-sm font-medium text-gray-700">Date</label>
      <input
        type="date"
        v-model="form.date"
        required
        class="input mt-1"
      />
    </div>

    <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>

    <div class="flex justify-end space-x-2">
      <button type="button" @click="$emit('cancel')" class="btn btn-secondary">
        Cancel
      </button>
      <button type="submit" class="btn btn-primary">
        {{ transaction ? 'Update' : 'Create' }}
      </button>
    </div>
  </form>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCategoriesStore } from '../../stores/categories';

const props = defineProps({
  transaction: {
    type: Object,
    default: null
  }
});

const emit = defineEmits(['submit', 'cancel']);
const categoriesStore = useCategoriesStore();
const error = ref('');

const form = ref({
  description: '',
  amount: '',
  categoryId: '',
  type: 'expense',
  date: new Date().toISOString().slice(0, 10)
});

onMounted(async () => {
  if (!categoriesStore.items.length) {
    await categoriesStore.fetchCategories();
  }
  if (props.transaction) {
    form.value = { ...props.transaction };
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