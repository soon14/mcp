/**
* Created by CHENRC2 on 2017-7-20.
*/

<template>
      <paper>
        <my-header :rowInfo="this.userData" :isMine="true"></my-header>
        <div class="tl clearfix">0
          <h3>项目列表</h3>
          <!--<user-search @search-enter="searchEnter" :value="keywords"></user-search>-->
        </div>
        <div style="height: 50%;">
          <full-table :data="data" :loading="tableLoading" :title="title" :page="page" :setting="tableSetting" @size-change="sizeChange" @current-change="currentChange" :columnsOperation="columnsOperation"></full-table>
        </div>
       <router-view></router-view>
     </paper>
</template>

<style lang="less" scoped>
  .container {
    overflow: hidden;
    overflow-y: auto;
    .myprojectwrapper {
      margin: 0 20px 20px 20px;
      .tl {
        height: 36px;
        margin: 20px 0;
        padding: 0 6px;
        min-width: 40%;
        position: relative;
        h3 {
          display: inline-block;
          margin: 0;
          height: 36px;
          line-height: 36px;
        }
        .search-wrapper{
          width: 192px;
          position: absolute;
          right: 0;
          top: 0;
        }
      }
    }
  }
</style>

<script>
  import Vue from 'vue';
  import MyHeader from '../../../../module/management/component/header/userHeader.vue';
  import FullTable from 'components/awesome/full_table/FullTable.vue';
  import * as srv from '../../api/service';
  import ls from 'utils/local_storage_tool';

  export default{
    created() {
      this.getUserInfo(this.getLsValue());
      this.getUserProjectList(this.getLsValue());
    },
    data() {
      return {
        keywords: '',
        userData: {
          type: Object,
          default() {
            return {};
          }
        },
        data: [],
        tableLoading:true,
        tableSetting: {
          selection: false
        },
        title: [
          {
            prop: 'projectName',
            label: '项目名称',
            type: 'operate',
            methods:{
              click:(index,row)=>{
                this.$store.dispatch('selectedProject', row );
                this.$router.push('/project/projectdetail/' + row.projectId);
              }
            }
          },
          {
            prop: 'projectId',
            label: '项目ID'
          },
          {
            prop: 'projectDesc',
            label: '项目描述'
          }],
        page: {
          current: 1,
          size: 10,
          total: 0
        },
        project: {
          name: '',
          manager: '',
          desc: ''
        },
      }
    },
    methods: {
      /**
       * 获取ls里面的account值
       * */
      getLsValue() {
        var a = ls.getObject('user');
        a = a.account;
        return a;
      },
      /**
       * 请求头部的信息
       * */
      getUserInfo(userId) {
        srv.requestUserInfo({userId: userId}).then(data => {
          this.userData = data.result;
        });
      },
      /**
       * 抓取数据
       * */
      getUserProjectList(userId, keywords="") {
        srv.requestUserProject({keywords: keywords, account: userId, index: this.page.current, pageSize: this.page.size}).then(data => {
          this.data = data.result.info;
          this.tableLoading=false;
          this.page.total = data.result.total;
        })
      },
      /**
       * 页码大小变
       */
      sizeChange(size) {
        this.page.size = size;
        // this.getProjectList();
        this.getUserProjectList(this.getLsValue());

      },
      /**
       * 跳转页
       */
      currentChange(current) {
        this.page.current = current;
         this.getUserProjectList(this.getLsValue());
      }
    },
    components: {
      'my-header': MyHeader,
      'full-table': FullTable,
    }
  }
</script>
