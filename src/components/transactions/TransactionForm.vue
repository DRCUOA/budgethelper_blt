<script setup>
import { ref } from 'vue'
import { useTransactionStore } from '../../stores/transaction'
import InputField from '../forms/InputField.vue'

const props = defineProps({
  onSubmit: {
    type: Function,
    required: true
  }
})

const store = useTransactionStore()
const type = ref('EXPENSE')
const amount = ref('')
const description = ref('')
const categoryId = ref('')
const error = ref('')

const handleSubmit = async () => {
  try {
    error.value = ''
    if (!amount.value || !description.value || !categoryId.value) {
      error.value = 'Please fill in all fields'
      return
    }

    await props.onSubmit({
      type: type.value,
      amount: parseFloat(amount.value),
      description: description.value,
      categoryId: parseInt(categoryId.value),
      date: new Date()
    })

    // Reset form
    type.value = 'EXPENSE'
    amount.value = ''
    description.value = ''
    categoryId.value = ''
  } catch (err) {
    error.value = 'Failed to add transaction'
  }
}
</script>

<template>
  <form @submit.prevent="handleSubmit" class="bg-white p-6 rounded-lg shadow-md">
    <div class="grid grid-cols-1 gap-4">
      <div class="flex items-center space-x-4">
        <label class="inline-flex items-center">
          <input
            type="radio"
            v-model="type"
            value="EXPENSE"
            class="form-radio text-indigo-600"
          >
          <span class="ml-2">Expense</span>
        </label>
        <label class="inline-flex items-center">
          <input
            type="radio"
            v-model="type"
            value="INCOME"
            class="form-radio text-indigo-600"
          >
          <span class="ml-2">Income</span>
        </label>
      </div>

      <InputField
        v-model="amount"
        label="Amount"
        type="number"
        step="0.01"
      />

      <InputField
        v-model="description"
        label="Description"
      />

      <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2">
          Category
        </label>
        <select
          v-model="categoryId"
          class="shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select a category</option>
          <option
            v-for="category in store.categories"
            :key="category.id"
            :value="category.id"
          >
            {{ category.name }}
          </option>
        </select>
      </div>

      <div v-if="error" class="text-red-500 text-sm">
        {{ error }}
      </div>

      <button
        type="submit"
        class="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add Transaction
      </button>
    </div>
  </form>
</template>