<template>
  <div class="crumbs">
    <el-breadcrumb separator="&gt;">
    <i class="mf mf-lg mf-home fl"></i><span class="single fl">&nbsp;您的位置：&nbsp;&nbsp;</span>
      <el-breadcrumb-item :to="{ path: '/' }">首页
      </el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in normalizedCrumb" :key="item.path" :to="item.meta.linkUnActive?'':item.path">
        {{ item.name }}
      </el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>
<script>
  export default {
    name: 'CoreBreadCrumb',
    data() {
      return {}
    },
    computed: {
      /**
       * 可自定义传入导航链接
       * @returns {RouteRecord[]}
       */
      normalizedCrumb() {
        let breadCrumb = this.$route.matched;
        if (this.breadCrumb.length > 0) {
          breadCrumb = this.breadCrumb;
        }
        return breadCrumb;
      }
    },
    props: {
      breadCrumb: {
        type: Array,
        default() {
          return [];
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  @crubmsColor: #a5acbe;
  .crumbs {
    display: block;
    height: 30px;
    line-height: 30px;
    padding: 15px 0 0px 20px;;
    color: @crubmsColor;
  }
  .mf-home{
    line-height:14px;
  }
  .single{
    font-size:13px;
    line-height:14px;
    }
</style>
