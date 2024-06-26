import Login from '../pages/login/login'
import Home from '../pages/home/home'
import Cpu from '../pages/home/component/cpu'
import Setting from '@/pages/home/component/setting'
import Model from '@/pages/home/component/model'
import { Navigate } from 'react-router-dom'

export const rootRouter = [
  {
    path: '/',
    element: <Login />,
    meta: {
      title: '登录',
      key: 'login'
    }
  },
  {
    path: '/home',
    element: <Navigate  to={'/home/cpu'}/>,
    meta: {
      title: '首页',
      key: 'home'
    }
  }, {
    path: '/home',
    element: <Home />,
    meta: {
      title: '首页',
      key: 'home'
    },
    children: [
      {
        path: '/home/cpu',
        element: <Cpu />
      }, {
        path: '/home/setting',
        element: <Setting />
      }, {
        path: '/home/install',
        element: <Model />
      }, {
        path: '*',
        element: <div>404,页面丢失了</div>
      }
    ]
  },{
    path: '*',
    element: <div>404,页面丢失了</div>
  }
]