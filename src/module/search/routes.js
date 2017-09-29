import Home from './views/Home.vue';
import Manager from './views/Manager.vue';
import IndexManagement from './views/components/IndexManagement.vue';
import Tenant from './views/components/TenantManagement.vue';
import Simulation from './views/components/SimulationApplication.vue';
import Presentation from './views/components/PresentationData.vue';
import CreateIndex from './views/index_edit/CreateIndex.vue';
import RebuildIndex from './views/index_edit/RebuildIndex.vue';
import AddIndexField from './views/index_edit/AddIndexField.vue';
import SearchEngines from './views/components/SearchEngines.vue';

import NotFound from 'components/core/core_page/404.vue';

let routes = [{
		path: '/404',
		component: NotFound,
		name: '',
		hidden: true
	},{
		path:'/',
		component:IndexManagement,
		redirect:'/search/indexmanagement',
		hidden:true
	},{
		path:'/search/create',
		component:SearchEngines,
		name:'开通搜索服务',
		hidden:true
	},{
		path: '/home',
		hidden: true,
		name: '首页',
		leaf: true,
		component: Home,
		redirect: '/search/indexmanagement'
	}, {
		path: '/components',
		name: '搜索引擎',
		meta: {
			linkUnActive:true
		},
		component: Manager,
		iconCls: 'el-icon-search',
		children: [
		  {
			path: '/search/indexmanagement',
			component: IndexManagement,
			name: '索引管理'
		}, {
			path: '/search/tenant',
			component: Tenant,
			name: '租户管理',
			iconCls: 'el-icon-search',
		},{
			path: '/search/presentation',
			component: Presentation,
			name: '数据展示',
			iconCls: 'el-icon-search',
		},{
			path: '/search/simulation',
			component: Simulation,
			name: '模拟应用',
			iconCls: 'el-icon-search',
		},{
			path: '/search/index_edit/createindex',
			component: CreateIndex,
			name: '新增索引',
			hidden: true,
		},{
			path: '/search/index_edit/rebuildindex',
			name: "重建索引",
			component: RebuildIndex,
			hidden: true,
		},{
			path: '/search/index_edit/addindexfield/:id',
			name: "新增索引字段",
			component: AddIndexField,
			hidden: true,
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
