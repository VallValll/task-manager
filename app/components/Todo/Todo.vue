<template>
  <div class="todo">
    <div class="todo__container">
      <TodoInput />
      <TodoFilters />
      <TodoList
        :filtered-todos="filteredTodos"
        :is-loading="pending && !isInitialized"
        :is-error="Boolean(error)"
        :error-message="error?.message"
      />
      <TodoFooter />
    </div>
    <ErrorPopup />
  </div>
</template>

<script setup lang="ts">
import { onMounted, onServerPrefetch } from 'vue';

import { useTodos } from '~/composables/useTodos';
import ErrorPopup from '~/components/Todo/ErrorPopup.vue';

const { filteredTodos, pending, error, listTodos, isInitialized } = useTodos();

const loadTodos = async () => {
  if (filteredTodos.value.length || pending.value) return;
  try {
    await listTodos();
  } catch {
    // Error state is stored in composable and shown in TodoList.
  }
};

onServerPrefetch(loadTodos);
onMounted(loadTodos);
</script>

<style lang="scss">
@import url('index.scss');
</style>
