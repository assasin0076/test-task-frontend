<script setup lang="ts">
import useMainCombiner from '@/classesCombiners/mainCombiner'

const { frostGlassStyle, listItemStyle } = useMainCombiner()
</script>

<template>
  <div class="min-h-screen animated-gradient p-4 flex flex-col">
    <div class="flex justify-between mb-6">
      <div :class="frostGlassStyle" class="flex flex-col w-[600px]">
        <div class="mb-4 flex gap-2">
          <div
            :class="{
              [frostGlassStyle]: true,
              [listItemStyle]: true,
            }"
          >
            a
          </div>
          <div
            :class="{
              [frostGlassStyle]: true,
              [listItemStyle]: true,
            }"
          >
            a
          </div>
        </div>
        <div class="self-center">selected: n/m</div>
      </div>
      <div :class="frostGlassStyle" class="w-[600px] items-center justify-center flex">111</div>
    </div>
    <div class="flex gap-4 flex-1">
      <div :class="frostGlassStyle" class="flex-1 !flex gap-2">
        <div
          :class="{
            [frostGlassStyle]: true,
            [listItemStyle]: true,
          }"
        >
          a
        </div>
        <div
          :class="{
            [frostGlassStyle]: true,
            [listItemStyle]: true,
          }"
        >
          a
        </div>
        <div
          :class="{
            [frostGlassStyle]: true,
            [listItemStyle]: true,
          }"
        >
          a
        </div>
      </div>
      <div :class="frostGlassStyle" class="flex-1 !flex gap-2">
        <div
          :class="{
            [frostGlassStyle]: true,
            [listItemStyle]: true,
          }"
        >
          a
        </div>
        <div
          :class="{
            [frostGlassStyle]: true,
            [listItemStyle]: true,
          }"
        >
          a
        </div>
        <div
          :class="{
            [frostGlassStyle]: true,
            [listItemStyle]: true,
          }"
        >
          a
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
