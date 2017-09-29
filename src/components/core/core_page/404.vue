/**
* Created by CHENRC2 on 2017-7-13.
*/
<template>
  <section class="container">
    <div class="error-bg">
      <p class="err-title">404</p>
      <p class="err-msg">对不起,&nbsp;&nbsp;&nbsp;您的页面飞走啦~</p>
    </div>
  </section>
</template>
<style lang="less" scoped>
  .container{
    min-width:800px;
    min-height:700px;
    .error-bg{
      width:100%;
      height:100%;
      background-size:100% 100%;
      background-repeat:no-repeat;
      background-image:url("/static/images/404error/404.png");
      .err-title{
        font-size:120px;
        padding-top:80px;
        color:white;
        text-align:center;
      }
      .err-msg{
        font-size:26px;
        padding-top:40px;
        padding-left:20px;
        color:white;
        text-align:center;
      }
    }
  }
</style>
<script>
  export default{
    beforeRouteEnter (to, from, next) {
      let toHomePage=['/setting/user','/setting/project'],
        toHomeSystem='/module/management.html',
        pathName=window.location.pathname,
        redirct=true;
      if(from.fullPath === "/"){
        redirct=false;
      }else{
        for(var page of toHomePage){
          if(to.redirectedFrom.indexOf(page) >= 0 &&toHomeSystem ==pathName) {
            redirct=false;
            return;
          }
        }
      }
      redirct?next():window.location.href="/module/management.html";
    }
  }
</script>
