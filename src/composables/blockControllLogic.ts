import { computed, ComputedRef, ref, Ref } from 'vue'
import { DataElement, SeedBlocksResult } from '../composables/fakeData'

interface UseBlockControllLogicReturn {
  isLeftMaxSize: ComputedRef<boolean>
  leftBLock: Ref<DataElement[]>
  selectedLeft: Ref<DataElement['id'][]>
  getLeftById: (id: DataElement['id']) => DataElement | undefined
  isLeftAlreadyIn: (id: DataElement['id']) => boolean
  selectLeft: (item: DataElement) => void
  removeLeft: (id: DataElement['id']) => void
  rightBlock: Ref<DataElement[]>
  selectedRight: Ref<DataElement['id'] | undefined>
  isRightSelected: (id: DataElement['id']) => boolean
  getRightById: (id: DataElement['id']) => DataElement | undefined
  selectRight: (item: DataElement) => void
  unselectRight: () => void
  resetSelection: () => void
  reset: () => void
  seedData: (data: SeedBlocksResult) => void
}

const useBlockControllLogic = (): UseBlockControllLogicReturn => {
  const leftBLock: Ref<DataElement[]> = ref([])
  const selectedLeft: Ref<DataElement['id'][]> = ref([])

  const getLeftById = (id: DataElement['id']): DataElement | undefined => {
    return leftBLock.value.find((el) => el.id === id)
  }

  const maxSize = 6

  const isLeftMaxSize = computed<boolean>(() => selectedLeft.value.length >= maxSize)

  const isLeftAlreadyIn = (id: DataElement['id']): boolean => {
    return selectedLeft.value.some((el) => el === id)
  }

  const selectLeft = (item: DataElement): void => {
    if (isLeftMaxSize.value) return
    if (isLeftAlreadyIn(item.id)) return
    selectedLeft.value = [...selectedLeft.value, item.id]
  }

  const removeLeft = (id: DataElement['id']): void => {
    selectedLeft.value = selectedLeft.value.filter((el) => el !== id)
  }

  const rightBlock: Ref<DataElement[]> = ref([])
  const selectedRight: Ref<DataElement['id'] | undefined> = ref()

  const isRightSelected = (id: DataElement['id']): boolean => {
    return selectedRight.value === id
  }

  const getRightById = (id: DataElement['id']): DataElement | undefined => {
    return rightBlock.value.find((el) => el.id === id)
  }

  const selectRight = (item: DataElement): void => {
    selectedRight.value = item.id
  }

  const unselectRight = (): void => {
    selectedRight.value = undefined
  }

  const resetSelection = (): void => {
    selectedLeft.value = []
    selectedRight.value = undefined
  }

  const reset = (): void => {
    resetSelection()
    leftBLock.value = []
    rightBlock.value = []
  }

  const seedData = (data: SeedBlocksResult): void => {
    const cloned = JSON.parse(JSON.stringify(data)) as SeedBlocksResult
    leftBLock.value = cloned.left
    rightBlock.value = cloned.right
  }

  return {
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
    seedData,
  }
}

export { useBlockControllLogic }
