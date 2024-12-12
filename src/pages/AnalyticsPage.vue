<template>
  <div class="space-y-6">
    <div class="flex justify-between items-center">
      <h1 class="text-2xl font-bold">Analytics</h1>
      <input
        type="month"
        v-model="selectedMonth"
        class="input max-w-xs"
        @change="fetchData"
      />
    </div>

    <div v-if="analyticsStore.loading" class="text-center py-8">
      <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
    </div>

    <template v-else>
      <MonthlySummary
        v-if="analyticsStore.monthlySummary"
        :summary="analyticsStore.monthlySummary"
      />

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryBreakdown
          v-if="analyticsStore.categoryBreakdown.length"
          :categories="analyticsStore.categoryBreakdown"
        />
        <TrendChart
          v-if="trendData.length"
          :data="trendData"
        />
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useAnalyticsStore } from '../stores/analytics';
import MonthlySummary from '../components/analytics/MonthlySummary.vue';
import CategoryBreakdown from '../components/analytics/CategoryBreakdown.vue';
import TrendChart from '../components/analytics/TrendChart.vue';

const analyticsStore = useAnalyticsStore();
const selectedMonth = ref(new Date().toISOString().slice(0, 7));
const trendData = ref([]);

const fetchData = async () => {
  try {
    await Promise.all([
      analyticsStore.fetchMonthlySummary(selectedMonth.value),
      analyticsStore.fetchCategoryBreakdown(selectedMonth.value)
    ]);
  } catch (error) {
    console.error('Failed to fetch analytics data:', error);
  }
};

onMounted(() => {
  fetchData();
});</script>