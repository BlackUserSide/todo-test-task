<script lang="ts" setup>
import {useTodo} from "./store/todo.ts";
import Todo from "./components/Todo.vue";
import {computed, onBeforeMount, ref, type Ref, watch} from "vue";
import PlusIcon from "./components/icons/PlusIcon.vue";
import {useNotyf} from "./composables/useNotyf.ts";
import type {ITodo} from "./store/types/todo.ts";

const filterTodos: Ref<'open' | 'completed' | null> = ref(null)
const nameTodo: Ref<string> = ref('')
const openPopUp: Ref<boolean> = ref(false)
const error: Ref<string | null> = ref(null)
const todosStore = useTodo()
const notyf = useNotyf()
const todos = computed(() => {
  return todosStore.todos
})
const filteredTodos: Ref<ITodo[]> = ref([])
onBeforeMount(() => {
  todosStore.getTodosLocal()
})
watch(todos, () => {
  filteredTodos.value = todos.value
})
watch(filterTodos, () => {
  filteredTodos.value = []
  switch (filterTodos.value) {
    case 'open' :
      filteredTodos.value = todos.value.filter(e => e.status === 'open')
      break
    case 'completed' :
      filteredTodos.value = todos.value.filter(e => e.status === 'completed')
      return
    default :
      filteredTodos.value = todos.value
      break
  }
})
const handlerTodo = () => {
  if (error) {
    error.value = null
  }
  if (nameTodo.value === '') {
    error.value = 'Name is required'
    notyf.error('Name is required')
    return
  }
  if (nameTodo.value.length > 75) {
    error.value = 'Max length 75 symbols'
    notyf.error('Max length 75 symbols')
    return;
  }
  todosStore.addTodo(nameTodo.value)
  notyf.success('Todo success add')
  openPopUp.value = false
  nameTodo.value = ''
}
</script>
<template>
  <div class="container-todo-content">
    <div class="control-wrapper">
      <div class="filters-container">
        <button :class="!filterTodos ? 'is-select' : ''" class="all-btn btn" @click="filterTodos = null">All</button>
        <button :class="filterTodos === 'open' ? 'is-select' : ''" class="open-todo-btn btn" @click="filterTodos = 'open'">Open</button>
        <button :class="filterTodos === 'completed' ? 'is-select' : ''" class="closed-todo-btn btn" @click="filterTodos = 'completed'">Completed</button>
      </div>
      <div class="control-btn-group">
        <button class="add-btn btn" @click="openPopUp = !openPopUp">
          <PlusIcon/>
          <span>Add todo</span></button>
      </div>
    </div>
    <div class="container-items-todo">
      <Todo v-for="item in filteredTodos" :key="item.id" :todo="item"/>
    </div>
    <div v-if="openPopUp" class="pop-up-form">
      <div class="bg-lock"></div>
      <div class="pop-up-container-wrapper">
        <div class="title-container">
          <h3 class="h3">Add Todo</h3>
        </div>
        <div class="container-form-add">
          <div class="input-container">
            <label>Todo (Max length 75 symbols)</label>
            <input v-model="nameTodo" name="nameTodo" placeholder="Example create something"/>
            <div v-if="error" class="container-error-message">
              <span>{{ error }}</span>
            </div>
          </div>
        </div>
        <button class="add-btn-form btn" @click="handlerTodo"><span>
          Add Todo
        </span></button>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.container-todo-content {
  max-width: 1250px;
  width: 100%;
  margin: 0 auto;
  padding: 35px 80px;

  .container-items-todo {
    padding: 25px 0;
    display: flex;
    flex-direction: column;
    gap: 15px;
  }

  .control-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .filters-container {
      display: flex;
      gap: 15px;

      button {
        &.is-select {
          background: mediumpurple;
          color: #fff;
        }
      }
    }

    .control-btn-group {
      display: flex;
      gap: 15px;

      .add-btn {
        svg {
          width: 15px;
          height: 15px;

          path {
            fill: #fff;
          }
        }

        max-width: 100%;
        width: 100%;
        height: 32px;
        background: mediumpurple;
        color: #fff;
        font-size: 18px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: .3s ease background;
        gap: 5px;

        &:hover {
          background: rgba(mediumpurple, .8);
        }
      }
    }
  }
}

.pop-up-form {
  .bg-lock {
    width: 100%;
    height: 100%;
    position: fixed;
    left: 0;
    top: 0;
    background: rgba(#000, .5);
    z-index: 3;
  }

  .pop-up-container-wrapper {
    width: 450px;
    position: fixed;
    top: 50%;
    left: 50%;
    margin-right: -50%;
    transform: translate(-50%, -50%);
    background: #fff;
    z-index: 4;
    padding: 15px 40px;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 25px;

    .container-form-add {
      max-width: 100%;
      width: 100%;

      .input-container {
        display: flex;
        flex-direction: column;
        gap: 5px;

        .container-error-message {
          span {
            color: red;
          }
        }

        input {
          max-width: 100%;
          width: 100%;
          outline: none;
          height: 32px;
          font-size: 16px;
          display: inline-block;
          border: 1px solid mediumpurple;
          border-radius: 10px;
          padding: 5px 10px;
        }
      }
    }

    .add-btn-form {
      max-width: 100%;
      width: 100%;
      height: 32px;
      background: mediumpurple;
      color: #fff;
      font-size: 18px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: .3s ease background;

      &:hover {
        background: rgba(mediumpurple, .8);
      }
    }
  }
}
</style>
