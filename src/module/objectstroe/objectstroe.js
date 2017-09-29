/**
 * Created by CHENRC2 on 2017-7-13.
 */
import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import 'src/assets/theme/theme-midea/index.css';
import 'src/styles/base.less';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import store from './vuex/store'
import routes from './routes'
import moment from 'moment';
import { checkLogin } from 'utils/utils.js'
import _ from 'lodash';
import Bus from './api/bus';
import axios from 'axios';
import NProgress from 'nprogress';
import { Notification } from 'element-ui';
import { requestLogout } from './api/service';
import VueSocketio from 'vue-socket.io';
import storage from "utils/local_storage_tool.js";
import ss from "utils/session_storage_tool.js";

Vue.use(ElementUI);
Vue.use(VueSocketio,'/');
Vue.use(VueRouter);
Vue.use(Vuex);

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
      case "200":
        break;
      case "400":
	    Notification.error("请求失败!");
        break;
      case "401":
	    Notification.error("鉴权不通过!");
        break;
      case "403":
	    Notification.error("访问被拒绝!");
        break;
      case "404":
	    Notification.error("找不到该对象!");
        break;
      case "405":
	    Notification.error("不允许调用该方法!");
        break;
      case "408":
	    Notification.error("请求超时!");
        break;
      case "409":
	    Notification.error("无效的bucket!");
        break;
      case "411":
	    Notification.error("缺少内容长度!");
        break;
      case "412":
	    Notification.error("不满足前提条件!");
        break;
      case "416":
	    Notification.error("Range参数的值不合法!");
        break;
      case "422":
	    Notification.error("错误的实体!");
        break;
      case "600":
	    Notification.error("参数有误!");
        break;
//    case "601":
//	    Notification.error("目前一个项目最多只能创建1个应用!");
//      break;
      case "602":
	    Notification.error("应用名称不合法!");
        break;
      case "603":
	    Notification.error("该应用不存在!");
        break;
      case "604":
	    Notification.error("该应用已被禁用!");
        break;
      case "605":
	    Notification.error("该应用未关联指定项目!");
        break;
      case "606":
	    Notification.error("Bucket数量超过上限（目前一个应用最多只能创建50个Bucket）!");
        break;
      case "607":
	    Notification.error("Bucket名称不合法!");
        break;
      case "608":
	    Notification.error("该名称的Bucket已存在!");
        break;
      case "609":
	    Notification.error("该Bucket不存在!");
	    window.location.href = '/module/objectstroe.html#/object/overview';
        break;
      case "610":
	    Notification.error("对象名（文件名）不合法!");
        break;
      case "611":
	    Notification.error("该对象不存在!");
        break;
      case "612":
	    Notification.error("该Bucket权限不合法!");
        break;
      case "613":
	    Notification.error("Bucket不为空，请检查该Bucket是否包含未删除的Object或者未成功的Multipart碎片");
        break;
      case "614":
	    Notification.error("该内容不存在!");
        break;
      case "615":
	    Notification.error("该bucket与指定的应用不匹配!");
        break;
      case "616":
	    Notification.error("Cookie失效!");
        break;
      case "617":
	    Notification.error("上传对象太大!");
        break;
      case "618":
	    Notification.error("您的登录信息已过期，请重新登录!");
	    requestLogout().then((res) =>{
          if(res.code.toString() === "200"){
          	 ss.removeAll();
      	     storage.removeAll();
             window.location.href = '/#/login';
          }
        });
        break;
      case "619":
	    Notification.error("获取不到该用户的邮箱!");
        break;
      case "700":
	    Notification.error("其它错误!");
        break;
//    default:
//      Notification.error("未知异常!");
//      break;
    }
    NProgress.done();
    return res;
  },
  err => {
    const response = err.response;
    if (response) {
      Notification.error({
        title:"温馨提示",
        message:"系统内部错误，" + response.data.error
      });
      console.log("error:", err);
    }
    NProgress.done();
    return Promise.reject(err);
  });



Object.defineProperty(Vue.prototype, '$moment', { value: moment });
Object.defineProperty(Vue.prototype, '$_', { value: _ });

const router = new VueRouter({
  routes
});

/**
 * 登录判断
 */
checkLogin(router);

//授权页面权限拦截
router.beforeEach((to, from, next) => {
  if(!store.state.isAuthority && to.path !== "/object/create"){
    router.replace('/object/create');
  }else if(to.path === "/object/create" && store.state.isAuthority){
    router.replace('/');
  }else{
    next();
  }
});

//获取完权限再加载
store.dispatch('searchAuthority').then(res=>{
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app');
});



export default axios;
