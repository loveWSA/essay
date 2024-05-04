<script setup>
import { ref } from 'vue'
import { useUserStore } from '@/stores'
import { userUpdateInfoService } from '@/api/user'
import { ElMessage } from 'element-plus'
// 使用初始值 不需要响应式 可以直接解构
const {
  user: { email, id, nickname, username },
  getUser
} = useUserStore()
// 绑定表单( 预校验 )
const formRef = ref()
// 表单数据
const form = ref({
  username,
  nickname,
  email,
  id
})
// 校验规则
const nicknameRules = [
  { required: true, message: '请输入用户昵称', trigger: 'blur' },
  {
    pattern: /^\S{2,10}/,
    message: '昵称为 2 到 10 个非空字符',
    trigger: 'blur'
  }
]

const emailRules = [
  { required: true, message: '请输入邮箱地址', trigger: 'blur' },
  { type: 'email', message: '邮箱格式不正确', trigger: ['blur', 'change'] }
]

// 提交表单
const submitForm = async () => {
  // 预校验
  await formRef.value.validate()
  // 提交修改
  await userUpdateInfoService(form.value)
  // 重新获取数据
  getUser()
  // 提示用户
  ElMessage.success('修改信息成功')
}
</script>
<template>
  <PageContainer title="基本资料">
    <template #default>
      <!-- 表单部分 -->
      <el-form
        style="width: 500px"
        ref="formRef"
        :model="form"
        label-width="120px"
      >
        <el-form-item label="登录名称">
          <el-input size="large" v-model="form.username" disabled></el-input>
        </el-form-item>
        <el-form-item label="用户昵称" prop="nickname" :rules="nicknameRules">
          <el-input size="large" v-model="form.nickname"></el-input>
        </el-form-item>
        <el-form-item label="用户邮箱" prop="email" :rules="emailRules">
          <el-input size="large" v-model="form.email"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button size="large" type="primary" @click="submitForm"
            >提交修改</el-button
          >
        </el-form-item>
      </el-form>
    </template>
  </PageContainer>
</template>
