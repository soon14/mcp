<template>
  <section class="data-wrapper">
    <paper>
      <div>
        <son-title :headTitle="headTitle"></son-title>
        <div class="btn">
          <span>索引名称</span>&nbsp;&nbsp;
          <el-select v-model="tableName" clearable="" placeholder="请选择索引" @change="changeIndexDetail" @clear = "clearDetail">
              <el-option v-for="item in tableOptions" :key="item.index_name" :label="item.index_name" :value="item.index_name"></el-option>
          </el-select>
          <user-search style="float: right;width: 25%;" @search-enter="searchEnter" :value="keywords"></user-search>
        </div>
        <div>
          <full-table :data="tableData" :title="tableTitle" :page="page" :setting="tableSetting" @size-change="sizeChange" @current-change="currentChange" :columnsOperation="columnsOperation"></full-table>
          <el-dialog :visible.sync="dialogFormVisible" title="数据内容" @close="cancel" size="small" top="30%">
            <!-- <el-tree :data="treeData" :props="defaultProps" :default-expand-all="true"></el-tree> -->
            <div ref="dataResult"></div>
          </el-dialog>
        </div>
      </div>
    </paper>
  </section>
</template>
<style lang="less" scoped>
  .data-wrapper {
    width: 100%;
    height: 100%;
    font-size: 14px;
    line-height: 24px;
    /*min-width: 400px;*/ 
    .title {
      margin-top: 10px;
      font-size: 16px;
      font-weight: 400;
    }
    .btn {
      padding: 10px 0 20px 0;
      button {
        width: 80px;
        height: 30px;
        line-height: 8px;
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
    .el-dialog{
      .el-tree{
        margin-bottom: 20px;
      }
    }
  }
</style>
<script>
  import FullTable from 'components/awesome/full_table/FullTable.vue';
  import UserSearch from 'components/awesome/user_search/UserSearch.vue';
  import SonTitle from 'components/awesome/son_title/SonTitle.vue';
  import Paper from 'components/awesome/paper/Paper.vue';
  import * as srv from '../../api/service';
  import utils from '../../common/js/utils.js';

  export default{
    data() {
      return {
        dialogFormVisible:false,
        headTitle: {
          titleName: '数据展示', // 标题的名字
          isBack: false    // 是否显示返回上一步的骚操作，可不传
        },
        tableSetting: {
          selection: false,
          index: true
        },
        treeData:'',
        tableName:'',
        tableOptions:[],
        keywords:'',
        tableData:[],
        tableTitle:[
          {
            prop: 'id',
            label: '数据ID'
          },
          {
            prop: 'source',
            label: '数据内容',
            type: 'operate',
            methods:{
              click:(index,row)=>{
                this.dialogFormVisible = true
                let html = '<pre>' +utils.formatJSON(row)+'<pre/>';
                let self = this;
                setTimeout(function(){
                  self.$refs.dataResult.innerHTML = html;
                },50)
              }
            }
          }
        ],
        page: {
          current: 1,
          size: 10,
          total: 0
        } // 分页器选项
      }
    },
    created () {
      this.getIndexList();
      this.getIndexDetail();
    },
    methods:{
      searchEnter(keywords){
        this.keywords = keywords;
        this.page.current = 1;
        // 下面要写执行的刷新列表的方法
        if (/^\s+$/.test(keywords) || keywords.length == 0) {
          this.getIndexDetail();
        } else {this.getSearchDetail();}
      },
      // 获取索引详情
      getIndexDetail() {
        let params = {"page": String(this.page.current),"size": String(this.page.size),"table":this.tableName}
        srv.requestIndexDetail(params).then(res => {
          if (res.errorCode === 0 && res.msg === 'ok') {
            this.tableData = res.data.info
            this.page.total = res.data.total;
          }else if(res.errorCode == 1001 && res.msg === 'para error'){
            this.tableData = res.data.info
            this.page.total = res.data.total;
          }
        });
      },
      // 获取搜索详情
      getSearchDetail() {
        let params = {"table":this.tableName,"query_word": String(this.keywords),"page": String(this.page.current),"size": String(this.page.size)};
        srv.requestSimpleSearch(params).then(res => {
          for(let i=0;i<res.data.info.length;i++){
            res.data.info[i].source = JSON.stringify(res.data.info[i].source)
          }
          if (res.errorCode == 0 && res.msg == 'ok') {
            this.tableData = [];
            this.tableData = res.data.info;
            this.page.total = res.data.total;
          }
        })
      },
      changeIndexDetail() {
        this.getIndexDetail();
        this.keywords = '';
      },
      clearDetail(){
        this.getIndexDetail()
      },
      // 获取索引列表
      getIndexList() {
        let parmas = {"page": String(this.page.current),"size": "10000"}
        srv.requestGetIndexList(parmas).then(res => {
          if (res.errorCode == 0 && res.msg == 'ok') {
            this.tableName = res.data.info[0].index_name;
            this.tableOptions = res.data.info;
            this.page.total = res.data.total;
          }
        });
      },
      // 关闭数据内容窗口
      cancel() {
        this.dialogFormVisible = false;
      },
      /**
       * 页码大小变
       */
      sizeChange(size) {
        this.page.size = size;
        if (this.keywords) {
          this.getSearchDetail();
        } else {
          this.getIndexDetail();
        }
      },
      /**
       * 跳转页
       */
      currentChange(current) {
        this.page.current = current;
        if (this.keywords != '' || this.keywords) {
          this.getSearchDetail();
        } else {
          this.getIndexDetail();
        }
      }
    },
    components: {
      "full-table": FullTable,
      "son-title": SonTitle,
      "user-search": UserSearch,
      "paper" : Paper
    }
  }
</script>
