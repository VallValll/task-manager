import { ref, computed } from 'vue';
import type { TodoFilter, TodoItem } from '~~/types/todo';

const todos = ref<TodoItem[]>([]);
const filter = ref<TodoFilter>('all');

export function useTodos() {
    const config = useRuntimeConfig();
    const apiBase = config.public.apiBase;


    const listTodos = async () => {
        todos.value = await $fetch<TodoItem[]>(`${apiBase}/todoList`);        
    }

    const filteredTodos = computed(() => {
        if (filter.value === 'active') {
            return todos.value.filter(todo => !todo.completed);
        }
        if (filter.value === 'completed') {
            return todos.value.filter(todo => todo.completed);
        }
        return todos.value;
    })

    const addTodo = async (newTitle: string) => {
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
    }

    return {
        todos,
        listTodos,
        filteredTodos,
        addTodo
    };
}
