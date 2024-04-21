<script setup>
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores'
import { storeToRefs } from 'pinia'

const router = useRouter()
const goHome = () => {
  router.push('/home')
}
// 解构pinia数据和方法
const userStore = useUserStore()
const { setToken, removeToken } = userStore
const { token } = storeToRefs(userStore)
</script>

<template>
  <div>
    <h1>我是APP</h1>
    <el-button @click="goHome">首页</el-button>
    <el-button @click="$router.push('/list')">列表</el-button>

    <p>{{ token }}</p>
    <el-button @click="setToken('loveWSA')">登录</el-button>
    <el-button @click="removeToken">退出</el-button>
  </div>
</template>
