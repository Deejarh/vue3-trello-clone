<script setup lang="ts">
import { defineProps, ref } from 'vue'
import type { Task } from '@/types'
import { nanoid } from 'nanoid'
import { onKeyStroke } from '@vueuse/core'
import DeleteIcon from '@/components/DeleteIcon.vue'

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
  <div class="task bg-white lg:min-w-[250px] min-w-[230px] rounded-lg shadow-lg mr-1" @blur="focused = false" @focus="focused = true" tabindex="0">
    <div
      class=" mb-2 rounded  p-2 lg:text-sm text-xs flex  items-center  justify-between break-words  cursor-move  "
    >
      <p class=" h-auto  break-words"> {{ task.title }} </p>
      <span class="cursor-pointer ml-2 flex items-end" v-show="focused" @click="emit('deleteTask', task.id)">
      <delete-icon/>
      </span>
    </div>
  </div>
</template>

<style scoped>
.task p {
    word-wrap: break-word; 
    word-break: break-word;
  }
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
