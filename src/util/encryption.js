import CryptoJS from './crypto-js'

let key = CryptoJS.enc.Latin1.parse('5F9AC4530C2A9C6D')
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
