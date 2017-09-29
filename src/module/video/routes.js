import Home from './views/Home.vue';
import Manager from './views/Manager.vue';
import OverView from './views/components/OverView.vue';
import AppManage from './views/components/AppManage.vue';
import DataStatistics from './views/components/DataStatistics.vue';
import GlobalSet from './views/components/GlobalSet.vue';
import OpenVideo from './views/components/OpenVideo.vue';
import VideoManage from './views/components/VideoManage.vue';


import NotFound from 'components/core/core_page/404.vue';

let routes = [{
		path: '/404',
		component: NotFound,
		name: '',
		hidden: true
	}, {
		path: '/',
		hidden: true,
		redirect: '/video/overview'
	}, {
		path: '/home',
		hidden: true,
		name: '首页',
		leaf: true,
		component: Home,
		redirect: '/video/overview'
	}, {
		path: '/components',
		name: '视频点播',
		meta: {
			linkUnActive:true
		},
		component: Manager,
		iconCls: 'mf mf-shipindianbo',
		children: [{
			path: '/video/overview',
			component: OverView,
			name: '视频管理',
			iconCls: 'el-icon-message'
		}, {
			path: '/video/datastatistics',
			component: DataStatistics,
			name: '数据统计',
			iconCls: 'el-icon-message',
		}, {
			path: '/video/globalset',
			component: GlobalSet,
			name: '全局设置',
			iconCls: 'el-icon-message',
		}, {
			path: '/video/appmanage',
			component: AppManage,
			name: '应用管理',
			iconCls: 'el-icon-message',
		}]
	}, {
		path: '/video/create',
		hidden: true,
		name: '开通视频点播',
		component: OpenVideo
	},
	{
		path: '/video/detail/:video',
		hidden: true,
		name: '视频详情',
		meta: {
			activeMenu:'/video/overview'
		},
		component: VideoManage
	},
	{
		path: '*',
		hidden: true,
		redirect: {
			path: '/404'
		}
	}
];

export default routes;
