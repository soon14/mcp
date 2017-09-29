/**
* Created by CHENRC2 on 2017-7-16.
*/
<template>
  <section class="container">
    <el-menu :default-active="defaultActive" class="nav-menu" theme="dark" unique-opened>
      <template v-for="(item,index) in normalizedMenus" v-if="!item.hidden">
        <el-submenu :index="index+''" v-if="!item.leaf">
          <template slot="title"><span class="icons"><i :class="item.iconCls"></i></span>{{item.name}}</template>
          <el-menu-item class="nav-menu-item" v-for="child in item.children" :index="child.path" :key="child.path" v-if="!child.hidden&&(!child.children||child.leaf)" @click="targetUrl(child)">
            {{child.name}}
          </el-menu-item>
          <el-submenu class="single-item" v-else-if="!child.hidden" index="child.path">
            <template slot="title">{{child.name}}</template>
            <el-menu-item class="nav-menu-item " v-for="c in child.children" :index="c.path" :key="c.path" v-if="!c.hidden" @click="targetUrl(c)">
              {{c.name}}
            </el-menu-item>
          </el-submenu>
        </el-submenu>
        <el-menu-item  class="nav-menu-item" :index="item.path" @click="targetUrl(item)" v-else><i :class="item.iconCls"></i>{{item.name}}</el-menu-item>
      </template>
    </el-menu>
  </section>
</template>
<style lang="less" scoped>
  @import '~styles/base.less';
  .icons{
    font-size:16px !important;
  }
  .container{
    // margin-top: -1px;
    .nav-menu{
      background: @color-background;
      color: #fff;
      .single-item{
        font-size:13px;
      }
      .nav-menu-item{
        background: @color-background;
        color: #a5acbe;
        font-size: 13px;
        padding-left: 57px !important;
        &.is-active{
          color: @color-primary;
          border-left: 2px solid @color-primary;
          background:rgba(255,255,255,0.05) ;
          padding-left: 55px !important;
          // box-sizing:border-box;
          // -moz-box-sizing:border-box;
        }
      }
    }
  }
</style>
<script>
  import utils from "utils/utils.js"
  export default{
    name: 'CoreNavSub',
    computed: {
      /**
       * 通过props传递菜单，可以直接读menus，不读路由的菜单
       * @returns {RouteConfig[]}
       */
      normalizedMenus(){
        let routes = this.$router.options.routes;
        if(this.menus.length > 0){
          routes = this.menus;
        }else{
          routes = this.$router.options.routes;
        }
        return routes;
      },
      /**
       *  通过meta属性activeMenu属性配置可以设置激活的菜单
       * @returns {methods.showMenu|showMenu|string|string}
       */
      defaultActive(){
        let currentRoute=this.$route;
        if(currentRoute.meta&&currentRoute.meta.hasOwnProperty("activeMenu")&&currentRoute.meta.activeMenu){
          return currentRoute.meta.activeMenu;
        }
        return currentRoute.path;
      }
    },
    methods:{
      targetUrl(item){
        if(item.meta&&item.meta.hasOwnProperty("target")){
          window.open(item.meta.targetUrl,item.meta.target);
        }else{
          //跳转同一个路由就刷新当前路由状态
          window.location.hash === ("#" + item.path)?this.$router.go(0):this.$router.push(item.path);
        }
      }
    },
    props:{
      menus: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>
