<script setup>
import { userRegisterServise, userLoginServise } from '@/api/user.js'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'
import { User, Lock } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
const isRegister = ref(false)
const userStore = useUserStore()
const router = useRouter()
const { setToken } = userStore
const form = ref()
// 用于提交的数据
const formModel = ref({
  username: '',
  password: '',
  repassword: ''
})
// 校验规则
// message 消息提示 trigger 触发时机(blur 失焦 change 改变)
// 非空校验 required
// 长度校验 min max
// 正则校验 pattern \S 非空
// 自定义校验 自定义校验函数
// validator: (rule, value, callback)
//    1.rule     当前校验规则的相关信息
//    2.value    目前的表单值
//    3.callback 结果返回
//        callback()                    校验成功
//        callback(new Error(错误信息))  校验失败
const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名为5-10位的非空字符', trigger: 'blur' }
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    }
  ],
  repassword: [
    { required: true, message: '请再次输入密码', trigger: 'blur' },
    {
      pattern: /^\S{6,15}$/,
      message: '密码必须是6-15位的非空字符',
      trigger: 'blur'
    },
    {
      validator: (rule, value, callback) => {
        // 判断 value 和 password 是否一致
        if (value !== formModel.value.password) {
          callback(new Error('两次输入的密码不一致'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}
const register = async () => {
  // 预校验
  await form.value.validate()
  await userRegisterServise(formModel.value)
  ElMessage.success('注册成功')
  isRegister.value = false
}
const login = async () => {
  await form.value.validate()
  const res = await userLoginServise(formModel.value)
  setToken(res.data.token)
  router.push('/')
}
// 切换的时候重置表单内容
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: ''
  }
})
</script>

<template>
  <!-- el-row 表示一行 一共24份 -->
  <el-row class="login-page">
    <!-- 
      el-col 表示列 
        :span 表示占多少份
        :offset 表示左侧margin的份数 
      -->
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- el-form 表单 -->
      <!-- 
        v-if 判断显示哪个表单
          true  注册
          false 登录
      -->
      <!-- 注册表单 -->
      <!-- 
        表单校验
          1.el-form => :model="ruleForm" 
            收集表单内的所有数据 { xxx, xxx, xxx }
          2.el-form => :rules="rules"    
            数据对应的校验规则   { xxx, xxx, xxx }
          3.表单元素 => v-model="ruleForm.xxx"
            给表单元素和数据绑定
          4.el-form-item => prop="xxx"
            将数据和校验规则绑定
      -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <!-- el-form-item 表单每一行 -->
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            show-password
            placeholder="请再次输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="register"
            class="button"
            type="primary"
            auto-insert-space
          >
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false">
            ← 返回
          </el-link>
        </el-form-item>
      </el-form>
      <!-- 登录表单 -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-else
      >
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            type="password"
            show-password
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码？</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            @click="login"
            class="button"
            type="primary"
            auto-insert-space
            >登录</el-button
          >
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true">
            注册 →
          </el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;
  .bg {
    background:
      url('@/assets/ncut_title.png') no-repeat 50% top / 500px auto,
      url('@/assets/ncut_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }
  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;
    .title {
      margin: 0 auto;
    }
    .button {
      width: 100%;
    }
    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
