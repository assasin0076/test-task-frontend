<template>
  <NavBubble />
  <CanvasBG />
  <the-fly />
  <router-view />
</template>

<script setup lang="ts">
import NavBubble from '@/components/NavBubble.vue'
import CanvasBG from '@/components/CanvasBG.vue'
import TheFly from '@/components/TheFly.vue'
</script>
