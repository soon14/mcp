import Home from './views/Home.vue';
import Manager from './views/Manager.vue';
import OverView from './views/components/OverView.vue';
import AppManage from './views/components/AppManage.vue';
import ObjectDetail from './views/components/ObjectDetail.vue';
//import OpenOss from './views/components/OpenOss.vue';
//import OssSuccess from './views/components/OssSuccess.vue';
import CreateOss from './views/components/CreateOss.vue';
import ObjectOverView from './views/utils/OverView.vue';
import ObjectFile from './views/utils/Object.vue';
import ObjectTask from './views/utils/Task.vue';

import ObjectAttriBute from './views/utils/Attribute.vue';

import NotFound from 'components/core/core_page/404.vue';

let routes = [{
		path: '/404',
		component: NotFound,
		name: '',
		hidden: true
	}, {
		path: '/',
		hidden: true,
		redirect: '/object/overview'
	}, {
		path: '/home',
		hidden: true,
		name: '首页',
		leaf: true,
		component: Home,
		redirect: '/object/overview'
	}, {
		path: '/components',
		name: '对象存储OSS',
		meta: {
			linkUnActive:true
		},
		component: Manager,
		iconCls: 'mf mf-oss',
		children: [{
			path: '/object/overview',
			component: OverView,
			name: '概览',
			iconCls: 'el-icon-message'
		}, {
			path: '/object/appmanage',
			component: AppManage,
			name: '应用管理',
			iconCls: 'el-icon-message',
		}]
	},
//	{
//		path: '/object/create',
//		hidden: true,
//		name: '开通oss',
//		component: OpenOss
//	}, {
//		path: '/object/create/success',
//		hidden: true,
//		name: '开通oss成功',
//		component: OssSuccess
//	},
	{
		path: '/object/create',
		hidden: true,
		name: '开通oss',
		component: CreateOss
	}, {
		path: '/object/detail',
		component: ObjectDetail,
		hidden: true,
		name: 'Bucket详情',
		children: [{
			path: '/object/detail/overview/:bucket_key',
			component: ObjectOverView,
			hidden: true,
			meta: {
				activeMenu:'/object/overview'
			},
			name: 'Bucket概览',
		}, {
			path: '/object/detail/attribute/:bucket_key',
			component: ObjectAttriBute,
			hidden: true,
			meta: {
				activeMenu:'/object/overview'
			},
			name: 'Bucket属性',
		},{
			path: '/object/detail/object/:bucket_key',
			component: ObjectFile,
			hidden: true,
			meta: {
				activeMenu:'/object/overview'
			},
			name: 'Object管理',
		},{
			path: '/object/detail/task/:bucket_key',
			component: ObjectTask,
			hidden: true,
			meta: {
				activeMenu:'/object/overview'
			},
			name: '任务管理',
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
