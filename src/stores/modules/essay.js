import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEssayStore = defineStore(
  'essay',
  () => {
    const id = ref()
    const title = ref()
    const date = ref()
    const state = ref()
    const college = ref()
    const major = ref()
    const class_name = ref()
    const name = ref()
    const number = ref()
    const teacher = ref()
    const content = ref()
    const kind = ref(['艺术类', '设计类'])
    return {
      id,
      title,
      date,
      state,
      college,
      major,
      class_name,
      name,
      number,
      teacher,
      content,
      kind
    }
  },
  {
    persist: true
  }
)
