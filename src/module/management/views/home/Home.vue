<template>
  <div class="welcome">
    <div class="content">
      <div class="msg">
       <div class="innerMsg">
         <!--<p class="prevTime">您上次登录时间:{{previousTime}}</p>
         <div class="line"></div>
         <p class="prevIP">您上次登录地址:{{previousIP}}</p>-->
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  p {
    margin: 0;
    padding: 0;
    font-size: 16px;
    height: 16px;
    color: #999999;
  }
  .welcome {
    width: 100%;
    height: 100%;
    position:relative;
    min-width: 800px;
    overflow: hidden;
    background-image: url("/static/images/loginImg/bg.jpg");
    background-repeat: no-repeat;
    .content {
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items:center;
      .msg {
        width:800px;
        height:428px;
        // margin-top:-60px;
        background-image: url("/static/images/loginImg/media.png");
        background-repeat: no-repeat;
        background-size:100% 100%;
        .innerMsg{
          display: flex;
          justify-content: center;
          position:relative;
          top:62%;
            .line {
              width: 1px;
              height: 14px;
              background: #999999;
              margin: 0 20px;
          }
        }
      }
    }
  }
</style>
<script>
  export default {
    name: "welcome",
    data() {
      return {
        previousTime: "2016年6月26日",
        previousIP: "192.168.1.1"
      }
    },
    methods: {}
  }
</script>
