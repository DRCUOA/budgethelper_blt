<template>
  <div class="space-y-4">
    <div class="overflow-x-auto">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th
              v-for="(column, index) in columns"
              :key="index"
              class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              {{ column }}
            </th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <tr v-for="(row, rowIndex) in previewData" :key="rowIndex">
            <td
              v-for="(value, colIndex) in row"
              :key="colIndex"
              class="px-6 py-4 whitespace-nowrap text-sm text-gray-900"
            >
              {{ value }}
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="flex justify-end space-x-2">
      <button @click="$emit('back')" class="btn btn-secondary">
        Back
      </button>
      <button @click="$emit('next')" class="btn btn-primary">
        Next
      </button>
    </div>
  </div>
</template>

<script setup>
defineProps({
  columns: {
    type: Array,
    required: true
  },
  previewData: {
    type: Array,
    required: true
  }
});

defineEmits(['back', 'next']);
</script>