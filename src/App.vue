<script setup lang="ts">
import type { DataElement } from './composables/fakeData'
import useMainCombiner from './composables/classesCombiners/mainCombiner'
import { useFakeData } from './composables/fakeData'
import { computed, onMounted, Ref, ref } from 'vue'
import LoadingStub from '@/components/LoadingStub.vue'
import Block from '@/components/Block.vue'

const { frostGlassStyle } = useMainCombiner()

const leftBLock: Ref<DataElement[]> = ref([])
const selectedLeft: Ref<DataElement['id'][]> = ref([])
const getLeftById = (id) => {
  return leftBLock.value.find((el) => el.id === id)
}

const maxSize = 6
const isMaxSize = computed(() => selectedLeft.value.length >= maxSize)
const isLeftAlreadyIn = (id) => {
  return selectedLeft.value.some((el) => el === id)
}
const selectLeft = (item: DataElement) => {
  if (isMaxSize.value) return
  if (isLeftAlreadyIn(item.id)) return
  selectedLeft.value = [...selectedLeft.value, item.id]
}
const removeLeft = (id: DataElement['id']) => {
  selectedLeft.value = selectedLeft.value.filter((el) => el !== id)
}

const rightBlock: Ref<DataElement[]> = ref([])
const selectedRight: Ref<DataElement['id'] | undefined> = ref()
const isRightSelected = (id) => {
  return selectedRight.value === id
}

const getRightById = (id) => {
  return rightBlock.value.find((el) => el.id === id)
}
const selectRight = (item: DataElement) => {
  selectedRight.value = item.id
}
const unselectRight = () => {
  selectedRight.value = undefined
}

const { isLoading, getFakeData } = useFakeData()

const resetSelection = () => {
  selectedLeft.value = []
  selectedRight.value = undefined
}
const reset = () => {
  resetSelection()
  leftBLock.value = []
  rightBlock.value = []
}
const fetchFakeData = async () => {
  reset()
  const response = await getFakeData()
  leftBLock.value = response.left
  rightBlock.value = response.right
}
onMounted(() => {
  fetchFakeData()
})
</script>

<template>
  <div class="min-h-screen animated-gradient p-4 flex flex-col">
    <div class="flex mb-6 justify-between">
      <div :class="frostGlassStyle" class="flex flex-col w-[900px]">
        <div class="flex">
          <div class="flex gap-2">
            <Block
              v-for="id in selectedLeft"
              :key="id"
              :block="getLeftById(id)"
              :theme="{ size: 'sm', style: 'danger' }"
              @click="removeLeft(id)"
            />
          </div>
        </div>
        <div class="mx-auto mt-auto w-[100px]">
          selected: {{ !!selectedLeft.length ? selectedLeft.length : 'n/m' }}
        </div>
      </div>
      <div class="flex gap-4">
        <div :class="frostGlassStyle" class="w-[600px] items-center justify-center flex h-[180px]">
          <Block
            v-if="selectedRight"
            :block="getRightById(selectedRight)"
            @click="unselectRight"
            :theme="{ style: 'danger' }"
          />
          <div v-else>None selected</div>
        </div>
        <div
          :class="frostGlassStyle"
          class="w-[w-200px] items-center justify-center flex flex-col gap-2 h-[180px] items-center"
        >
          <div
            :class="frostGlassStyle"
            class="!p-0 !rounded-full flex items-center justify-center h-10 w-10 border border-gray-300 hover:bg-gray-50 cursor-pointer transition"
            @click="resetSelection"
          >
            R
          </div>
          <div
            :class="frostGlassStyle"
            class="!p-0 !rounded-full flex items-center justify-center h-10 w-10 border border-gray-300 hover:bg-gray-50 cursor-pointer transition"
            @click="fetchFakeData"
          >
            F
          </div>
        </div>
      </div>
    </div>
    <div class="grid grid-cols-2 flex-1 gap-4">
      <div :class="frostGlassStyle" class="!flex flex-wrap content-start gap-2">
        <Block
          v-for="block in leftBLock"
          :key="block.id"
          :block="block"
          :disabled="isMaxSize || isLeftAlreadyIn(block.id)"
          @click="selectLeft(block)"
        />
      </div>
      <div :class="frostGlassStyle" class="!flex flex-wrap gap-2 content-start">
        <Block
          v-for="block in rightBlock"
          :key="block.id"
          :block="block"
          :selected="isRightSelected(block.id)"
          @click="selectRight(block)"
        />
      </div>
    </div>
  </div>
  <loading-stub v-if="isLoading" />
</template>

<style scoped>
.animated-gradient {
  background: linear-gradient(270deg, #f0f8ff, #c4eaff, #e0f7fa);
  background-size: 300% 300%;
  animation: gradient-animation 10s infinite;
}

@keyframes rainbow-text-gradient {
  0% {
    background-position: 0% 50%;
  }
  100% {
    background-position: 100% 50%;
  }
}

.rainbow-text {
  background: linear-gradient(
    270deg,
    rgba(255, 0, 0, 0.8),
    rgba(255, 165, 0, 0.8),
    rgba(0, 0, 255, 0.8),
    rgba(75, 0, 130, 0.8),
    rgba(238, 130, 238, 0.8)
  );
  background-size: 800% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: rainbow-text-gradient 8s ease-in-out infinite;
  text-shadow: 2px 0px 20px rgba(0, 0, 0, 0.2);
}
</style>
