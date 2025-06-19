<template>
  <div class="canvas-container">
    <canvas ref="canvas" class="background-canvas" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const canvas = ref<HTMLCanvasElement | null>(null)
let ctx: CanvasRenderingContext2D | null = null
const trail: {
  x: number
  y: number
  vx: number
  vy: number
  time: number
}[] = []
const maxTrailLength = 50
let hue = 0
let lastX = 0
let lastY = 0

// Интерполяция
const lerp = (a: number, b: number, t: number): number => a + (b - a) * t

// Конвертация HSL -> RGB -> RGBA
const getColor = (time: number): string => {
  const currentHue = (hue + time * 10) % 360
  const opacity = 0.4 - time * 0.7 // чуть более живой градиент прозрачности

  const saturation = 1
  const lightness = 0.5

  const c = (1 - Math.abs(2 * lightness - 1)) * saturation
  const x = c * (1 - Math.abs(((currentHue / 60) % 2) - 1))
  const m = lightness - c / 2

  let r = 0,
    g = 0,
    b = 0

  if (currentHue >= 0 && currentHue < 60) {
    r = c
    g = x
    b = 0
  } else if (currentHue >= 60 && currentHue < 120) {
    r = x
    g = c
    b = 0
  } else if (currentHue >= 120 && currentHue < 180) {
    r = 0
    g = c
    b = x
  } else if (currentHue >= 180 && currentHue < 240) {
    r = 0
    g = x
    b = c
  } else if (currentHue >= 240 && currentHue < 300) {
    r = x
    g = 0
    b = c
  } else {
    r = c
    g = 0
    b = x
  }

  return `rgba(${Math.round((r + m) * 255)}, ${Math.round((g + m) * 255)}, ${Math.round(
    (b + m) * 255,
  )}, ${opacity})`
}

// Обработчик движения мыши с вектором скорости
const handleMouseMove = (event: MouseEvent) => {
  if (!canvas.value) return

  const rect = canvas.value.getBoundingClientRect()
  const x = event.clientX - rect.left
  const y = event.clientY - rect.top

  const dx = x - lastX
  const dy = y - lastY

  trail.push({ x, y, vx: dx * 0.3, vy: dy * 0.3, time: 0 })
  lastX = x
  lastY = y

  if (trail.length > maxTrailLength) trail.shift()
}

// Анимация
const animate = () => {
  if (!ctx || !canvas.value) return

  ctx.clearRect(0, 0, canvas.value.width, canvas.value.height)

  for (let i = trail.length - 1; i >= 0; i--) {
    const point = trail[i]
    point.time += 0.015

    if (point.time > 1) {
      trail.splice(i, 1)
      continue
    }

    // Смещаем точку по скорости со временем
    const interpolatedX = point.x + point.vx * (1 - point.time)
    const interpolatedY = point.y + point.vy * (1 - point.time)
    const radius = 40 * (1 - point.time ** 2) // Увеличенный радиус и более резкое затухание

    if (radius <= 0) continue

    ctx.beginPath()
    ctx.arc(interpolatedX, interpolatedY, radius, 0, Math.PI * 2)

    // Размытие
    ctx.shadowBlur = 20
    ctx.shadowColor = getColor(point.time)
    ctx.fillStyle = getColor(point.time)

    ctx.fill()

    // Сброс теней после отрисовки, чтобы не влияли на другие объекты
    ctx.shadowBlur = 0
  }

  hue += 0.5
  requestAnimationFrame(animate)
}

onMounted(() => {
  if (!canvas.value) return

  ctx = canvas.value.getContext('2d')
  if (!ctx) return

  canvas.value.width = window.innerWidth
  canvas.value.height = window.innerHeight

  lastX = canvas.value.width / 2
  lastY = canvas.value.height / 2

  window.addEventListener('mousemove', handleMouseMove)
  animate()
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
.canvas-container {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
  pointer-events: none;
}

.background-canvas {
  display: block;
  width: 100%;
  height: 100%;
}
</style>
