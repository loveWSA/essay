import request from '@/utils/request'
// 获取文章分类
export const essayGetKindService = () => request.get('/my/cate/list')
