<template>
 <div>
  <el-button class="alert-btn" type="primary" @click="dialogVisible = true">打开"新成员"案例</el-button>
  <el-dialog custom-class="dialog_box" title="新增项目成员" :visible.sync="dialogVisible">
    <div class="box">
      <!--<p class="select_share">选择同事分享</p>-->
      <div>
        <selector @input="getSel" v-if="newmember" v-model="member"></selector>
        <userAuthorization v-else v-model="servers"></userAuthorization>
      </div>
      <div class="bottom_btn" v-if="newmember">
        <el-button @click.stop.prevent="gonext" :disabled="isDis"  class="goback ">下一步</el-button>
        <el-button @click.stop.prevent="cancel"  class="nextstep " type="primary">取消</el-button>
      </div>
      <div class="bottom_btn clearfix" v-else>
        <el-button @click.stop.prevent="goPreview"  class="goback fl">返回上一步</el-button>
        <el-button @click.stop.prevent="cancel"  class="nextstep fr" type="primary">取消</el-button>
        <el-button @click.stop.prevent="confirm"  class="goback fr">确定</el-button>
      </div>
    </div>
  </el-dialog>
 </div>
</template>
<style lang="less" >
  .alert-btn{
    margin-top:50px;
    margin-left:50px;
    font-size:16px;
  }
  .dialog_box {
    max-width: 800px;
    min-width:530px !important;
    .box {
      p.select_share {
        height: 14px;
        background: #FFFFFF;
        font: 400 14px/14px "微软雅黑";
        color: #211e2e;
      }
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
  import selector from '../org_selector/Selector.vue';
  import userAuthorization from '../user_authorization/Authorization.vue';

  export default{
    name:"newMember",
    data(){
      return{
        dialogVisible:false,
        servers:[],
        serviceData: [],
        newmember:true,
        isDis:true
      }
    },
    mounted(){
    },
    methods:{
      getSel(val){
        val.length>0?(this.isDis = false):(this.isDis = true)
      },
      cancel(){
        this.dialogVisible = false;
      },
      gonext(){
        this.newmember = false;
      },
      goPreview() {
        this.newmember = true;
      },
      confirm(){
        this.dialogVisible = false;
      }
    },
    components:{
      selector,
      userAuthorization
    }
  }
</script>
