
import HeardModel from './component/head.tsx';
import React, { useState } from 'react';
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
type MenuItem = Required<MenuProps>['items'][number];

const homePage = () => {
  const navigate = useNavigate();

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
    // getItem('Option 3', '3', <ContainerOutlined />),
  ];

  const toRight = (e: React.Key) => {
    const prefix = '/home'
    navigate(prefix + e)
    
  }

  return (
    <div className='homePage'>
      <div className='left-content'>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          items={items}
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