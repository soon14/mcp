<template>
  <div class="container">
    <div class="contentBox clearfix">
      <div class="content_l fl">
        <header>{{settings.ableAuthor}}</header>
        <ul ref="serviceList">
          <li v-for="(item, index) in itemLists"  :key="index" @click="addHook(item)">
            <div  :class="{hook:item.active}">
              {{item.name}}<br>
              {{item.id}}
            </div>
          </li>
        </ul>
      </div>
      <ul class="btn-list fl">
        <li>
          <el-button @click.stop="allToRight" size="small" >>></el-button>
        </li>
        <li>
          <el-button @click.stop="toRight" size="small" >></el-button>
        </li>
        <li>
          <el-button @click.stop="toLeft" size="small" ><</el-button>
        </li>
        <li>
          <el-button @click.stop="allToLeft" size="small" ><<</el-button>
        </li>
      </ul>
      <div class="content_r fr">
        <header>{{settings.acceptAuthor}}</header>
        <ul ref="chosenList">
          <li v-for="(item, index) in unselectedArr"  :key="index" @click="addHook(item)">
            <div  :class="{ hook:item.active }">
              {{item.name}}<br>
              {{item.id}}
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style lang="less" scoped>
  .container {
    margin: 0 auto 10px;
    width: 100%;
    border-radius: 4px;
    background-color: #fff;
    overflow: hidden;
    .contentBox {
      .content_l, .content_r {
        width: 40%;
        height:400px;
        box-sizing: border-box;
        border: 1px solid #F2F2F2;
        border-radius: 4px;
        // overflow: auto;
        header {
          height: 40px;
          line-height: 40px;
          font-size: 14px;
          background: #FAFAFA;
          text-align: center;
        }
        .el-input {
          padding: 10px 10px 0;
          box-sizing: border-box;
        }
        ul {
          list-style: none;
          margin: 0 auto;
          overflow-y:auto;
          height:350px;
          padding: 0;
          li {
            box-sizing: border-box;
            font-size: 14px;
            word-break: break-all;
            border-top: 1px solid #F2F2F2;
            &:nth-child(odd) {
              background-color: #FAFAFA;
            }
            div{
              width: 100%;
              height: 100%;
              padding: 6px 6px;
              cursor:pointer;
              font-size:14px;
              box-sizing: border-box;
              text-decoration: none;
              color:#a5acbe;
              &.hook {
                background: #e5f4ff;
              }
            }
          }
        }
      }
      .btn-list {
        width: 20%;
        transform: translateY(26%);
        list-style: none;
        padding: 0;
        margin: 0 auto;
        box-sizing: border-box;
        text-align: center;
        li {
          margin-bottom: 20px;
          font-weight: 700;
          font-size: 14px;
          border-radius:5px;
          button {
            margin: 0 auto;
            width: 50%;
            // width:80px;
            height:28px;
            // font-weight: bold;
            font:400 16px/12px "微软雅黑";
            color: #A5ACBE;
            &:focus {
              background: #21b8d5;
              color: #fff
            }
          }
        }
      }
    }
  }
</style>

<script>
  import { arrayAssign } from "utils/utils.js";
  import _ from "lodash";
  export default {
    props: {
      //双向绑定选中的值
      value: {
        type: Array,
        default() {
          return [];
        }
      },
      //修改标题
      settings:{
        type:Object,
          default(){
          return {
            ableAuthor:'可选服务',
            acceptAuthor:"已选服务"
          }
        }
      },
      //去父组件接收左边接口数据
      orderData:{
        type:Array,
        default(){
          return []
        }
      }
    },

    computed:{
      itemLists(){
        return this.itemList
      },
      unselectedArr(){
        return this.selectedArr
      }

    },
    created() {

    },
    data() {
      return {
        itemList: this.orderData, //左边列表
        selectedArr: this.value, //右边选中的数据,
      }
    },
    methods: {
      //-----动态控制类(必须设置默认值)
      addHook(item) {
        item.active=!item.active;
      },
      //----全部添加到右边
      allToRight() {
        this.selectedArr=_.union(this.selectedArr,arrayAssign(this.itemList,{ active:false }));
        this.itemList = [];
        this.$emit("input",this.selectedArr);
      },
      //----全部追加到左边
      allToLeft() {
        this.itemList=_.union(this.itemList,arrayAssign(this.selectedArr,{ active:false }));
        this.selectedArr = [];
        this.$emit("input",this.selectedArr);
      },
      //----选择性追加到右边
      toRight() {
        let that=this;
        this.itemList.forEach(item=>{
          if(item.active){
            that.selectedArr.push(item);
          }
        });
        for(var i=this.itemList.length-1;i>=0;i--){
          if(this.itemList[i].active){
            this.itemList.splice(i,1);
          }
        }
        this.selectedArr.map((item)=>{
          return item.active = false;
        });
        //传值
        this.$emit("input",this.selectedArr);
      },
      //---选择性的追加到左边
      toLeft() {
        let that=this;
        this.selectedArr.forEach(item=>{
          if(item.active){
            that.itemList.push(item);
          }
        });
        for(var i=this.selectedArr.length-1;i>=0;i--){
          if(this.selectedArr[i].active){
            this.selectedArr.splice(i,1);
          }
        }
        this.itemList.map((item)=>{
          return item.active = false;
        });
        this.$emit("input",this.selectedArr);
      }
    }
  };
</script>
