import { computed } from 'vue';
import type { TodoItem } from '~~/types/todo';
import { useTodoStore } from '~/stores/todoStore'

export function useTodos() {
    const config = useRuntimeConfig();
    const apiBase = config.public.apiBase;
    const store = useTodoStore();

    const listTodos = async () => {
        store.todos = await $fetch<TodoItem[]>(`${apiBase}/todoList`);        
    }    

    const filteredTodos = computed(() => {
        if (store.filter === 'active') {
            return store.todos.filter(todo => !todo.completed);
        }
        if (store.filter === 'completed') {
            return store.todos.filter(todo => todo.completed);
        }
        return store.todos;
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

    const deleteTodo = async (id: string) => {     
        await $fetch(`${apiBase}/todoList/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            },
            
        })

        await listTodos();
    }

    return {
        listTodos,
        filteredTodos,
        addTodo,
        deleteTodo,
    };
}
