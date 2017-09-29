import VueRouter from 'vue-router';
import { authorityRouterFilter }  from 'utils/utils.js';
import storage from "utils/local_storage_tool.js";
import _ from "lodash";

import Manager from '../views/Manager.vue';
import Mine from '../views/project/Mine.vue';
import Project from '../views/setting/project/Project.vue';
import ProjectEdit from '../views/setting/project/ProjectEdit.vue';
import User from '../views/setting/user/User.vue';
import UserEdit from '../views/setting/user/UserEdit.vue';
import PersonalProject from '../views/setting/user/UserPersonal.vue';
import Home from '../views/home/Home.vue';
import NotFound from 'components/core/core_page/404.vue';
import ProjectDetail from '../views/setting/project/ProjectDetail.vue';
import CloudDataServer from '../views/introduce/CloudDataServer.vue';
import CloudControl from '../views/introduce/CloudControl.vue';
import VideoOrderPlay from '../views/introduce/VideoOrderPlay.vue';
import ObjectStore from '../views/introduce/ObjectStore.vue';
import CacheServer from '../views/introduce/CacheServer.vue';
import SearchEngines from '../views/introduce/SearchEngines.vue';
import Authorization from 'components/utils/user_authorization/Authorization.vue';
import NewMember from 'components/utils/new_member/newMember.vue';
import Author from '../views/setting/user/Author.vue';
import OperationMask from '../views/setting/project/OperationMask.vue';


/**
 * 没权限的菜单
 * @type {[*]}
 */
const routes  = [
  {
    path: '/404',
    component: NotFound,
    name: '404',
    hidden: true
  },
  {
    path: '/home',
    component: Home,
    hidden: true,
  },{
    path: '/',
    hidden: true,
    redirect: '/home'
  },
  {
    path:'/cloud_data_server',
    component:CloudDataServer,
    name:"云数据服务",
    hidden: true
  },{
    path:'/cloud_control',
    component:CloudControl,
    name:"云控制",
    hidden: true
  },{
    path:'/video_order_play',
    component:VideoOrderPlay,
    name:"视频点播",
    hidden: true
  },{
    path:'/object_store',
    component:ObjectStore,
    name:"对象存储",
    hidden: true
  },{
    path:'/cache_server',
    component:CacheServer,
    name:"缓存服务",
    hidden: true
  }
  ,{
    path:'/search_engines',
    component:SearchEngines,
    name:"搜索引擎",
    hidden: true
  }
  ,{
    path: '*',
    hidden: true,
    redirect: {
      path: '/404'
    }
  }];

/**
 * 有权限控制的菜单
 * @type {[*]}
 */
const asyncRouterMap = [
  {
    path: '/setting',
    name: '设置',
    component: Manager,
    iconCls: 'el-icon-setting',
    meta:{
      role:["admin"],
      linkUnActive:true
    },
    children: [
      {
      path: '/setting/user',
      component: User,
      name: '用户',
      iconCls: 'el-icon-message',
      meta:{
        role:["admin"]
      }
    },{
      path: '/setting/user/personal_project',
      component: PersonalProject,
      name: '个人项目',
      hidden: true,
      meta:{
        activeMenu: '/setting/user'
      }
    },{
      path: '/setting/user/project_detail/:projectId',
      name: "项目详情",
      component: ProjectDetail,
      hidden: true,
      meta:{
        activeMenu: '/setting/project'
      },
      children:[
        {
          path: '/setting/user/user_edit',
          name: "添加项目成员",
          component: UserEdit,
          hidden: true,
          meta:{
            activeMenu: '/setting/user'
          }
        }]
    },{
      path: '/setting/project',
      component: Project,
      name: '项目',
      iconCls: 'el-icon-message',
      leaf:true,
      meta:{
        role:["admin"]
      },
      children: [{
        path: '/setting/project/add/:id',
        component: ProjectEdit,
        name: '修改项目',
        hidden: true,
        meta:{
          activeMenu: '/setting/project',
          role:["admin"]
        }
      }]
    }]
  }, {
    path: '/project',
    name: '我的项目',
    component: Manager,
    iconCls: 'el-icon-date',
    meta:{
      role:["operator","admin","member"],
      linkUnActive:true
    },
    children: [{
      path: '/project/mine',
      component: Mine,
      name: '项目列表',
      iconCls: 'el-icon-message',
      meta:{
        role:["operator"]
      }
    },{
      path: '/user/personalproject',
      component: PersonalProject,
      name: '',
      hidden: true
    },{
      path: '/project/projectdetail/:projectId',
      name: "项目详情",
      component: ProjectDetail,
      hidden: true,
      meta:{
        activeMenu: '/project/mine',
        role:["operator"]
      },
      children: [
        {
          path: '/project/projectdetail/useredit/:projectId',
          name:'新增项目成员',
          component: UserEdit,
          meta:{
            role:["operator"]
          }
        },
        {
          path: '/project/projectdetail/author/:account/:projectId',
          component: Author,
          meta:{
            role:["operator"]
          }
        }
      ]
    }]
  }];

const router = new VueRouter({
  routes
});

const user = storage.getObject("user");
const need_authority = process.env.authority;

//线程变量，不需要鉴权则添加所有路由
if(!need_authority){
  router.addRoutes(asyncRouterMap);
  for( let r of asyncRouterMap){
    router.options.routes.push(r);
  }
}
else if(user){//用户角色存在，添加角色路由控制
  const roles=_.map(user.role,'name'),
    auth_routes = authorityRouterFilter(asyncRouterMap,roles);
  //过滤权限并动态添加路由
  router.addRoutes(auth_routes);
  for( let r of auth_routes){
    router.options.routes.push(r);
  }
}

export default router;
