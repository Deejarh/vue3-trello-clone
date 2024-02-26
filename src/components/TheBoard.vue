<script setup lang="ts">
import { ref } from 'vue'
import type { Card, Task } from '@/types'
import { nanoid } from 'nanoid'
import BoardTask from './BoardTasks.vue'
import AddTask from './AddTask.vue'
import DragButton from './DragButton.vue'
import draggable from 'vuedraggable'
import { useKeyModifier } from '@vueuse/core'

const alt = useKeyModifier('Alt')
const cards = ref<Card>([
  {
    id: nanoid(),
    title: 'backlog',
    tasks: [
      {
        id: nanoid(),
        title: 'First task',
        createdAt: new Date()
      },
      {
        id: nanoid(),
        title: 'second task',
        createdAt: new Date()
      }
    ]
  },
  {
    id: nanoid(),
    title: 'In Progress',
    tasks: []
  },
  {
    id: nanoid(),
    title: 'ToDo',
    tasks: []
  }
])

</script>

<template>
  <div>
    <draggable
      v-model="cards"
      group="cards"
      item-key="id"
      :animation="200"
      handle=".drag-handle"
      class="flex gap-x-4 overflow-x-auto dark:text-white text-black items-start"
    >
      <template #item="{ element: card }: { element: Card }">
        <div class="bg-gray-200 p-4 rounded min-w-[250px] shadow-lg text-black">
          <header class="font-bold text-lg mb-4 capitalize flex items-center justify-start">
            <drag-button />

            {{ card.title }}
          </header>
          <draggable
            v-model="card.tasks"
            :group="{ name: 'tasks', pull: alt ? 'clone' : true }"
            item-key="id"
            :animation="150"
          >
            <template #item="{ element: task }: { element: Task }">
              <div><BoardTask :task="task" @deleteTask="card.tasks = card.tasks.filter((task) => task.id !== $event)" /></div>
            </template>
          </draggable>

          <footer>
            <add-task @AddTask="card.tasks.push($event)" />             
          </footer>
        </div>
      </template>
    </draggable>
  </div>
</template>

<style scoped></style>
