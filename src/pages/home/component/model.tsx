import { Button, Table, TableProps, Modal, Input } from 'antd';
import { ChangeEvent, useCallback, useEffect, useRef, useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import { debounce } from '@/utils/common';

interface DataType {
  key: string;
  name: string;
  id: number;
  version: string;
}

const columns: TableProps<DataType>['columns'] = [
  {
    title: '模组名',
    dataIndex: 'name',
    key: 'name',
    render: (text) => <a>{text}</a>,
  },
  {
    title: '模组id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '版本',
    dataIndex: 'version',
    key: 'version',
  },
  {
    title: '操作',
    key: 'action',
    render: () => (
      <Button danger style={{ margin: 0}}>Delete</Button>
    ),
  },
];

const data: DataType[] = [
  {
    key: '1',
    name: '灾厄',
    id: 897654213,
    version: '1.0.0'
  },
  {
    key: '2',
    name: '银瑟',
    id: 987654321,
    version: '1.0.1'
  },
  {
    key: '3',
    name: '炼金术士',
    id: 123456789,
    version: '1.0.2'
  },
];
const modelPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const useDebounce = (cb:Function, delay:number) => {
    const cbRef = useRef(cb);
    useEffect(() => { cbRef.current = cb; });
    return useCallback(
      debounce((...args:any) => cbRef.current(...args), delay),
    [delay]
    );
  }

  const searchModel = useDebounce((e: ChangeEvent<HTMLInputElement>) => {
    console.log((e.target as HTMLInputElement).value);
  }, 1000)
  

  return (
    <div className="modelPage">
      <div className="title">模组设置</div>
      <div className="modelPage_content">
        <div className="model_table">
          <Button type="primary" onClick={showModal}>添加模组</Button>
          <Table columns={columns} dataSource={data} />
        </div>
      </div>
      <Modal title="添加模组" maskClosable={false} open={isModalOpen} onOk={handleOk} onCancel={handleCancel} cancelText="取消" okText="添加">
        <Input style={{marginTop: 20}} addonBefore={<SearchOutlined />} placeholder="请输入模组名称或者id" onChange={e => searchModel(e)}/>
      </Modal>
    </div>
  )
}

export default modelPage