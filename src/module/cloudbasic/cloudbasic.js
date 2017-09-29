import Vue from 'vue';
import App from './App';
import ElementUI from 'element-ui';
import VueSocketio from 'vue-socket.io';
import 'src/assets/theme/theme-midea/index.css';
import 'src/styles/base.less';
import { checkLogin }  from 'utils/utils.js';


Vue.use(ElementUI);
Vue.use(VueSocketio,'/',{
  reconnection: false
});

/**
 * 登录判断
 */
checkLogin();

new Vue({
  render: h => h(App)
}).$mount('#app');
