<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Transactions</h1>

    <TransactionList
      :transactions="transactionsStore.items"
      @new="showForm = true"
      @edit="editTransaction"
      @delete="deleteTransaction"
      @filter-change="handleFilterChange"
    />

    <Modal v-if="showForm" @close="closeForm">
      <template #title>
        {{ selectedTransaction ? 'Edit Transaction' : 'New Transaction' }}
      </template>
      <TransactionForm
        :transaction="selectedTransaction"
        @submit="handleSubmit"
        @cancel="closeForm"
      />
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useTransactionsStore } from '../stores/transactions';
import TransactionList from '../components/transactions/TransactionList.vue';
import TransactionForm from '../components/transactions/TransactionForm.vue';
import Modal from '../components/shared/Modal.vue';

const transactionsStore = useTransactionsStore();
const showForm = ref(false);
const selectedTransaction = ref(null);

onMounted(() => {
  transactionsStore.fetchTransactions();
});

const handleFilterChange = (filters) => {
  transactionsStore.setFilters(filters);
  transactionsStore.fetchTransactions();
};

const handleSubmit = async (formData) => {
  try {
    if (selectedTransaction.value) {
      await transactionsStore.updateTransaction(selectedTransaction.value.id, formData);
    } else {
      await transactionsStore.createTransaction(formData);
    }
    closeForm();
  } catch (error) {
    console.error('Failed to save transaction:', error);
  }
};

const editTransaction = (transaction) => {
  selectedTransaction.value = transaction;
  showForm.value = true;
};

const deleteTransaction = async (id) => {
  if (confirm('Are you sure you want to delete this transaction?')) {
    try {
      await transactionsStore.deleteTransaction(id);
    } catch (error) {
      console.error('Failed to delete transaction:', error);
    }
  }
};

const closeForm = () => {
  showForm.value = false;
  selectedTransaction.value = null;
};
</script>