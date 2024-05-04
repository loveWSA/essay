import request from '@/utils/request'
// 注册
export const userRegisterService = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })
// 登录
export const userLoginService = ({ username, password }) =>
  request.post('/api/login', { username, password })
// 获取用户信息
export const userGetInfoService = () => request.get('/my/userinfo')
// 更新用户信息
export const userUpdateInfoService = ({ id, username, nickname, email }) =>
  request.put('/my/userinfo', { id, username, nickname, email })
// 上传头像
export const userUpdatePicService = (avatar) =>
  request.patch('/my/update/avatar', { avatar })
// 更新密码
export const userUpdatePasswordService = ({ old_pwd, new_pwd, re_pwd }) =>
  request.patch('/my/updatepwd', { old_pwd, new_pwd, re_pwd })
