<template>
  <section>
    <div class="headerWrapper">
      <same-header></same-header>
      <!--<header>-->
        <!--<h1>-->
          <!--<a href="/#/login">-->
            <!--<img src="static/images/loginImg/logo.png" alt="M-cup" style="height:26px;">-->
          <!--</a>-->
        <!--</h1>-->
      <!--</header>-->
    </div>
    <div class="tab">
      <router-view></router-view>
    </div>
    <div class="footer">
      <div id="links" style="height: 20px;">
        <div class="link">
          <router-link to="/websiteinfo/contactus">联系我们</router-link>
        </div>
        <div class="link">
          <router-link to="/websiteinfo/serviceterm">服务条款</router-link>
        </div>
        <div class="link">
          <router-link to="/websiteinfo/privatepolicy">隐私政策</router-link>
        </div>
      </div>
      Copyright© 1968-2017 美的集团 版权所有
    </div>
  </section>
</template>

<script>
  import sameheader from 'components/core/core_header_lite/core_header_lite.vue';
  export default {
    components: {
      "same-header": sameheader
    }
  }
</script>

<style lang="less" scoped>
  section{
   overflow:hidden;
  }
  html,body{
    margin : 0;
    padding :0;
    height:100%;
    width: 100%;
    background: #E6E4EA;
  }
  * {
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    font-family: "Microsoft YaHei";
  }
  a,a:hover,a:focus{
    cursor: pointer;
    text-decoration: none;
    color: #337ab7;
  }
  .headerWrapper {
    header {
      height: 60px;
      background-color: #211e2e;
      color: #fff;
      top: 0;
      left: 0;
      width: 100%;
      line-height: 60px;
      z-index: 100;
      position: relative;
      font-size: 14px;
      h1 {
        margin: 0;
        float: left;
        font-size: 32px;
        font-weight: 400;
        padding: 0 29px;
      }
    }
  }
  .tab{
    width: 100%;
    height:100%;
    // padding-top:60px;
    overflow-y:auto;
    padding-bottom:110px;
  }
  .footer {
    width: 100%;
    height: 60px;
    text-align: center;
    color: black;
    font-size: 12px;
    position: fixed;
    left: 50%;
    bottom: 0%;
    transform: translateX(-50%);
    background: #f3f4f8;
    line-height: 60px;
    #links .link{
      display: inline-block;
      margin-right: 20px;
    }
  }
</style>
