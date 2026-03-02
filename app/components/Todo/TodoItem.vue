<template>
  <div
    :data-id="todo.id"
    :class="['todo-item', { completed: todo.completed }]"
    @click="changeTodoCompleted(todo)"
  >
    <div class="left">
      <input type="checkbox" :checked="todo.completed" />
      <span class="todo-text">{{ todo.title }}</span>
    </div>
    <button class="delete-btn" @click.stop="deleteT(todo.id)">x</button>
  </div>
</template>

<script setup lang="ts">
import type { TodoItem as TodoItemType } from '~~/types/todo';
import { useTodos } from '~/composables/useTodos';

const { deleteTodo, toggleTodoCompleted } = useTodos();

const deleteT = async (id: string) => {
  await deleteTodo([id]);
};

const changeTodoCompleted = async (todo: TodoItemType) => {
  await toggleTodoCompleted(todo.id, !todo.completed);
};

defineProps<{
  todo: TodoItemType;
}>();
</script>
