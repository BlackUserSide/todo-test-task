import {defineStore} from "pinia";
import type {Ref} from "vue";
import {ref} from "vue";
import type {ITodo} from "./types/todo.ts";
import {useNotyf} from "../composables/useNotyf.ts";
import {useRandomId} from "../composables/useRandomId.ts";

export const useTodo = defineStore('todo', () => {
    const todos:Ref<ITodo[]> = ref([])
    const notyf = useNotyf()

    function getTodosLocal() {
        const localStoreTodo = localStorage.getItem('data_todos')
        if(localStoreTodo) {
            todos.value = JSON.parse(localStoreTodo)
        }
    }
    function addTodo(name: string) {
        const data  = {} as ITodo
        let generateId: number
        do {
            generateId = useRandomId()
        } while (todos.value.find(e => e.id === generateId))
        data.id = generateId
        data.title = name
        data.status = 'open'
        todos.value.unshift(data)
        localStorage.setItem('data_todos', JSON.stringify(todos.value))
    }
    function changeStatus(id:number, status: 'open'| 'completed') {
        if(!todos.value.find(e=> e.id === id)) {
            notyf.error('Todo not found')
            return
        }
        todos.value = todos.value.map(e => {
            if (e.id === id) {
                e.status = status
                return e
            }
            return e
        })
        localStorage.setItem('data_todos', JSON.stringify(todos.value))
    }
    function deleteTodo(id:number) {
        todos.value = todos.value.filter(e=> e.id !== id)
        localStorage.setItem('data_todos', JSON.stringify(todos.value))
    }
    return {
        todos,
        addTodo,
        getTodosLocal,
        changeStatus,
        deleteTodo
    }
})