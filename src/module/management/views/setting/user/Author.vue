<template>
  <el-dialog :close-on-click-modal="modal" custom-class="dialog_box" title="编辑权限"  :visible.sync="dialogFormVisible" @close="cancel()">
    <div class="box">
      <user-authorization v-cloak v-model="authorization"></user-authorization>
      <div class="bottom_btn clearfix" >
        <el-button @click.stop.prevent="cancel"  class="nextstep fr" >取消</el-button>
        <el-button @click.stop.prevent="confirm"  class="goback fr" type="primary">确定</el-button>
      </div>
    </div>
  </el-dialog>
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
  import UserAuthorization from 'components/utils/user_authorization/Authorization.vue';
  import {rolesList,serverAuthor} from 'components/utils/user_authorization/service.js';
  import { arrayAssign } from "utils/utils.js";

  export default{
    name:"Author",
    data(){
      return {
        account:this.$route.params.account||[],
        projectId:this.$route.params.projectId||"",
        dialogFormVisible:true,
        authorization:[],
        modal:false
      }
    },
    mounted(){
      this.getRole();
    },
    methods:{
      /**
       * 获取用户权限
       */
      getRole(){
        let params = {"account":this.account,"projectId":this.projectId };
        rolesList(params).then(res=>{
          if(res.errorCode === "200"){
            res.result.authority.map(item=>{
              item.active = false;
              return item;
            })
           this.authorization =  res.result.authority
          }
        })
      },
      confirm(){
        let params = {
          "projectId":this.projectId,
          "userId":this.account,
          "serverRightId":this.$_.map(this.authorization,"id").join(",")
          }
        serverAuthor(params).then(res=>{
          if(res.errorCode === "200"){
            this.$notify({
              title: '成功',
              message: '编辑成功',
              type: 'success'
            });
          }else{
            this.$notify.error({
             title: '失败',
             message: '编辑失败'
            });
          }
          // this.dialogFormVisible = false;
          //this.$router.go(-1);
           this.$router.push('/project/projectdetail/' + this.projectId);
        });

      },
      cancel(){
        //this.$router.go(-1);
        this.$router.push('/project/projectdetail/' + this.projectId);
      }
    },
    components:{
      "user-authorization": UserAuthorization
    }
  }
</script>
