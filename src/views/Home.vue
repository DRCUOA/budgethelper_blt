<script setup>
import { onMounted } from 'vue'
import { useTransactionStore } from '../stores/transaction'
import ExpensesChart from '../components/analytics/ExpensesChart.vue'
import SpendingTrendsChart from '../components/analytics/SpendingTrendsChart.vue'

const store = useTransactionStore()

onMounted(async () => {
  await Promise.all([
    store.fetchTransactions(),
    store.fetchCategories()
  ])
})
</script>

<template>
  <div class="space-y-8">
    <h1 class="text-2xl font-bold text-gray-900">Dashboard</h1>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-medium text-gray-900 mb-2">Monthly Income</h3>
        <p class="text-2xl font-bold text-green-600">
          {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(store.monthlyTotal('INCOME')) }}
        </p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-medium text-gray-900 mb-2">Monthly Expenses</h3>
        <p class="text-2xl font-bold text-red-600">
          {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(store.monthlyTotal('EXPENSE')) }}
        </p>
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <h3 class="text-lg font-medium text-gray-900 mb-2">Net Savings</h3>
        <p class="text-2xl font-bold" :class="store.netSavings >= 0 ? 'text-green-600' : 'text-red-600'">
          {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(store.netSavings) }}
        </p>
      </div>
    </div>

    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Expense Breakdown</h2>
        <ExpensesChart />
      </div>

      <div class="bg-white p-6 rounded-lg shadow-md">
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Spending Trends</h2>
        <SpendingTrendsChart />
      </div>
    </div>
  </div>
</template>