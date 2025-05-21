<script setup lang="ts">
import useMainCombiner from './composables/classesCombiners/mainCombiner'
import { DataElement, useFakeData } from '@/composables/fakeData'
import { computed, onMounted, Ref, ref } from 'vue'

const { frostGlassStyle, listItemStyle } = useMainCombiner()

const leftBLock: Ref<DataElement[]> = ref([])
const selectedLeft: Ref<DataElement[]> = ref([])

const maxSize = 6
const isMaxSize = computed(() => selectedLeft.value.length >= maxSize)
const isLeftAlreadyIn = (id) => {
  return selectedLeft.value.some((el) => el.id === id)
}
const selectLeft = (item: DataElement) => {
  if (isMaxSize.value) return
  if (isLeftAlreadyIn(item.id)) return
  selectedLeft.value = [...selectedLeft.value, item]
}
const removeLeft = (item: DataElement) => {
  selectedLeft.value = selectedLeft.value.filter((el) => el.id !== item.id)
}

const rightBlock: Ref<DataElement[]> = ref([])
const selectedRight: Ref<DataElement | undefined> = ref()
const selectRight = (item: DataElement) => {
  selectedRight.value = item
}
const unselectRight = () => {
  selectedRight.value = undefined
}

const { isLoading, getFakeData } = useFakeData()

onMounted(async () => {
  const response = await getFakeData()
  leftBLock.value = response.left
  rightBlock.value = response.right
})
</script>

<template>
  <div class="min-h-screen animated-gradient p-4 flex flex-col">
    <div class="flex mb-6 justify-between">
      <div :class="frostGlassStyle" class="flex flex-col w-[900px]">
        <div class="flex">
          <div class="flex gap-2">
            <div
              v-for="block in selectedLeft"
              :key="block.id"
              :class="{
                [frostGlassStyle]: true,
                [listItemStyle]: true,
              }"
              class="hover:bg-red-100 !w-[120px] h-[90px] text-[12px]"
              @click="removeLeft(block)"
            >
              {{ block.name }}
            </div>
          </div>
        </div>
        <div class="mx-auto mt-auto w-[100px]">
          selected: {{ !!selectedLeft.length ? selectedLeft.length : 'n/m' }}
        </div>
      </div>
      <div :class="frostGlassStyle" class="w-[600px] items-center justify-center flex h-[180px]">
        <div
          v-if="selectedRight"
          :class="{
            [frostGlassStyle]: true,
            [listItemStyle]: true,
          }"
          class="hover:bg-red-100"
          @click="unselectRight"
        >
          {{ selectedRight?.name }}
        </div>
        <div v-else>None slected</div>
      </div>
    </div>
    <div class="grid grid-cols-2 flex-1 gap-4">
      <div :class="frostGlassStyle" class="!flex flex-wrap content-start gap-2">
        <div
          v-for="block in leftBLock"
          :key="block.id"
          :class="{
            [frostGlassStyle]: true,
            [listItemStyle]: true,
            ['hover:bg-blue-100']: !isMaxSize && !isLeftAlreadyIn(block.id),
            ['!cursor-default']: isMaxSize || isLeftAlreadyIn(block.id),
          }"
          @click="selectLeft(block)"
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
          class="hover:bg-blue-100"
          @click="selectRight(block)"
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
