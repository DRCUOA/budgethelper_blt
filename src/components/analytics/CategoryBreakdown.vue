<template>
  <div class="card">
    <h3 class="text-lg font-medium mb-4">Expense Breakdown by Category</h3>
    <div class="h-80">
      <Doughnut
        v-if="chartData"
        :data="chartData"
        :options="chartOptions"
      />
    </div>
    <div class="mt-4 space-y-2">
      <div v-for="category in sortedCategories" :key="category.id" class="flex justify-between items-center">
        <div class="flex items-center">
          <div
            class="w-3 h-3 rounded-full mr-2"
            :style="{ backgroundColor: category.color }"
          ></div>
          <span>{{ category.name }}</span>
        </div>
        <div class="text-right">
          <div class="font-medium">{{ formatCurrency(category.amount) }}</div>
          <div class="text-sm text-gray-500">{{ formatPercentage(category.percentage) }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';
import { formatCurrency, formatPercentage } from '../../utils/formatters';

ChartJS.register(ArcElement, Tooltip, Legend);

const props = defineProps({
  categories: {
    type: Array,
    required: true
  }
});

const chartColors = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#6366F1',
  '#EC4899', '#8B5CF6', '#14B8A6', '#F97316', '#06B6D4'
];

const sortedCategories = computed(() => {
  return [...props.categories]
    .sort((a, b) => b.amount - a.amount)
    .map((category, index) => ({
      ...category,
      color: chartColors[index % chartColors.length]
    }));
});

const chartData = computed(() => ({
  labels: sortedCategories.value.map(c => c.name),
  datasets: [{
    data: sortedCategories.value.map(c => c.amount),
    backgroundColor: sortedCategories.value.map(c => c.color),
    borderWidth: 0
  }]
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const value = context.raw;
          const total = context.dataset.data.reduce((a, b) => a + b, 0);
          const percentage = (value / total) * 100;
          return `${formatCurrency(value)} (${percentage.toFixed(1)}%)`;
        }
      }
    }
  }
};</script>