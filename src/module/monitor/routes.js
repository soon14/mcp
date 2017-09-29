import Home from './views/Home.vue';
import Manager from './views/Manager.vue';
import Alarm from './views/Alarm.vue';
import Host from './views/components/host.vue'
import MonitorChart from './views/components/monitorChart.vue'
import Contact from './views/components/alarm/contact.vue'
import Rules from './views/components/alarm/rules.vue'
import Introduce from './views/components/introduce.vue'


import NotFound from 'components/core/core_page/404.vue';
let routes = [{
		path: '/404',
		component: NotFound,
		name: '',
		hidden: true
	}, {
		path: '/components/introduce',
    component: Introduce,
		hidden: true
	}, {
		path: '/',
		hidden: true,
		redirect: '/components/host'
	}, {
		path: '/home',
		hidden: true,
		name: '首页',
		leaf: true,
		component: Home,
		redirect: '/components/host'
	}, {
		path: '/components',
		name: '云监控',
		meta: {
			linkUnActive:true
		},
		component: Manager,
		iconCls: 'mf mf-jiankongxitong',
		children: [{
      path: '/components/host',
      component: Host,
      name: '主机监控',
      iconCls: 'el-icon-message',
    },{
      path: '/components/monitorChart',
      component: MonitorChart,
      name: '监控图表',
      hidden:true
    },{
      path: '',
      component: Alarm,
      name: '告警服务',
      children: [{
        path: '/components/alarm/contact',
        component: Contact,
        name: "报警联系人",
        iconCls: 'el-icon-message',
      },{
        path: '/components/alarm/rules',
        component: Rules,
        name: "报警规则",
        iconCls: 'el-icon-message',
      }]
    }]
	},{
		path: '*',
		hidden: true,
		redirect: {
			path: '/404'
		}
	}
];

export default routes;
