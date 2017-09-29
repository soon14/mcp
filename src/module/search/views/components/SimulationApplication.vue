<template>
  <section class="app-wrapper">
      <paper>
        <son-title :headTitle="headTitle"></son-title>
        <el-row class="mb20" type="flex" justify="space-between">
          <el-col>
            <el-form ref="form" :model="form" label-width="80px" label-position="left">
              <el-form-item label="模拟功能">
                <el-select v-model="simulationFn" @change="changeApplication">
                  <el-option label="推送数据" value="tuisong"></el-option>
                  <el-option label="搜索数据" value="sousuo"></el-option>
                </el-select>
                <span class="mf mf-annotate help-doc" @click="goHelpDoc">查看帮助文档</span>
              </el-form-item>
            </el-form>
          </el-col>
        </el-row>
        <el-row class="mb20" type="flex" justify="space-between" style="font-size: 14px">
          <el-col :span="14">
            <span>请求数据</span>
          </el-col>
          <el-col :span="10">
            <span>返回结果</span>
          </el-col>
        </el-row>

        <el-row class="mb20" type="flex" justify="space-between" >
          <el-col :span="10">
            <div class="outside-box">
              <!-- 推送数据 -->
              <el-form ref="pushForm" :rules="pushRules" label-width="60px" :model="pushData" label-position="left" v-if="isShow">
                <el-form-item label="appid" prop="pushAppid">
                  <el-input auto-complete="off" :maxlength="5" placeholder="5位开发者id" v-model="pushData.pushAppid" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="appkey" prop="pushAppkey">
                  <el-input auto-complete="off" placeholder="开发者密钥" v-model="pushData.pushAppkey" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="table" prop="table">
                  <el-input auto-complete="off" placeholder="索引名称" v-model="pushData.table"></el-input>
                </el-form-item>
                <el-form-item label="data" prop="data">
                  <el-input type="textarea" placeholder="推送数据，json格式 数据，具体示例见帮助文档" v-model="pushData.data" :rows="4"></el-input>
                </el-form-item>
              </el-form>
              <!-- 搜索数据 -->
              <el-form ref="searchForm" :rules="searchRules" label-width="100px" :model="searchData" label-position="left" v-else>
                <el-form-item label="appid" prop="searchAppid">
                  <el-input auto-complete="off" :maxlength="5" placeholder="位开发者id" v-model="searchData.searchAppid" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="appkey" prop="searchAppkey">
                  <el-input auto-complete="off" placeholder="开发者密钥" v-model="searchData.searchAppkey" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="page">
                  <el-input auto-complete="off" placeholder="从第几页开始，page>=1" v-model="searchData.page"></el-input>
                </el-form-item>
                <el-form-item label="size">
                  <el-input auto-complete="off" placeholder="每条显示数" v-model="searchData.size"></el-input>
                </el-form-item>
                <el-form-item label="source" prop="source">
                  <el-input auto-complete="off" placeholder="查询数据源(表名)" v-model="searchData.source"></el-input>
                </el-form-item>
                <el-form-item label="keywords" prop="keywords">
                  <el-input auto-complete="off" placeholder="查询关键词，多个词之间需用空格隔开" v-model="searchData.keywords"></el-input>
                </el-form-item>
                <el-form-item label="search_fields" prop="search_fields">
                  <el-input type="textarea" placeholder="搜索字段，array数据格式，具体示例见帮助文档接口说明" v-model="searchData.search_fields" :rows="4"></el-input>
                </el-form-item>
                <el-form-item label="filter">
                  <el-input type="textarea" placeholder="过滤条件，array数据格式，具体示例见帮助文档接口说明" v-model="searchData.filter" :rows="4"></el-input>
                </el-form-item>
                <el-form-item label="sort_field">
                  <el-input type="textarea" placeholder="排序字段，array数据格式，具体示例见帮助文档接口说明" v-model="searchData.sort_field" :rows="4"></el-input>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="1">
          </el-col>
          <el-col :span="2">
            <el-button type="primary" style="margin-right:20px;width: 100%;min-width: 40%;" @click="requrestData">发送请求</el-button>
            <!-- <el-button type="primary" style="margin-right:20px;width: 100%;min-width: 40%;" @click="getSearchInfo" v-else>发送请求</el-button> -->
          </el-col>
          <el-col :span="1">
          </el-col>
          <el-col :span="10">
          <div class="outside-box">
            <div class="inside-box" v-show="isShow" ref="pushData"></div>
            <div class="inside-box" v-show="!isShow" ref="searchData"></div>
          </div>
          </el-col>
        </el-row>
      </paper>
  </section>
</template>
<style lang="less" scoped>
@import "~styles/vars.less";
  .app-wrapper{
    width: 100%;
    height: 100%;
    font-size: 14px;
    line-height: 24px;
    .el-row{
      .el-col{
        .outside-box{
          height: 290px;
          padding: 20px 10px;
          border: 1px solid #d8d8d8;
          overflow-y: auto;
        }
        .el-form{
          .el-form-item{
            position: relative;
            margin-bottom: 20px;
            .el-form-item__label{
              padding-right: 0 !important;
            }
            .el-form-item__content{
              .el-textarea{
                .el-textarea__inner{
                  height: 100px ;
                }
              }
            }
            .help-doc{
              color:@color-primary;
              cursor: pointer;
            }
          }
        }
      }
    }
    .container-title {
      margin-top: 10px;
      font-size: 16px;
      padding-bottom: 10px;
      border-bottom: 1px solid #d8d8d8;
      h3 {
        font-weight: 400;
      }
    }
  }
</style>
<script>
  import SonTitle from 'components/awesome/son_title/SonTitle.vue';
  import Paper from 'components/awesome/paper/Paper.vue';
  import * as srv from '../../api/service';
  import utils from '../../common/js/utils.js';

  export default{
    data() {
      return {
        headTitle: {
          titleName: '模拟应用', // 标题的名字
          isBack: false    // 是否显示返回上一步的骚操作，可不传
        },
        isShow:true,
        simulationFn:'推送数据',
        treeData:'',
        pushData:{
          pushAppid:'',
          pushAppkey:'',
          table:'',
          data:''
        },
        searchData:{
          searchAppid:'',
          searchAppkey:'',
          page:'',
          size:'',
          source:'',
          keywords:'',
          search_fields:'',
          filter:'',
          sort_field:''
        },
        pushRules:{
          pushAppid: [
            { required: true, message: '请填写appid', trigger: 'blur' },
            { required: true, validator:(rule,value,callback)=>{
              if(/^\d+$/.test(value) == false){
                  callback(new Error("开发者ID只能为数字"));
              }else{
                  callback();
              }
          }, trigger: 'blur' }
          ],
          pushAppkey: [
            { required: true, message: '请填写appkey', trigger: 'blur' },
            { required: true, validator:(rule,value,callback)=>{
              if(/^[a-z0-9]+$/i.test(value) == false){
                  callback(new Error("开发者秘钥只能由字母和数字组成"));
              }else{
                  callback();
              }
          }, trigger: 'blur' }
          ],
          table: [
            { required: true, message: '请填写table', trigger: 'blur' }
          ],
          data: [
            { required: true, message: '请填写data', trigger: 'blur' }
          ],
        },
        searchRules:{
          searchAppid: [
            { required: true, message: '请填写appid', trigger: 'blur' },
            { required: true, validator:(rule,value,callback)=>{
              if(/^\d+$/.test(value) == false){
                  callback(new Error("开发者ID只能为数字"));
              }else{
                  callback();
              }
          }, trigger: 'blur'}
          ],
          searchAppkey: [
            { required: true, message: '请填写appkey', trigger: 'blur' },
            { required: true, validator:(rule,value,callback)=>{
              if(/^[a-z0-9]+$/i.test(value) == false){
                  callback(new Error("开发者秘钥只能由字母和数字组成"));
              }else{
                  callback();
              }
          }, trigger: 'blur' }
          ],
          source: [
            { required: true, message: '请填写source', trigger: 'blur' }
          ],
          keywords: [
            { required: true, message: '请填写keywords', trigger: 'blur' }
          ],
          search_fields: [
            { required: true, message: '请填写search_fields', trigger: 'blur' }
          ],
        }
      }
    },
    created () {
      this.getTenantInfo();
    },
    methods:{
      // 展示推送数据结果
      getPushInfo() {
        this.$refs["pushForm"].validate((valid) => {
           if (valid) {
              let params = {
              "appid":this.pushData.pushAppid,
              "appkey":this.pushData.pushAppkey,
              "table":this.pushData.table,
              "data":JSON.parse(this.pushData.data.replace(/[\r\n]/g,"")),
            }
            srv.requestSimulationPush(params).then(res => {
              this.$refs.pushData.innerHTML = '<pre>' +utils.formatJSON(res)+'<pre/>';
            });
           } else {
             this.$notify({
                type: 'warning',
                message:'请填写必要选项'
              });
             return false;
           }
         });
      },
      // 展示搜索数据结果
      getSearchInfo() {
        this.$refs["searchForm"].validate((valid) => {
             if (valid) {
             let params = {
              "appid":this.searchData.searchAppid,
              "appkey":this.searchData.searchAppkey,
              "page":this.searchData.page,
              "size":this.searchData.size,
              "source":this.searchData.source,
              "keywords":this.searchData.keywords,
              "search_fields":JSON.parse(this.searchData.search_fields.replace(/\ +/g,"").replace(/[\r\n]/g,"")),
              "filter":JSON.parse(this.searchData.filter === "" ? "[]" : this.searchData.filter.replace(/\ +/g,"").replace(/[\r\n]/g,"")),
              "sort_field":JSON.parse(this.searchData.sort_field === "" ? "{}" : this.searchData.sort_field.replace(/\ +/g,"").replace(/[\r\n]/g,""))
            }
            srv.requestSimulationSearch(params).then(res => {
              this.$refs.searchData.innerHTML = '<pre>' +utils.formatJSON(res)+'<pre/>';
            });
           } else {
             this.$notify({
                type: 'warning',
                message:'请填写必要选项'
              });
             return false;
           }
         });
      },
      changeApplication(val) {
        if(val === 'tuisong'){
          this.isShow = true;
          // this.$refs.pushData.innerHTML = '<pre></pre>';
          this.$refs["searchForm"].resetFields();
          this.getTenantInfo();
        }else if(val === 'sousuo'){
          this.isShow = false;
          // this.$refs.searchData.innerHTML = '<pre></pre>';
          this.$refs["pushForm"].resetFields();
          this.getTenantInfo();
        }
      },
      // 获取租户信息
      getTenantInfo(){
        let parmas = {}
        srv.requestTenantInfo(parmas).then(data => {
          this.pushData.pushAppid = data.data.info[0].appid;
          this.pushData.pushAppkey = data.data.info[0].appkey;
          this.searchData.searchAppid = data.data.info[0].appid;
          this.searchData.searchAppkey = data.data.info[0].appkey;
        });
      },
      requrestData() {
        if(this.isShow){
          this.$refs.pushData.innerHTML = '<pre></pre>';
          this.getPushInfo();
        }else{
          this.$refs.searchData.innerHTML = '<pre></pre>';
          this.getSearchInfo();}
      },
      goHelpDoc() {
        window.open('http://m_search.midea.com/doc/kai-fang-api/sou-suo-api.html');
      }
    },
    components: {
      "son-title": SonTitle,
      "paper": Paper
    }
  }
</script>
