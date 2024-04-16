
import HeardModel from './component/head.tsx';
import React from 'react';
import { Outlet } from 'react-router-dom';
import './home.scss'
import {
  ContainerOutlined,
  DesktopOutlined,
  HomeOutlined,
} from '@ant-design/icons';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { commonStateType } from '@/interface/store.ts';
type MenuItem = Required<MenuProps>['items'][number];

const homePage = () => {
  const navigate = useNavigate();
  const isExpande = useSelector((state: { common: commonStateType }) => {
    return state.common.isExpande
  })

  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group',
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }

  const items: MenuItem[] = [
    getItem('首页', '/cpu', <HomeOutlined />),
    getItem('世界配置', '/setting', <DesktopOutlined />),
    getItem('模组设置', '/install', <ContainerOutlined />),
  ];

  const toRight = (e: React.Key) => {
    const prefix = '/home'
    navigate(prefix + e)
    
  }

  return (
    <div className='homePage'>
      <div className='left-content' style={{ width: isExpande ? 80 : 256 }}>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          items={items}
          inlineCollapsed={isExpande}
          onClick={e => toRight(e.key)}
        />
      </div>
      <div className='right-content'>
        <HeardModel />
        <Outlet />
      </div>
  </div>
  )
}

export default homePage