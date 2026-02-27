<template>
  <div class="todo-list">
    <div class="todo-list__item">
      <TodoItem v-for="item in todoList" :key="item.id" :todo="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type { TodoItem } from '~~/types/todo';

defineProps<{
  todoList: TodoItem[];
}>();
</script>
