// 深拷贝
export function DeepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  var cpObj = obj instanceof Array ? [] : {};
  for (var key in obj) cpObj[key] = DeepClone(obj[key]);
  return cpObj;
}
// 判断两个对象是否相等
export function isObjEqual(obj1, obj2) {
  if ((obj1 === null && obj2 === null) || (typeof obj1 !== 'object' && typeof obj2 !== 'object')) {
    if (obj1 === obj2) return true
  }
  if (obj1 instanceof Array && obj2 instanceof Array) {
    if (obj1.length !== obj2.length) return false
    else {
      for (let key in obj1) {
        return isObjEqual(obj1[key], obj2[key])
      }
    }
  }
  if (obj1 instanceof Object && obj2 instanceof Object) {
    if (Object.getOwnPropertyNames(obj1).length !== Object.getOwnPropertyNames(obj2).length) return false
    else {
      for (let key in obj1) {
        return isObjEqual(obj1[key], obj2[key])
      }
    }
  }
  return false
}
// 节流
export const throttle = (fn, wait) => {
  let updateTime = Date.now()
  return (...agr) => {
    const now = Date.now()
    if (now - updateTime > wait) {
      fn.apply(this, agr)
      updateTime = now
    }
  }
}
// 防抖
export function debounce(func, wait){
  let timeId
  return function(...args){
    clearTimeout(timeId)
    timeId = setTimeout(()=>func.apply(null,args), wait)
  }
}
// 数组乱序
export function arrayShuffle(arr){
  if(!Array.isArray(arr)) {
    throw new Error('argument must be an array')
  }
  let end = arr.length
  if(!end) {
    return arr
  }
  while(end) {
    let start = Math.floor(Math.random() * end--)
    [arr[start], arr[end]] =  [arr[end], arr[start]]
  }
  return arr
}
