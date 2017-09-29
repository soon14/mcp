/**
* Created by CHENRC2 on 2017-7-20.
*/
<template>
  <section class="container single_box">
    <!-- 新增项目 -->
    <el-dialog :visible.sync="dialogFormVisible" title="创建项目" @close="cancel" v-if="id==='666'" size="small" top="30%">
      <el-form :model="ruleForm" :rules="addRules" @submit.native.prevent ref="ruleForm" label-width="90px" label-position="left">
        <el-form-item prop="projectName" label="名称">
          <el-input v-model="ruleForm.projectName" auto-complete="off" :maxlength="20" ></el-input>
        </el-form-item>
          <OrgSelectorSingle ref="orgselector" class="single" :labelTitle="labelTitle" :requireSel="requireSel" :memberList="memberList" @sendList="getMemberList" onkeydown="if(event.keyCode == 13)return false"></OrgSelectorSingle>
        <el-form-item prop="projectDesc" label="描述">
          <el-input type="textarea" v-model="ruleForm.projectDesc" placeholder="最多不超过128个字符" :maxlength="1280"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑项目 -->
     <el-dialog :visible.sync="dialogFormVisible" title="编辑项目"  @close="cancel"  top="25%" v-else>
      <el-form :model="modifyProject" :rules="modifyRules" ref="modifyForm" label-width="100px" label-position="left">
        <el-form-item label="名称" prop="projectName">
          <span>{{modifyProject.projectName}}</span>
        </el-form-item>
          <!-- <OrgSelectorSingle class="singleStyle" ref="modifySelector" :labelTitle="labelTitle" :requireSel="requireSel" :memberList="memberList" @sendList="getMemberList"></OrgSelectorSingle> -->
        <el-form-item label="项目ID" prop="projectId">
          <span>{{modifyProject.projectId}}</span>
        </el-form-item>
        <el-form-item label="描述" prop="projectDesc">
           <el-input type="textarea" v-model="modifyProject.projectDesc" :maxlength="108"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel()">取 消</el-button>
        <el-button type="primary" @click="getUpdateProject()">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<style lang="less" >
.mf-close{
  cursor:pointer;
}
.single_box{
  .el-dialog--small{
    // min-width:524px;
    width:524px;
  }
}
.single{
}
.single{
  margin-bottom:20px;
}
.singleStyle{
  margin-bottom:20px;
  .el-form-item__content{
    margin-left: 100px !important;
  }
}
.tl{
  height: 40px;
  position: relative;
  h3{
    display: inline-block;
    margin: 0;
    width: 94%;
  }
  span{
    font-size: 18px;
    display: inline-block;
    position: absolute;
    right: 0;
    top: 10px;
    font-size: 20px;
  }
}
.el-form-item{
  position: relative;
  margin-bottom: 20px;
  .el-form-item__label{
    padding-right: 0 !important;
  }
}
.el-form-item:last-child{
  margin-bottom: 0;
}
.el-dialog__footer{
  padding-top: 0 !important;
  .dialog-footer{
    padding-bottom: 5px;
    .el-button{
      width: 100px;
    }
  }
}
</style>
<script>
  import * as srv from '../../../api/service.js';
  import OrgSelectorSingle from 'components/utils/org_selector/OrgSelectorSingle.vue'
  export default{
    data() {
      return {
        id:this.$route.params.id,
        labelTitle:"项目管理员",
        dialogFormVisible:true,
        requireSel:{ required: true, message: '请填写项目管理员', trigger: 'blur' },
        memberList:"",
        ruleForm: {
          projectName: '',
          projectManager: '',
          projectManagerId: '',
          projectDesc: ''
        },
        modifyProject:this.$route.query.row,
        addRules: {
          projectName: [
            { required: true, message: '请填写项目名称', trigger: 'blur' },
            { required: true, validator:(rule,value,callback)=>{
                if(/^\w+$/.test(value) == false){
                    callback(new Error("只能输入英文、数字、下划线 (不超过20个字符)"));
                }else{
                    callback();
                }
            }, trigger: 'blur' }
          ],
          projectManager: [
            { required: true, message: '请填写项目管理员', trigger: 'blur' }
          ],
          projectDesc: [
            { required: true, message: '请填写项目描述', trigger: 'blur' },
            { required: true, validator:(rule,value,callback)=>{
                if(/^\s+/.test(value)){
                    callback(new Error("项目描述不能以空格开头"));
                }else{
                    callback();
                }
            }, trigger: 'blur' }
          ],
          
        },
        modifyRules: {
          // projectManager: [
          //   { required: true, message: '请填写项目管理员', trigger: 'change' }
          // ],
          projectDesc: [
            { required: true, message: '请填写项目描述', trigger: 'blur' },
            { required: true, validator:(rule,value,callback)=>{
                if(/^\s+/.test(value)){
                    callback(new Error("项目描述不能以空格开头"));
                }else{
                    callback();
                }
            }, trigger: 'blur' }
          ],
          projectId: [
            { required: true, message: '请填写项目描述', trigger: 'blur' }
          ],
          projectName: [
            { required: true, message: '请填写项目描述', trigger: 'blur' },
          ]
        }
      }
    },
    methods:{
      cancel(){
          this.$router.go(-1);
      },
      // 人员选择器的返回值
      getMemberList(val){
        let temp1 = JSON.stringify(val);
        if ( temp1.length > 2 ) {
          let temp2 = JSON.parse(temp1);
          this.ruleForm.projectManager = temp2.uName;
          this.ruleForm.projectManagerId = temp2.uid;
        }
      },
      submitForm(){
        // refresh 中间那个单独的表单
        this.$refs.orgselector.$refs["dynamicValidateForm"].validate(valid => {});
        this.$refs["ruleForm"].validate((valid) => {
          if (valid) {
            let addProjectParams = this.ruleForm;
            srv.requestAddProject(addProjectParams).then(data => {
              if (data.msg == 'success' && data.errorCode == 200) {
                var temp = JSON.stringify(data.result.data.project);
                // 这里的query是把新数据带出去了
                this.$router.push({path:"/setting/project", query: {freshdata: temp}});
                this.$emit('hash', data.result.data.project);
                this.$notify({
                  title: '添加成功',
                  message: '成功添加了一个项目',
                  type: 'success'
                });
              }
              else {
                this.$notify.error({
                  title: '添加失败',
                  message: '项目名称重复或者管理员不存在'
                });
              }
            })
          } else {
            return false;
          }
        });
      },
      getUpdateProject(){
        this.$refs["modifyForm"].validate((valid) => {
          if (valid) {
            let changeProjectParams = {"projectId":this.modifyProject.projectId,"projectManager":this.modifyProject.projectManager,"projectName":this.modifyProject.projectName}
            srv.requestUpdateProject(changeProjectParams).then(data => {
              if (data.msg == 'success' && data.errorCode == 200) {
                var a = JSON.stringify(data.result.data.project);
                this.$router.push({path:"/setting/project", query: {freshdata: a}});
                this.$emit('hash', data.result.data.project);
                this.$notify({
                  title: '修改成功',
                  message: '成功修改了一个项目',
                  type: 'success'
                });
              }else {
                this.$notify.error({
                  title: '修改失败',
                  message: '项目名称重复或者管理员不存在'
                });
              }
            })
          } else {
            return false;
          }
        });
      }
    },
    components:{
       OrgSelectorSingle
    }
  }
</script>
