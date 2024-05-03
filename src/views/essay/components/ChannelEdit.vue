<script setup>
import { ref } from 'vue'
import { useEssayStore } from '@/stores'
const essayStore = useEssayStore()
const dialogVisible = ref(false)
const formRef = ref()
const formModel = ref({
  kindName: '',
  kindAlias: ''
})
const rules = {
  kindName: [
    { required: true, message: '请输入分类名称', trigger: 'blur' },
    {
      pattern: /^\S{1,10}$/,
      message: '分类名称应为1-10位非空字符',
      trigger: 'blur'
    }
  ],
  kindAlias: [
    { required: true, message: '请输入分类别名', trigger: 'blur' },
    {
      pattern: /^[a-zA-Z0-9]{1,15}$/,
      message: '分类别名应为1-15位字母或数字',
      trigger: 'blur'
    }
  ]
}

// 组件对外暴露一个方法 open 基于open传来的参数 区分添加还是编辑
const open = (row) => {
  dialogVisible.value = true
  formModel.value = { ...row }
}
// 向外暴露
defineExpose({
  open
})

const emit = defineEmits(['success'])
const onSubmit = async () => {
  await formRef.value.validate()
  const isEdit = formModel.value.kindId
  if (isEdit) {
    essayStore.editKind(formModel.value)
    ElMessage.success('编辑成功')
  } else {
    essayStore.addKind(formModel.value)
    ElMessage.success('添加成功')
  }
  dialogVisible.value = false
  emit('success')
}
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    :title="formModel.id ? '编辑分类' : '添加分类'"
    width="500"
  >
    <el-form
      ref="formRef"
      :model="formModel"
      :rules="rules"
      label-width="100px"
      style="padding-right: 30px"
    >
      <el-form-item label="分类名称" prop="kindName">
        <el-input
          placeholder="请输入分类名称"
          v-model="formModel.kindName"
        ></el-input>
      </el-form-item>

      <el-form-item label="分类别名" prop="kindAlias">
        <el-input
          placeholder="请输入分类别名"
          v-model="formModel.kindAlias"
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确认 </el-button>
      </div>
    </template>
  </el-dialog>
</template>
