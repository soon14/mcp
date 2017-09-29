<template>
  <section class="manager-container">
    <div class="content-nav">
      <core-nav-sub :menus="menus"></core-nav-sub>
    </div>
    <div class="content-crumb">
      <core-bread-crumb></core-bread-crumb>
    </div>
    <div class="container-fluid">
      <div class="box">
        <h2 class="cloud">视频点播</h2>
        <p class="cloudmsg"> 结合美的内部需求研发的视频点播服务，集视频上传，媒体资源管理，视频播放<br/> 于一体的音视频点播解决方案。提供功能完善的后台管理系统，丰富的API&amp;SD..<br/>
          K,可快速使用，灵活集成自有服务。 </p>
        <h4 class="des">亮点功能介绍</h4>
        <div class="contentbox">
          <div class="top">
            <a><img src="/static/images/cloudDataImg/videoorder1_03.png" alt=""/></a>
          </div>
          <p class="control">完善的后台管理</p>
          <div class="bottom">
            <a><img src="/static/images/cloudDataImg/videoorder1_07.png" alt=""/></a>
            <a><img src="/static/images/cloudDataImg/videoorder1_09.png" alt=""/></a>
            <a><img src="/static/images/cloudDataImg/videoorder1_11.png" alt=""/></a>
          </div>
          <div class="bottom_desc">
            <p>自主研发可定制</p>
            <p>快速使用灵活集成</p>
            <p>急速播放体验</p>
          </div>
          <el-button class="pri" type="primary">
            点击开通
          </el-button>
        </div>
      </div>
    </div>
  </section>
</template>
<style lang="less" scoped>
  @import '~styles/vars.less';

  .manager-container {
    position: relative;
    background-color: @color-background;
    .content-nav {
      width: 200px;
    }
    .content-crumb {
      position: absolute;
      background-color: #eee;
      top: 0;
      right: 0;
      left: 200px;
    }
    .container-fluid {
      position: fixed;
      background-color: #eee;
      left: 200px;
      right: 0;
      top: 100px;
      bottom: 0;
    }
  }

  .box {
    width: 100%;
    min-width: 500px;
    text-align: center;
    .cloud {
      margin: 75px 0px 40px 0px;
      font: 400 18px/18px "微软雅黑";
      color: #211e2e;
    }
    .cloudmsg {
      font-size: 14px;
      color: #6a707d;
      margin: 0;
      padding: 0;
      line-height: 24px;
      width: 500px;
      margin: 0 auto;
      text-align: left;
    }
    .des {
      margin: 45px 0 40px 0;
      font: 400 18px/18px "微软雅黑";
      color: #211e2e;
    }
    .contentbox {
      .top {
        margin: 0 auto;
        width: 71px;
        height: 71px;
        a {
          display: block;
          width: 71px;
          height: 71px;
          img {
            width: 100%;
          }
        }
      }
      .control {
        margin: 22px 0 66px 0;
        font: 400 14px/14px "微软雅黑";
        color: #6a707d;
      }
      .bottom {
        margin: 0 auto;
        width: 100%;
        height: 71px;
        display: flex;
        justify-content: center;
        a {
          display: block;
          width: 71px;
          height: 71px;
          &:nth-child(2) {
            margin-left: 128px;
            margin-right: 128px;
          }
          img {
            width: 100%;
            display: block;
          }
        }
      }
      .bottom_desc {
        margin: 0 auto;
        margin-top: 22px;
        width: 485px;
        display: flex;
        justify-content: space-between;
        p {
          font-size: 14px;
          margin: 0;
          padding: 0;
          color: #6a707d;
          &:nth-child(1) {
            margin-left: -5px;
          }
          &:nth-child(2) {
            margin-left: -3px;
          }
          &:nth-child(3) {
            margin-right: 2px;
          }
        }
      }
      .pri {
        margin-top: 40px;
        margin-bottom: 40px;
        width: 84px;
        height: 32px;
        font-size: 14px;
        line-height: 12px;
      }
    }
  }
</style>
<script>
  import CoreBreadCrumb from 'components/core/core_bread_crumb/CoreBreadCrumb.vue';
  import CoreNavSub from 'components/core/core_nav_sub/CoreNavSub.vue';

  export default {
    name: "cacheServer",
    data() {
      return {
        menus: [{
          path: '/introduce',
          name: '云应用',
          children: [{
            path: '/video_order_play',
            name: "视频点播",
          }]
        }]
      }
    },
    methods: {},
    components: {
      'core-bread-crumb': CoreBreadCrumb,
      'core-nav-sub': CoreNavSub
    }
  }
</script>
