import axios from 'axios'
import { EncryptData, DecryptData } from './encryption.js'

// axios.defaults.baseURL = 'http://localhost:8080/api'
axios.defaults.baseURL = 'http://121.196.196.150:8080/api'

//全局请求拦截
axios.interceptors.request.use((config) => {
  // 设置全局请求头参数
  config.headers = {
    'Content-Type': 'application/json'
  }
  // 对所有的请求参数进行加密
  config.data = EncryptData(JSON.stringify(config.data))
  return config
})

// 添加响应拦截器
axios.interceptors.response.use((response) => {
  if (typeof response.data == 'string') {
    response.data = DecryptData(response.data)
  }
  return response
})

/**
 * get方法，对应 get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function get(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .get(url, {
        params: params
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}

/**
 * post方法，对应 post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function post(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .post(url, params)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}

/**
 * put方法，对应 put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 */
export function put(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .put(url, params)
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}

/**
 * $delete，对应 delete请求
 */
export function $delete(url, params) {
  return new Promise((resolve, reject) => {
    axios
      .delete(url, {
        data: params
      })
      .then((res) => {
        resolve(res.data)
      })
      .catch((err) => {
        reject(err.data)
      })
  })
}
