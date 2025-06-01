import { Ref, ref } from 'vue'
import blocks from '../dictionaries/blocks'

interface DataElement {
  id: number
  name: string
}

interface SeedBlocksResult {
  right: DataElement[]
  left: DataElement[]
}

interface UseFakeDataReturn {
  isLoading: Ref<boolean>
  getFakeData: () => Promise<SeedBlocksResult>
}

const useFakeData = (): UseFakeDataReturn => {
  const isLoading: Ref<boolean> = ref(false)

  const getFakeData = (): Promise<SeedBlocksResult> => {
    isLoading.value = true
    return new Promise<SeedBlocksResult>((resolve) => {
      setTimeout(() => {
        const rightData = JSON.parse(JSON.stringify(blocks.right))
        const leftData = JSON.parse(JSON.stringify(blocks.left))
        isLoading.value = false
        resolve({ right: rightData, left: leftData })
      }, 2000)
    })
  }

  return {
    isLoading,
    getFakeData,
  }
}

export type { DataElement }
export type { SeedBlocksResult }

export { useFakeData }
