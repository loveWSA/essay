<script setup>
import PageContainer from '@/components/PageContainer.vue'
import ChannelSelect from '@/views/essay/components/ChannelSelect.vue'
import { ref } from 'vue'
import { Edit, Delete } from '@element-plus/icons-vue'
import { essayGetListService } from '@/api/essay'
import { formatTime } from '@/utils/format'
// 定义请求参数对象
const params = ref({
  pagenum: 1,
  pagesize: 5,
  cate_id: '',
  state: ''
})

const essayList = ref([])
const total = ref(0)
const getEssayList = async () => {
  const res = await essayGetListService(params.value)
  essayList.value = res.data.data
  total.value = res.data.total
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
</script>

<template>
  <PageContainer title="论文管理">
    <template #extra>
      <el-button type="primary">添加论文</el-button>
    </template>
    <!-- 表单区域 -->
    <el-form inline>
      <el-form-item label="文章分类：">
        <!-- label 给用户看 value 提交到后台 -->
        <ChannelSelect v-model="params.cate_id"></ChannelSelect>
      </el-form-item>
      <el-form-item label="状态：">
        <el-select style="width: 240px" v-model="params.state">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">搜索</el-button>
        <el-button>重置</el-button>
      </el-form-item>
    </el-form>
    <!-- 表格区域 -->
    <el-table :data="essayList">
      <el-table-column label="文章标题" prop="title">
        <!-- 利用作用域插槽 可以获取当前行数据row -->
        <template #default="{ row }">
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
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
