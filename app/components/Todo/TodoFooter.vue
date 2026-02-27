<template>
  <div class="footer">
    <span>{{ totalTodos }} tasks total</span>
    <button class="clear-btn" :disabled="!completedTodosId.length" @click="clearTodos">
      Clear completed
    </button>
  </div>
</template>

<script setup lang="ts">
import { useTodos } from '~/composables/useTodos';

const { totalTodos, deleteTodo, completedTodosId } = useTodos();

const clearTodos = async () => {
  if (!completedTodosId.value.length) return;

  await deleteTodo(completedTodosId.value);
};
</script>
