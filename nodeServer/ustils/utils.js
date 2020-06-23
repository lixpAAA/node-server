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