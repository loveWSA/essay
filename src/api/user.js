import request from '@/utils/request'
// 注册
export const userRegisterServise = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })
// 登录
export const userLoginServise = ({ username, password }) =>
  request.post('/api/login', { username, password })
// 获取用户信息
export const userGetInfoServise = () => request.get('/my/userinfo')
