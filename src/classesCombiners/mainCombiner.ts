import { computed, ref } from 'vue'

const useMainCombiner = () => {
  const frostGlassStyle = ref(
    'p-8 bg-white/20 backdrop-blur-lg border border-gray-300 rounded-lg shadow-lg inline-block',
  )

  const itemPart = ref('max-w-[140px] h-min')

  const listItemStyle = computed(() => {
    return frostGlassStyle.value + ' ' + itemPart.value
  })

  return {
    frostGlassStyle,
    listItemStyle,
  }
}

export default useMainCombiner
