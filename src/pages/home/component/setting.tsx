import {
  Form,
  Input,
  InputNumber,
  Radio,
  Slider,
  Switch,
  Button,
  Space,
  Row,
  Col
} from 'antd';
import type { RadioChangeEvent, InputNumberProps  } from 'antd';
import { useState } from 'react';


const settingPage = () => {
  const [mapValue, setMapValue] = useState<number>(1);
  const [difficultyValue, setDifficultyValue] = useState<number>(1);
  const [numValue, setNumValue] = useState(6);
  const [PVP, setPVP] = useState(false);
  const [form] = Form.useForm();
  const onMapChange = (e: RadioChangeEvent) => {
    setMapValue(e.target.value)
  }
  const onDifficultyChange = (e: RadioChangeEvent) => {
    setDifficultyValue(e.target.value)
  }
  const onNumChange: InputNumberProps['onChange'] = (newValue) => {
    setNumValue(newValue as number);
  };
  const onReset = () => {
    setMapValue(1)
    setDifficultyValue(1)
    setPVP(false)
    onNumChange(6)
    form.resetFields();
  }
  return(
    <div className="settingPage">
      <div className="title">
        世界设置
      </div>
      <div className="settingPage_content">
        <div className="page_1">
          <>
            <Form
              labelCol={{ span: 4 }}
              wrapperCol={{ span: 14 }}
              layout="horizontal"
              style={{ maxWidth: 600 }}
              form={form}
            >
              <Form.Item 
                label="地图风格"
                name="MapValue"
                valuePropName="checked">
                <Radio.Group onChange={onMapChange} value={mapValue} size="large">
                  <Radio.Button value={1}>腐化地图</Radio.Button>
                  <Radio.Button value={2}>猩红地图</Radio.Button>
                  <Radio.Button value={3}>随机地图</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="世界名称" name="worldName">
                <Input />
              </Form.Item>
              <Form.Item label="游戏难度" name="disabled" valuePropName="checked">
                <Radio.Group onChange={onDifficultyChange} value={difficultyValue} size="large">
                  <Radio.Button value={1}>旅行</Radio.Button>
                  <Radio.Button value={2}>经典</Radio.Button>
                  <Radio.Button value={3}>专家</Radio.Button>
                  <Radio.Button value={4}>大师</Radio.Button>
                </Radio.Group>
              </Form.Item>
              <Form.Item label="PVP" valuePropName="PVP">
                <Switch style= {{ width: 60}} checked={PVP} onChange={(value) => setPVP(value)} checkedChildren="开启" unCheckedChildren="关闭" />
              </Form.Item>
              <Form.Item label="Slider">
                <Row>
                  <Col span={17}>
                    <Slider
                      min={1}
                      max={16}
                      value={typeof numValue === 'number' ? numValue : 0}
                      onChange={onNumChange}
                      />
                  </Col>
                  <Col span={4}>
                    <InputNumber
                      min={1}
                      max={16}
                      style={{ margin: '0 16px' }}
                      value={numValue}
                      onChange={onNumChange}
                    />
                  </Col>
                </Row>
              </Form.Item>
              <Form.Item label="世界密码" name="password">
                <Input />
              </Form.Item>
              <Form.Item wrapperCol={{span: 24}} className='form_btn'>
                  <Button onClick={onReset}>重置</Button>
                  <Button htmlType="submit" type="primary">提交</Button>
              </Form.Item>
            </Form>
          </>
        </div>
      </div>
    </div>
  )
}

export default settingPage