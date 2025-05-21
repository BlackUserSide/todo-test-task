<script lang="ts" setup>
import type {ITodo} from "../store/types/todo.ts";
import DoneIcon from "./icons/DoneIcon.vue";
import {useTodo} from "../store/todo.ts";
import DeleteIcon from "./icons/DeleteIcon.vue";

const {todo} = defineProps<{ todo: ITodo }>()
const todosStore = useTodo()
const handlerClick = () => {
  let status = todo.status
  if(todo.status === 'open') status = 'completed'
  if(todo.status === 'completed') status = 'open'
  todosStore.changeStatus(todo.id, status)
}
const deleteTodo = () => {
  todosStore.deleteTodo(todo.id)
}
</script>
<template>
  <div :class="todo.status === 'open' ? 'open-task' : 'closed-task'" class="container-item-todo" >
    <div class="checkbox-container" @click="handlerClick">
      <div class="container-checkbox">
        <DoneIcon v-if="todo.status === 'completed'"/>
      </div>
    </div>
    <div class="name-wrapper">
      <p>{{ todo.title }}</p>
    </div>
    <div class="delete-container" @click="deleteTodo">
      <DeleteIcon/>
    </div>
  </div>
</template>

<style lang="scss">
.container-item-todo {
  display: flex;
  padding: 15px 25px;
  border-radius: 10px;

  transition: all .3s ease;
  align-items: center;
  justify-content: space-between;


  &.open-task {
    border: 1px solid mediumpurple;
  }

  &.closed-task {
    border: 1px solid greenyellow;
  }

  .checkbox-container {
    width: 25px;
    height: 25px;
    border: 1px solid mediumpurple;
    border-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    svg {
      width: 20px;
      height: 20px;
      position: relative;
      top: 2px;
      path {
        fill: mediumpurple;
      }
    }
  }
  .delete-container {
    cursor: pointer;
    svg {
      width: 25px;
      height: 25px;
      path {
        stroke: mediumpurple;
      }
    }
  }
}
</style>