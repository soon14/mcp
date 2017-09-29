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
import VueSocketio from 'vue-socket.io';
import Bus from './api/bus';

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueSocketio,'/');


Object.defineProperty(Vue.prototype, '$moment', { value: moment });
Object.defineProperty(Vue.prototype, '$_', { value: _ });

const router = new VueRouter({
  routes
});

//授权页面路由权限拦截
router.beforeEach((to, from, next) => {
  if(!store.state.isAuthority && to.path !== "/cacheIntroduce"){
    router.replace('/cacheIntroduce');
  }else if(to.path === "/cacheIntroduce" && store.state.isAuthority){
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
  //有权限后直接进入首页
  if(store.state.isAuthority){
    router.replace('/');
  }
});

/**
 * 登录判断
 */
checkLogin(router);

