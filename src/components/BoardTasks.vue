<script setup lang="ts">
import { defineProps, ref } from 'vue'
import type { Task } from '@/types'
import { nanoid } from 'nanoid'
import { onKeyStroke } from '@vueuse/core'

const props = defineProps<{
  task: Task
}>()

const emit = defineEmits<{
  (e: 'deleteTask', payload: string): void
}>()

const focused = ref(false)
onKeyStroke('Backspace', (e) => {
  if (focused.value) emit('deleteTask', props.task.id)
})
</script>

<template>
  <div class="task" @blur="focused = false" @focus="focused = true" tabindex="0">
    <p
      class="bg-white mb-2 rounded lg:max-w-[250px] max-w-[200px] p-2 text-sm flex justify-between"
    >
      {{ task.title }}
      <span class="cursor-pointer" v-show="focused" @click="emit('deleteTask', task.id)">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="text-gray-800"
          viewBox="0 0 24 24"
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M3 6h18M5 6v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V6M9 11v6M15 11v6"></path>
        </svg>
      </span>
    </p>
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

.task:focus,
.task:focus-visible {
  @apply outline-red-100 !important;
  outline: gray auto 1px;
}
</style>
