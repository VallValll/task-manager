<template>
  <div class="todo">
    <div class="todo__container">
      <TodoInput />
      <TodoFilters />
      <TodoList :filtered-todos="filteredTodos" />
      <TodoFooter />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';

import { useTodos } from '~/composables/useTodos';

const { filteredTodos, listTodos } = useTodos();
onMounted(listTodos);
</script>

<style lang="scss">
@import url('index.scss');
</style>
