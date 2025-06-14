<script setup lang="ts">
import useMainCombiner from '../composables/classesCombiners/mainCombiner'
import { useFakeData } from '../composables/fakeData'
import { onMounted } from 'vue'
import LoadingStub from '../components/LoadingStub.vue'
import Block from '../components/Block.vue'
import { useBlockControllLogic } from '../composables/blockControllLogic'

const { frostGlassStyle } = useMainCombiner()

const { isLoading, getFakeData } = useFakeData()
const {
  isLeftMaxSize,
  leftBLock,
  selectedLeft,
  getLeftById,
  isLeftAlreadyIn,
  selectLeft,
  removeLeft,
  rightBlock,
  selectedRight,
  isRightSelected,
  getRightById,
  selectRight,
  unselectRight,
  resetSelection,
  reset,
} = useBlockControllLogic()
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
            :disabled="isLeftMaxSize || isLeftAlreadyIn(block.id)"
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
</style>
