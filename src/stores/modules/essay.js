import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEssayStore = defineStore(
  'essay',
  () => {
    const essay = ref([])
    // 新建论文
    const setEssay = (obj) => {
      essay.value.push(obj)
    }
    // 编辑论文
    const editEssay = (obj) => {
      for (let i = 0; i < essay.value.length; i++) {
        if (essay.value[i].id === obj.id) {
          essay.value[i] = obj
        }
      }
    }
    // 删除论文
    const delEssay = (id) => {
      const test = []
      for (let i = 0; i < essay.value.length; i++) {
        if (essay.value[i].id !== id) {
          test.push(essay.value[i])
        }
      }
      essay.value = test
    }
    // 分类
    const kind = ref([])
    // 新建分类
    const addKind = (obj) => {
      const result = obj
      // floor 向下取整
      // random() * 90000 生成0-89999.9之间的随机数
      // +10000 确保是五位数
      result.kindId = Math.floor(Math.random() * 90000) + 10000
      kind.value.push(result)
    }
    // 编辑分类
    const editKind = (obj) => {
      for (let i = 0; i < kind.value.length; i++) {
        if (kind.value[i].kindId === obj.kindId) {
          kind.value[i].kindName = obj.kindName
          kind.value[i].kindAlias = obj.kindAlias
        }
      }
    }
    // 删除分类
    const delKind = (kindId) => {
      kind.value = kind.value.filter((item) => item.kindId !== kindId)
    }
    return {
      essay,
      setEssay,
      editEssay,
      delEssay,
      kind,
      editKind,
      addKind,
      delKind
    }
  },
  {
    persist: true
  }
)
