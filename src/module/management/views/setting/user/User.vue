/**
* Created by CHENRC2 on 2017-7-20.
*/
<template>
    <whole-table :data="data"></whole-table>
</template>
<style lang="less" scoped>
</style>
<script>
  import * as srv from '../../../api/service';
  import WholeTable from 'components/awesome/whole_table/WholeTable.vue';
  export default {
    data() {
      return {
        data:{
          title:"人员列表",
          refreshMethod: this.getUserList,
          tableTitle:[
            {
              prop: 'userName',
              label: '姓名',
            },
            {
              prop: 'userAccount',
              label: '账户名',
            },
            {
              prop: 'mail',
              label: '邮箱',
            },
            {
              prop: 'projectNum',
              label: '项目数量',
              type: 'operate',
              methods:{
                click:(index,row)=>{
                  this.$router.push({path: '/setting/user/personal_project', query:{ rowInfo: row.userAccount }});
                }
              }
            }
          ]
        }
      }
    },
    methods: {
      /**
       * 获取用户列表
       * */
      getUserList(keywords="",current=1,size=10) {
        return srv.requestUserList({keywords: keywords, index: current, pageSize:size}).then(data => {
            return data.result;
        })
      },
    },
    components: {
      "whole-table": WholeTable,
      // "paper": Paper
    }
  }
</script>

