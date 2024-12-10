<script setup>
import { computed } from 'vue'
import { Pie } from 'vue-chartjs'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useTransactionStore } from '../../stores/transaction'

ChartJS.register(ArcElement, Tooltip, Legend)

const store = useTransactionStore()

const chartData = computed(() => {
  const expenses = store.transactions.filter(t => t.type === 'EXPENSE')
  const categoryTotals = {}

  expenses.forEach(expense => {
    const category = store.categories.find(c => c.id === expense.categoryId)
    if (category) {
      categoryTotals[category.name] = (categoryTotals[category.name] || 0) + expense.amount
    }
  })

  return {
    labels: Object.keys(categoryTotals),
    datasets: [{
      data: Object.values(categoryTotals),
      backgroundColor: [
        '#FF6384',
        '#36A2EB',
        '#FFCE56',
        '#4BC0C0',
        '#9966FF',
        '#FF9F40'
      ]
    }]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false
}
</script>

<template>
  <div class="h-[300px]">
    <Pie
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>