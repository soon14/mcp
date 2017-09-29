/**
 * Created by CHENRC2 on 2017-7-13.
 */
import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import moment from 'moment';
import _ from 'lodash';
import 'src/assets/theme/theme-midea/index.css';
import 'src/styles/base.less';
import VueRouter from 'vue-router';
import Vuex from 'vuex';
import store from './vuex/store';
import router from './router/routes.js';
import VueSocketio from 'vue-socket.io';
import { checkLogin }  from 'utils/utils.js';
import Paper from 'components/awesome/paper/Paper.vue'

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueSocketio,'/');

Object.defineProperty(Vue.prototype, '$moment', { value: moment });
Object.defineProperty(Vue.prototype, '$_', { value: _ });


Vue.component('paper',Paper);

/**
 * 登录判断
 */
checkLogin(router);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
