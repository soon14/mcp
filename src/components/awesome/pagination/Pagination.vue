/**
* Created by CHENRC2 on 2017-7-21.
* 二次封装element分页插件
*/
<template>
  <footer>
    <el-row class="page-main">
      <el-col :span="12" justify="end">
        <span  class="pagedetail">第<span class="bg" v-if="!total">0</span><span class="bg" v-else>{{startpage}}-{{endpage}}</span>条，共<span class="bg">{{total}}</span>条</span>
      </el-col>
      <el-col :span="11" justify="end">
        <el-pagination class="page-right" layout="sizes,prev,pager, next, jumper"
                       @current-change="currentChange" @size-change="sizeChange" :page-sizes="pageSizes" :page-size="pageSize" :current-page="currentPage" :total="total">
        </el-pagination>
      </el-col>
      <el-col :span="1" justify="end">
        <el-button @click ="currentChange(currentPage)" size="small" class="go" type="primary">GO</el-button>
      </el-col>
    </el-row>
  </footer>
</template>
<style lang="less" scoped>
  @import '~styles/vars.less';
  .page-main{
    margin-top:10px;
    min-width: 400px;
    .pagedetail{
      font: 400 14px/32px "微软雅黑";
      color:rgb(72, 96, 106);
      .bg{
        color:@color-primary;
      }
    }
    .page-right{
      float:right;
      padding-right:0;
    }
    .go{
      width:28px;
      height:28px;
      margin-left:15px;
      text-align:center;
      margin-top:2px;
    }
    .el-button--small{
      padding:7px 4px;
    }
  }
</style>
<script>
  export default{
    name: "Pagination",
    data(){
      return{

      }
    },
    props:{
      currentPage:{
        type:Number,
        default:1
      },
      pageSize:{
        type: Number,
        default: 10
      },
      total:{
        type:Number,
        default:0
      },
      pageSizes:{
        type:Array,
        default(){
          return [10, 30, 50, 80]
        }
      }
    },
    computed:{
      startpage(){
        return this.pageSize*(this.currentPage-1)+1;
      },
      endpage(){
        //总页数小于每页大小或者 当前页数加上每页大小大于总页数
        if((this.pageSize*(this.currentPage-1)+1+this.pageSize)>this.total||this.pageSize > this.total){
          return this.total;
        }
        return  this.pageSize*(this.currentPage-1)+this.pageSize;
      }
    },
    methods:{
      sizeChange(e){
        this.$emit('size-change',e);
      },
      currentChange(e){
        this.$emit('current-change',e);
      }
    }
  }
</script>
