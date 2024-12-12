<template>
  <div class="space-y-4">
    <div class="grid grid-cols-2 gap-4">
      <div v-for="field in requiredFields" :key="field.key" class="space-y-2">
        <label class="block text-sm font-medium text-gray-700">
          {{ field.label }}
        </label>
        <select v-model="mappings[field.key]" class="input">
          <option value="">Select column</option>
          <option v-for="(column, index) in columns" :key="index" :value="index">
            {{ column }}
          </option>
        </select>
      </div>
    </div>

    <div class="flex justify-end space-x-2">
      <button @click="$emit('back')" class="btn btn-secondary">
        Back
      </button>
      <button
        @click="handleSubmit"
        class="btn btn-primary"
        :disabled="!isValid"
      >
        Import
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
  columns: {
    type: Array,
    required: true
  }
});

const emit = defineEmits(['back', 'submit']);

const requiredFields = [
  { key: 'date', label: 'Date' },
  { key: 'description', label: 'Description' },
  { key: 'amount', label: 'Amount' },
  { key: 'type', label: 'Type' },
  { key: 'category', label: 'Category' }
];

const mappings = ref({});

const isValid = computed(() => {
  return requiredFields.every(field => mappings.value[field.key] !== undefined);
});

const handleSubmit = () => {
  emit('submit', mappings.value);
};
</script>