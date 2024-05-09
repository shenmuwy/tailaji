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
  // 更新头像
  uploadImg: (data: any) => request.post('/api/user_upload', data),
   // 开启/关闭世界
   startWorld: (data: any) => request.get('/api/start_world', {
    params: {
      ...data
    }
  }),
  // 获取世界信息
  getWorldStatus: () => request.get('/api/world_status'),
}
export default api