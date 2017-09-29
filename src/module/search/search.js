/**
 * Created by CHENRC2 on 2017-7-13.
 */
import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import 'babel-polyfill';
import Vuex from 'vuex';
import store from './vuex/store';
import 'src/assets/theme/theme-midea/index.css';
import 'src/styles/base.less';
import VueRouter from 'vue-router';
import routes from './routes'
import moment from 'moment';
import { checkLogin } from 'utils/utils.js'
import _ from 'lodash';
import VueSocketio from 'vue-socket.io';
import Paper from 'components/awesome/paper/Paper.vue'

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueSocketio,'/');


Object.defineProperty(Vue.prototype, '$moment', { value: moment });
Object.defineProperty(Vue.prototype, '$_', { value: _ });

Vue.component('paper',Paper);

const router = new VueRouter({
  routes
});

//授权页面权限拦截
router.beforeEach((to, from, next) => {
  if(!store.state.isAuthority && to.path !== "/search/create"){
    router.replace('/search/create');
  }else if(to.path === "/search/create" && store.state.isAuthority){
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

/**
 * 登录判断
 */
checkLogin(router);

export default Vue;
