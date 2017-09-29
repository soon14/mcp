<template>
  <section class="home-wrapper">
    <paper>
      <div>
        <son-title :headTitle="headTitle"></son-title>
        <div class="btn">
          <el-button @click="addIndexRoute">新增</el-button>
          <user-search style="float: right;width: 20%;" @search-enter="searchEnter" :value="keywords"
                       :placeword="placewords"></user-search>
        </div>
        <div>
          <full-table :data="tableData" :title="title" :page="page" :setting="tableSetting" @size-change="sizeChange" @current-change="currentChange" :columnsOperation="columnsOperation" ref="search"></full-table>
        </div>
      </div>
    </paper>
  </section>
</template>
<style lang="less" scoped>
  .home-wrapper {
    width: 100%;
    height: 100%;
    font-size: 14px;
    line-height: 24px;
    .btn {
      padding-bottom: 20px;
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
  }
</style>
<script>
  import FullTable from 'components/awesome/full_table/FullTable.vue';
  import Paper from 'components/awesome/paper/Paper.vue';
  import UserSearch from 'components/awesome/user_search/UserSearch.vue';
  import SonTitle from 'components/awesome/son_title/SonTitle.vue';
  import * as srv from '../../api/service';
  export default{
    data() {
      return {
        headTitle: {
          titleName: '索引管理', // 标题的名字
          isBack: false    // 是否显示返回上一步的骚操作，可不传
        },
        placewords: '请输入索引名称', // 占位符的字
        keywords: "",  // 搜索框的字
        tableData: [], // 表格数据
        tableSetting: {
          selection: false,
          index: false
        }, // 初始化表格的可选项和序号
        title: [
          {
            prop: 'index_name',
            label: '索引名称',
            type: 'operate',
            methods: {
              click: (index, row) => {
                this.$router.push({
                  path: "/search/index_edit/rebuildindex/",
                  query: {
                    index: index,
                    fatherPage: this.page.current,
                    fatherSize: this.page.size,
                    keywords: this.keywords
                  }
                })
              }
            }
          },
          {
            prop: 'desc',
            label: '描述'
          },
          {
            prop: 'process_type',
            label: '类型'
          },
          {
            prop: 'appid',
            label: '开发者ID'
          },
          {
            prop: 'version',
            label: '版本'
          },
          {
            prop: 'count',
            label: '数量'
          },
          {
            prop: 'create_time',
            label: '创建时间'
          },
          {
            prop: 'update_time',
            label: '修改时间'
          }
        ], // 配置表头
        page: {
          current: 1,
          size: 10,
          total: 0
        } // 分页器选项
      }
    },
    created() {
      this.getIndexList();
    },
    methods: {
      // 搜索框的返回值
      searchEnter(keywords){
        this.keywords = keywords;
        this.page.current = 1;
        if (/^[a-z0-9_]+$/.test(keywords)) {
          this.getSearchIndex();
        } else {
          this.getIndexList();
        }
      },
      // 新增路由跳转
      addIndexRoute() {
        this.$router.push("/search/index_edit/createindex/");
      },
      // 搜索接口
      getSearchIndex() {
        let params = {
          "query_word": String(this.keywords),
          "page": String(this.page.current),
          "size": String(this.page.size)
        };
        srv.requestSearchIndex(params).then(res => {
          if (res.errorCode === 0 && res.msg === 'ok') {
            this.tableData = res.data.info;
            this.page.total = res.data.total;
          }
        })
      },
      // 获取索引列表
      getIndexList() {
        let parmas = {"page": String(this.page.current), "size": String(this.page.size)}
        srv.requestGetIndexList(parmas).then(res => {
          if (res.errorCode === 0 && res.msg === 'ok') {
            this.tableData = res.data.info;
            this.page.total = res.data.total;
          }
        });
      },
      /**
       * 页码大小变
       */
      sizeChange(size) {
        this.page.size = size;
        if (this.keywords !== '' || this.keywords) {
          this.getSearchIndex();
        } else {
          this.getIndexList();
        }
      },
      /**
       * 跳转页
       */
      currentChange(current) {
        this.page.current = current;
        if (this.keywords !== '' || this.keywords) {
          this.getSearchIndex();
        } else {
          this.getIndexList();
        }
      }
    },
    components: {
      "full-table": FullTable,
      "user-search": UserSearch,
      "son-title": SonTitle,
      "paper": Paper
    }
  }
</script>
