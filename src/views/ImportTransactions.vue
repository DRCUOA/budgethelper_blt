<script setup>
import { ref } from 'vue'
import Papa from 'papaparse'
import { useTransactionStore } from '../stores/transaction'

const store = useTransactionStore()
const file = ref(null)
const parsedData = ref([])
const mappings = ref({
  type: '',
  amount: '',
  description: '',
  category: '',
  date: ''
})
const headers = ref([])
const error = ref('')
const importing = ref(false)

const handleFileUpload = (event) => {
  const uploadedFile = event.target.files[0]
  if (!uploadedFile) return

  Papa.parse(uploadedFile, {
    complete: (results) => {
      headers.value = results.data[0]
      parsedData.value = results.data.slice(1).filter(row => row.some(cell => cell))
    },
    header: false
  })
}

const importTransactions = async () => {
  try {
    importing.value = true
    error.value = ''

    // Validate mappings
    if (!mappings.value.type || !mappings.value.amount || !mappings.value.description || !mappings.value.category) {
      error.value = 'Please map all required fields'
      return
    }

    const transactions = parsedData.value.map(row => ({
      type: row[headers.value.indexOf(mappings.value.type)].toUpperCase(),
      amount: parseFloat(row[headers.value.indexOf(mappings.value.amount)]),
      description: row[headers.value.indexOf(mappings.value.description)],
      categoryId: store.categories.find(c => 
        c.name.toLowerCase() === row[headers.value.indexOf(mappings.value.category)].toLowerCase()
      )?.id,
      date: mappings.value.date ? new Date(row[headers.value.indexOf(mappings.value.date)]) : new Date()
    }))

    // Filter out invalid transactions
    const validTransactions = transactions.filter(t => 
      !isNaN(t.amount) && 
      t.categoryId && 
      (t.type === 'INCOME' || t.type === 'EXPENSE')
    )

    // Import transactions
    for (const transaction of validTransactions) {
      await store.addTransaction(transaction)
    }

    // Reset form
    file.value = null
    parsedData.value = []
    headers.value = []
    error.value = ''
  } catch (err) {
    error.value = 'Failed to import transactions'
  } finally {
    importing.value = false
  }
}
</script>

<template>
  <div class="space-y-8">
    <h1 class="text-2xl font-bold text-gray-900">Import Transactions</h1>

    <div class="bg-white p-6 rounded-lg shadow-md">
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700">Upload CSV File</label>
        <input
          type="file"
          accept=".csv"
          @change="handleFileUpload"
          class="mt-1 block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-semibold
            file:bg-indigo-50 file:text-indigo-700
            hover:file:bg-indigo-100"
        >
      </div>

      <div v-if="headers.length > 0" class="space-y-6">
        <div>
          <h3 class="text-lg font-medium text-gray-900 mb-4">Map CSV Columns</h3>
          
          <div class="grid grid-cols-1 gap-4">
            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Type Column (INCOME/EXPENSE)</label>
              <select v-model="mappings.type" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">Select column</option>
                <option v-for="header in headers" :key="header" :value="header">{{ header }}</option>
              </select>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Amount Column</label>
              <select v-model="mappings.amount" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">Select column</option>
                <option v-for="header in headers" :key="header" :value="header">{{ header }}</option>
              </select>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Description Column</label>
              <select v-model="mappings.description" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">Select column</option>
                <option v-for="header in headers" :key="header" :value="header">{{ header }}</option>
              </select>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Category Column</label>
              <select v-model="mappings.category" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">Select column</option>
                <option v-for="header in headers" :key="header" :value="header">{{ header }}</option>
              </select>
            </div>

            <div class="space-y-2">
              <label class="block text-sm font-medium text-gray-700">Date Column (Optional)</label>
              <select v-model="mappings.date" class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                <option value="">Select column</option>
                <option v-for="header in headers" :key="header" :value="header">{{ header }}</option>
              </select>
            </div>
          </div>
        </div>

        <div v-if="parsedData.length > 0" class="space-y-4">
          <h3 class="text-lg font-medium text-gray-900">Preview</h3>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th v-for="header in headers" :key="header" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    {{ header }}
                  </th>
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(row, index) in parsedData.slice(0, 5)" :key="index">
                  <td v-for="(cell, cellIndex) in row" :key="cellIndex" class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {{ cell }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <p class="text-sm text-gray-500">Showing first 5 rows of {{ parsedData.length }} total rows</p>
        </div>

        <div v-if="error" class="text-red-500 text-sm">
          {{ error }}
        </div>

        <button
          @click="importTransactions"
          :disabled="importing"
          class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
        >
          {{ importing ? 'Importing...' : 'Import Transactions' }}
        </button>
      </div>
    </div>
  </div>
</template>