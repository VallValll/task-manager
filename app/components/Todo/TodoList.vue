<template>
  <div class="todo-list">
    <span v-if="!todoList.length" class="todo-list__empty">Задач пока что нет, создайте новую</span>
    <div v-else class="todo-list__item">
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
