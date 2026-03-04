<template>
  <div :data-id="todo.id" :class="['todo-item', { completed: todo.completed }]">
    <div class="left">
      <input
        type="checkbox"
        :checked="todo.completed"
        @change="changeTodoItem('completed', todo)"
      />
      <TheInput
        v-if="isEdit"
        v-model="newTitle"
        :error="editError"
        :is-submitting="isEditSubmitting"
        :placeholder="TODO_EDIT_PLACEHOLDER"
        @submit="changeTodoItem('title', todo)"
      />
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
import { ref, watch } from 'vue';

import TheInput from './TheInput.vue';
import { TODO_EDIT_PLACEHOLDER, getTodoTitleError } from './constants';

import type { TodoItem as TodoItemType } from '~~/types/todo';
import { useTodos } from '~/composables/useTodos';

const { deleteTodo, changeTodo } = useTodos();
let isEdit = ref(false);
let newTitle = ref('');
let editError = ref('');
let isEditSubmitting = ref(false);

const deleteT = async (id: string) => {
  await deleteTodo([id]);
};

const changeTodoItem = async (field: string, todo: TodoItemType) => {
  if (field === 'title') {
    if (!validateEditTitle()) return;

    try {
      isEditSubmitting.value = true;
      await changeTodo(todo.id, { title: newTitle.value.trim() });
      isEdit.value = false;
    } finally {
      isEditSubmitting.value = false;
    }
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

const validateEditTitle = () => {
  editError.value = getTodoTitleError(newTitle.value);
  return !editError.value;
};

watch(newTitle, () => {
  if (!editError.value) return;
  editError.value = '';
});

defineProps<{
  todo: TodoItemType;
}>();
</script>
