<script setup>
import { ref } from 'vue'
import ChannelSelect from './components/ChannelSelect.vue'
import { useRouter } from 'vue-router'
const router = useRouter()
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
  await ElMessageBox.confirm('要保存为草稿么', '温馨提示', {
    distinguishCancelAndClose: true,
    confirmButtonText: '确认',
    cancelButtonText: '取消',
    type: 'warning'
  })
    .then(() => {
      formModel.value.state = '草稿'
      // 保存数据
      router.push('/essay/list')
    })
    .catch((action) => {
      if (action === 'cancel') router.push('/essay/list')
    })
}
const changeCover = () => {
  isCover.value = true
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
      <el-col :span="8" :offset="2" class="cover">
        <div><img src="@/assets/head.png" alt="" /></div>
        <div class="">
          <div>论文题目:{{ formModel.title }}</div>

          <div>学院:{{ formModel.college }}</div>
          <div>专业:{{ formModel.major }}</div>
          <div>班级:{{ formModel.class_name }}</div>
          <div>姓名:{{ formModel.name }}</div>
          <div>学号:{{ formModel.number }}</div>
          <div>指导教师:{{ formModel.teacher }}</div>
          <div>日期:{{ formModel.date }}</div>
          <div>{{ formModel.id }}</div>
        </div>
      </el-col>
    </el-row>
  </el-card>
  <!-- 内容 -->
  <PageContainer v-else :title="formModel.title">
    <template #extra>
      <ChannelSelect v-model="formModel.kind"></ChannelSelect>
      <el-button type="primary">保存</el-button>
      <el-button @click="changeCover" type="primary">返回</el-button>
    </template>
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
</style>
