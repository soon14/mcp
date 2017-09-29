<template>
  <el-dialog :title="title" :close-on-click-modal="modal" @close="cancel" custom-class="dialog_box"  :visible.sync="dialogFormVisible">
    <!--<div slot="title" class="tl">-->
        <!--<h3>{{title}}</h3>-->
        <!--<span class="mf mf-close" @click="$router.go(-1)"></span>-->
    <!--</div>-->
    <div class="box">
      <!--<p class="select_share">选择同事分享</p>-->
      <div>
        <selector :projectMemberList="projectMemberList" @input="getSel"  v-if="newmember" v-model="members"></selector>
        <authorization @sendMemberId="getMemberId"  :anthor="memberId" v-else  v-model="serverdata"></authorization>
      </div>
      <div class="bottom_btn" v-if="newmember">

        <el-button @click.stop.prevent="gonext" :disabled="isDis" type="primary" class="goback ">下一步</el-button>
        <el-button @click.stop.prevent="cancel"  class="nextstep " >取消</el-button>
      </div>
      <div class="bottom_btn clearfix" v-else>
        <el-button @click.stop.prevent="goPreview" type="primary" class="goback fl">返回上一步</el-button>
        <el-button @click.stop.prevent="cancel" class="nextstep fr" >取消</el-button>
        <el-button @click.stop.prevent="confirm"  type="primary" class="goback fr">确定</el-button>
      </div>
    </div>
  </el-dialog>
</template>
<style lang="less" scoped>

  .dialog_box {
    // max-width: 800px;
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
  import Selector from 'components/utils/org_selector/Selector.vue';
  import Authorization from 'components/utils/user_authorization/Authorization.vue';
  import {addAuthor} from 'components/utils/user_authorization/service.js'
  import * as srv from '../../../api/service.js';

  export default{
    name:"newMember",
    data(){
      return{
        dialogFormVisible:true,
        projectID: this.$route.params.projectId,
        selectors:[],
        members:[],
        serverdata:[],
        newmember:true,
        memberId:"",
        projectMemberList:[],
        isDis:true,
        modal:false,
        title:"新添加项目成员",
        projectId:this.$route.query.projectId
      }
    },
    created(){
      this.getMemeberList();
    },
    methods:{
      getMemeberList(){
        var params = {keywords: "", projectId: this.projectID, index: 1, pageSize: 10};
        srv.requestProjectMemberList(params).then(res =>{
            if(res.errorCode === "200"){
               this.projectMemberList=res.result.info
            }
        })
      },
      getSel(val){
        val.length>0?(this.isDis = false):(this.isDis = true);
      },
      getMemberId(val){
        this.memberId = val;
      },
      cancel(){
        //this.$router.push({ path: '/project/projectdetail',query:{ projectId:this.projectID }});
        this.dialogFormVisible = false;
        this.$router.push('/project/projectdetail/' + this.projectID);
      },
      gonext(){
        this.newmember = false;
        this.title = "设置角色"
      },
      goPreview() {
        this.newmember = true;
        this.title = "新添加项目成员"
      },
      confirm() {
        var servserverRightIds = this.$_.map(this.serverdata,"id");
        servserverRightIds.push(this.memberId);
        addAuthor({
         "projectId":this.projectID,
         "userId":this.$_.map(this.members,"mid").join(","),
         "serverRightId":servserverRightIds.join(",")
          }).then(res=>{
          if(res.errorCode === "200"){
            //判断一下
            if(res.result.success.length>0){
             this.$notify({
              title: '成功',
              message: `添加成功${res.result.success.length}位人员`,
              type: 'success'
             });
            }else if(res.result.exist.length>0){
              this.$notify.error({
              title: '失败',
              message: `用户已经存在`,
             });
            }

          }else{
            this.$notify.error({
              title: '失败',
              message: `添加失败`,
             });
          }
          this.$router.push('/project/projectdetail/' + this.projectID);
          this.$parent.$refs.wt.getData();
        },err=>{
          this.$notify.error({
            title: '失败',
            message: `添加失败`,
          });
           this.$router.push('/project/projectdetail/' + this.projectID);
        });
        this.dialogFormVisible = false;
        //this.$router.push({ path: '/project/projectdetail',query:{ projectId:this.projectID }});
      }
    },
    components:{
      "selector": Selector,
      "authorization":Authorization
    }
  }
</script>
