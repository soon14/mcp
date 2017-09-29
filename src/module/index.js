import Vue from 'vue'
import ElementUI from 'element-ui';
import 'src/styles/base.less';
import 'src/assets/theme/theme-midea/index.css';
import App from './App.vue';
import VueRouter from 'vue-router'
import routes from './login/router/router.js';
import VueSocketio from 'vue-socket.io';
import { checkLogin } from 'utils/utils.js'

Vue.use(ElementUI);
Vue.use(VueSocketio,process.env.api.socket.host);
Vue.use(VueRouter);

const router = new VueRouter({
  routes
});

/**
 * 登录判断
 */
checkLogin(router);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app');
