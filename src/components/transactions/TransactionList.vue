<template>
  <div class="space-y-4">
    <div class="flex justify-between items-center">
      <div class="flex space-x-4">
        <input
          type="month"
          v-model="selectedMonth"
          class="input max-w-xs"
          @change="handleFilterChange"
        />
        <select
          v-model="selectedCategory"
          class="input max-w-xs"
          @change="handleFilterChange"
        >
          <option value="">All Categories</option>
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      <button @click="$emit('new')" class="btn btn-primary">
        New Transaction
      </button>
    </div>

    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Description
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Amount
            </th>
            <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Type
            </th>
            <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="transaction in transactions" :key="transaction.id">
            <td class="px-6 py-4 whitespace-nowrap">
              {{ formatDate(transaction.date) }}
            </td>
            <td class="px-6 py-4">
              {{ transaction.description }}
            </td>
            <td class="px-6 py-4">
              {{ getCategoryName(transaction.categoryId) }}
            </td>
            <td class="px-6 py-4">
              {{ formatAmount(transaction.amount) }}
            </td>
            <td class="px-6 py-4">
              <span :class="transaction.type === 'income' ? 'text-green-600' : 'text-red-600'">
                {{ transaction.type }}
              </span>
            </td>
            <td class="px-6 py-4 text-right space-x-2">
              <button @click="$emit('edit', transaction)" class="text-blue-600 hover:text-blue-800">
                Edit
              </button>
              <button @click="$emit('delete', transaction.id)" class="text-red-600 hover:text-red-800">
                Delete
              </button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useCategoriesStore } from '../../stores/categories';

const props = defineProps({
  transactions: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['new', 'edit', 'delete', 'filter-change']);
const categoriesStore = useCategoriesStore();
const categories = computed(() => categoriesStore.items);

const selectedMonth = ref(new Date().toISOString().slice(0, 7));
const selectedCategory = ref('');

const formatDate = (date) => new Date(date).toLocaleDateString();
const formatAmount = (amount) => new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD'
}).format(amount);

const getCategoryName = (categoryId) => {
  const category = categories.value.find(c => c.id === categoryId);
  return category ? category.name : 'Unknown';
};

const handleFilterChange = () => {
  emit('filter-change', {
    month: selectedMonth.value,
    category: selectedCategory.value
  });
};
</script>