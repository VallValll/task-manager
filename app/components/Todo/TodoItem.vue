<template>
  <div :data-id="todo.id" :class="['todo-item', { completed: todo.completed }]">
    <div class="left">
      <input type="checkbox" :checked="todo.completed" />
      <span class="todo-text">{{ todo.title }}</span>
    </div>
    <button class="delete-btn" @click="deleteT(todo.id)">x</button>
  </div>
</template>

<script setup lang="ts">
import type { TodoItem as TodoItemType } from '~~/types/todo';
import { useTodos } from '~/composables/useTodos';

const { deleteTodo } = useTodos();

const deleteT = async (id: string) => {
  await deleteTodo(id);
};

defineProps<{
  todo: TodoItemType;
}>();
</script>
