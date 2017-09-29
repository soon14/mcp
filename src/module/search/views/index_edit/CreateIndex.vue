<template>
  <section class="container">
      <paper class="container-card">
        <son-title :headTitle="headTitle"></son-title>
        <div class="form-container">
          <el-form :model="ruleForm" ref="ruleForm" :rules="createIndexRules" label-width="70px" class="demo-ruleForm" label-position="left">
            <div class="inline-box">
              <el-form-item label="索引名称" prop="index_name" class="inline-form">
                <el-input placeholder="请输入索引名称" style="width:200px" v-model="ruleForm.index_name" :maxlength="128"></el-input>
              </el-form-item>
              <el-form-item label="索引类型" class="inline-form" prop="process_type">
                <el-select placeholder="请选择索引类型" v-model="ruleForm.process_type">
                  <el-option label="common" value="common"></el-option>
                  <!-- <el-option label="special" value="special"></el-option> -->
                </el-select>
              </el-form-item>
              <el-form-item label="开发者ID" class="inline-form" >
                <el-select placeholder="请选择开发者ID" v-model="ruleForm.appid">
                  <el-option v-for="item in appidOptions" :label="item.appid" :value="item.appid"></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="索引描述" prop="desc" class="area-form">
                <el-input type="textarea" v-model="ruleForm.desc" :maxlength="128" placeholder="最多输入128个字符"></el-input>
              </el-form-item>
            </div>
          </el-form>
        </div>
        <div class="tl clearfix">
          <h3>字段列表</h3>
        </div>
        <border-one-px style="margin: 10px 0;"></border-one-px>
        <div class="btn">
          <el-button @click="addNewOne">新增</el-button>
        </div>
        <div class="mask">
          <add-index-field ref="addBtn" :tableData="tableData" :isShow="isShow" @close-state="closeState" @get-form-data="getFormData"></add-index-field>
        </div>
        <full-table :data="tableRealData" :title="title" :page="page" :setting="tableSetting" @size-change="sizeChange" @current-change="currentChange" :columnsOperation="columnsOperation"></full-table>
        <border-one-px style="margin: 10px 0;"></border-one-px>
        <div class="btn-group">
          <el-button @click="backBefore">取消</el-button>
          <el-button type="primary" @click="sureCreated" :disabled="buttonDisable">提交</el-button>
        </div>
      </paper>
  </section>
</template>
<style lang="less" scoped>
  .container {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    font-size: 14px;
    line-height: 24px;
    .back{
      cursor: pointer;
    }
    .form-container{
      margin: 0;
      padding-bottom:20px;
      position: relative;
      .demo-ruleForm{

      }
      .inline-form{
        display: inline-block;
        margin: 20px 40px 30px 0;
      }
      .form-appid{
        margin-right: 0;
      }
    }
    .title {
      margin-top: 16px;
      font-size: 16px;
    }
    .btn {
      padding: 10px 0 20px 0;
      button {
        width: 80px;
      }
    }
    .btn-group {
      padding-top: 10px;
      text-align: center;
      button {
        width: 80px;
        height: 30px;
        line-height: 8px;
      }
    }
  }
</style>
<script>
  import Vue from 'vue';
  import FullTable from 'components/awesome/full_table/FullTable.vue';
  import Paper from 'components/awesome/paper/Paper.vue';
  import SonTitle from 'components/awesome/son_title/SonTitle.vue';
  import AddIndexField from '../index_edit/AddIndexField.vue';
  import BorderOnePx from 'components/awesome/border_one_px/BorderOnePx.vue';
  import * as srv from '../../api/service';

  export default{
    data() {
      return {
        headTitle: {
          titleName: '新建索引', // 标题的名字
          isBack: true    // 是否显示返回上一步的骚操作，可不传
        },
        isShow: false,
        ruleForm:{
          index_name:'',
          process_type:'',
          appid:'',
          desc:''
        },
        appidOptions:[],
        createIndexRules: {
          index_name: [
            { required: true, message: '请填写索引名称', trigger: 'blur' },
            { required: true, validator:(rule,value,callback)=>{
              if(/^[a-z_0-9]*$/.test(value) == false){
                  callback(new Error("只能输入小写英文,数字,下划线(最多128个字符)"));
              }else{
                  callback();
              }
          }, trigger: 'blur' }
          ],
          process_type: [
            { required: true, message: '请选择字段类型', trigger: 'change' }
          ],
          appid:[
            { required: true, message: '请选择开发者ID', trigger: 'change' }
          ],
        },
        tableSetting: {
          selection: false,
          index: true
        },
        tableData:[],
        tableRealData:[],
        title: [
          {
            prop: 'field_name',
            label: '字段名称'
          },
          {
            prop: 'field_type',
            label: '类型'
          },
          {
            prop: 'format',
            label: '格式'
          },
          {
            prop: 'analyzer',
            label: '分词'
          },
          // {
          //   prop: 'create_time',
          //   label: '创建时间'
          // }
        ], // 配置表头
        columnsOperation:{
          title: "操作",
          align: "center",
          buttons:[{
            label: "删除",
            size: "small",
            type: "text",
            methods:{
              click:(index, row)=>{
                // 点击删除，就删除这条数据
                this.$confirm("确定删除该字段","提示",{
                  confirmButtonText: '是',
                  cancelButtonText: '否',
                  type: 'warning'
                }).then(() => {
                  let realIndex = 0;
                  if (this.page.current === undefined) {
                    realIndex = index;
                  } else {
                    realIndex = index + (this.page.current - 1) * this.page.size;
                  }
                  this.buttonDisable = false;
                  this.tableData.splice(realIndex, 1);
                  this.tableRealData.splice(index, 1);
                  this.pageBreak(this.page.current,this.page.size);
                  this.page.total--;
                }).catch(() => {

                });
              }
            }
          }]
        },
        page: {
          current: 1,
          size: 10,
          total: 0
        },
      }
    },
    created() {
      this.getTenantInfo()
    },
    methods:{
      /**
       * 页码大小变
       */
      sizeChange(size) {
        this.page.size = size;
        this.pageBreak(this.page.current, size);
      },
      /**
       * 跳转页
       */
      currentChange(current) {
        this.page.current = current;
        this.pageBreak(current, this.page.size);
      },
      // 从新增框里面传出来的值
      getFormData(formData) {
        this.tableData.push(formData);
        this.tableRealData.push(formData);
        this.page.total++;
        this.pageBreak(this.page.current,this.page.size);
      },
      // 从新增框传出来控制显示隐藏的值
      closeState(val) {
        this.isShow = val;
      },
      // 返回的逻辑
      backBefore() {
        this.$router.go(-1);
      },
      sureCreated() {
        this.$refs["ruleForm"].validate((valid) => {
           if (valid) {
            if(this.tableData.length == 0){
              this.$confirm("确定不创建索引字段","提示",{
                confirmButtonText: '是',
                cancelButtonText: '否',
                type: 'warning'
              }).then(() => {
                this.getNewIndex();
              }).catch(() => {

              });
            }else{this.getNewIndex();}
           } else {
             this.$notify({
                type:'warning',
                message:'请填写必要选项'
              });
             return false;
           }
         });
      },
      getNewIndex() {
        for(let i=0;i<this.tableData.length;i++){
          this.tableData[i].analyzer= this.tableData[i].analyzer==='true';
        }
        let params = {
          "index_name":this.ruleForm.index_name,
          "process_type":this.ruleForm.process_type,
          "desc":this.ruleForm.desc,
          "mapping":this.tableData
        }
        srv.requestCreateIndex(params).then(data => {
          if(data.errorCode === 0 && data.msg === 'ok'){
            this.$notify({
              type: 'success',
              message:'已成功新增一条索引'
            })
            this.$router.go(-1);
          }else if(data.errorCode === 1017 && data.msg ==='index already exists'){
            this.$notify.error({
              message: '创建的索引名已存在'
            });
          }
        })
      },
      // 获取租户信息
      getTenantInfo(){
        let parmas = {}
        srv.requestTenantInfo(parmas).then(res => {
          this.ruleForm.appid = res.data.info[0].appid;
          this.appidOptions = res.data.info
        });
      },
      // 增加按钮的逻辑
      addNewOne() {
        this.$nextTick(() => {
            console.log(this.$refs.addBtn);
          this.$refs.addBtn.refreshFormStatus();
        });
        this.isShow = true;
//        try {
//          this.$refs.addBtn.refreshFormStatus();
//        } catch (e) {
//            throw '这里出问题啦';
//        }
      },
      // 分页逻辑
      pageBreak(page=1, size=10) {
        let nowPageData = [];
        for ( var i = (page - 1) * size; i < page * size; i++ ) {
          if (this.tableData[i] !== undefined) {
            nowPageData.push(this.tableData[i]);
          }
        }
        this.tableRealData = nowPageData;
      }
    },
    components: {
      "full-table": FullTable,
      "add-index-field":AddIndexField,
      "border-one-px": BorderOnePx,
      "son-title": SonTitle,
      "paper": Paper
    }
  }
</script>
