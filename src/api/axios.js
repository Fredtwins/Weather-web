import axios from 'axios'

// let httpUrl = 'http://192.168.1.174:8080/'
// let httpUrl = 'http://10.0.1.184:8080/'
let httpUrl = 'http://219.132.198.90:8080'
// let httpUrl = 'http://192.168.121.175:8080/'

// let httpUrl = 'http://192.168.43.128:8080/'

// 页面接口通用
export function ajaxGet (url = '', data = {}) {
  url = `${httpUrl}${url}`
  return axios.get(url, {
    params: data,
  }).then(res => {
    return Promise.resolve(res.data)
  }).catch(res => {
    return Promise.resolve(res.data)
  })
}