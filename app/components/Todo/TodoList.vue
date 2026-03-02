<template>
  <div class="todo-list">
    <span v-if="isEmpty" class="todo-list__empty">{{ emptyMessage }}</span>
    <div v-else class="todo-list__item">
      <TodoItem v-for="item in filteredTodos" :key="item.id" :todo="item" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useTodoStore } from '~/stores/todoStore';
import type { TodoItem } from '~~/types/todo';

const storeTodo = useTodoStore();

const props = defineProps<{
  filteredTodos: TodoItem[];
}>();

const isEmpty = computed(() => props.filteredTodos.length === 0);

const emptyMessage = computed(() => {
  if (storeTodo.filter === 'active') {
    return 'У вас нет активных задач';
  }
  if (storeTodo.filter === 'completed') {
    return 'У вас нет завершенных задач';
  }
  return 'Задач пока что нет, создайте новую';
});
</script>
