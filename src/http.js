import axios from 'axios'
import store from './store/store'
import router from "./router";
import {serverUrl} from "./const";
import {store_s_token_key, store_f_changeLogin} from "./const";
import Message from "element-ui/packages/message/src/main";

const http = axios.create({
  baseURL: serverUrl, // api 的 base_url
  timeout: 5000, // request timeout  设置请求超时时间
  responseType: "json",
  // withCredentials: true, // 是否允许带cookie这些
  headers: {
    "Content-Type": "application/json;charset=utf-8"
  }
});


// 添加请求拦截器，在请求头中加token
http.interceptors.request.use(
  config => {
    if (localStorage.getItem(store_s_token_key)) {
      config.headers.token = localStorage.getItem(store_s_token_key);
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  });

// 响应拦截器
http.interceptors.response.use(
  response => {
    // 如果返回的状态码为200，说明接口请求成功，可以正常拿到数据
    // 否则的话抛出错误
    if (response.status === 200) {
      return Promise.resolve(response);
    } else {
      return Promise.reject(response);
    }
  },
  // 服务器状态码不是2开头的的情况
  // 这里可以跟你们的后台开发人员协商好统一的错误状态码
  // 然后根据返回的状态码进行一些操作，例如登录过期提示，错误提示等等
  // 下面列举几个常见的操作，其他需求可自行扩展
  error => {
    if (error.response) {
      if (error.response.status) {
        switch (error.response.status) {
          // 401: 未登录
          // 未登录则跳转登录页面，并携带当前页面的路径
          // 在登录成功后返回当前页面，这一步需要在登录页操作。
          case 401:
            router.replace({
              path: '/login',
              query: {
                redirect: router.currentRoute.fullPath
              }
            });
            break;

          // 403 token过期
          // 登录过期对用户进行提示
          // 清除本地token和清空vuex中token对象
          // 跳转登录页面
          case 403:
            Message({
              message: '登录过期，请重新登录',
              duration: 3000,
              forbidClick: true
            });
            // 清除token
            localStorage.removeItem(store_s_token_key);
            store.commit(store_f_changeLogin, null);
            // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面
            setTimeout(() => {
              router.replace({
                path: '/login',
                query: {
                  redirect: router.currentRoute.fullPath
                }
              });
            }, 1000);
            break;

          // 404请求不存在
          case 404:
            Message({
              message: '网络请求不存在',
              duration: 3000,
              forbidClick: true
            });
            break;
          // 其他错误，直接抛出错误提示
          default:
            Message({
              message: error.response.data.message,
              duration: 3000,
              forbidClick: true
            });
        }
        return Promise.reject(error.response);
      }
    } else {
      Message({
        message: error.message,
        duration: 3000,
        forbidClick: true
      });
    }

  });

export default http;
