/**
* Created by CHENRC2 on 2017-7-22.
*/
<template>
  <paper>
      <full-table :data="table.data" :title="table.title" :setting="table.setting" :page="table.page" @size-change="sizeChange" @current-change="currentChange"></full-table>
  </paper>
</template>
<style lang="less" scoped>
  .container{
    margin: 20px;
  }
</style>
<script>
  import FullTable from 'components/awesome/full_table/FullTable.vue';
  import Paper from 'components/awesome/paper/Paper.vue';
  export default{
    data() {
      return {
        table: {
          setting: {
            selection: true
          },
          title: [
            {
              prop: "id",
              label:"序号"
            },{
              prop: "name",
              label:"名称"
            }],
          data: [
            {
              id: 1,
              name: "abc"
            },{
              id: 2,
              name: "acb"
            },{
              id: 3,
              name: "acb"
            },{
              id: 4,
              name: "123123"
            },{
              id: 5,
              name: "123123"
            },{
              id: 6,
              name: "123123"
            },{
              id: 7,
              name: "123123"
            },{
              id: 8,
              name: "123123"
            },{
              id: 9,
              name: "123123"
            },{
              id: 10,
              name: "123123"
            },{
              id: 11,
              name: "123123"
            },{
              id: 12,
              name: "123123"
            }],
          page: {
            current: 1,
            size: 10,
            total: 10
          }
        }
      }
    },
    methods: {
      sizeChange(){

      },
      currentChange(){

      }
    },
    components: {
      "full-table": FullTable,
      'paper': Paper
    }
  }
</script>
