  <template>
   <section class="manager-container">
      <!--<div class="content-crumb">
      <core-bread-crumb></core-bread-crumb>
      </div>-->
    <div class="container-fluid">
     <div class="box">
      <h2 class="cloud">云监控</h2>
      <p class="cloudmsg"> CMS是开放性的监控平台，可实时监控云应用和服务器，并提供短信、消息、邮<br /> 件等多种告警方式。及时预警，保证云应用和服务器运行状况。 </p>
      <h4 class="des">亮点功能介绍</h4>
      <div class="content">
       <div class="top">
        <a><img src="../../../../../static/images/cloudDataImg/cloudcontrol_03.png" alt="" /> </a>
        <a><img src="../../../../../static/images/cloudDataImg/cloudcontrol_05.png" alt="" /></a>
        <a><img src="../../../../../static/images/cloudDataImg/cloudcontrol_07.png" alt="" /></a>
       </div>
       <div class="top_desc">
        <p>细粒度监控</p>
        <p>多指标任意组合</p>
        <p>灵活定义报警规则</p>
       </div>
       <div class="bottom">
        <a><img src="../../../../../static/images/cloudDataImg/cloudcontrol_12.png" alt="" /> </a>
        <a><img src="../../../../../static/images/cloudDataImg/cloudcontrol_13.png" alt="" /></a>
        <a><img src="../../../../../static/images/cloudDataImg/cloudcontrol_14.png" alt="" /></a>
       </div>
       <div class="bottom_desc">
        <p>快速定位监控指标</p>
        <p>三种报警状态</p>
        <p>邮件微信随时随地</p>
       </div>
        <!--<a style="color: #20a0ff" >-->
       <!--<el-button class="pri" type="primary" v-if="!member" @click="ToHost">
        点击开通
       </el-button>-->
        <!--</a>-->
        <p class="tip_text">项目成员无权开通该服务，请联系项目管理员开通服务</p>
      </div>
     </div>
    </div>
   </section>
  </template>
<style lang="less" scoped>
  @import '~styles/vars.less';
  .manager-container{
    position: relative;
    background-color: @color-background;
    .content-nav{
      width: 200px;
    }
    .tip_text{
      color: red;
      margin-top: 40px;
      font-size: 15px;
      margin-bottom: 40px;
    }
    // .content-crumb{
    //   position: absolute;
    //   background-color: #eee;
    //   top: 0;
    //   right: 0;
    //   left: 200px;
    // }
    .container-fluid{
      position: fixed;
      background-color: #eee;
      left: 200px;
      right: 0;
      top: 60px;
      bottom: 0;
    }
  }
  .box{
    width:100%;
    height:100%;
    min-width:500px;
    text-align:center;
    overflow: auto;
    .cloud{
      margin:75px 0px 40px 0px;
      font:400 18px/18px "微软雅黑";
      color:#211e2e;
    }
    .cloudmsg{
      font-size:14px;
      color:#6a707d;
      margin:0 ;
      padding:0;
      line-height:24px;
      width:497px;
      margin:0 auto;
      text-align:left;
    }
   .des{
      margin:45px 0 40px 0;
      font:400 18px/18px "微软雅黑";
      color:#211e2e;
    }
    .content{
      min-width:500px;
       .top{
         margin:0 auto;
         width:100%;
         /*margin-top:225px;*/
         height:71px;
         display:flex;
         justify-content:center;
            a{
              &:nth-child(2){
                margin-left:128px;
                margin-right:128px;
              }
            img{
              width:71px;
              height:71px;
              display:block;
              }
          }
      }
      .top_desc{
        display:flex;
        width:470px;
        margin:0 auto;
        margin-top:22px;
        justify-content:space-between;
        margin-bottom:80px;
        p{
          font-size:14px;
          margin:0;
          padding:0;
          color:#6a707d;
          &:nth-child(1){
            margin-left:2px;
          }
          &:nth-child(2){
            margin-left:24px;
          }
          &:nth-child(3){
            margin-right:-23px;
          }
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
        margin:0 auto;
        margin-top:22px;
        display:flex;
        width:447px;
        justify-content:space-between;
        p{
          font-size:14px;
          margin:0;
          padding:0;
          color:#6a707d;
          &:nth-child(1){
             margin-left:-30px;
          }
          &:nth-child(2){
             margin-left:0px;
          }
          &:nth-child(3){
            margin-right:-33px;
          }
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
    }
  }
</style>
<script>
  // import CoreBreadCrumb from 'components/core/core_bread_crumb/CoreBreadCrumb.vue';
  import {getUser} from '../../api/service'
  import CoreNavSub from 'components/core/core_nav_sub/CoreNavSub.vue';

  export default{
    name:"cacheServer",
    data(){
      return{

      }
    },
    methods:{
      /*init(){
          this.member= JSON.parse(window.localStorage.user).roleFormat.member;
      },*/
      /*ToHost(){
        this.$router.push({name: '首页'});
      }*/

      // 获取角色
     /* getRoles(){
        /!*let params = {
          projectId:'',
          mark:''
        };*!/
        getRole().then(data => {
            console.log(data)
        })
      }*/
    },
    mounted (){
       /* this.init()*/
    },
    components: {

    }
  }
</script>
