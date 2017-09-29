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
import VueSocketio from 'vue-socket.io';

import _ from 'lodash';

Vue.use(ElementUI);
Vue.use(VueRouter);
Vue.use(Vuex);
Vue.use(VueSocketio,process.env.api.socket.host);


Object.defineProperty(Vue.prototype, '$moment', { value: moment });
Object.defineProperty(Vue.prototype, '$_', { value: _ });

const router = new VueRouter({
  routes
});

/**
 * 登录判断
 */
//checkLogin(router);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');
