<script setup>
import PageContainer from '@/components/PageContainer.vue'
import ChannelSelect from '@/views/essay/components/ChannelSelect.vue'
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { useRouter } from 'vue-router'
import { useEssayStore } from '@/stores'
const router = useRouter()
// 定义筛选对象
const params = ref({
  kind: '',
  state: ''
})
const essayStore = useEssayStore()
const essayList = ref([])
const loading = ref(false)
// 获取文章列表数据
const getEssayList = () => {
  loading.value = true
  essayList.value = essayStore.essay
  loading.value = false
}
getEssayList()

// 重置
const onReset = () => {
  params.value.state = ''
  params.value.kind = ''
  getEssayList()
}
// 搜索
const onSearch = () => {
  loading.value = true
  const test = []
  if (params.value.kind !== '' && params.value.state !== '') {
    for (let i = 0; i < essayStore.essay.length; i++) {
      if (
        essayStore.essay[i].kind === params.value.kind &&
        essayStore.essay[i].state === params.value.state
      ) {
        test.push(essayStore.essay[i])
      }
    }
    essayList.value = test
  }
  if (params.value.kind === '' && params.value.state === '') {
    ElMessage('请选择筛选的条件')
  }
  if (params.value.kind !== '' && params.value.state === '') {
    for (let i = 0; i < essayStore.essay.length; i++) {
      if (essayStore.essay[i].kind === params.value.kind) {
        test.push(essayStore.essay[i])
      }
    }
    essayList.value = test
  }
  if (params.value.kind === '' && params.value.state !== '') {
    for (let i = 0; i < essayStore.essay.length; i++) {
      if (essayStore.essay[i].state === params.value.state) {
        test.push(essayStore.essay[i])
      }
    }
    essayList.value = test
  }
  loading.value = false
}
// 新建论文
const addEssay = () => {
  router.push('/essay/edit')
}
// 编辑
const onEditEssay = (row) => {
  const id = row.id
  router.push({
    path: '/essay/edit',
    query: {
      id
    }
  })
}
// 删除
const onDeleteEssay = (row) => {
  essayStore.delEssay(row.id)
  getEssayList()
}
</script>

<template>
  <PageContainer title="论文管理">
    <template #extra>
      <el-button @click="addEssay" type="primary">添加论文</el-button>
    </template>
    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <!-- label 给用户看 value 提交到后台 -->
        <ChannelSelect v-model="params.kind"></ChannelSelect>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select style="width: 240px" v-model="params.state">
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
      <el-table-column label="文章标题" prop="title"> </el-table-column>
      <el-table-column label="分类" prop="kind"></el-table-column>
      <el-table-column label="发表时间" prop="date"> </el-table-column>
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
