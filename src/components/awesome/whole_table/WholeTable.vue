/**
* Created by CHENRC2 on 2017-7-22.
*/
<template>
   <paper>
        <slot name="header"></slot>
        <div class="container-title" v-if="data.title">
          <son-title :headTitle="{'titleName':data.title}"></son-title>       
        </div>
        <el-row class="mb20" type="flex" justify="space-between">
          <el-col :span="20">
            <el-button class="w100" v-for="button in data.titleButton":size="button.size"
                       :type="button.type"
                       :disabled="button.singleControl?selected.length!==1:button.selectedControl?selected.length<=0:false"
                       @click="columnsButtonClick(button.click)">
              {{button.label}}</el-button>
          </el-col>
          <el-col :span="4">
            <user-search @search-enter="searchEnter" :value="keywords"></user-search>
          </el-col>
        </el-row>
        <el-row>
          <list-table :data="tableData" :loading="loading" :title="data.tableTitle" :setting="data.tableSetting" :columnsOperation="data.columnsOperation" @select="select"></list-table>
          <pagination :currentPage="page.current" :pageSize="page.size" :total="page.total" @size-change="sizeChange"  @current-change="currentChange" ></pagination>
        </el-row>
    </paper>
</template>
<style lang="less" scoped>
      .container-title {
        margin-top: 4px;
        font-size: 20px;
        h3 {
          font-weight: 400;
        }
      }
</style>
<script>
  import ListTable from '../list_table/ListTable.vue';
  import Pagination from '../pagination/Pagination.vue';
  import UserSearch from 'components/awesome/user_search/UserSearch.vue';
  import SonTitle from 'components/awesome/son_title/SonTitle.vue'
  export default{
    name: 'WholeTable',
    data() {
      return {
        tableData:[],
        loading:false,
        selected:[],
        keywords:"",
        page: {
          current: 1,
          size: 10,
          total: 0
        },
      }
    },
    created(){
      this.getData();
    },
    mounted () {

    },
    methods:{
      getData() {
        let that=this;
        that.loading=true;
        that.selected=[];
        this.data.refreshMethod(this.keywords, this.page.current, this.page.size).then(res => {
          that.page.total = res.total;
          that.tableData = res.info;
          that.loading = false;
        });
      },
      select(val){
        this.selected=val;
      },
      sizeChange(size){
        this.page.size = size;
        this.getData();
      },
      currentChange(current){
        this.page.current = current;
        this.getData();
      },
      searchEnter(keywords){
        this.keywords = keywords;
        this.page.current = 1;
        this.getData();
      },
      columnsButtonClick(method){
        method(this.selected);
      }
    },
    props: {
      data: {
        type: Object,
        default(){
          return {
            title:"标题",
            titleButton:[],
            refreshMethod:null,
            tableTitle:[],
            columnsOperation:{},
            tableSetting:{}
          };
        }
      }
    },
    components: {
      "list-table": ListTable,
      "pagination": Pagination,
      "user-search":UserSearch,
      "son-title": SonTitle
    }
  }
</script>
