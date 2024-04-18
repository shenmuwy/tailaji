
import HeardModel from './component/head.tsx';
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import './home.scss'
import {
  ContainerOutlined,
  DesktopOutlined,
  HomeOutlined
} from '@ant-design/icons';
import type { FormProps, MenuProps } from 'antd';
import { Menu, Modal, Input, Form, Button, Flex, message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux'
import { commonStateType } from '@/interface/store.ts';
import api from '@/api/api.ts';
type MenuItem = Required<MenuProps>['items'][number];

type FieldType = {
  oldPassword?: string;
  password?: string;
};

const homePage = () => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
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
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log('Success:', values);
    const res = await api.getUserModify({
      oldPsw: values.oldPassword,
      psw: values.password
    })
    if (res.data.code === 200) {
      message.success('修改成功')
      setIsModalOpen(false);
    } else {
      message.error(res.data.msg)
    }
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
        <HeardModel showModal={showModal} />
        <Outlet />
      </div>
      <Modal title="修改密码" maskClosable={false} open={isModalOpen} onCancel={handleCancel} footer={null} >
        <Form
          name="basic"
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, paddingTop: 20 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="原密码"
            name="oldPassword"
            rules={[{ required: true, message: '请输入原密码!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="新密码"
            name="password"
            rules={[{ required: true, message: '请输入新密码!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 4, span: 16 }}>
            <Flex>
              <Button onClick={handleCancel}>
                取消
              </Button>
              <Button type="primary" htmlType="submit">
                确认
              </Button>
            </Flex>
          </Form.Item>
        </Form>
      </Modal>
  </div>
  )
}

export default homePage