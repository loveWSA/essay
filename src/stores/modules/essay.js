import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEssayStore = defineStore(
  'essay',
  () => {
    const essay = ref([])
    const setEssay = (obj) => {
      essay.value.push(obj)
    }
    return {
      essay,
      setEssay
    }
  },
  {
    persist: true
  }
)
