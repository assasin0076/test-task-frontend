<template>
  <div @click="showMenu" class="fixed bottom-6 right-6 cursor-pointer rounded-full w-8 h-8 flex justify-center items-center bg-gray-50 border-gray-200 border z-5 hover:bg-gray-100"></div>
  <div v-if="isMenuVisible" @click.self="hideMenu" class="bg-gray-50/50 h-screen w-screen fixed top-0 left-0 z-10 flex items-center justify-center">
    <div class="py-4 rounded-xl bg-gray-50 w-[150px] shadow-xl">
      <router-link v-for="item in items" :key="item.id" :to="item.link" class="px-4 py-2 text-xl font-bold text-black cursor-pointer text-gray-400 hover:text-gray-600">
        {{ item.name }}
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import {Ref, ref} from "vue";

type Item = {
  name: string
  id: number | string
  link: string
}
const items: Ref<Item[]> = ref([
  {
    name: 'list',
    id: 1,
    link: '/'
  }
])

const isMenuVisible: Ref<boolean> = ref(false)
const showMenu = () => {
  isMenuVisible.value = true;
}
const hideMenu = () => {
  isMenuVisible.value = false;
}
</script>