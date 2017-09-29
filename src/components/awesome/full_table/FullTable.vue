/**
* Created by CHENRC2 on 2017-7-22.
*/
<template>
  <div class="ft-container">
    <div class="content">
      <list-table :data="data" :title="title" :setting="setting" :loading="loading" :columnsOperation="columnsOperation"></list-table>
    </div>
    <div class="footer">
      <pagination :currentPage="page.current" :pageSize="page.size" :total="page.total" @size-change="sizeChange"  @current-change="currentChange" ></pagination>
    </div>
  </div>
</template>
<style lang="less" scoped>

</style>
<script>
  import ListTable from '../list_table/ListTable.vue';
  import Pagination from '../pagination/Pagination.vue';

  export default{
    name: 'FullTable',
    data() {
      return {

      }
    },
    methods:{
      sizeChange(e){
        this.$emit('size-change',e);
      },
      currentChange(e){
        this.$emit('current-change',e);
      }
    },
    props: {
      data: {
        type: Array,
        default(){
            return [];
        }
      },
      loading: {
        type: Boolean,
        default: false
      },
      title: {
        type: Array,
        default(){
            return [];
        }
      },
      columnsOperation:{
        type: Object,
        default(){
          return {}
        }
      },
      setting: {
        type: Object,
        default(){
          return {};
        }
      },
      page:{
        currentPage:{
          type:Number,
          default:1
        },
        pageSize:{
          type: Number,
          default: 10
        },
        total:{
          type:Number,
          default:0
        }
      }
    },
    components: {
      "list-table": ListTable,
      "pagination": Pagination
    }
  }
</script>
