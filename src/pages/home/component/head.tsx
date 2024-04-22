import { Dropdown } from 'antd';
import img_user from '@/assets/images/img_user.jpg'
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux'
import { commonStateType } from '@/interface/store';

interface headProps {
  showModal: Function
}

const headModel = ({showModal}: headProps) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  
  const isExpande = useSelector((state: { common: commonStateType }) => state.common.isExpande)
  const userAvatar = useSelector((state: { common: commonStateType }) => state.common.userAvatar)

  const loginout = () => {
    dispatch({ type: 'common/setToken', payload: '' })
    navigate('/')
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div rel="noopener noreferrer" onClick={() => {showModal&&showModal(true)}}>
          修改密码
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div rel="noopener noreferrer" onClick={() => showModal&&showModal(false)}>
          修改头像
        </div>
      ),
    },
    {
      key: '3',
      label: (
        <div rel="noopener noreferrer" onClick={() => loginout()}>
          退出登录
        </div>
      ),
    }
  ];

  

  return (
    <div className="headModel">
      <div className='Expande' onClick={() => dispatch({ type: 'common/setIsExpande', payload: !isExpande })}>
        {isExpande ? <MenuUnfoldOutlined /> : <MenuFoldOutlined/>}
      </div>
      <Dropdown menu={{ items }} placement="bottom" arrow className='dropdown'>
        <img className='img_user' src={userAvatar || img_user} />
      </Dropdown>
    </div>
  )
}

export default headModel