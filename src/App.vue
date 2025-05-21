<script setup lang="ts">
import useMainCombiner from './composables/classesCombiners/mainCombiner'
import useFakeData from '@/composables/fakeData'
import { onMounted, ref } from 'vue'

const { frostGlassStyle, listItemStyle } = useMainCombiner()

const leftBLock = ref([])
const rightBlock = ref([])
const { isLoading, getFakeData } = useFakeData()

onMounted(async () => {
  const response = await getFakeData()
  leftBLock.value = response.left
  rightBlock.value = response.right
})
</script>

<template>
  <div class="min-h-screen animated-gradient p-4 flex flex-col">
    <div class="flex justify-between mb-6">
      <div :class="frostGlassStyle" class="flex flex-col w-[600px]">
        <div class="mb-4 flex gap-2">
          <div
            v-for="block in leftBlockData"
            :key="block.id"
            :class="{
              [frostGlassStyle]: true,
              [listItemStyle]: true,
            }"
          >
            {{ block.name }}
          </div>
        </div>
        <div class="self-center">selected: n/m</div>
      </div>
      <div :class="frostGlassStyle" class="w-[600px] items-center justify-center flex">111</div>
    </div>
    <div class="grid grid-cols-2 flex-1 gap-4">
      <div :class="frostGlassStyle" class="!flex flex-wrap content-start gap-2">
        <div
          v-for="block in leftBLock"
          :key="block.id"
          :class="{
            [frostGlassStyle]: true,
            [listItemStyle]: true,
          }"
        >
          {{ block.name }}
        </div>
      </div>
      <div :class="frostGlassStyle" class="!flex flex-wrap gap-2 content-start">
        <div
          v-for="block in rightBlock"
          :key="block.id"
          :class="{
            [frostGlassStyle]: true,
            [listItemStyle]: true,
          }"
        >
          {{ block.name }}
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.animated-gradient {
  background: linear-gradient(270deg, #f0f8ff, #c4eaff, #e0f7fa);
  background-size: 300% 300%;
  animation: gradient-animation 10s infinite;
}

@keyframes gradient-animation {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}
</style>
