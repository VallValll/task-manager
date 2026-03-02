import { computed } from 'vue';
import type { TodoItem } from '~~/types/todo';
import { useTodoStore } from '~/stores/todoStore'
import { useErrorPopup } from '~/composables/useErrorPopup';

export function useTodos() {
    const config = useRuntimeConfig();
    const apiBase = config.public.apiBase;
    const storeTodo = useTodoStore();
    const { open } = useErrorPopup();

    const { pending, error } = useFetch<TodoItem[]>(`${apiBase}/todoList`, {
        immediate: true,
        watch: false,
        onResponse({ response }) {
            storeTodo.todos = response._data ?? [];
        }
    });

    const listTodos = async () => storeTodo.todos = await $fetch<TodoItem[]>(`${apiBase}/todoList`);  
    const totalTodos = computed(() => storeTodo.todos.length);
    const completedTodosId = computed(() => storeTodo.todos.filter((todo) => todo.completed).map((todo) => todo.id))

    const filteredTodos = computed(() => {
        if (storeTodo.filter === 'active') {
            return storeTodo.todos.filter(todo => !todo.completed);
        }
        if (storeTodo.filter === 'completed') {
            return storeTodo.todos.filter(todo => todo.completed);
        }
        return storeTodo.todos;
    })

    const addTodo = async (newTitle: string) => {
        try {
            await $fetch(`${apiBase}/todoList`, {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body:  JSON.stringify({
                    title: newTitle,
                    completed: false,
                })
            })

            await listTodos();
        } catch {
            open();
        }
    }

    const deleteTodo = async (ids: Array<string | number> | string | number) => {
        const idsToDelete = Array.isArray(ids) ? ids : [ids];

        try {
            await Promise.all(
                idsToDelete.map((id) =>
                    $fetch(`${apiBase}/todoList/${id}`, {
                        method: 'DELETE',
                    })
                )
            )

            await listTodos();
        } catch {
            open();
        }
    }

    const toggleTodoCompleted = async (id: string, completed: boolean) => {
        try {
            await $fetch(`${apiBase}/todoList/${id}`, {
                method: 'PATCH',
                headers: {
                    'Content-type': 'application/json; charset=UTF-8'
                },
                body: JSON.stringify({
                    completed
                })            
            })

            await listTodos();
        } catch {
            open();
        }
    };

    return {
        listTodos,
        totalTodos,
        filteredTodos,
        addTodo,
        deleteTodo,
        toggleTodoCompleted,
        completedTodosId,
        pending,
        error,
    };
}
