import { ajaxGet } from './axios'

// 雷达图
export function GetRaBar () {
  let url = 'mpsp/web/SRadar/list'

  let data = {}

  return ajaxGet(url, data)
}

// 卫星云图
export function GetCloudList () {
  let url = 'mpsp/web/cloud/list'

  let data = {}

  return ajaxGet(url, data)
}