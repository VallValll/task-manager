<template>
  <div class="todo">
    <div class="todo__container">
      <TodoInput />
      <TodoFilters />
      <TodoList
        :filtered-todos="filteredTodos"
        :is-loading="pending"
        :is-error="Boolean(error)"
        :error-message="error?.message"
      />
      <TodoFooter />
    </div>
    <ErrorPopup />
  </div>
</template>

<script setup lang="ts">
import { useTodos } from '~/composables/useTodos';
import ErrorPopup from '~/components/Todo/ErrorPopup.vue';

const { filteredTodos, pending, error } = useTodos();
</script>

<style lang="scss">
@import url('index.scss');
</style>
