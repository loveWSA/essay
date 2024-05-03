<script setup>
import { ref } from 'vue'
import { useEssayStore } from '@/stores'

defineProps({
  modelValue: {
    type: String
  }
})
const emit = defineEmits(['update:modelValue'])

const essayList = ref([])
const essayStore = useEssayStore()
essayList.value = essayStore.kind
</script>

<template>
  <el-select
    style="width: 240px"
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
  >
    <el-option
      v-for="kind in essayList"
      :key="kind.kindId"
      :label="kind.kindName"
      :value="kind.kindName"
    ></el-option>
  </el-select>
</template>
