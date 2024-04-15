import Login from '../pages/login'

export const rootRouter = [
  {
    path: '/',
    element: <Login />,
    meta: {
      title: '登录',
      key: 'login'
    }
  }
]