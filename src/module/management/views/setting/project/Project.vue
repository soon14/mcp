/**
* Created by CHENRC2 on 2017-7-20.
*/
<template>
  <section class="container">
    <whole-table ref="wt" :data="data"></whole-table>
    <router-view @hash.native.stop.prevent="hash"></router-view>
  </section>
</template>
<style lang="less" >
</style>
<script>
  import * as srv from '../../../api/service';
  import WholeTable from 'components/awesome/whole_table/WholeTable.vue';
  export default {
    data() {
      return {
        data:{
          title:"项目列表",
          tableSetting: {
            // selection: true
          },
          refreshMethod:this.getProjectList,
          tableTitle:[
            {
              prop: 'projectName',
              label: '项目名称',
              type: 'operate',
              methods:{
                click:(index,row)=>{
                  this.$store.dispatch('selectedProject',{ project: row });
                  this.$router.push('/setting/user/project_detail/'+row.projectId);
                }
              }
            },
            {
              prop: 'projectId',
              label: '项目ID',
            }
          ],
          columnsOperation:{
            title: "操作",
            align: "center",
            buttons:[
            //   {
            //   label: "删除",
            //   size: "small", 
            //   type: "text",
            //   methods:{
            //     click:(index, row)=>{
            //       this.projectDelete(row.projectId);
            //       // this.getData();
            //     }
            //   }
            // },
            {
              label: "编辑",
              size: "small",
              type: "text",
              methods:{
                click:(index, row)=>{
                  this.$router.push({ path:"/setting/project/add/"+index, query:{row:row}})
                }
              }
            }
            ]
          },
          titleButton:[
            {
              label: "添加",
              click: () => {
                this.$router.push("/setting/project/add/666");
              }
            },
            // {
            //   label: "删除",
            //   selectedControl:true,
            //   click: (selected) => {
            //     if (selected.length != 0) {
            //       this.selectedDatas = selected;
            //       console.log(selected);
            //       this.projectDelete();
            //     }
            //   }
            // }
          ]
        },
        selectedDatas: [],
        selectedDataId: []
      }
    },
    methods: {
      /**
       * 新增之后刷新列表的方法
       * */
      hash(data) {
        this.$refs.wt.getData();
      },

      /**
       *
       * 获取项目列表
       * */
      getProjectList(keywords="",current=1,size=10) {
        return srv.requestProjectList({index: current, pageSize: size, keywords: keywords}).then(data => {
          return data.result;
        });
      },
      /**
       * 删除项目
       * @param id
       */
      projectDelete(projectId) {
        this.$confirm('是否删除选中项，是否继续？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          if (!projectId) {
            for (var i = 0; i < this.selectedDatas.length; i++) {
              if (this.selectedDatas.indexOf(this.selectedDatas[i].projectId) == -1) {
                this.selectedDataId.push(this.selectedDatas[i].projectId)
              }
            }
          }
          let projectIdStrArr = projectId || this.selectedDataId.join(',');
          srv.requestDeleteProject({ "projectId": projectIdStrArr }).then(data => {
            if (data.errorCode == "200") {
              debugger
              if(data.result.success.length) {
                this.$notify({
                  type: 'success',
                  message: `删除成功${data.result.success.length}个`
                });
                // 刷新列表
                this.$refs.wt.getData();
              }
              else {
                this.$notify({
                  type: 'error',
                  message: '删除失败1'
                });
                // 刷新列表
                this.$refs.wt.getData();
              }
            }
            else {
              this.$notify({
                type: 'error',
                message: '删除失败2'
              });
            }
          });
        }).catch(() => {

        });
        // 无论成功不成功，都清空这个数组
        // 这里清空两个数组才是正确的
        this.selectedDataId = [];
      }
    },
    components: {
      "whole-table": WholeTable
    }
  }
</script>
