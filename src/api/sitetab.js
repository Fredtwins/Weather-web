import { ajaxGet } from './axios'

// tab栏
export function siteTab (obj) {
  let url = 'mpsp/web/awsInstFoShare/list'

  let data = {
    ...obj
  }

  return ajaxGet(url, data)
}

// 首次进来，下拉选项的接口
export function siteTime () {
  let url = 'mpsp/web/weatherMonitor/aws'

  let data = {}

  return ajaxGet(url, data)
}

// 下拉选择时间 - 自动站--自动站时次记录
export function TimeList (obj) {
  let url = 'mpsp/web/awsInstFoShare/list'

  let data = {
    ...obj
  }

  return ajaxGet(url, data)
}

// 自动站--日记录(20-20时)
export function shareTime (obj) {
  let url = 'mpsp/web/awsDay20Share/list'

  let data = {
    ...obj
  }

  return ajaxGet(url, data)
}

// 自动站--日记录(8-8时)
export function DayTime (obj) {
  let url = 'mpsp/web/awsDay8Share/list'

  let data = {
    ...obj
  }

  return ajaxGet(url, data)
}

// 自动站--时极值、雨量
export function HourTime (obj) {
  let url = 'mpsp/web/awsHourFoShare/list'

  let data = {
    ...obj
  }

  return ajaxGet(url, data)
}

// 自动站--时内5分钟雨量
export function Stime (obj) {
  let url = 'mpsp/web/awsR5mFoShare/list'

  let data = {
    ...obj
  }

  return ajaxGet(url, data)
}