/**
* Created by CHENRC2 on 2017-7-20.
*/
<template>
  <section class="container">
    <whole-table ref="wt" :data="data">
      <project-header :projectDetail="this.projectData" :memberNum="this.memberNum" slot="header"></project-header>
    </whole-table>
    <router-view @hash="hash"></router-view>
  </section>
</template>
<style lang="less" scoped>
  .container{
    overflow: hidden;
    overflow-y: auto;
  }
</style>
<script>
  import * as srv from '../../../api/service';
  import * as loginSrv from 'src/module/login/api/service';
  import WholeTable from 'components/awesome/whole_table/WholeTable.vue';
  import ProjectHeader from '../../../component/header/projectHeader.vue';
  import ls from 'utils/local_storage_tool';

  export default {
    data() {
      return {
        memberNum: 0,
        projectId: this.$route.params.projectId,
        roles:[],
        projectData:{},
        data:{
          title:"项目成员",
          tableSetting: {
            selection: false,
          },
          refreshMethod:this.getProjectMember,
          tableTitle:[
            {
              prop: 'userAccount',
              label: '账户',
            },
            {
              prop: 'userName',
              label: '姓名',
            },
            {
              prop: 'mail',
              label: '邮箱'
            },
            {
              prop: 'projectRole',
              label: '用户角色'
            }
          ],
          columnsOperation:{},
          titleButton:[]
        },
        selectedDatas: [],
        selectedDataId: [],
        selectedSeverId:[]
      }
    },
    created(){
      // 请求项目信息---不要删
      this.getProjectInfo();
      this.getLsValue();
    },
    methods: {
      getLsValue() {
        let user = ls.getObject('user'),that=this;
        loginSrv.getUserRole(false,user.account, this.projectId).then(data => {
          if (data.errorCode == '200') {
            that.roles=data.result.role;
            let myobject = {
              title: "操作",
              align: "center",
              buttons:[{
                label: "删除",
                size: "small",
                type: "text",
                methods:{
                  click:(index, row)=>{
                    if(row.projectRole === '项目管理员' || row.projectRole === '超级管理员'){
                      this.$notify({
                        type:'warning',
                        message:'无法对项目管理员及超级管理员进行删除'
                      })
                    }else{
                      this.memberDelete(row.userAccount,row.projectRole);
                    }
                  }
                }
              },{
                label: "编辑",
                size: "small",
                type: "text",
                methods:{
                  click:(index, row)=>{
                    if(row.projectRole === '项目管理员' || row.projectRole === '超级管理员'){
                      this.$notify({
                        type:'warning',
                        message:'无法对项目管理员及超级管理员进行编辑'
                      })
                    }else{
                      this.$router.push("/project/projectdetail/author/"+ row.userAccount+"/" +this.projectId);
                    }
                  }
                }
              }]
            };
            let arr =[
              {
                label: "添加",
                click: () => {
                  this.$router.push("/project/projectdetail/useredit/"+this.projectId);
                }
              }
              ,{
                label: "删除",
                selectedControl:true,
                click: (selected) => {
                  if(selected.length>10){
                    this.$notify.warning("一次只能添加10个用户");
                  }else if (selected.length > 0 && selected.length <= 10 ) {
                    this.selectedDatas = selected;
                    this.memberDelete();
                  }
                }
              }
            ]
            for(let i=0;i<that.roles.length;i++){
              if(that.roles[i].name == 'operator'){
                this.data.columnsOperation = myobject;
                this.data.titleButton=arr;
                this.data.tableSetting.selection=true;
              }
            }
          }
        });
      },
      /**
       * 获取项目成员列表
       * */
      getProjectMember(keywords="",current=1,size=10) {
        return srv.requestProjectMemberList({keywords: keywords, projectId: this.projectId, index: current, pageSize: size}).then(data => {
          this.memberNum = data.result.totals;
          for(let i=0;i<data.result.info.length;i++){
            let role = data.result.info[i].projectRole.slice(1);
            // if(role.indexOf('member') !== -1 && role.indexOf('admin') !== -1){
            //   data.result.info[i].projectRole = '项目成员'
            // }else if(role.indexOf('operator') !== -1 && role.indexOf('admin') !== -1){
            //   data.result.info[i].projectRole = '项目管理员'
            // }else if(role.indexOf('admin') !== -1){
            //   data.result.info[i].projectRole = '超级管理员'
            // }else if(role.indexOf('operator') !== -1){
            //   data.result.info[i].projectRole = '项目管理员'
            // }else if(role.indexOf('member') !== -1){
            //   data.result.info[i].projectRole = '项目成员'
            // }
            if(role.indexOf('member') !== -1){
              data.result.info[i].projectRole=role.replace(role,'项目成员')
            }else if(role.indexOf('operator') !== -1){
              data.result.info[i].projectRole=role.replace(role,'项目管理员')
            }else if(role.indexOf('admin') !== -1 && role.indexOf('member') === -1 && role.indexOf('operator') === -1){
              data.result.info[i].projectRole=role.replace(role,'超级管理员')
            }
          }
          return data.result;
        });
      },
      /**
       * 删除项目成员
       * @param id
       */
      memberDelete(userId,projectRole){
          let that = this;
        this.$confirm((this.selectedDatas.length != 0) ? '已选中'+this.selectedDatas.length+'条选项，是否删除？' : '已选中1条选项，是否删除？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            for (var i = 0; i < this.selectedDatas.length; i++) {
              if (this.selectedDatas.indexOf(this.selectedDatas[i].userAccount) == -1) {
                this.selectedDataId.push(this.selectedDatas[i].userAccount);
                this.selectedSeverId.push(this.selectedDatas[i].projectRole);
              }
            }
            let userIdStrArr = this.selectedDataId.join(',') || userId;
            let severIdStrArr = this.selectedSeverId.join(',') || projectRole;
            let params = {"projectId":this.projectId,"userId":userIdStrArr,"serverRightId":severIdStrArr};

            srv.requestDeleteProjectMember(params).then(data => {
              if (data.errorCode == "200") {
                this.$notify({
                  type: 'success',
                  message: (this.selectedDatas.length != 0) ? '已成功删除'+data.result.success.length+'个选项' : '已成功删除1个选项'
                });
                // 刷新列表
                this.$refs.wt.getData();
                this.selectedDatas = [];
              }
            });
        }).catch(() => {

        });
        // 无论成功不成功，都清空这个数组
        this.selectedDataId = [];
        this.selectedSeverId= [];
      },
      /**
       * 请求项目头部信息
       * @param id
       * */
      getProjectInfo() {
        srv.requestProjectInfo({projectId: this.projectId}).then(data => {
          if (data.errorCode === "200" && data.msg === "success") {
            this.projectData = data.result;
          }
        });
      },
      hash(data) {
        this.$refs.wt.getData();
      },
    },
    components: {
      "whole-table": WholeTable,
      'project-header': ProjectHeader,
    }
  }
</script>
