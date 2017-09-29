<template>
  <div class="home-wrapper">
    <section>
      <el-card class="container">
        <h1 class="title">嘿,欢迎来到美的云控制台1121313</h1>
        <div class="pre-time">
          <span>您上次登录时间&nbsp;&nbsp;&nbsp;</span>
          <span>2016年6月26日</span>
        </div>
        <div class="pre-addr">
          <span>您上次登录地址&nbsp;&nbsp;&nbsp;</span>
          <span>192.168.1.1</span>
        </div>
      </el-card>
    </section>
  </div>
</template>
<style lang="less" scoped>
  section{
    height: 80%;
    .container{
      margin:20px;
      height: 100%;
      text-align: left;
      .pre-time{
        margin: 40px 0px 10px 0;
      }
    }
  }
</style>
<script>
    import header from '../../management/component/header/header.vue';
    import ListTable from 'components/awesome/list_table/ListTable.vue';
    export default{
      data() {
        return {
          msg:"DEMO"
        }
      },
      components: {
        userInfoHead: header
      }
    }
</script>
