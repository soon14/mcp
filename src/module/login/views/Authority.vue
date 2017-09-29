/**
* Created by CHENRC2 on 2017-7-30.
*/
<template>
  <section class="container">
    <div class="loading">
      <div class="cssload-loader"></div>
      <h3 class="tip">{{ tip }}</h3>
    </div>
  </section>
</template>
<style lang="less" scoped>
  @import "../styles/loading.less";
  .container{
    .loading{
      top: 40%;
      text-align: center;
      .cssload-loader{
        margin: 0 auto;
        margin-bottom: 12px;
      }
      .tip{
        color: rgb(165,172,177);
        text-align: center;
        font-size: 16px;
        font-weight: 600;
      }
    }
  }
</style>
<script>
  import "babel-polyfill";
  import { checkProject,getUserRole,requestLogout } from '../api/service';
  import ls from 'utils/local_storage_tool.js';
  import {　friendTip　} from "../utils/utils";
  export default{
    data() {
      return {
        tip: friendTip.getProject
      }
    },
    mounted(){
        checkProject().then((project)=>{
        if(project.errorCode === "601"){
          this.tip=friendTip.noProject;
          this.$alert(this.tip, '温馨提示', {
            confirmButtonText: '跳转MIP',
            callback: action => {
              this.closeWindow();
            }
          });
        }else if(project.errorCode === "200"){
          this.tip = friendTip.getRole;
          getUserRole(true).then((res)=>{
            if(res.errorCode === "200"){
              this.tip = friendTip.entry;
              let historyUrl=ls.getObject("historyUrl"),user=ls.getObject("user");
              //socket 登录成功并授权通过后发送sockets
              this.$socket.emit('login',{'account':user.account});
              //如果更换用户登录 默认返回首页
              if(!!historyUrl&&(!!!historyUrl.account || historyUrl.account== user.account)){
                window.location.href= historyUrl.historyUrl;
              }else{
                window.location.href= "/module/management.html";
              }
            }else{
              this.tip = friendTip.errorRole;
              this.$alert(this.tip, '温馨提示', {
                confirmButtonText: '重新登录',
                callback: action => {
                  requestLogout().then(()=>{
                      window.location.href = "/#/login";
                  });
                }
              });
            }
          });
        }else{
          this.tip= friendTip.errorProject;
          this.$alert(this.tip, '温馨提示', {
            confirmButtonText: '重新登录',
            callback: action => {
              requestLogout().then(()=>{
                window.location.href = "/#/login";
              });
            }
          });
        }
      });
    },
    methods: {
      closeWindow() {
        window.close();
      }
    }
  }
</script>
