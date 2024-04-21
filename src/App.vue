<script setup>
import { useRouter } from 'vue-router'

const router = useRouter()
const goHome = () => {
  router.push('/home')
}
</script>

<template>
  <div>
    我是APP
    <TestDemo></TestDemo>
    <el-button @click="goHome">首页</el-button>
    <el-button @click="$router.push('/list')">列表</el-button>
  </div>
</template>
