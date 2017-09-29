/**
 * Created by CHENRC2 on 2017-7-26.
 */
import Login from '../views/Login.vue';
// 联系我们素质四连
import WebsiteInfo from '../views/WebsiteInfo.vue';
import ContactUs from '../views/superlinks/ContactUs.vue';
import PrivatePolicy from '../views/superlinks/PrivatePolicy.vue';
import ServiceTerm from '../views/superlinks/ServiceTerm.vue';
import FAQ from '../views/superlinks/FAQ.vue';
// 授权
import Authority from '../views/Authority.vue';
import NotFound from 'components/core/core_page/404.vue';

let routes = [
  {
    path: '/login',
    component: Login,
    name: '登录'
  },
  {
    path: '/websiteinfo',
    component: WebsiteInfo,
    children: [
      {
        path: '/websiteinfo/contactus',
        component: ContactUs
      },
      {
        path: '/websiteinfo/privatepolicy',
        component: PrivatePolicy
      },
      {
        path: '/websiteinfo/serviceterm',
        component: ServiceTerm
      },
      {
        path: 'faq',
        component: FAQ,
        name: '帮助文档'
      }
    ]
  },
  {
    path: '/authority',
    component: Authority,
    name: '权限'
  },{
    path: '/',
    redirect: {
      path: '/login'
    }
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
