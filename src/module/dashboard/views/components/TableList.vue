/**
* Created by CHENRC2 on 2017-7-22.
*/
<template>
  <paper>
    <list-table :data="table.data" :title="table.title" :setting="table.setting" :columnsOperation="table.columnsOperation"></list-table>
  </paper>
</template>
<style lang="less" scoped>
  .container{
    margin: 20px;
  }
</style>
<script>
  import ListTable from 'components/awesome/list_table/ListTable.vue';
  import Paper from 'components/awesome/paper/Paper.vue';
  export default{
    data() {
      return {
        screenHeight: document.body.clientHeight,
        table: {
          setting: {

          },
          title: [
            {
              prop: "id",
              label:"序号"
            },{
              prop: "name",
              label:"名称",
              type: 'operate',
              methods:{
                click:(index,row)=>{

                }
              }
            },{
              prop: "name",
              label:"名称",
              type: 'slot',
              computed:function(scope){
                let className=scope.row.id===1?"m-success":"m-warning";
                return `<span class="${className}">${scope.row.name}</span>`;
              }
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
            }],
          columnsOperation:{
            title: "操作",
            align: "center",
            buttons:[{
              label: "删除",
              size: "small",
              type: "text",
              methods:{
                click:(index, row)=>{

                }
              }
            },{
              label: "编辑",
              size: "small",
              type: "text",
              methods:{
                click:(index, row)=>{

                }
              }
            }]
          }
        }
      }
    },
    components: {
      "list-table": ListTable,
      'paper': Paper
    }
  }
</script>
