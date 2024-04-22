<script setup>
import PageContainer from '@/components/PageContainer.vue'
</script>

<template>
  <PageContainer title="论文管理">
    <template #extra>
      <el-button type="primary">添加论文</el-button>
    </template>
    主体部分，是表格 + 分页
  </PageContainer>
</template>
