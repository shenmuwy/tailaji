import { Dropdown } from 'antd';
import img_user from '@/assets/images/img_user.jpg'
import type { MenuProps } from 'antd';
import { useNavigate } from 'react-router-dom';

const headModel = () => {
  const navigate = useNavigate()

  const items: MenuProps['items'] = [
    {
      key: '1',
      label: (
        <div rel="noopener noreferrer">
          修改密码
        </div>
      ),
    },
    {
      key: '2',
      label: (
        <div rel="noopener noreferrer" onClick={() => { queit() }}>
          退出登录
        </div>
      ),
    }
  ];

  const queit = () => {
    navigate('/')
  }

  return (
    <div className="headModel">
      <Dropdown menu={{ items }} placement="bottom" arrow className='dropdown'>
        <img className='img_user' src={img_user} />
      </Dropdown>
    </div>
  )
}

export default headModel