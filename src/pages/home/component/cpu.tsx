import { Progress, Select, Switch, Button, message } from 'antd';
import type { ProgressProps } from 'antd';
import { useEffect, useState } from 'react';
import { SyncOutlined, DownloadOutlined, CloudDownloadOutlined } from '@ant-design/icons';
import api from '@/api/api';
import { cpuInfoData, statusDataInterface } from '@/interface/dataInterFace';
import MaskLayer from '@/component/MaskLayer/MaskLayer';
const cpuPage = () => {
  const [cpuInfo, setCpuInfo] = useState({} as cpuInfoData)
  const [visible, setVisible] = useState(false)
  const [statusData, setStatusData] = useState({} as statusDataInterface)
  const [firstWorld, setFirstWorld] = useState('')

  const twoColors: ProgressProps['strokeColor'] = {
    '0%': 'green',
    '100%': 'red',
  };

  const getCpuMessage = async () =>{
    const res = await api.getCpuMessage()
    if (res.data.code === 200) {
      setCpuInfo(res.data.data)
    }
  }

  const worldStatus = async () => {
    const res = await api.getWorldStatus()
    if (res.data.code === 200) {
      setStatusData(res.data.data)
      console.log(statusData)
      let name = null
      if (res.data.data.name) {
        name = res.data.data.name
      } else {
        name = res.data.data.worldsName[0].label
      }
      setFirstWorld(name)
    }
  }

  useEffect(() => {
    getCpuMessage()
    worldStatus()
    const timer = setInterval(() => {
      getCpuMessage()
    }, 10 * 1000)
    return () => {
      clearInterval(timer)
    }
  }, [])

  useEffect(() => {
    console.log(firstWorld)
  }, [firstWorld])


  const handleChange = (value: string, option: any) => {
    console.log(`selected ${value}`);
    console.log(option)
    
    setFirstWorld(option.label)
  }

  const startWord = async () => {
    setVisible(true)
    const status = statusData.status ? 0 : 1
    const res = await api.startWorld({status, worldName: firstWorld})
    getCpuMessage()
    if (res.data.code === 200) {
      message.success(statusData.status?'关闭成功':'开启成功')
      setVisible(false)
    } else {
      setVisible(false)
    }
    worldStatus()
  }

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
              defaultValue={firstWorld}
              key={firstWorld}
              onChange={handleChange}
              options={statusData.worldsName}
            />
          </div>
          <div className='open_world item'>
            <span className='label'>开启世界：</span>
            <Switch style= {{ width: 60}} checked={statusData.status} checkedChildren="开启" unCheckedChildren="关闭" onChange={startWord} />
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
            percent={cpuInfo.cpuUsage} 
            strokeColor={twoColors} 
            size={200} 
            format={(percent) => `${percent}%`} 
            status={cpuInfo.cpuUsage >=70 ? 'exception' : 'normal'}
          />
          <div className='name'>CPU核心数：{cpuInfo.cpuNum} 使用率：{cpuInfo.cpuUsage}%</div>
        </div>
        <div className='memory'>
          <Progress
            type="dashboard" 
            percent={cpuInfo.memoryUsage} 
            strokeColor={twoColors} 
            size={200} format={(percent) => `${percent}%`} 
            status={cpuInfo.memoryUsage >=70 ? 'exception' : 'normal'}
          />
          <div className='name'>总内存：{cpuInfo.memoryNum} GB 使用率：{cpuInfo.memoryUsage}%</div>
        </div>
      </div>
      {visible && <MaskLayer></MaskLayer>}
    </div>
  )
}

export default cpuPage