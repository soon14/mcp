import axios from 'axios';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { Notification } from 'element-ui';
import {} from 'utils/utils.js'
import ls from 'utils/local_storage_tool.js'
import ss from 'utils/session_storage_tool.js'

//基本配置
axios.defaults.timeout = 50000;
axios.defaults.withCredentials = true;

/**
 * request 拦截器
 */
axios.interceptors.request.use(
  config => {
    NProgress.start();
    return config;
  },
  err => {
    return Promise.reject(err);
  });

/**
 * response 拦截器
 */
axios.interceptors.response.use(
  res => {
    switch(res.data.errorCode||(res.data.code&&res.data.code.toString())){
      /*case "200":
        break;
      case "401":
        Notification.error("登录失效，请重新登录");
        window.location.href = '/#/login';
        break;*/
      case "500":
        Notification.error("系统内部错误");
        break;
     /* default:
        Notification.error("未知异常，" + res.data.msg||res.data.message);
        break;*/
    }
    NProgress.done();
    return res;
  },
  err => {
    const response = err.response;
    if (response) {
      switch (response.status){
        case 401:
          Notification.warning({
            title:"温馨提示",
            message:"登录超时",
            duration: 2000,
            onClose:()=>{
              let user=ls.getObject("user");
              ls.removeAll();
              ss.removeAll();
              ls.addItem('historyUrl',JSON.stringify({ historyUrl: window.location.href,account:!!user? user.account:"" }));
              window.location.href = '/#/login';
            }
          });
          break;
        default:
          Notification.error({
            title:"温馨提示",
            message:"系统内部错误！",
            duration: 3000
          });
          break;
      }
      console.log("error:", err);
    }
    NProgress.done();
    return Promise.reject(err);
  });

export default axios;
