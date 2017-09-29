import Home from './views/Home.vue';
import Manager from './views/Manager.vue';
import TableList from './views/components/TableList.vue';
import TableFull from './views/components/TableFull.vue';
import UserSearch from './views/components/UserSearch.vue';
import Dialog from './views/components/Dialog.vue';
import NotFound from 'components/core/core_page/404.vue';
import OrgSelector from 'components/utils/org_selector/OrgSelector.vue';
import ThroughModel from 'components/utils/user_authorization/ThroughModel.vue'
import newMember from 'components/utils/new_member/newMember.vue';
import OrgSelectorLiteDemo from './views/utils/OrgSelectorLiteDemo.vue';
import OrgSelectorSingleDemo from './views/utils/OrgSelectorSingleDemo.vue';

let routes = [
  {
    path: '/404',
    component: NotFound,
    name: '',
    hidden: true
  },{
    path: '/',
    hidden: true,
    redirect: '/home'
  },{
    path: '/home',
    component: Home,
    name: '首页',
    leaf: true
  },{
  path: '/components',
  name: '公共组件',
  component: Manager,
  iconCls: 'el-icon-message',
  children: [{
    path: '/components/table_list',
    component: TableList,
    name: '单表格(ListTable)',
    iconCls: 'el-icon-message',
  },{
    path: '/components/table_full',
    component: TableFull,
    name: '分页表格(FullTable)',
    iconCls: 'el-icon-message',
  },{
    path: '/components/user_search',
    component: UserSearch,
    name: "统一搜索框",
    iconCls: 'el-icon-message',
  },{
    path: '/components/dialog',
    component: Dialog,
    name: "弹出框",
    iconCls: 'el-icon-message',
  },{
    path:'/components/new_member',
    component:newMember,
    name:"新成员",
    iconCls: 'el-icon-message',
  },{
    path:'/components/add_newmember',
    component:OrgSelector,
    name:"新增项目成员",
    iconCls: 'el-icon-message',
  },{
    path: '/utils/OrgSelectorLiteDemo',
    component: OrgSelectorLiteDemo,
    name: '人员筛选',
    iconCls: 'el-icon-message'
  },{
    path: '/utils/OrgSelectorSingleDemo',
    component: OrgSelectorSingleDemo,
    name: '单人筛选',
    iconCls: 'el-icon-message'
  },{
    path: '/components/ThroughModel',
    component: ThroughModel,
    name: '穿梭框',
    iconCls: 'el-icon-message'
  }]
}, {
    path: '*',
    hidden: true,
    redirect: {path: '/404'}
}];

export default routes;
