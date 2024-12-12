<template>
  <div class="space-y-6">
    <h1 class="text-2xl font-bold">Categories</h1>

    <CategoryList
      :categories="categoriesStore.items"
      @new="showForm = true"
      @edit="editCategory"
      @delete="deleteCategory"
    />

    <Modal v-if="showForm" @close="closeForm">
      <template #title>
        {{ selectedCategory ? 'Edit Category' : 'New Category' }}
      </template>
      <CategoryForm
        :category="selectedCategory"
        @submit="handleSubmit"
        @cancel="closeForm"
      />
    </Modal>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useCategoriesStore } from '../stores/categories';
import CategoryList from '../components/categories/CategoryList.vue';
import CategoryForm from '../components/categories/CategoryForm.vue';
import Modal from '../components/shared/Modal.vue';

const categoriesStore = useCategoriesStore();
const showForm = ref(false);
const selectedCategory = ref(null);

onMounted(async () => {
  if (!categoriesStore.items.length) {
    await categoriesStore.fetchCategories();
  }
});

const handleSubmit = async (formData) => {
  try {
    if (selectedCategory.value) {
      await categoriesStore.updateCategory(selectedCategory.value.id, formData);
    } else {
      await categoriesStore.createCategory(formData);
    }
    closeForm();
  } catch (error) {
    console.error('Failed to save category:', error);
  }
};

const editCategory = (category) => {
  selectedCategory.value = category;
  showForm.value = true;
};

const deleteCategory = async (id) => {
  try {
    await categoriesStore.deleteCategory(id);
  } catch (error) {
    console.error('Failed to delete category:', error);
  }
};

const closeForm = () => {
  showForm.value = false;
  selectedCategory.value = null;
};
</script>