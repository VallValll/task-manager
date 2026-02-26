<template>
  <div class="todo-list">
    <TodoItem v-for="item in todoList" :key="item.id" :todo="item" />
  </div>
</template>

<script setup lang="ts">
import type { TodoItem } from '~~/types/todo';

defineProps<{
  todoList: TodoItem[];
}>();
</script>
