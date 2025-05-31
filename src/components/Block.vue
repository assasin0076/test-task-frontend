<script setup lang="ts">
import useMainCombiner from '@/composables/classesCombiners/mainCombiner'
import { DataElement } from '@/composables/fakeData'
import { computed } from 'vue'

const { frostGlassStyle, listItemStyle } = useMainCombiner()

interface Props {
  block: DataElement
  selected?: boolean
  disabled?: boolean
  theme?: {
    size?: 'sm' | 'md'
    style?: 'danger'
  }
}
const props = defineProps<Props>()

const defineSize = computed(() => {
  return props.theme?.size || 'md'
})

const hoverStyles = computed(() => {
  if (props.disabled) return ''
  if (props.theme?.style === 'danger') return 'hover:bg-red-100'
  return 'hover:bg-blue-100'
})
</script>

<template>
  <div
    :class="{
      [frostGlassStyle]: true,
      [listItemStyle]: true,
      [hoverStyles]: true,
      ['!bg-gray-300/20']: selected | disabled,
      ['!cursor-default']: disabled,
      ['!w-[120px] h-[90px] text-[12px]']: defineSize === 'sm',
    }"
    class="hover:bg-blue-100"
  >
    {{ block.name }}
  </div>
</template>
