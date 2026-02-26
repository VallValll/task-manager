<template>
  <div :class="['todo-item', { completed: todo.completed }]">
    <div class="left">
      <input type="checkbox" :checked="todo.completed" />
      <span class="todo-text">{{ todo.title }}</span>
    </div>
    <button class="delete-btn">x</button>
  </div>
</template>

<script setup lang="ts">
import type { TodoItem as TodoItemType } from '~~/types/todo';

defineProps<{
  todo: TodoItemType;
}>();
</script>
