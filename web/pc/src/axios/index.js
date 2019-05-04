import axios from 'axios';
import Cookies from 'js-cookie';
import router from '../router/index';
import qs from 'qs';
import iView from 'iview'
import ajaxUrl from './api'
// 订单分配权限
 let url = ajaxUrl.url

let httpInstance = axios.create({
  baseURL: url,
  timeout: 30000,
  headers: {'Content-Type': 'application/x-www-form-urlencoded'},
  withCredentials: false
});
httpInstance.url = url;
// 添加请求拦截器 数据请求之前
httpInstance.interceptors.request.use((config) => {
  // console.log('数据拦截',config);

  var headers = config.headers;
  var contentType = headers['Content-Type'];

  if (contentType == 'application/x-www-form-urlencoded') {
    config.data = qs.stringify(config.data);
    try {
      // 如果是数组对象，将转换出来的数组字符串中的[]关键字替换，这样方便后台接收数据
      config.data = config.data.replace(/(%5B\d%5D)/g, '');
    } catch (e) {

    }
  }
  return config;
}, function (error) {
    console.log(error);
    // 对请求错误做些什么
  return Promise.reject(error);
  // iView.Spin.hide()
});

// 添加响应拦截器 数据响应之后
httpInstance.interceptors.response.use((response) => {
  // console.log('数据拦截');
  // console.log(response);
  var v = this;
  // 对响应数据做点什么
  if (response.status === 404) {
    router.push({name: 'error-404'});
  }
  if (response.status === 200) {
    return response.data;
  } else {
    router.push({name: 'login'});
  }
}, function (error) {
  // iView.Spin.hide()
  // 对响应错误做点什么
  // if (!Cookies.get('result')) {
  // 	router.push({name: 'error-500'});
  // } else if (Cookies.get('result')) {
  // 	router.push({name: 'errorpage_500'});
  // }
  return Promise.reject(error);
});
export default httpInstance;
