<template>
  <paper>
    <div class="elcard">
      <!-- 头部 -->
      <user-info-head :rowInfo="this.userData"></user-info-head>
      <!-- 下面都是表格里面的部分 -->
      <div class="projecttitle">
        <h3>项目列表</h3>
        <user-search @search-enter="enter"></user-search>
      </div>
      <full-table :data="data" :title="title" :page="page" :setting="setting" @size-change="sizeChange" @current-change="currentChange" :columnsOperation="columnsOperation"></full-table>
    </div>
  </paper>
</template>

<script>
  import UserInfoHead from '../../../component/header/userHeader.vue';
  import FullTable from 'components/awesome/full_table/FullTable.vue';
  import UserSearch from 'components/awesome/user_search/UserSearch.vue';
  import * as srv from '../../../api/service';

  export default{
    created() {
      // 请求头部需要的个人信息
      this.getUserInfo(this.$route.query.rowInfo);

      // 请求用户个人项目列表
      this.getUserProject(this.$route.query.rowInfo);
    },
    data() {
      return {
        userData: {
          type: Object,
          default() {
            return {};
          }
        },
        data:[],
        title:[
          {
            prop: 'projectName',
            label: '项目名称',
            type: 'operate',
            methods:{
              click:(index,row)=>{
                this.$router.push('/setting/user/project_detail/'+row.projectId);
                //this.$router.push({path: '/setting/user/project_detail', query:{projectId:row.projectId}})
              }
            }
          },
          {
            prop: 'projectId',
            label: '项目ID',
          },
          {
            prop: 'projectDesc',
            label: '项目描述',
          }
        ],
        page: {
          current: 1,
          size: 10,
          total: 0
        },
        project: {
          name: '',
          manager:'',
          desc: ''
        }
      }
    },
    methods: {
      enter(keywords) {
        this.loading = true;
        this.getUserProject(this.$route.query.rowInfo, keywords);
      },
      // 获取用户信息
      getUserInfo(id) {
        srv.requestUserInfo({userId: id}).then(data => {
          this.userData = data.result;
        })
      },
      // 请求用户个人的项目链表
      getUserProject(id, keywords="") {
        srv.requestUserProject({account: id, index: this.page.current, pageSize: this.page.size, keywords: keywords}).then(data => {
          this.data = data.result.info;
          this.page.total = data.result.total;
        })
      },
      currentChange(current) {
        this.page.current = current;
        this.getUserProject(this.$route.query.rowInfo);
      },
      sizeChange(size) {
        this.page.size = size;
        this.getUserProject(this.$route.query.rowInfo);
      }
    },
    components:{
      'user-info-head': UserInfoHead,
      'full-table':FullTable,
      'user-search': UserSearch
    }
  }
</script>

<style lang="less" scoped>
    .elcard {
      .projecttitle{
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
      .projiectoperation{
        text-align: left;
        margin-bottom: 10px;
      }
    }
</style>
