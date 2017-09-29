<template>
 <div>
  <el-button class="alert-btn" type="primary" @click="dialogVisible = true">打开"人员选择"案例</el-button>
  <el-dialog custom-class="dialog_box" title="新增项目成员" :visible.sync="dialogVisible"
           @close="cancel"  size="small">
    <div class="box">
      <div>
      <selector ref="sel" v-model="data"></selector>
        </div>
      <div class="bottom_btn clearfix">
        <el-button class="goback" @click="cancel()">取消</el-button>
        <el-button @click="confirm()" class="nextstep " type="primary">确定</el-button>
      </div>
    </div>
  </el-dialog>
  </div>
</template>
<style lang="less" >
    .dialog_box{
      min-width:530px !important;
    }
    .box {
    p.select_share {
      height:14px;
      background: #FFFFFF;
      font: 400 14px/14px "微软雅黑";
      color: #211e2e;
    }
    .bottom_btn{
      text-align:center;
      margin:20px 0;
      .goback, .nextstep {
      width: 98px;
      }
     .goback {
      margin-right:5px;
      }
      .nextstep{
      margin-left:5px;
      }
    }
  }
</style>
<script>
  import selector from '../org_selector/Selector.vue';
  import {addClass,removeClass} from 'utils/utils.js'

  export default{
    name:"OrgSelector",
    data(){
      return{
        dialogVisible:false,
        data:[]
      }
    },
    methods:{
      cancel(){
        this.dialogVisible = false;
        this.$refs.sel.selectedData = [];
        this.$refs.sel.getNewMember()
      },
      confirm() {
        this.dialogVisible = false;
        this.$emit("getMemberData", this.data);
        this.$refs.sel.selectedData = [];
        this.$refs.sel.getNewMember()
      }
    },
    components:{
      selector
    }
  }
</script>
