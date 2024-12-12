<template>
  <div class="card">
    <h3 class="text-lg font-medium mb-4">Monthly Trends</h3>
    <div class="h-80">
      <Line
        v-if="chartData"
        :data="chartData"
        :options="chartOptions"
      />
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from 'chart.js';
import { Line } from 'vue-chartjs';
import { formatCurrency } from '../../utils/formatters';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const props = defineProps({
  data: {
    type: Array,
    required: true
  }
});

const chartData = computed(() => ({
  labels: props.data.map(d => d.month),
  datasets: [
    {
      label: 'Income',
      data: props.data.map(d => d.income),
      borderColor: '#10B981',
      backgroundColor: '#10B98120',
      fill: true
    },
    {
      label: 'Expenses',
      data: props.data.map(d => d.expenses),
      borderColor: '#EF4444',
      backgroundColor: '#EF444420',
      fill: true
    }
  ]
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top'
    },
    tooltip: {
      callbacks: {
        label: (context) => {
          const label = context.dataset.label;
          const value = formatCurrency(context.raw);
          return `${label}: ${value}`;
        }
      }
    }
  },
  scales: {
    y: {
      ticks: {
        callback: (value) => formatCurrency(value)
      }
    }
  }
};</script>