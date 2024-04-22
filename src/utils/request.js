import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router'
const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // 创建axios实例 设置基地址和超时时间
  baseURL, // 基地址
  timeout: 10000 // 超时时间
})
// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // 判断是否有token
    const useStore = useUserStore()
    // 如果有 在请求头添加 token
    if (useStore.token) {
      config.headers.Authorization = useStore.token
    }
    return config
  },
  (err) => Promise.reject(err)
)
// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // code 为0 成功 直接返回res
    if (res.data.code == 0) {
      return res
    }
    // code 不为0 处理业务失败
    // 给错误提示 抛出错误
    ElMessage.error(res.data.message || '服务异常')
    return Promise.reject(res.data)
  },
  (err) => {
    // 错误特殊情况 401 (权限不足或token过期)
    // 跳转到登录页面
    if (err.response?.status === 401) {
      router.push('/')
    }
    // 错误默认情况处理 直接给提示
    ElMessage.error(err.response.data.message || '服务异常')
    return Promise.reject(err)
  }
)

export default instance
export { baseURL }
