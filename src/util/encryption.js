import CryptoJS from './crypto-js'
// import axios from 'axios'

let key = CryptoJS.enc.Latin1.parse('abcdef0123456789')
// let iv = CryptoJS.enc.Latin1.parse('abcdef0123456789')

// 加密
export function EncryptData(data) {
  let srcs = CryptoJS.enc.Utf8.parse(data)
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
// 解密
export function DecryptData(data) {
  let stime = new Date().getTime()
  let decrypt = CryptoJS.AES.decrypt(data, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  let result = JSON.parse(CryptoJS.enc.Utf8.stringify(decrypt).toString())
  let etime = new Date().getTime()
  console.log('DecryptData Time:' + (etime - stime))
  return result
}

// 添加请求拦截器
// axios.interceptors.request.use(
//   function(config) {
//     // 对所有POST请加密，必须是json数据提交，不支持表单
//     if (config.method == 'post') {
//       config.data = EncryptData(JSON.stringify(config.data))
//     }
//     return configaxios.interceptors.response.use(
//   function(response) {
// 后端返回字符串表示需要解密操作
//     if (typeof response.data == 'string') {
//       response.data = DecryptData(response.data)
//     }
//     return response
//   },
//   function(error) {
//     return Promise.reject(error)
//   }
// )
//   },
//   function(error) {
//     return Promise.reject(error)
//   }
// )
// 添加响应拦截器
//
// axios.interceptors.response.use((response) => {
//   if (typeof response == 'string') {
//     response = DecryptData(response)
//   }
//   return response
// })
