<template>
  <!-- <section class="manager-container"> -->
    <!-- <div class="content-nav">
      <core-nav-sub :menus="menus"></core-nav-sub>
    </div> -->
    <!-- <div class="content-crumb">
      <core-bread-crumb></core-bread-crumb>
    </div> -->
    <div class="container-fluid">
      <div class="box">
        <h2 class="cloud">缓存服务</h2>
        <p class="cloudmsg">
          云缓存是美的云提供的面对企业级应用和互联网服务推出数据存储服务，提供安<br>全
          稳定的海量数据存储解决方案。
        </p>
        <h4 class="des">亮点功能介绍</h4>
        <div class="contentbox">
          <div class="top">
            <a><img src="/static/images/cloudDataImg/cacheserver1_03.png" alt=""></a>
            <a><img src="/static/images/cloudDataImg/cacheserver1_05.png" alt=""></a>
          </div>
          <div class="top_desc">
            <p class="control">安全性</p>
            <p class="control">多租户</p>
          </div>
          <div class="bottom">
            <a><img src="/static/images/cloudDataImg/cacheserver1_10.png" alt=""></a>
            <a><img src="/static/images/cloudDataImg/cacheserver1_13.png" alt=""></a>
            <a><img src="/static/images/cloudDataImg/cacheserver1_16.png" alt=""></a>
          </div>
          <div class="bottom_desc">
            <p class="control">可用性</p>
            <p class="control">高性能</p>
            <p class="control">高扩展</p>
          </div>

          <!-- <el-button class="pri" type="primary">点击开通</el-button> -->
          <p class="tip_text">项目成员无权开通该服务，请联系项目管理员开通服务。</p>
        </div>
      </div>
    </div>
  <!-- </section> -->
</template>
<style lang="less" scoped>
  @import '~styles/vars.less';

  .manager-container{
    position: relative;
    background-color: @color-background;
    .content-nav{
      width: 200px;
    }
    .content-crumb{
      position: absolute;
      background-color: #eee;
      top: 0;
      right: 0;
      left: 200px;
    }
    .container-fluid{
      position: absolute;
      background-color: #eee;
      left: 200px;
      right: 0;
      top: 45px;
      bottom: 0;
    }
  }
  .box{
    width:100%;
    height:100%;
    overflow:hidden;
    min-width:500px;
    text-align:center;
    .cloud{
      margin:75px 0px 40px 0px;
      font:400 18px/18px "微软雅黑";
      color:#211e2e;
    }
    .cloudmsg{
      font-size:14px;
      color:#6a707d;
      margin:0;
      padding:0;
      line-height:24px;
      width:496px;
      margin:0 auto;
      text-align:left;
    }
    .des{
      margin:45px 0 40px 0;
      font:400 18px/18px "微软雅黑";
      color:#211e2e;
    }
    .contentbox{
      .top{
        margin:0 auto;
        width:270px;
        height:71px;
        display:flex;
        justify-content:space-between;
        a{
          display:block;
          width:71px;
          height:71px;
          img{
            width:100%;
          }
        }
      }
      .top_desc{
        width:242px;
        display:flex;
        margin:0 auto;
        justify-content:space-between;
        .control{
          margin:22px 0 60px 0;
          font:400 14px/14px "微软雅黑";
          color:#6a707d;
        }
      }
      .bottom{
        margin:0 auto;
        width:100%;
        height:71px;
        display:flex;
        justify-content:center;
        a{
          display:block;
          width:71px;
          height:71px;
          &:nth-child(2){
            margin-left:128px;
            margin-right:128px;
          }
          img{
            width:100%;
            display:block;
          }
        }
      }
      .bottom_desc{
        display:flex;
        width:437px;
        margin:0 auto;
        margin-top:22px;
        justify-content:space-between;
        p{
          font-size:14px;
          margin:0;
          padding:0;
          color:#6a707d;
        }
      }

      .pri{
        margin-top:40px;
        margin-bottom:40px;
        width:84px;
        height:32px;
        font-size:14px;
        line-height:12px;
      }

      .tip_text{
        color:red;
        margin-top:40px;
        font-size:15px;
        margin-bottom:40px;
      }
    }
  }
</style>
<script>
  import CoreBreadCrumb from 'components/core/core_bread_crumb/CoreBreadCrumb.vue';
  import CoreNavSub from 'components/core/core_nav_sub/CoreNavSub.vue';

  export default{
    name:"cacheServer",
    data(){
      return{
        menus:[{
          path: '/introduce',
          name: '云基础',
          children: [{
            path: '/cache_server',
            name: "云缓存",
          },{
            path: '/cloud_data_server',
            name: "云数据库",
          }]
        }]
      }
    },
    methods:{

    },
    components: {
      'core-bread-crumb': CoreBreadCrumb,
      'core-nav-sub': CoreNavSub
    }
  }
</script>
