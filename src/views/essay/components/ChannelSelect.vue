<script setup>
import { essayGetKindService } from '@/api/essay.js'
import { ref } from 'vue'

defineProps({
  modelValue: {
    type: [Number, String]
  }
})
const emit = defineEmits(['update:modelValue'])

const essayList = ref([])
const getEssayKind = async () => {
  const res = await essayGetKindService()
  essayList.value = res.data.data
}
getEssayKind()
</script>

<template>
  <el-select
    style="width: 240px"
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <el-option
      v-for="kind in essayList"
      :key="kind.id"
      :label="kind.cate_name"
      :value="kind.id"
    ></el-option>
  </el-select>
</template>
