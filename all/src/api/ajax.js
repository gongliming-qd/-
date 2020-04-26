import axios from 'axios'
import Vue from 'vue'
import Router from '../router/index'

// 每次请求携带cookies信息
axios.defaults.withCredentials = true

// 
export const http = axios.create({
    // baseURL: 'http://wthrcdn.etouch.cn/weather_mini',
    baseURL: '/api',
})

//  登录前请求头的设置
// 添加请求拦截器
http.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    config.headers.Authorization = window.sessionStorage.getItem('token')||''
    return config
  });

// 添加响应拦截器
http.interceptors.response.use(function (response) {
    // 对响应数据做点什么
    // if(response.data.meta.msg == '无效token' && response.data.meta.status == 400){
    //     Vue.prototype.$message.warning('请重新登录哦!')
    //     Router.push('/login')
    // }else{
    //     return response;
    // }
    // if(!response.data.meta){
    //     Vue.prototype.$message.warning('请重新登录哦!')
    //     // Router.push('/login')
    // }
    return response;
  });