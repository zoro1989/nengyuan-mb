import axios from 'axios'
import { Toast } from 'mint-ui'
import { apiStatus } from '@/config'

axios.defaults.withCredentials = true

let fetch = (type, url, params, data = false, isFormat = true) => {
  let service = axios.create({
    timeout: 30000
  })

  axios.defaults.headers.post['Content-Type'] = isFormat ? 'application/x-www-form-urlencoded;charset=utf-8' : 'application/json;charset=utf-8'
  service.interceptors.request.use(config => {
    // 需要token的在这里生成
    // config.headers['X-Token'] = 'tokenStr'
    return config
  }, error => {
    console.log('request error', error)
    return Promise.reject(error)
  })

  service.interceptors.response.use(response => {
    // 如果服务器出错，做出相应的处理，response.data后面的内容根据后端接口修改
    let res = response.data
    if (res.code !== apiStatus.success) {
      Toast('错误：' + res.msg)
      return Promise.reject(res)
    } else {
      return res
    }
  }, error => {
    console.log('response error', error)
    Toast('服务器出错：' + error)
    return Promise.reject(error)
  })

  let p = {
    url: url,
    method: type
  }
  if (data) {
    p.params = params
    if (isFormat) {
      let qs = require('qs')
      data = qs.stringify(data)
    }
    p.data = data
  } else {
    if (type === 'get') {
      p.params = params
    } else {
      if (isFormat) {
        let qs = require('qs')
        params = qs.stringify(params)
      }
      p.data = params
    }
  }

  return service(p)
}

export default fetch
