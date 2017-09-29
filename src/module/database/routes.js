import Manager from './views/Manager.vue';

import dbApplyManage from './views/components/applyManage.vue';
import dbApply from './views/components/apply.vue';
import dbIntroduce from './views/CloudDataServer.vue';

import NotFound from 'components/core/core_page/404.vue';


let routes = [
	{
		path: '/404',
		component: NotFound,
		name: '',
		hidden: true
	},
	{
		path: '/home',
		hidden: true,
		redirect: '/database'
	},{
    path:'/',
    redirect: '/database/applyManage',
    hidden:true
  },
	{
		path:'/dbIntroduce',
		component:dbIntroduce,
		hidden:true
	},
	{
    path: '/database',
    component: Manager,
		name: '云数据库 MySQL',
		iconCls: 'mf mf-yunshujukuguanli',
		redirect:'/database/applyManage',
    children: [
			{
				path:'/database/applyManage',
				component:dbApplyManage,
				iconCls: 'el-icon-message',
				name:'云数据库申请'
			},
			{
				path:'/database/apply',
				component:dbApply,
				iconCls: 'el-icon-message',
				name:'申请数据库',
				hidden:true
			},
			{
				path:'/123',
				iconCls: 'el-icon-message',
				name:'数据库运维平台',
				meta:{
					target:'_blank',
					targetUrl:'http://dbmgr.midea.com/login',
				}
			}
    ]
	}
]

export default routes;
