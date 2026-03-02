<template>
  <div class="filters">
    <button
      v-for="filter in filters"
      :key="filter"
      class="filter"
      :class="{ active: storeTodo.filter === filter }"
      @click="changeFilter(filter)"
    >
      {{ filter }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '~/stores/todoStore';
import type { TodoFilter } from '~~/types/todo';

const storeTodo = useTodoStore();

const filters: TodoFilter[] = ['all', 'active', 'completed'];

const changeFilter = (filter: TodoFilter) => {
  storeTodo.filter = filter;
};
</script>
