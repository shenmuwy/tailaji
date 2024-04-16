// 防抖函数
export function debounce(fn: Function, delay: number) {
  let timer: any
  return function(this: any, ...args: any[]) {
    clearTimeout(Number(timer))
    timer = setTimeout(() => {
      fn.apply(this, args) 
    }, delay)
  } 
}