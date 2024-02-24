<script setup lang="ts">
import { defineProps } from 'vue'
import type { Task } from '@/types'
import { nanoid } from 'nanoid'

defineProps<{
  task: Task
}>()
</script>

<template>
  <div>
    <p class="task bg-white mb-2 rounded max-w-[250px] p-2 text-sm">{{ task.title }}</p>
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
