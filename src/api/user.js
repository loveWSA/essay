import request from '@/utils/request'

export const userRegisterServise = ({ username, password, repassword }) =>
  request.post('/api/reg', { username, password, repassword })

export const userLoginServise = ({ username, password }) =>
  request.post('/api/login', { username, password })
