
<template>
  <section class="container-header">
    <section class="logo" @click="goBackLogin"></section>
    <section class="nav hidden-xs">
      <el-dropdown v-for="moduler in modules" :class="{'head-nav': true}" menu-align="star" @command="navigate">
        <section class="header-name" v-if="moduler.menus.length !== 0" :class="{'is-active': moduler.path.indexOf(pathTest) != -1}">{{moduler.name}}</section>
        <section class="header-name" v-else :class="{'is-active': moduler.path.indexOf(pathTest) != -1}"><a :href="moduler.url">{{moduler.name}}</a></section>
        <el-dropdown-menu slot="dropdown" class="head-menu" :class="{'menu-hidden':moduler.menus.length==0}">
          <section>
            <div class="triangle"><img src="/static/images/triangleImg/u266.png" /></div>
          </section>
          <el-dropdown-item :command="item.url" v-for="item in moduler.menus">
            {{item.name}}
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </section>
    <section class="other">
      <section class="project-wrapper hidden-xs hidden-sm">
        <el-dropdown class="project-group" @command="clickProjectName">
          <section>
            <span class="mf mf-lg mf-xiangmuwenjianjia"></span>
            <span ref="clickProjectName" v-if="!!simulation.length&&!!simulation[0].projectId" >{{this.showSimulation}}</span>
            <span v-else></span>
            <span class="mf mf-lg mf-bottom"></span>
          </section>
          <!-- 下拉菜单的选项 -->
          <el-dropdown-menu slot="dropdown" class="project-menu">
            <section class="dropdown-menu-box">
              <div class="triangle"><img src="/static/images/triangleImg/u266.png" /></div>
              <el-dropdown-item :command="item" @click="getRole" v-for="(item,index) in simulation">
                  <span :title="item.projectName.length>14?`${item.projectName}`:''">{{item.projectName}}</span>
              </el-dropdown-item>
            </section>
          </el-dropdown-menu>
        </el-dropdown>
      </section>
      <section class="setting">
        <a class="header-icon" title="帮助文档" href="/#/websiteinfo/faq" target="_blank"><i class="mf mf-lg mf-bangzhuwendang"></i></a>
        <!-- <div class="header-icon mf mf-lg mf-bangzhuwendang" title="帮助文档" style="height:60px"></div> -->
        <!--<div class="header-icon" title="消息中心"><i class="mf mf-lg mf-xiaoxizhongxin"></i></div>
        <div class="header-icon" title="工单系统"><i class="mf mf-lg mf-gongdanxitong"></i></div>-->
        <el-dropdown class="set-item" @command="settingItemClick" menu-align="end">
          <section class="header-icon"><span class="mf mf-lg mf-yonghuzhongxin"></span></section>
          <el-dropdown-menu slot="dropdown" class="set-group">
            <div class="triangle"><img src="/static/images/triangleImg/u266.png" /></div>
            <el-dropdown-item v-for="(item, index) in settings" :command="index.toString()" v-role-authority:item.roles="item.roles">
              {{item.setItem}}
            </el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </section>
    </section>
  </section>
</template>
<style lang="less" scoped>
  @import "~styles/vars.less";
  .container-header{
    background-color: @color-background;
    color:#eee;
    height:60px;
    display: flex;
    /*justify-content:space-between;*/
    align-items: center;
    position: relative;
    z-index: 1030;
    /*min-width: 800px !important;*/
    .logo{
      width:220px;
      height:60px;
      background: url('/static/images/loginImg/logo.png') no-repeat;
      background-size: 142px 22px;
      background-position: 20px 19px;
      line-height: 60px;
      position:absolute;
      top:0px;
      left:0px;
      text-align: center;
      cursor: pointer;
    }
    .nav{
      height:60px;
      margin-left:220px;
      .header-name {
        a {
          text-align: center;
          color: #a5acbe;
        }
        a:hover {
          color: @color-primary;
        }
      }
      .head-nav{
        float: left;
        height: 60px;
        line-height: 60px;
        margin-right: 40px;
        width: 60px;
        cursor: pointer;
        position: relative !important;
        section{
          text-align: center;
          color: #a5acbe;
        }
        section:hover{
          color: @color-primary;
        }
        .is-active{
          height: 58px;
          line-height: 58px;
          border-bottom: 2px solid @color-primary;
          color: @color-primary;
          a{
            color: @color-primary;
          }
        }
      }
    }
    .other{
      width:340px;
      height:60px;
      position:absolute;
      line-height: 60px;
      right:0px;
      top:0px;
      .project-wrapper{
        cursor: pointer;
        position: absolute;
        right: 94px;
        .project-group{
          position: relative;
          section{
            span{
              color:#a5acbe;
            }
          }
          section:hover{
            span{color:@color-primary;}
          }
        }
      }
      .setting{
        cursor: pointer;
        position: absolute;
        right: 0;
        overflow: hidden;
        padding: 0;
        .header-icon{
          display: inline-block;
          position: relative;
          margin: 0;
          height: 60px;
          line-height: 60px;
          margin-right: 16px;
        }
        .header-icon .mf{
          color: #a5acbe;
        }
        .header-icon:hover .mf{
          color: @color-primary;
        }
      }
    }
  }
  .el-dropdown{
    font-size: 16px;
  }
  .el-dropdown-menu{
    border: none;
    box-shadow: none;
    padding: 5px;
    margin: 0;
    background: @color-background;
    border-radius: 5px;
    .el-dropdown-menu__item{
      text-align: center;
      color: #a5acbe;
      height: 30px;
      line-height: 30px;
      font-size: 14px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .el-dropdown-menu__item:hover{
      color: @color-primary;
      background: #090718;
    }
    .triangle{
      height: 6px;
      width: 180px;
      position: absolute;
      top: -6px;
      left: 0;
      img{
        position: absolute;
        left: 35px;
        width: 18px;
        height: 6px;
      }
    }

  }
  .menu-hidden{
    display: none;
  }
  .head-menu{
    margin-top: 66px;
    .el-dropdown-menu__item{
      width: 150px;
    }
  }
  .project-menu{
    margin-top: 6px;
    .dropdown-menu-box {
      overflow: hidden;
      max-height:310px;
      overflow-y:auto;
    }
    .dropdown-menu-box::-webkit-scrollbar{
      width: 4px;
    }
    .dropdown-menu-box::-webkit-scrollbar-thumb{
      background: rgba(183,174,174,.4)
    }
    .dropdown-menu-box::-webkit-scrollbar-track{
      background: @color-background;
    }
    .el-dropdown-menu__item{
      width: 100px;
    }
    .triangle{
      width: 130px;
      img{
        position: absolute;
        left: 44%;
      }
    }
  }
  .set-group{
    margin-top: 6px;
    .el-dropdown-menu__item{
      width: 100px;
    }
    .triangle{
      width: 130px;
      img{
        position: absolute;
        left: 100px;
      }
    }
  }
</style>
<script>
  import { switchProject } from './service';
  import { requestLogout } from '../../../module/login/api/service';
  import * as srv from 'src/module/management/api/service';
  import * as srv1 from 'src/module/login/api/service';
  import roleDirective from 'common/directive/authority_role_directive';
  import ls from 'utils/local_storage_tool';
  import ss from 'utils/session_storage_tool';

  export default{
    name:"CoreHeader",
    created () {
      this.getProjectList();
    },
    data() {
      return {
        pathTest:window.location.href.slice(window.location.href.indexOf('module/'),window.location.href.indexOf('#')).split('/')[1],
        isActive:false,
        user:ls.getObject("user"),
        showSimulation: '项目列表',
        testUrl:window.location.href,
        modules:[
          {
            name: '云基础',
            url: '/module/cloudbasic.html',
            path: 'cloudbasic.html',
            menus:[]
          },{
            name: '云应用',
            path:'video.html,/module/search.html',
            menus: [{
              name: '视频点播',
              url:'/module/video.html'
              }
              ,{
              name: '搜索引擎',
              url:'/module/search.html'
            }
            ]
          },{
            name: '云服务',
            path:'monitor.html,objectstroe.html,database.html,cache.html',
            menus: [{
              name: '云监控',
              url:'/module/monitor.html'
            },{
              name: '对象存储',
              url:'/module/objectstroe.html'
            },{
              name: '云数据库 MySQL',
              url:'/module/database.html#/home'
            },{
              name: '云缓存 Redis',
              url:'/module/cache.html#/home'
            }]
          }],
        simulation:[{
          projectDesc:"",
          projectId:"",
          projectName:"没有项目信息"
        }],
        settings:[
          {
            setItem:'我的项目',
            roles:['operator','member','admin'],
            url:'/module/management.html#/project/mine'
          },{
            setItem:'管理后台',
            roles:['admin'],
            url:'/module/management.html#/setting/user'
          },{
            setItem:'退出登录',
            roles:['*'],
            type: 'method',
            method:'logout'
          }
        ]
      }
    },
    sockets: {
     connect: function () {
        console.log('socket 连接成功');
      },
      message: function(data) {
        console.log("socket返回信息:",data);
      },
      relogin: function(res) {
        let that=this;
        if(res.account === this.user.account){
          this.$alert('权限变更，需重新登录！','提示', {
            confirmButtonText: '确定',
            callback: action => {
              that.logout();
            }
          });
        }
      }
    },
    methods: {
      /**
       * 点击图标跳转回去首页
       * */
      goBackLogin() {
        window.location.href="/module/management.html#/home";
      },
      /**
       * 获取用户的项目列表
       */
      getProjectList(){
        let project=ls.getObject(['project']);
        if(project){
          this.showSimulation = project.projectName;
        }
        srv.requestUserProject().then(data => {
          if(data.errorCode == "200"){
            this.simulation = data.result.info;
            if (!project) {
              ls.addItem('project', this.simulation[0]);
              this.showSimulation = this.simulation[0].projectName;
            }
          }
        });
      },
      /**
       * 项目名称点击下拉项
       * @params  command--下拉选项的索引
       * */
      clickProjectName(command) {
        this.$refs.clickProjectName.innerHTML = command.projectName;
        // 声明BOM的pathname， 在管理后台页面
        ls.addItem('project', command);
        this.getRole(command);
      },
      /**
       * 点击项目菜单项获得角色以及在该项目下的逻辑
       * @params project
       * */
      getRole(project) {
        let lsUser = ls.getObject(['user']);
        switchProject({projectId: project.projectId}).then(data => {
          if(data.errorCode == '200') {
            srv1.getUserRole(true,lsUser.account, project.projectId).then(data => {
              if (data.errorCode == '200') {
                ls.addItem('project', project);
                if ( window.location.hash.indexOf('/project/projectdetail/') != -1 ) {
                  this.$router.push('/project/projectdetail/' + project.projectId);
                  window.location.reload();
                } else {
                  window.location.reload();
                }
              }
            });
          }
        });
      },
      /**
       * 退出登录
       */
      logout() {
        requestLogout().then((res) =>{
          if(res.code.toString() === "200"){
            window.location.href = '/#/login';
          }else{
            this.$notification.error("退出登录失败，"+res.data);
          }
        });
      },
      /**
       * 菜单跳转
       * @param command
       */
      navigate(url) {
        window.location.href = url;
      },
      /**
       * 下拉点击事件
       */
      settingItemClick(id){
        let item = this.settings[id];
        if(item.type === "method"){
          this[item["method"]]();
        }else{
          let curUrl=window.location.pathname + window.location.hash;
          if(curUrl === item.url){
            this.$router.go(0);
          }else{
            window.location.href = item.url;
          }
        }
      }
    }
  }
</script>
