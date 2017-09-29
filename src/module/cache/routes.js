import Manager from './views/Manager.vue';

import cacheApplyManage from './views/components/applyManage.vue';
import cacheApply from './views/components/apply.vue';
import cacheIntroduce from './views/CacheServer.vue';

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
		redirect: '/cache'
	},{
    path: '/',
    hidden: true,
    redirect: '/cache/applyManage'
  },
	{
		path:'/cacheIntroduce',
		component:cacheIntroduce,
		hidden:true
	},
	{
    path: '/cache',
    component: Manager,
		name: '云缓存 Redis',
		iconCls: 'mf mf-yunhuancun',
		redirect:'/cache/applyManage',
    children: [
			{
				path:'/cache/applyManage',
				component:cacheApplyManage,
				iconCls: 'el-icon-message',
				name:'云缓存申请'
			},
			{
				path:'/cache/apply',
				component:cacheApply,
				iconCls: 'el-icon-message',
				name:'申请缓存',
				hidden:true
			},
    ]
	}
];

export default routes;
