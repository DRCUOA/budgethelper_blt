<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <div class="card bg-green-50">
      <h3 class="text-lg font-medium text-green-800">Total Income</h3>
      <p class="mt-2 text-2xl font-bold text-green-600">
        {{ formatCurrency(summary.totalIncome) }}
      </p>
    </div>
    
    <div class="card bg-red-50">
      <h3 class="text-lg font-medium text-red-800">Total Expenses</h3>
      <p class="mt-2 text-2xl font-bold text-red-600">
        {{ formatCurrency(summary.totalExpenses) }}
      </p>
    </div>
    
    <div class="card" :class="summary.netSavings >= 0 ? 'bg-blue-50' : 'bg-yellow-50'">
      <h3 class="text-lg font-medium" :class="summary.netSavings >= 0 ? 'text-blue-800' : 'text-yellow-800'">
        Net Savings
      </h3>
      <p class="mt-2 text-2xl font-bold" :class="summary.netSavings >= 0 ? 'text-blue-600' : 'text-yellow-600'">
        {{ formatCurrency(summary.netSavings) }}
      </p>
      <p class="mt-1 text-sm" :class="summary.netSavings >= 0 ? 'text-blue-600' : 'text-yellow-600'">
        Savings Rate: {{ formatPercentage(summary.savingsRate) }}
      </p>
    </div>
  </div>
</template>

<script setup>
import { formatCurrency, formatPercentage } from '../../utils/formatters';

defineProps({
  summary: {
    type: Object,
    required: true
  }
});
</script>