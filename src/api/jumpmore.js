import { ajaxGet } from './axios'

// 景区预报
export function Getjumpmore () {
  let url = 'mpsp/web/scenicSpot/list'

  let data = {}

  return ajaxGet(url, data)
}