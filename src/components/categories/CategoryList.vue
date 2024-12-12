<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <div class="flex space-x-4">
        <select
          v-model="selectedType"
          class="input max-w-xs"
          @change="handleFilterChange"
        >
          <option value="">All Types</option>
          <option value="expense">Expense</option>
          <option value="income">Income</option>
          <option value="both">Both</option>
        </select>
      </div>
      <button @click="$emit('new')" class="btn btn-primary">
        New Category
      </button>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="category in filteredCategories"
        :key="category.id"
        class="card hover:shadow-lg transition-shadow"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="text-lg font-medium text-gray-900">{{ category.name }}</h3>
            <p class="text-sm text-gray-500">Type: {{ category.type }}</p>
          </div>
          <div class="flex space-x-2">
            <button
              @click="$emit('edit', category)"
              class="text-blue-600 hover:text-blue-800"
            >
              <EditIcon class="h-5 w-5" />
            </button>
            <button
              @click="confirmDelete(category)"
              class="text-red-600 hover:text-red-800"
            >
              <TrashIcon class="h-5 w-5" />
            </button>
          </div>
        </div>
        <p v-if="category.description" class="mt-2 text-sm text-gray-600">
          {{ category.description }}
        </p>
        <div class="mt-4">
          <span class="text-sm text-gray-500">
            {{ getTransactionCount(category) }} transactions
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { EditIcon, TrashIcon } from '@heroicons/vue/24/outline';
import { useTransactionsStore } from '../../stores/transactions';

const props = defineProps({
  categories: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['new', 'edit', 'delete']);
const selectedType = ref('');
const transactionsStore = useTransactionsStore();

const filteredCategories = computed(() => {
  if (!selectedType.value) return props.categories;
  return props.categories.filter(category => category.type === selectedType.value);
});

const getTransactionCount = (category) => {
  return transactionsStore.items.filter(t => t.categoryId === category.id).length;
};

const confirmDelete = (category) => {
  const transactionCount = getTransactionCount(category);
  if (transactionCount > 0) {
    if (!confirm(`This category has ${transactionCount} transactions. Are you sure you want to delete it?`)) {
      return;
    }
  }
  emit('delete', category.id);
};

const handleFilterChange = () => {
  // Additional filter logic if needed
};
</script>