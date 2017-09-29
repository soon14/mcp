<template>
  <section class="tenant-wrapper">
      <paper>
        <son-title :headTitle="headTitle"></son-title>
        <div>
          <list-table :data="tenantList" :title="tableTitle" :setting="tableSetting" :columnsOperation="columnsOperation"></list-table>
        </div>
      </paper>
  </section>
</template>
<style lang="less" scoped>
  .tenant-wrapper {
    width: 100%;
    height: 100%;
    font-size: 14px;
    line-height: 24px;
    .title {
      margin-top: 10px;
      font-size: 16px;
      font-weight: 400;
    }
  }
</style>
<script>
  import Vue from 'vue';
  import ListTable from 'components/awesome/list_table/ListTable.vue';
  import SonTitle from 'components/awesome/son_title/SonTitle.vue';
  import BorderOnePx from '../../common/components/BorderOnePx.vue';
  import Paper from 'components/awesome/paper/Paper.vue';
  import * as srv from '../../api/service';

  export default{
    data() {
      return {
        headTitle: {
          titleName: '租户管理', // 标题的名字
          isBack: false    // 是否显示返回上一步的骚操作，可不传
        },
        tenantList:[],
        tableSetting: {
          selection: false,
          index: true
        },
        tableTitle:[
          // {
          //   prop: 'seq',
          //   label: '序号',
          // },
          {
            prop: 'appid',
            label: '开发者ID',
          },
          {
            prop: 'appkey',
            label: '开发者密钥(appKey)',
          },
          {
            prop: 'desc',
            label: '说明',
          }
        ],
      }
    },
    created () {
      this.getTenantInfo()
    },

    methods:{
      getTenantInfo(){
        let parmas = {}
        srv.requestTenantInfo(parmas).then(res => {
          this.tenantList=res.data.info
        });
      },
    },
    components: {
      'list-table': ListTable,
      "son-title": SonTitle,
      "paper" : Paper
    }
  }
</script>
