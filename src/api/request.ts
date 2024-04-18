import { store } from '@/store'
import axios from 'axios'
import { message } from 'antd'

let showMessage = true



const service = axios.create({
  timeout: 10000,
})
service.interceptors.request.use(
  async conf => {
    const token = store.getState().common.token
    
    conf.baseURL = 'http://localhost:3000'
    conf.headers['X-Token'] = token
    return conf
  },
  error => {
    return Promise.reject(error)
  }
)
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 401) {
      store.dispatch({type:'common/setToken', payload: ''})
      window.location.href='/'
      if (showMessage) {
        message.error(res.msg)
      }
      showMessage = false
      setTimeout(() =>{
        showMessage=true
      }, 3 * 1000)
    }
    
    return response
  },
  (err) => {
    console.log(err)
  }
)
export default service