<template>
  <div class="todo-input">
    <TheInput
      v-model="newTitle"
      :error="error"
      :is-submitting="isSubmitting"
      :placeholder="TODO_CREATE_PLACEHOLDER"
      @submit="createTodo"
    />
    <button
      class="create-btn"
      :disabled="isSubmitting"
      :aria-busy="isSubmitting"
      @click="createTodo"
    >
      <span v-if="isSubmitting" class="btn-spinner" aria-hidden="true"></span>
      <span v-else>Create</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import TheInput from './TheInput.vue';
import { TODO_CREATE_PLACEHOLDER, getTodoTitleError } from './constants';

import { useTodos } from '~/composables/useTodos';

const { addTodo } = useTodos();
const newTitle = ref('');
const error = ref('');
const isSubmitting = ref(false);

const validate = () => {
  error.value = getTodoTitleError(newTitle.value);
  return !error.value;
};

const createTodo = async () => {
  if (isSubmitting.value) return;
  if (!validate()) return;

  try {
    isSubmitting.value = true;
    await addTodo(newTitle.value.trim());
    newTitle.value = '';
    console.log('test');
  } catch (err) {
    console.error(err);
  } finally {
    isSubmitting.value = false;
  }
};
</script>
