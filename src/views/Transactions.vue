<script setup>
import { onMounted } from 'vue'
import { useTransactionStore } from '../stores/transaction'
import TransactionForm from '../components/transactions/TransactionForm.vue'
import TransactionList from '../components/transactions/TransactionList.vue'

const store = useTransactionStore()

onMounted(async () => {
  await Promise.all([
    store.fetchTransactions(),
    store.fetchCategories()
  ])
})

const handleAddTransaction = async (transaction) => {
  await store.addTransaction(transaction)
}
</script>

<template>
  <div class="space-y-8">
    <h1 class="text-2xl font-bold text-gray-900">Transactions</h1>
    
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div>
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Add Transaction</h2>
        <TransactionForm :onSubmit="handleAddTransaction" />
      </div>
      
      <div>
        <h2 class="text-xl font-semibold text-gray-900 mb-4">Monthly Summary</h2>
        <div class="bg-white p-6 rounded-lg shadow-md space-y-4">
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Income:</span>
            <span class="text-green-600 font-semibold">
              {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(store.monthlyTotal('INCOME')) }}
            </span>
          </div>
          <div class="flex justify-between items-center">
            <span class="text-gray-600">Expenses:</span>
            <span class="text-red-600 font-semibold">
              {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(store.monthlyTotal('EXPENSE')) }}
            </span>
          </div>
          <div class="pt-4 border-t">
            <div class="flex justify-between items-center">
              <span class="text-gray-600">Net Savings:</span>
              <span :class="store.netSavings >= 0 ? 'text-green-600' : 'text-red-600'" class="font-bold">
                {{ new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(store.netSavings) }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h2 class="text-xl font-semibold text-gray-900 mb-4">Transaction History</h2>
      <TransactionList />
    </div>
  </div>
</template>