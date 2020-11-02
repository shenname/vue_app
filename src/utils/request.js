import axios from 'axios';
import qs from 'qs';	//引入axios数据处理
import router from '../router';
import { Notify } from 'vant';
/**
 * API_URL
 */
var baseUrl;
switch (process.env.srconfig) {
  case 'pro': //生产
    baseUrl = '';
    break;
  case 'dev': //开发
    baseUrl = '';
    break;
  case 'pre': //演示
    baseUrl = '';
    break;
  default: //默认开发
    baseUrl = '';
    break;
}
// console.log("xxx",process.env.srconfig, process.env.NODE_ENV)
// baseUrl = "http://172.16.0.23:8080";
// baseUrl = "http://172.16.38.252:8080";
baseUrl = "http://testapi.paycore.cc";


export const api = {
  baseUrl: baseUrl,
  type: process.env.srconfig
};

//header = json
export const instanceAuth = axios.create({
  baseURL: baseUrl,
  headers: {
    "Content-Type": "application/json",
  }
});

function axiosInterceptors(axiosType) {
  // 添加请求拦截器
  axiosType.interceptors.request.use(function (config) {
    // 在发送请求之前做些什么
    if (localStorage.getItem('token')) {
      config.headers.token = localStorage.getItem('token');
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });
  // 添加响应拦截器
  axiosType.interceptors.response.use(function (response) {
    // console.log(response);
    // 对响应数据做点什么
    if (response.data.code == 43000 && response.data.msg === "缺少权限") {
      localStorage.removeItem('token');
      router.push('/login');
    }
    if (response.data.code == 43001 && response.data.msg === "无效令牌") {
      localStorage.removeItem('token');
      router.push('/login');
    }
    return response;
  }, function (error) {
    // 对响应错误做点什么
    if (error && error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 清除token信息并跳转到登录页面
          localStorage.removeItem('token');
          router.push('/login')
          break;
        case 403:
          // 返回 403 没权限
          if (error.response.data.code === "30000" || error.response.data.code === "30001" || error.response.data.code === "30002") {
            Notify({ type: 'warning', message: error.response.data.msg });
          } else if (error.response.data.code == 44001 && error.response.data.msg === "登录已失效,请重新登录!") {
            localStorage.removeItem('token');
            router.push('/login')
          }
          break;
      }
      return Promise.reject(error.response.data) // 返回接口返回的错误信息
    } else if (!error.response) {
      Notify({ message: '网络故障,请稍后再刷新访问', type: 'warning' })
    }
  });
}

axiosInterceptors(instanceAuth)