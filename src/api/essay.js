import request from '@/utils/request'
// 获取论文分类
export const essayGetKindService = () => request.get('/my/cate/list')
// 添加论文分类
export const essayAddKindService = (data) => request.post('/my/cate/add', data)
// 编辑论文分类
export const essayEditKindService = (data) => request.put('/my/cate/info', data)
// 删除文章分类
export const essayDelKindService = (id) =>
  request.delete('/my/cate/del', {
    params: { id }
  })

// 获取论文列表
export const essayGetListService = (params) =>
  request.get('/my/article/list', {
    params
  })
