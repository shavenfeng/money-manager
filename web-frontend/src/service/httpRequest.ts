import axios from 'axios'
import { Toast } from 'antd-mobile'
import { getUserInfo } from '../utils'

const axiosInstance = axios.create({    //创建axios实例，在这里可以设置请求的默认配置
  timeout: 10000, // 设置超时时间10s
  // baseURL: publicIp   //根据自己配置的反向代理去设置不同环境的baeUrl
})

// 添加请求拦截器
axiosInstance.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  const userInfo = getUserInfo()
  if (Object.keys(userInfo).length > 0) {
    config.headers.token = userInfo.token
    // config.headers['content-type'] = 'multipart/form-data'
  }
   return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
axiosInstance.interceptors.response.use(response => {
  // 对响应数据做点什么
  if (response.status === 200) {
    const { code, msg } = response.data
    if (code === 1001) {
      localStorage.removeItem('userInfo')
    }
    return response.data
  } else {
    console.log('网络故障s')
  }
}, function (error) {
  return Promise.reject(error);
});


export const axiosGet = (url: string, params?: any, config={}) => {
  return new Promise((resolve, reject) => {
    axiosInstance({
      method: 'get',
      url,
      params,
      ...config
    }).then(response => {
      resolve(response)
    }).catch(error =>{
      reject(error)
    })
  })
}

export const axiosPost = (url: string, data?: any, config={}) => {
  return new Promise((resolve, reject) => {
    axiosInstance({
        method: 'post',
        url,
        data,
        ...config
    }).then(response => {
        resolve(response)
    }).catch(error => {
        reject(error)
    })
  })
}
