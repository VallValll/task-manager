<template>
  <div class="todo-input">
    <div class="input-wrap">
      <input
        ref="inputRef"
        v-model="newTitle"
        type="text"
        placeholder="What needs to be done?"
        class="input"
        :class="{ error: !!error }"
        @keydown.enter.prevent="createTodo"
      />
      <span v-if="error" class="input-error">{{ error }}</span>
    </div>
    <button class="create-btn" @click="createTodo">Create</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import { useTodos } from '~/composables/useTodos';

const { addTodo } = useTodos();
const inputRef = ref<HTMLInputElement | null>(null);
const newTitle = ref('');
const error = ref('');

const validate = () => {
  const value = newTitle.value.trim();

  if (!value) {
    error.value = 'Введите название задачи';
    return false;
  }

  if (value.length > 30) {
    error.value = 'Максимальная длина заголовка 30 символов';
    return false;
  }

  error.value = '';
  return true;
};

const createTodo = async () => {
  if (!validate()) return;

  await addTodo(newTitle.value.trim());
  newTitle.value = '';
  inputRef.value?.focus();
};
</script>
