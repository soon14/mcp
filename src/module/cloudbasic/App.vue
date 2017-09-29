<template>
  <div id="app">
    <section class="container">
      <div class="header">
        <core-header></core-header>
      </div>
      <div class="content">
        <iframe class="ustack" id="ustack" :src="ustackSrc"></iframe>
      </div>
    </section>
  </div>
</template>

<script>
  import CoreHeader from 'components/core/core_header/CoreHeader.vue';
  import { requestLogout } from '../login/api/service';


  export default {
    name: 'ustack',
    created(){
      //iframe 窗口回调
      window.addEventListener('message',function(e){
        if( typeof e.data == 'string'){
          const msg=JSON.parse(e.data);
          if(msg.hasOwnProperty("type")){
              switch(msg.type){
                case "auth":
                    //退出登录
                  requestLogout().then(res =>{
                    if(res.code.toString() === "200"){
                      window.location.href = '/#/login';
                    }else{
                      this.$notification.error("退出登录失败，"+res.data);
                    }
                  });
                    break;
                case "callback":
                    //保存iframe里传的url信息
                  sessionStorage.setItem("ustack_callback",msg.msg);
                  break;
              }
          }
        }
      },false);
    },
    computed:{
      ustackSrc(){
        let callback=sessionStorage.getItem("ustack_callback");
        return process.env.api.ustack.url+"?token=" + localStorage.getItem("token")+"&callback="+ (callback ? callback : "");
      }
    },
    components:{
      'core-header': CoreHeader
    }
  }
</script>

<style lang="less" scoped>
  @import '~styles/base.less';
  .container{
    .content{
      position: absolute;
      right: 0;
      left: 0;
      top: 60px;
      bottom: 0;
      background-color: @color-background;
      .ustack{
        height:99%;
        width:100%;
      }
    }
  }
</style>
