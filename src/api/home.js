import { ajaxGet } from './axios'

// 首页内容
export function GethomeList (obj) {
  let url = 'mpsp/web/mobileIndex/synthesis'
  // console.log(obj)
  let data = {
    ...obj
  }

  return ajaxGet(url, data)
}

// 获取镇街
export function Getlinkage () {
  let url = 'mpsp/basedata/staFsaws/list'

  let data = {}

  return ajaxGet(url, data)
}

