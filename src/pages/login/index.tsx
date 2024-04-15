import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './login.scss'

function Login() {
  
  const navigate = useNavigate()
  const [userName, setUserName] = useState('admin')
  const [passWord, setPassWord] = useState('123456')

  function HandleLogin() {
    console.log('你登录了', userName, passWord)
    navigate('/home')
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
            submit
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