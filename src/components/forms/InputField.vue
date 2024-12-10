<script setup>
defineProps({
  modelValue: {
    type: [String, Number],
    required: true
  },
  label: {
    type: String,
    required: true
  },
  type: {
    type: String,
    default: 'text'
  },
  error: {
    type: String,
    default: ''
  }
})

defineEmits(['update:modelValue'])
</script>

<template>
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2">
      {{ label }}
    </label>
    <input
      :type="type"
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      :class="{ 'border-red-500': error }"
    >
    <p v-if="error" class="text-red-500 text-xs italic">{{ error }}</p>
  </div>
</template>