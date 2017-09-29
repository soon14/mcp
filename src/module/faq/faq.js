import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
//import VueSocketio from 'vue-socket.io';
import VueRouter from 'vue-router'
import routes from './router/router.js';
import 'src/assets/theme/theme-midea/index.css';
import 'src/styles/base.less';
import { checkLogin }  from 'utils/utils.js';


Vue.use(ElementUI);
Vue.use(VueRouter);
//Vue.use(VueSocketio,process.env.api.socket.host);


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
