<script setup>
import { computed } from 'vue'
import { Line } from 'vue-chartjs'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js'
import { useTransactionStore } from '../../stores/transaction'

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
)

const store = useTransactionStore()

const chartData = computed(() => {
  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - i)
    return date
  }).reverse()

  const monthLabels = last6Months.map(date => 
    date.toLocaleString('default', { month: 'short' })
  )

  const incomeData = last6Months.map(date => {
    const monthTransactions = store.transactions.filter(t => 
      t.type === 'INCOME' &&
      new Date(t.date).getMonth() === date.getMonth() &&
      new Date(t.date).getFullYear() === date.getFullYear()
    )
    return monthTransactions.reduce((sum, t) => sum + t.amount, 0)
  })

  const expenseData = last6Months.map(date => {
    const monthTransactions = store.transactions.filter(t => 
      t.type === 'EXPENSE' &&
      new Date(t.date).getMonth() === date.getMonth() &&
      new Date(t.date).getFullYear() === date.getFullYear()
    )
    return monthTransactions.reduce((sum, t) => sum + t.amount, 0)
  })

  return {
    labels: monthLabels,
    datasets: [
      {
        label: 'Income',
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        data: incomeData,
        fill: true,
        tension: 0.4
      },
      {
        label: 'Expenses',
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        data: expenseData,
        fill: true,
        tension: 0.4
      }
    ]
  }
})

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top'
    },
    title: {
      display: true,
      text: 'Income vs Expenses (Last 6 Months)'
    }
  },
  scales: {
    y: {
      beginAtZero: true,
      ticks: {
        callback: value => new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'USD',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0
        }).format(value)
      }
    }
  }
}
</script>

<template>
  <div class="h-[400px]">
    <Line
      :data="chartData"
      :options="chartOptions"
    />
  </div>
</template>