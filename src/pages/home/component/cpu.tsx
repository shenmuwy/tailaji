import { Progress, Select, Switch, Button } from 'antd';
import type { ProgressProps } from 'antd';
import { useEffect, useState } from 'react';
import { SyncOutlined, DownloadOutlined, CloudDownloadOutlined } from '@ant-design/icons';
const cpuPage = () => {
  const [cpuNum, setCpuNum] = useState(0)
  const [menNum, setMenNum] = useState(0)

  const twoColors: ProgressProps['strokeColor'] = {
    '0%': 'green',
    '100%': 'red',
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCpuNum(Math.floor(Math.random() * 100))
      setMenNum(Math.floor(Math.random() * 100))
    }, 3000)
    return () => {
      clearInterval(timer)
    }
  })

  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
  };

  // const onChange = (checked: boolean) => {
  //   console.log(`switch to ${checked}`);
  // };
  return (
    <div className="cpuPage">
      <div className="cpuPage_left">
        <div className='title'>
          <span>游戏状态</span>
        </div>
        <div className='operation_panel'>
          <div className='select_world item'>
            <span className='label'>选择世界：</span>
            <Select
              className='value'
              defaultValue="世界一"
              onChange={handleChange}
              options={[
                { value: 'id1', label: '世界一' },
                { value: 'id2', label: '世界二' },
                { value: 'id3', label: '世界三' }
              ]}
            />
          </div>
          <div className='open_world item'>
            <span className='label'>开启世界：</span>
            <Switch style= {{ width: 60}}checkedChildren="开启" unCheckedChildren="关闭" defaultChecked />
          </div>
          <div className='item'>
            <span className='label'>快捷操作：</span>
            <div className='btns'>
              <Button className='btn_update btn' icon={<SyncOutlined />}>
                更新游戏
              </Button>
              <Button className='btn' icon={<DownloadOutlined />}>
                创建备份
              </Button>
            </div>
          </div>
          <div className='item'>
            <span className='label'>清理存档：</span>
            <div className='btns'>
              <Button type="primary" className='btn_delete btn' danger>
                清理备份
              </Button>
            </div>
          </div>
          <div className='item'>
            <span className='label'>恢复备份：</span>
            <div className='backups'>
              <Select
                className='value'
                placeholder="请选择备份"
                onChange={handleChange}
                options={[
                  { value: 'id1', label: '备份一' },
                  { value: 'id2', label: '备份二' },
                  { value: 'id3', label: '备份三' }
                ]}
              />
              <Button className='btn' icon={<CloudDownloadOutlined />}>
                恢复
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div className="cpuPage_right">
        <div className='title'>
          <span>服务器状态</span>
        </div>
        <div className='cpu'>
          <Progress 
            type="dashboard" 
            percent={cpuNum} 
            strokeColor={twoColors} 
            size={200} 
            format={(percent) => `${percent}%`} 
            status={cpuNum >=70 ? 'exception' : 'normal'}
          />
          <div className='name'>CPU核心数： 2 使用率：{cpuNum}%</div>
        </div>
        <div className='memory'>
          <Progress
            type="dashboard" 
            percent={menNum} 
            strokeColor={twoColors} 
            size={200} format={(percent) => `${percent}%`} 
            status={menNum >=70 ? 'exception' : 'normal'}
          />
          <div className='name'>总内存： 4GB 使用率：{menNum}%</div>
        </div>
      </div>
    </div>
  )
}

export default cpuPage