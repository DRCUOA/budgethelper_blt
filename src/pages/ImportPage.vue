<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Import Transactions</h1>

    <div class="card">
      <div v-if="step === 'upload'" class="space-y-4">
        <div class="flex items-center justify-center w-full">
          <label class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
            <div class="flex flex-col items-center justify-center pt-5 pb-6">
              <svg class="w-8 h-8 mb-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
              </svg>
              <p class="mb-2 text-sm text-gray-500">
                <span class="font-semibold">Click to upload</span> or drag and drop
              </p>
              <p class="text-xs text-gray-500">CSV file only</p>
            </div>
            <input
              type="file"
              class="hidden"
              accept=".csv"
              @change="handleFileUpload"
            />
          </label>
        </div>
        <div v-if="error" class="text-red-600 text-sm">{{ error }}</div>
      </div>

      <div v-else-if="step === 'preview'" class="space-y-4">
        <h2 class="text-lg font-medium">Preview Data</h2>
        <CSVPreview
          :columns="columns"
          :preview-data="previewData"
          @back="step = 'upload'"
          @next="step = 'mapping'"
        />
      </div>

      <div v-else-if="step === 'mapping'" class="space-y-4">
        <h2 class="text-lg font-medium">Map Columns</h2>
        <CSVMappingForm
          :columns="columns"
          @back="step = 'preview'"
          @submit="handleImport"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import Papa from 'papaparse';
import { useTransactionsStore } from '../stores/transactions';
import CSVPreview from '../components/import/CSVPreview.vue';
import CSVMappingForm from '../components/import/CSVMappingForm.vue';

const transactionsStore = useTransactionsStore();
const step = ref('upload');
const error = ref('');
const columns = ref([]);
const previewData = ref([]);
const parsedData = ref([]);

const handleFileUpload = (event) => {
  const file = event.target.files[0];
  if (!file) return;

  if (file.type !== 'text/csv') {
    error.value = 'Please upload a CSV file';
    return;
  }

  Papa.parse(file, {
    complete: (results) => {
      if (results.errors.length) {
        error.value = 'Error parsing CSV file';
        return;
      }

      columns.value = results.data[0];
      parsedData.value = results.data.slice(1);
      previewData.value = parsedData.value.slice(0, 5);
      step.value = 'preview';
      error.value = '';
    },
    header: true,
    skipEmptyLines: true
  });
};

const handleImport = async (mappings) => {
  try {
    const transformedData = parsedData.value.map(row => ({
      date: row[mappings.date],
      description: row[mappings.description],
      amount: parseFloat(row[mappings.amount]),
      type: row[mappings.type].toLowerCase(),
      categoryName: row[mappings.category]
    }));

    await transactionsStore.importTransactions(transformedData);
    step.value = 'upload';
    error.value = '';
  } catch (err) {
    error.value = err.message;
  }
};
</script>