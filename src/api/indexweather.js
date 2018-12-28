import { ajaxGet } from './axios'

// 十五天天气预报
export function weatherList () {
  let url = 'mpsp/web/folo15dLastShare/list'

  let data = {}

  return ajaxGet(url, data)
}