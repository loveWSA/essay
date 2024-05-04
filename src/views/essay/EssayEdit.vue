<script setup>
import { ref } from 'vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { useRouter, useRoute } from 'vue-router'
import 'bytemd/dist/index.css' // 导入编辑器样式
import { Editor } from '@bytemd/vue-next' // 导入编辑器组件
import zhHans from 'bytemd/lib/locales/zh_Hans.json' // 汉化
import 'juejin-markdown-themes/dist/juejin.min.css'
import { useEssayStore } from '@/stores'
const router = useRouter()
const route = useRoute()
const essayStore = useEssayStore()
// 收集数据
const formModel = ref({
  id: '',
  title: '',
  date: '',
  kind: '',
  state: '',
  college: '理学院',
  major: '信息与计算科学',
  class_name: '信20-1',
  name: '代浩然',
  number: '20105010105',
  teacher: '徐夙',
  content: ''
})
// 校验
const rules = {
  title: [{ required: true, message: '请输入论文标题', trigger: 'blur' }],
  date: [{ required: true, message: '请输入日期', trigger: 'change' }],
  college: [{ required: true, message: '请输入学院', trigger: 'blur' }],
  major: [{ required: true, message: '请输入专业', trigger: 'blur' }],
  kind: [{ required: true, message: '请输入论文分类', trigger: 'blur' }],
  class_name: [{ required: true, message: '请输入班级', trigger: 'blur' }],
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  number: [
    { required: true, message: '请输入学号', trigger: 'blur' },
    {
      pattern: /^[0-9]{11}$/,
      message: '学号必须是11位的数字',
      trigger: 'blur'
    }
  ],
  teacher: [{ required: true, message: '请输入指导教师名字', trigger: 'blur' }]
}
if (route.query.id) {
  const id = route.query.id
  formModel.value = essayStore.essay.filter((item) => item.id == id)[0]
} else {
  // 随机生成四位id
  const createId = () => {
    let arr = []
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (let i = 0; i < 4; i++) {
      arr.push(characters.charAt(Math.floor(Math.random() * characters.length)))
    }
    formModel.value.id = arr.join('')
  }
  createId()
}

// 判断是否为封面页
const isCover = ref(true)
// 切内容页
const form = ref()
const changeContent = async () => {
  // 预校验
  await form.value.validate()
  isCover.value = false
}
// 存草稿
const toListEdit = async () => {
  if (route.query.id) {
    await ElMessageBox.confirm('要保存修改内容么', '温馨提示', {
      distinguishCancelAndClose: true,
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning'
    })
      .then(() => {
        essayStore.editEssay(formModel.value)
        router.push('/essay/list')
      })
      .catch((action) => {
        if (action === 'cancel') router.push('/essay/list')
      })
  } else {
    await ElMessageBox.confirm('要保存为草稿么', '温馨提示', {
      distinguishCancelAndClose: true,
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning'
    })
      .then(() => {
        formModel.value.state = '草稿'
        essayStore.setEssay(formModel.value)
        router.push('/essay/list')
      })
      .catch((action) => {
        if (action === 'cancel') router.push('/essay/list')
      })
  }
}
// 返回封面页
const changeCover = () => {
  isCover.value = true
}
// 编辑器文本获取
const handleChange = (v) => {
  formModel.value.content = v
}
// 保存
const save = async () => {
  if (route.query.id) {
    await ElMessageBox.confirm('要发布论文么', '温馨提示', {
      distinguishCancelAndClose: true,
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning'
    })
      .then(() => {
        formModel.value.state = '已发布'
        essayStore.editEssay(formModel.value)
        router.push('/essay/list')
      })
      .catch((action) => {
        if (action === 'cancel') {
          formModel.value.state = '草稿'
          essayStore.editEssay(formModel.value)
          router.push('/essay/list')
        }
      })
  } else {
    await ElMessageBox.confirm('要发布论文么', '温馨提示', {
      distinguishCancelAndClose: true,
      confirmButtonText: '是',
      cancelButtonText: '否',
      type: 'warning'
    })
      .then(() => {
        formModel.value.state = '已发布'
        essayStore.setEssay(formModel.value)
        router.push('/essay/list')
      })
      .catch((action) => {
        if (action === 'cancel') {
          formModel.value.state = '草稿'
          essayStore.setEssay(formModel.value)
          router.push('/essay/list')
        }
      })
  }
}
</script>

<template>
  <el-card v-if="isCover" class="container">
    <el-row class="login-page">
      <el-col :span="12" class="form">
        <!-- 封面 -->
        <el-form ref="form" class="form" :model="formModel" :rules="rules">
          <!-- 标题 -->
          <el-form-item prop="title" label="论文标题" label-width="80px">
            <el-input v-model="formModel.title" style="width: 240px"></el-input>
          </el-form-item>
          <!-- 日期 -->
          <el-form-item prop="date" label="日期" label-width="80px">
            <!-- <el-input v-model="formModel.date" style="width: 240px"></el-input> -->
            <div class="demo-date-picker">
              <el-date-picker
                v-model="formModel.date"
                type="date"
                placeholder="请选择日期"
                value-format="YYYY年MM月DD日"
              />
            </div>
          </el-form-item>
          <el-form-item prop="kind" label="分类" label-width="80px">
            <ChannelSelect v-model="formModel.kind"></ChannelSelect>
          </el-form-item>
          <!-- 学院 -->
          <el-form-item prop="college" label="学院" label-width="80px">
            <el-input
              v-model="formModel.college"
              style="width: 240px"
            ></el-input>
          </el-form-item>
          <!-- 专业 -->
          <el-form-item prop="major" label="专业" label-width="80px">
            <el-input v-model="formModel.major" style="width: 240px"></el-input>
          </el-form-item>
          <!-- 班级 -->
          <el-form-item prop="class_name" label="班级" label-width="80px">
            <el-input
              v-model="formModel.class_name"
              style="width: 240px"
            ></el-input>
          </el-form-item>
          <!-- 姓名 -->
          <el-form-item prop="name" label="姓名" label-width="80px">
            <el-input v-model="formModel.name" style="width: 240px"></el-input>
          </el-form-item>
          <!-- 学号 -->
          <el-form-item prop="number" label="学号" label-width="80px">
            <el-input
              v-model="formModel.number"
              style="width: 240px"
            ></el-input>
          </el-form-item>
          <!-- 指导教师 -->
          <el-form-item prop="teacher" label="指导教师" label-width="80px">
            <el-input
              v-model="formModel.teacher"
              style="width: 240px"
            ></el-input>
          </el-form-item>
          <!-- 按钮 -->
          <el-form-item class="button">
            <el-button @click="changeContent" type="primary"> 保存 </el-button>
            <el-button @click="toListEdit" style="margin-left: 50px">
              返回
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
      <el-col :span="10" :offset="1" class="cover">
        <div><img src="@/assets/head.png" alt="" /></div>
        <div class="front">
          <div class="essayTitle">论文题目:{{ formModel.title }}</div>
          <div class="item">学<span>院:</span>{{ formModel.college }}</div>
          <div class="item">专<span>业:</span>{{ formModel.major }}</div>
          <div class="item">班<span>级:</span>{{ formModel.class_name }}</div>
          <div class="item">姓<span>名:</span>{{ formModel.name }}</div>
          <div class="item">学<span>号:</span>{{ formModel.number }}</div>
          <div class="item">指导教师:{{ formModel.teacher }}</div>
          <div class="date" v-if="formModel.date">{{ formModel.date }}</div>
          <div class="date" v-else>20 年 月 日</div>
        </div>
      </el-col>
    </el-row>
  </el-card>
  <!-- 内容 -->
  <PageContainer v-else :title="formModel.title">
    <!-- 标题 -->
    <template #extra>
      <el-button @click="save" type="primary" style="margin-left: 10px"
        >保存</el-button
      >
      <el-button @click="changeCover" type="primary">返回</el-button>
    </template>
    <!-- markdown编辑器 -->
    <div class="details">
      <Editor
        class="editos"
        :value="formModel.content"
        :locale="zhHans"
        @change="handleChange"
      />
    </div>
  </PageContainer>
</template>
<style lang="scss" scoped>
.container {
  min-height: 100%;
  box-sizing: border-box;
}
.form {
  margin-top: 20px;
}
.button {
  margin-left: 90px;
}
img {
  width: 100%;
}
.front {
  font-family: '黑体';
  font-size: 18px;
  font-weight: bold;
  margin: 10px 92px;
}
.item {
  margin-top: 10px;
}
.essayTitle {
  margin-bottom: 40px;
}
span {
  margin-left: 36px;
}
.date {
  margin-top: 40px;
  text-align: center;
}
.details {
  width: 100%;
  height: 100%;
  :deep() {
    .bytemd {
      height: calc(100vh - 200px);
    }
  }
}
</style>
