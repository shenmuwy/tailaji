
import HeardModel from './component/head.tsx';
import React, { useRef, useState } from 'react';
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
import { useDispatch, useSelector } from 'react-redux'
import { commonStateType } from '@/interface/store.ts';
import api from '@/api/api.ts';
import { useForm } from 'antd/es/form/Form';
import IconFont from '@/component/IconFont.tsx';
type MenuItem = Required<MenuProps>['items'][number];

type FieldType = {
  oldPassword?: string;
  password?: string;
};

const homePage = () => {
  const navigate = useNavigate()
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ispassWord, setIspassWord] = useState(false);
  const [userImg, setUserImg] = useState<any>()
  const [form] = useForm();
  const imgInput = useRef<HTMLInputElement>(null)
  const dispatch = useDispatch()


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
  const showModal = (data: boolean) => {
    setIsModalOpen(true)
    setIspassWord(data)
  };

  const handleCancel = () => {
    setIsModalOpen(false)
  };

  const onFinish: FormProps<FieldType>["onFinish"] = async (values) => {
    console.log('Success:', values);
    const res = await api.getUserModify({
      oldPsw: values.oldPassword,
      psw: values.password
    })
    if (res.data.code === 200) {
      message.success('修改成功')
      form.resetFields();
      setIsModalOpen(false);
    } else {
      message.error(res.data.msg)
    }
  }

  const uploadImg = async () => {
    // console.log(e.target.files[0])
    // console.log(e);
    
    const file = userImg;
    if (!file) {
      message.info('取消上传操作')
      return
    }

    if(['jpeg', 'png', 'gif', 'jpg'].indexOf(file.type.split("/")[1]) < 0) {
      //用你选择组件的报错弹窗就行，报出以下提醒
      message.error('上传的文件必须是图片格式')
      return;
    }
    const formdate = new FormData();
    formdate.append('file', file);
    const res = await api.uploadImg(formdate)
    if (res.data.code === 200) {
      message.success('上传成功')
      dispatch({ type: 'common/setUserAvatar', payload: res.data.data.img })
      if (imgInput&&imgInput.current) {
        imgInput.current.value = ''
        setUserImg(null)
        setIsModalOpen(false)
      }
    }
  }

  const changeImg = (e: any) => {
    const file = e.target.files[0]
    setUserImg(file)
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
      <Modal title={ispassWord ? '修改密码' : '修改头像'} maskClosable={false} open={isModalOpen} onCancel={handleCancel} footer={null} wrapClassName="modify_popup">
        <>{ispassWord ? <Form
          name="basic"
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600, paddingTop: 20 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          form={form}
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
                提交
              </Button>
            </Flex>
          </Form.Item>
        </Form> : <div className='user_upload'>
            <div className='user_img'>
              <label htmlFor="img_input" className='img_label'>
              {userImg?<img className='preview_img' src={URL.createObjectURL(userImg)}></img>:
                <IconFont className='icon-kongtupian' type='icon-kongtupian' style={{ fontSize: 100 }}></IconFont>}
              </label>
              <input ref={imgInput} id='img_input' type="file" accept="image/*" onChange={changeImg} />
            </div>
            <Button type="primary" style={{ width: 60}} onClick={uploadImg}>提交</Button>
          </div>}</>
      </Modal>
  </div>
  )
}

export default homePage