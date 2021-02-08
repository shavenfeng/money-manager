import CryptoJS from 'crypto-js'
import { Toast } from 'antd-mobile'
import { TAB } from '../components/UserModal'

/**
 * 加密（需要先加载lib/aes/aes.min.js文件）
 */
export const encrypt = (word: string) => {
  var key = CryptoJS.enc.Utf8.parse("46cc793c53dc451b")
  var srcs = CryptoJS.enc.Utf8.parse(word)
  var encrypted = CryptoJS.AES.encrypt(srcs, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.toString()
}
/**
* 解密
*/
export const decrypt = (word: string) => {
  var key = CryptoJS.enc.Utf8.parse("46cc793c53dc451b")
  var decrypt = CryptoJS.AES.decrypt(word, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  return CryptoJS.enc.Utf8.stringify(decrypt).toString()
}

export const getUserInfo = () => JSON.parse(localStorage.getItem('userInfo') || '{}')

export const validateUser = (phone:string, password:string,  tab:TAB, repassword?: string, ) => {
  if (phone === '') {
    return Toast.info('手机号不能为空')
  }
  // @ts-ignore
  if (!/^1[3456789]\d{9}$/.test(Number(phone))) {
    return Toast.info('手机号格式不正确')
  }
  if (password === '') {
    return Toast.info('密码不能为空')
  }
  if (!(password.length > 3 || password.length < 15)) {
    return Toast.info('密码为4到14位')
  }
  if (/^[\u4e00-\u9fa5]$/.test(password) || password.indexOf(' ') > -1) {
    return Toast.info('密码不能有中文和空格')
  }
  if (tab === TAB.register && repassword) {
    if (!(repassword.length > 3 || repassword.length < 15)) {
      return Toast.info('密码为4到14位')
    }
    if (/^[\u4e00-\u9fa5]$/.test(repassword) || repassword.indexOf(' ') > -1) {
      return Toast.info('密码不能有中文和空格')
    }
    if (password != repassword) {
      return Toast.info('两次输入的密码不一致')
    }
  }
}
