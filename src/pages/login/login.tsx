import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './login.scss'
import api from '@/api/api';
import { useDispatch } from 'react-redux'
import { message } from 'antd';

function Login() {
  
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [userName, setUserName] = useState('admin')
  const [passWord, setPassWord] = useState('123456')

  async function HandleLogin() {
    console.log('你登录了', userName, passWord)
    const res = await api.postLogin({
      name: userName,
      psw: passWord
    })
    if (res.data.code === 200) {
      dispatch({type:'common/setToken', payload: res.data.data.token})
      navigate('/home')
    } else {
      message.error(res.data.msg)
    }
  }
  
  return (
    <div className='Login'>
      <div className='loginBox'>
        <div className='loginBox_title'>登录</div>
        <div>
          <div className='item'>
            <input type="text" required value={userName} onChange={e => {
              setUserName(e.target.value)
            }} />
            <label htmlFor=''>账号</label>
          </div>
          <div className='item'>
            <input type="password" required value={passWord} onChange={e => {
              setPassWord(e.target.value)
            }} />
            <label htmlFor=''>密码</label>
          </div>
          <button className='btn' onClick={HandleLogin}>
            登录
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Login