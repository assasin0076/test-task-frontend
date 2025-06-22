<template>
  <teleport to="body">
    <div ref="fly" class="float-animation transition absolute top-8 left-8 h-2 w-2 bg-gray">
      <fly-icon class="w-8 h-8 transition" :style="rotationStyle" />
    </div>
  </teleport>
</template>

<script lang="ts" setup>
import { computed, ref } from 'vue'
import { useWindowSize } from '@vueuse/core'
import FlyIcon from '@/components/FlyIcon.vue'

const { width, height } = useWindowSize()

const fly = ref<HTMLElement | null>(null)

const getRawHtmlValue = (val) => {
  return parseInt(val) || 0
}
const isFlyLeftTouch = () => getRawHtmlValue(fly.value.style.left) - 20 >= 40
const isFlyRightTouch = () => getRawHtmlValue(fly.value.style.left) + 40 <= width.value
const isFlyTopTouch = () => getRawHtmlValue(fly.value.style.top) - 20 >= 40
const isFlyBottomTouch = () => getRawHtmlValue(fly.value.style.top) + 40 <= height.value
const moveFlyLeft = () => {
  if (isFlyLeftTouch()) fly.value.style.left = `${getRawHtmlValue(fly.value.style.left) - 1 || 1}px`
  else direction.value = 'right'
}
const moveFlyRight = () => {
  if (isFlyRightTouch())
    fly.value.style.left = `${getRawHtmlValue(fly.value.style.left) + 1 || 1}px`
  else direction.value = 'left'
}
const moveFlyUp = () => {
  if (isFlyTopTouch()) fly.value.style.top = `${parseInt(fly.value.style.top) - 1 || 1}px`
  else direction.value = 'down'
}
const moveFlyDown = () => {
  if (isFlyBottomTouch()) fly.value.style.top = `${parseInt(fly.value.style.top) + 1 || 1}px`
  else direction.value = 'up'
}
const moveFlyLeftUp = () => {
  moveFlyLeft()
  moveFlyUp()
}
const moveFlyLeftDown = () => {
  moveFlyLeft()
  moveFlyDown()
}
const moveFlyRightUp = () => {
  moveFlyRight()
  moveFlyUp()
}
const moveFlyRightDown = () => {
  moveFlyRight()
  moveFlyDown()
}
const directionsHandlers = {
  left: moveFlyLeft,
  right: moveFlyRight,
  up: moveFlyUp,
  down: moveFlyDown,
  leftUp: moveFlyLeftUp,
  leftDown: moveFlyLeftDown,
  rightUp: moveFlyRightUp,
  rightDown: moveFlyRightDown,
}
type Direction = 'left' | 'right' | 'up' | 'down' | 'leftUp' | 'leftDown' | 'rightUp' | 'rightDown'
const direction = ref<Direction>('right')
setInterval(() => {
  directionsHandlers[direction.value]()
}, 12)

const getRotationStyle = (direction: Direction): { transform: string } => {
  const rotationMap: Record<Direction, number> = {
    up: 0,
    right: 90,
    down: 180,
    left: 270,
    rightUp: 45,
    rightDown: 135,
    leftDown: 225,
    leftUp: 315,
  }

  const angle = rotationMap[direction]
  return {
    transform: `rotate(${angle}deg)`,
  }
}
const rotationStyle = computed(() => getRotationStyle(direction.value))
const chaoticChangeDirection = () => {
  const directions: Direction[] = [
    'left',
    'right',
    'up',
    'down',
    'leftUp',
    'leftDown',
    'rightUp',
    'rightDown',
  ]
  direction.value = directions[Math.floor(Math.random() * 8)]
}
setInterval(chaoticChangeDirection, 2000)
</script>

<style>
.float-animation {
  animation: float 2s ease-in-out infinite;
}

@keyframes float {
  0% {
    transform: translate(0, 0);
  }
  25% {
    transform: translate(-5px, -10px); /* влево + вверх */
  }
  50% {
    transform: translate(0, -20px); /* вверх */
  }
  75% {
    transform: translate(5px, -10px); /* вправо + вверх */
  }
  100% {
    transform: translate(0, 0);
  }
}
</style>
