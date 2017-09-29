<template>
<div>
  <el-button class="alert-btn" type="primary" @click="dialogFormVisible = true">打开"穿梭框"案例</el-button>
  <el-dialog :close-on-click-modal="modal" custom-class="dialog_box" title="穿梭框"  :visible.sync="dialogFormVisible" @close="cancel()">
    <div class="box">
      <Through :orderData="orderData"  v-model="data"></Through>
      <div class="bottom_btn clearfix" >
        <el-button @click.stop.prevent="cancel"  class="nextstep fr" >取消</el-button>
        <el-button @click.stop.prevent="confirm"  class="goback fr" type="primary">确定</el-button>
      </div>
    </div>
 </el-dialog>
</div>
</template>
<style lang="less">
  .dialog_box {
    max-width: 800px;
    min-width:530px !important;
    .box {
      .bottom_btn {
        text-align: right;
        margin: 20px 0;
        .goback, .nextstep {
          width: 98px;
        }
        .goback {
          margin-right: 5px;
        }
        .nextstep {
          margin-left: 5px;
        }
      }
    }
  }

</style>
<script>
  import Through from './Through.vue';
  import { arrayAssign } from "utils/utils.js";
  import { requestServiceList } from './service.js';
  export default{
    name:"ThroughModel",
    data(){
      return {
        data:[],
        dialogFormVisible:false,
        orderData:[],
        modal:false
      }
    },
    mounted(){
      this.getData();
    },
    methods:{
      getData(){
        requestServiceList({"token":""}).then(data => {
         //遍历数组去掉
          if(data.errorCode == "200"){
            for(var i=data.result.length-1;i>=0;i--){
              if(data.result[i].name === "member"){
                data.result.splice(i,1);
              }
            }
            this.orderData =  arrayAssign( data.result,{ active:false })
          }
        });
      },
      confirm(){
       this.dialogFormVisible = false;
      },
      cancel(){
       this.dialogFormVisible = false;
      }
    },
    components:{
      "Through": Through
    }
  }
</script>
