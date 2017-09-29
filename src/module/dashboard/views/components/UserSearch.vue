/**
* Created by CHENRC2 on 2017-7-25.
*/
<template>
    <section class="container">
      <el-card>
        <h3>搜索框示例</h3>
        <el-row>
          <el-col :span="8">
            <user-search @search-enter="searchEnter"></user-search>
          </el-col>
        </el-row>
      </el-card>
    </section>
</template>
<style lang="less" scoped>
  .container{
    margin: 20px;
  }
</style>
<script>
    import UserSearch from 'components/awesome/user_search/UserSearch.vue';
    export default{
      data() {
        return {};
      },
      methods:{
        searchEnter(value){
          // console.log(value);
        }
      },
      components:{
        "user-search": UserSearch
      }
    }
</script>
