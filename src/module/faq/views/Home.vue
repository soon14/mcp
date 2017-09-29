/**
* Created by CHENRC2 on 2017-8-29.
*/
<template>
  <div id="app">
    <section class="container">
      <div class="content_box">
        <h2 class="title">请选择文档</h2>
        <el-row  class="el_row"  justify="space-around">
          <el-col v-for="item in datas" :key="item.name" :span="12">
            <router-link :to="item.path">{{item.name}}</router-link>
          </el-col>
        </el-row>
      </div>
    </section>
  </div>
</template>

<script>
  export default {
    name: 'faq',
    data(){
      return{
        datas:[
          {
            name:"云基础",
            path:'/faq/ustack'
          },{
            name:"视频点播",
            path:'/faq/video'
          },{
            name:"对象存储",
            path:'/faq/oss'
          }]
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '~styles/base.less';
  .container{
      .content_box{
        text-align:left;
        margin:0 auto;
        width:400px;
        .title{
          margin-top:80px;
          font-weight:600;
          font-size:18px;
          line-height:18px;
          padding-bottom: 15px;
          border-bottom: solid 1px #7d7878;
        }
        .el_row{
          margin-top: 30px;
          margin-left: 20px;
          .el-col{
            height:40px;
            a{
              cursor:pointer;
              font-size:16px;
              color:blue;
            }
          }
        }
      }
  }
</style>

