<template>
  <div :data-id="todo.id" :class="['todo-item', { completed: todo.completed }]">
    <div class="left">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="changeTodoItem('completed', todo)"
      />
      <div v-if="isEdit" class="edit-input-wrap">
        <input
          v-model="newTitle"
          type="text"
          class="edit-input"
          :class="{ error: !!editError }"
          @input="clearEditError"
          @keydown.enter.prevent="changeTodoItem('title', todo)"
        />
        <span v-if="editError" class="edit-input-error">{{ editError }}</span>
      </div>
      <span v-else class="todo-text">{{ todo.title }}</span>
    </div>
    <div class="right">
      <button
        class="edit-btn"
        @click.stop="isEdit ? changeTodoItem('title', todo) : changeTodoTitle(todo)"
      >
        {{ isEdit ? '✅' : '🖊' }}
      </button>
      <button class="delete-btn" @click.stop="deleteT(todo.id)">❌</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { TodoItem as TodoItemType } from '~~/types/todo';
import { useTodos } from '~/composables/useTodos';

const { deleteTodo, changeTodo } = useTodos();
let isEdit = ref(false);
let newTitle = ref('');
let editError = ref('');

const deleteT = async (id: string) => {
  await deleteTodo([id]);
};

const changeTodoItem = async (field: string, todo: TodoItemType) => {
  if (field === 'title') {
    if (!validateEditTitle()) return;

    isEdit.value = false;

    await changeTodo(todo.id, { title: newTitle.value.trim() });
  }

  if (field === 'completed') {
    await changeTodo(todo.id, { completed: !todo.completed });
  }
};

const changeTodoTitle = async (todo: TodoItemType) => {
  isEdit.value = !isEdit.value;
  newTitle.value = todo.title;
  editError.value = '';
};

const clearEditError = () => {
  if (!editError.value) return;
  editError.value = '';
};

const validateEditTitle = () => {
  const value = newTitle.value.trim();

  if (!value) {
    editError.value = 'Введите название задачи';
    return false;
  }

  if (value.length > 30) {
    editError.value = 'Максимальная длина заголовка 30 символов';
    return false;
  }

  editError.value = '';
  return true;
};

defineProps<{
  todo: TodoItemType;
}>();
</script>
