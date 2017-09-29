/**
 * Created by CHENRC2 on 2017-7-26.
 */
import FAQ from '../views/FAQ.vue';
import Home from '../views/Home.vue';
import NotFound from 'components/core/core_page/404.vue';

let routes = [
  {
    path: '/',
    component: Home,
    name: '首页'
  },{
    path: '/faq/:system',
    component: FAQ,
    name: 'faq'
  },{
    path: '/404',
    component: NotFound,
    name: ''
  },{
    path: '*',
    redirect: {
      path: '/404'
    }
  }
];

export default routes;
