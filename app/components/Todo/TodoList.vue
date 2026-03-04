<template>
  <div class="todo-list">
    <Transition name="todo-list-state" mode="out-in">
      <span v-if="isError" key="error" class="todo-list__empty is-error">
        Не удалось загрузить задачи
      </span>
      <span v-else-if="isLoading" key="loading" class="todo-list__empty">Загрузка...</span>
      <span v-else-if="isEmpty" :key="`empty-${storeTodo.filter}`" class="todo-list__empty">
        {{ emptyMessage }}
      </span>
      <TransitionGroup v-else key="list" name="todo-item" tag="div" class="todo-list__item">
        <TodoItem v-for="item in filteredTodos" :key="item.id" :todo="item" />
      </TransitionGroup>
    </Transition>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

import { useTodoStore } from '~/stores/todoStore';
import type { TodoItem } from '~~/types/todo';

const storeTodo = useTodoStore();

const props = defineProps<{
  filteredTodos: TodoItem[];
  isLoading: boolean;
  isError: boolean;
  errorMessage?: string;
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
