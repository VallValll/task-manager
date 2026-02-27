import { defineStore } from "pinia";
import type {TodoItem, TodoFilter} from '~~/types/todo'

export const useTodoStore = defineStore('todo', () => {
    const todos = ref<TodoItem[]>([]);
    const filter = ref<TodoFilter>('all');

    return {
        todos,
        filter,
    }
})
