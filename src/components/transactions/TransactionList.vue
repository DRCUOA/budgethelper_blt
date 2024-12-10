<script setup>
import { computed } from 'vue'
import { useTransactionStore } from '../../stores/transaction'

const store = useTransactionStore()

const formatDate = (date) => {
  return new Date(date).toLocaleDateString()
}

const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
  }).format(amount)
}

const getCategoryName = (categoryId) => {
  const category = store.categories.find(c => c.id === categoryId)
  return category ? category.name : 'Unknown'
}
</script>

<template>
  <div class="bg-white rounded-lg shadow overflow-hidden">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
          <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="transaction in store.transactions" :key="transaction.id">
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ formatDate(transaction.date) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap">
            <span
              :class="{
                'px-2 inline-flex text-xs leading-5 font-semibold rounded-full': true,
                'bg-green-100 text-green-800': transaction.type === 'INCOME',
                'bg-red-100 text-red-800': transaction.type === 'EXPENSE'
              }"
            >
              {{ transaction.type }}
            </span>
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
            {{ transaction.description }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ getCategoryName(transaction.categoryId) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm"
            :class="{
              'text-green-600': transaction.type === 'INCOME',
              'text-red-600': transaction.type === 'EXPENSE'
            }"
          >
            {{ formatAmount(transaction.amount) }}
          </td>
          <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
            <button
              @click="store.deleteTransaction(transaction.id)"
              class="text-red-600 hover:text-red-900"
            >
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>