<script setup lang="ts">
import TheBoard from './components/TheBoard.vue'
import Logo from './assets/Logo.vue'
</script>

<template>
  <div class="  h-[100vh] p-10  overflow-hidden w-screen ">
    <div class=" flex  gap-x-3 mb-8">
      <span> <Logo/></span>
    <h1 class=" text-white  font-bold text-4xl">Trello Clone</h1>
  </div>
      <the-board  />
  
  </div>
</template>

<style scoped>

</style>
