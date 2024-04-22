import request from './request'
const api = {
  // 用户登录
  postLogin: (data: any) => request.post('/api/user_login', data),
  // 获取设备列表
  getCpuMessage: () => request.get('/api/get_cpu'),
  // 修改密码
  getUserModify: (data: any) => request.get('/api/user_modify', {
    params: {
      ...data
    }
  }),
  uploadImg: (data: any) => request.post('/api/user_upload', data),
}
export default api