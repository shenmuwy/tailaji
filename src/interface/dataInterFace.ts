export interface cpuInfoData {
  cpuNum: number,
  cpuUsage: number,
  memoryNum: number,
  memoryUsage: number
}

export interface statusDataInterface {
  status: boolean,
  worldsName: [
    {
      label: string,
      value: number
    }
  ]
}