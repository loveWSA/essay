<script setup>
import PageContainer from '@/components/PageContainer.vue'
import ChannelSelect from '@/views/essay/components/ChannelSelect.vue'
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { formatTime } from '@/utils/format'
import { useRouter } from 'vue-router'
import { useEssayStore } from '@/stores'
const router = useRouter()
// 定义请求参数对象
const essayStore = useEssayStore()
const essayList = ref([])
const loading = ref(false)
// 获取文章列表数据
const getEssayList = () => {
  loading.value = true
  essayList.value = essayStore.essay
  console.log(essayList.value)
  loading.value = false
}
getEssayList()

// 编辑
const onEditEssay = (row) => {
  console.log(row)
}
// 删除
const onDeleteEssay = (row) => {
  console.log(row)
}
// 重置
// const onReset = () => {
//   params.value.state = ''
//   params.value.cate_id = ''
//   getEssayList()
// }
// 搜索
// const onSearch = () => {
//   getEssayList()
// }
// 论文编辑
const onEdit = () => {
  router.push('/essay/edit')
}
</script>

<template>
  <PageContainer title="论文管理">
    <template #extra>
      <el-button @click="onEdit" type="primary">添加论文</el-button>
    </template>
    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <!-- label 给用户看 value 提交到后台 -->
        <ChannelSelect v-model="essayList.kind"></ChannelSelect>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select style="width: 240px" v-model="essayList.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset">重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table :data="essayList" v-loading="loading">
      <el-table-column label="文章标题" prop="title">
        <!-- 利用作用域插槽 可以获取当前行数据row -->
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="kind"></el-table-column>
      <el-table-column label="发表时间" prop="date">
        <template #default="{ row }">
          {{ formatTime(row.pub_date) }}
        </template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            circle
            plain
            type="primary"
            :icon="Edit"
            @click="onEditEssay(row)"
          ></el-button>
          <el-button
            circle
            plain
            type="danger"
            :icon="Delete"
            @click="onDeleteEssay(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
  </PageContainer>
</template>
