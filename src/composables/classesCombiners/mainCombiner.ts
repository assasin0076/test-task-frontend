import { computed, ComputedRef, Ref, ref } from 'vue'

interface MainCombiner {
  frostGlassStyle: Ref<string>
  listItemStyle: ComputedRef<string>
}
const useMainCombiner = (): MainCombiner => {
  const frostGlassStyle: Ref<string> = ref(
    'p-8 bg-white/20 backdrop-blur-lg border border-gray-300 rounded-lg shadow-lg inline-block nowrap flex-wrap',
  )

  const itemPart: Ref<string> = ref('w-[140px] max-w-[140px] cursor-pointer')

  const listItemStyle: ComputedRef<string> = computed(() => {
    return frostGlassStyle.value + ' ' + itemPart.value
  })

  return {
    frostGlassStyle,
    listItemStyle,
  }
}

export default useMainCombiner
