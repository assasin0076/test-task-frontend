<template>
  <NavBubble />
  <CanvasBG />
  <router-view />
</template>

<script setup lang="ts">
import NavBubble from '@/components/NavBubble.vue'
import CanvasBG from '@/components/CanvasBG.vue'
</script>
