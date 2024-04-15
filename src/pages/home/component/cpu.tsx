import { Progress, Select, Switch } from 'antd';
import type { ProgressProps } from 'antd';
import { useEffect, useState } from 'react';
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

  const onChange = (checked: boolean) => {
    console.log(`switch to ${checked}`);
  };
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
          <div className='name'>CPU</div>
        </div>
        <div className='memory'>
          <Progress
            type="dashboard" 
            percent={menNum} 
            strokeColor={twoColors} 
            size={200} format={(percent) => `${percent}%`} 
            status={menNum >=70 ? 'exception' : 'normal'}
          />
          <div className='name'>内存</div>
        </div>
      </div>
    </div>
  )
}

export default cpuPage