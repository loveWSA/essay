<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { essayGetKindService } from '@/api/essay'
import { ref } from 'vue'
const loading = ref(false)
const essayKind = ref([])
const getEssayKind = async () => {
  loading.value = true
  const res = await essayGetKindService()
  essayKind.value = res.data.data
  loading.value = false
}
getEssayKind()

const essayEdit = (row, $index) => {
  console.log(row, $index)
}
const essayDelete = (row, $index) => {
  console.log(row, $index)
}
</script>

<template>
  <PageContainer title="论文分类">
    <template #extra>
      <el-button type="primary">添加分类</el-button>
    </template>
    <!-- 表格 -->
    <el-table v-loading="loading" :data="essayKind" style="width: 100%">
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column prop="" label="操作" width="150">
        <!-- row     essayKind的每一项 -->
        <!-- $index  下标 -->
        <template #default="{ row, $index }">
          <el-button
            type="primary"
            :icon="Edit"
            circle
            plain
            @click="essayEdit(row, $index)"
          ></el-button>
          <el-button
            type="danger"
            :icon="Delete"
            circle
            plain
            @click="essayDelete(row, $index)"
          ></el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty description="没有数据" />
      </template>
    </el-table>
  </PageContainer>
</template>
