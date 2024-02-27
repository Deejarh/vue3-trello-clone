<script setup lang="ts">
import { ref, nextTick } from 'vue'
import type { Card, Task } from '@/types'
import { nanoid } from 'nanoid'
import BoardTask from './BoardTasks.vue'
import AddTask from './AddTask.vue'
import DragButton from './DragButton.vue'
import draggable from 'vuedraggable'
import { useKeyModifier, useLocalStorage } from '@vueuse/core'
import DeleteIcon from '@/components/DeleteIcon.vue'


const alt = useKeyModifier('Alt')
const titleFocused = ref(false)
const cards = useLocalStorage<Card[]>('board', [
  {
    id: nanoid(),
    title: 'Backlog',
    tasks: [
      {
        id: nanoid(),
        title: 'Write a Letter',
        createdAt: new Date()
      },
      {
        id: nanoid(),
        title: 'Go to Market',
        createdAt: new Date()
      }
    ]
  },
  {
    id: nanoid(),
    title: 'In Progress',
    tasks: [
      {
        id: nanoid(),
        title: 'Fix a bug',
        createdAt: new Date()
      },
      {
        id: nanoid(),
        title: 'Move me 😊',
        createdAt: new Date()
      },
    ]
  }
])

const deleteCard = (card: Card) => {
  cards.value = cards.value.filter((c: Card) => c.id !== card.id)
}

const addCard = () => {
  const card: Card = {
    id: nanoid(),
    title: '',
    tasks: []
  }
  cards.value.push(card)
  nextTick(() => {
    ;(document.querySelector('.card:last-of-type .title-input') as HTMLInputElement).focus()
  })
}
</script>

<template>
  <div>
    <div class="flex justify-center">
      <div
        class="dark:bg-white bg-black flex justify-center items-center py-2 px-3 rounded-full mb-8 cursor-pointer font-semibold hover:opacity-70 text-white dark:text-black text-xs"
        @click="addCard"
      >
        + Add a card
      </div>
    </div>
    <draggable
      v-model="cards"
      group="cards"
      item-key="id"
      :animation="200"
      handle=".drag-handle"
      class="flex gap-x-4 overflow-x-auto overflow-y-hidden dark:text-white text-black items-start"
    >
      <template #item="{ element: card }: { element: Card }">
        <div
          class="bg-gray-200 p-3 rounded-xl lg:max-w-[280px] max-w-[200px] shadow-lg text-black card"
        >
          <header class="font-semibold lg:text-lg text-sm mb-4 mt-2 capitalize flex items-center">
            <drag-button />
            <input
              @focus="titleFocused = true"
              @blur="titleFocused = false"
              class="title-input  flex justify-start items-start bg-transparent focus:bg-white rounded px-1 w-4/5 capitalize outline-red-100"
              @keyup.enter="($event.target as HTMLInputElement).blur()"
              @keydown.backspace="
                card.title === '' ? (cards = cards.filter((c) => c.id !== card.id)) : null
              "
              type="text"
              v-model="card.title"
            />

            <span v-show="card.title === ''" class=" cursor-pointer ml-2" @click="deleteCard(card)"><delete-icon/></span>
          </header>
          <draggable
            v-model="card.tasks"
            :group="{ name: 'tasks', pull: alt ? 'clone' : true }"
            item-key="id"
            :animation="150"
          >
            <template #item="{ element: task }: { element: Task }">
              <div>
                <BoardTask
                  :task="task"
                  @deleteTask="card.tasks = card.tasks.filter((task) => task.id !== $event)"
                />
              </div>
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

<style scoped>
</style>
