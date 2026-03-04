import { computed } from 'vue';

import type { TodoItem } from '~~/types/todo';
import { useTodoStore } from '~/stores/todoStore';
import { useErrorPopup } from '~/composables/useErrorPopup';

export function useTodos() {
  const config = useRuntimeConfig();
  const apiBase = config.public.apiBase;
  const storeTodo = useTodoStore();
  const { open: openErrorPopup } = useErrorPopup();
  const pending = useState<boolean>('todos_pending', () => false);
  const error = useState<Error | null>('todos_error', () => null);
  const isInitialized = useState<boolean>('todos_initialized', () => false);

  const listTodos = async () => {
    pending.value = true;
    error.value = null;

    try {
      storeTodo.todos = await $fetch<TodoItem[]>(`${apiBase}/todoList`);
      return storeTodo.todos;
    } catch (err) {
      error.value = err as Error;
      throw err;
    } finally {
      pending.value = false;
      isInitialized.value = true;
    }
  };
  
  const totalTodos = computed(() => storeTodo.todos.length);
  const completedTodosId = computed(() =>
    storeTodo.todos.filter((todo) => todo.completed).map((todo) => todo.id)
  );

  const filteredTodos = computed(() => {
    if (storeTodo.filter === 'active') {
      return storeTodo.todos.filter((todo) => !todo.completed);
    }
    if (storeTodo.filter === 'completed') {
      return storeTodo.todos.filter((todo) => todo.completed);
    }
    return storeTodo.todos;
  });

  const addTodo = async (newTitle: string) => {
    try {
      await $fetch(`${apiBase}/todoList`, {
        method: 'POST',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify({
          title: newTitle,
          completed: false
        })
      });

      await listTodos();
    } catch (err) {
      error.value = err as Error;
      openErrorPopup();
    }
  };

  const deleteTodo = async (ids: Array<string | number> | string | number) => {
    const idsToDelete = Array.isArray(ids) ? ids : [ids];

    try {
      await Promise.all(
        idsToDelete.map((id) =>
          $fetch(`${apiBase}/todoList/${id}`, {
            method: 'DELETE'
          })
        )
      );

      await listTodos();
    } catch (err) {
      error.value = err as Error;
      openErrorPopup();
    }
  };

  const changeTodo = async (id: string, patch: Partial<Pick<TodoItem, 'title' | 'completed'>>) => {
    try {
      await $fetch(`${apiBase}/todoList/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(patch)
      });

      await listTodos();
    } catch (err) {
      error.value = err as Error;
      openErrorPopup();
    }
  };

  return {
    listTodos,
    totalTodos,
    filteredTodos,
    addTodo,
    deleteTodo,
    changeTodo,
    completedTodosId,
    isInitialized,
    pending,
    error
  };
}
