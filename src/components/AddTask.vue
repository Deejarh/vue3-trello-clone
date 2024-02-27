<script setup lang="ts">
import { ref } from 'vue'
import type { Task } from '@/types'
import { nanoid } from 'nanoid'

const emit = defineEmits<{
  (e: 'AddTask', payload: Task): void
}>()

const isFocus = ref(false)
const title = ref('')
const task = ref<Task>({
  id: '',
  title: '',
  createdAt: Date
})

const cancel = () => {
  title.value = ''
  isFocus.value = false
}

const createTask = (e: Event) => {
  if (title.value.trim()) {
    e.preventDefault()
    emit('AddTask', {
      id: nanoid(),
      title: title.value,
      createdAt: new Date()
    } as Task)
    title.value = ''
  }

  task.id = nanoid()
  task.title = title.value
  task.createdAt = new Date()
  title.value = ''
  isFocus.value = false
}
</script>

<template>
  <div>
    <textarea
      v-model="title"
      class="w-full outline-none resize-none"
      :class="[
        isFocus
          ? ' bg-white h-20 p-3 text-sm rounded'
          : ' cursor-pointer h-7 text-gray-500 lg:text-sm text-xs font-medium mt-2 border-0 bg-gray-200'
      ]"
      @focus="isFocus = true"
      @keydown.tab="createTask"
      @keyup.enter="createTask"
      :placeholder="isFocus ? 'Enter a title for this card' : '+ Add A Task'"
    ></textarea>
    <div class="flex justify-between my-3 w-full">
      <div
        v-if="isFocus"
        @click="createTask"
        class="text-xs bg-red-200 p-1 rounded-md px-2 lg:font-semibold font-medium  hover:opacity-70 cursor-pointer"
      >
        Add Task
      </div>
      <button
        v-if="isFocus"
        class="text-sm bg-white rounded-md px-3 hover:opacity-70"
        @click="cancel"
      >
        X
      </button>
    </div>
  </div>
</template>

<style scoped>
.sortable-drag .task {
  transform: rotate(5deg);
}
.sortable-ghost .task {
  position: relative;
}
.sortable-ghost .task::after {
  content: '';
  @apply absolute top-0 bottom-0 left-0 right-0 bg-gray-300 rounded;
}
</style>
