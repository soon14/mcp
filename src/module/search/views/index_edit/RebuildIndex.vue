<template>
  <section class="home-wrapper">
    <paper>
      <son-title :headTitle="headTitle"></son-title>
      <!--<div class="back">-->
        <!--<span @click="backBefore"><i class="mf mf-fanhui"></i>&nbsp;<span>返回</span></span>-->
      <!--</div>-->
      <!--<border-one-px style="margin: 10px 0;"></border-one-px>-->
      <div class="index-name">索引名称：{{rowData.index_name}}</div>
      <div class="desc">描述：{{rowData.desc}}</div>
      <div class="tri">
        <ul>
          <li>类型：{{rowData.process_type}}</li>
          <li>版本：{{rowData.version}}</li>
          <li>数量：{{rowData.count}}</li>
        </ul>
      </div>
      <div class="create-time">创建时间：{{rowData.create_time}}</div>
      <div class="update-time">更新时间：{{rowData.update_time}}</div>
      <div class="title">
        <h3>索引字段</h3>
        <border-one-px style="margin: 10px 0;"></border-one-px>
      </div>
      <div class="btn">
        <el-button @click="addNewOne">新增</el-button>
      </div>
      <div class="mask">
        <add-index-field ref="addBtn" :tableData="tableData" :isShow="isShow" @close-state="closeState" @get-form-data="getFormData"></add-index-field>
      </div>
      <full-table :data="tableRealData" :title="title" :page="page" :setting="tableSetting" @size-change="sizeChange" @current-change="currentChange" :columnsOperation="columnsOperation"></full-table>
      <border-one-px style="margin: 10px 0;"></border-one-px>
      <div class="btn-group">
        <el-button @click="backBefore">取消</el-button>
        <el-button type="primary" @click="sureRebuild" :disabled="buttonDisable">提交</el-button>
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
    .back{
      cursor: pointer;
    }
    .tri {
      overflow: hidden;
      ul {
        li {
          float: left;
          margin-right: 50px;
        }
      }
    }
    .title {
      margin-top: 16px;
      font-size: 16px;
    }
    .btn {
      padding: 10px 0 20px 0;
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
  import * as srv from '../../api/service';
  import {requestGetIndexList, requestRebuildIndex, requestSearchIndex} from '../../api/service';
  import FullTable from 'components/awesome/full_table/FullTable.vue';
  import Paper from 'components/awesome/paper/Paper.vue';
  import SonTitle from 'components/awesome/son_title/SonTitle.vue';
  import BorderOnePx from '../../common/components/BorderOnePx.vue';
  import addIndexField from './AddIndexField.vue';
  import utils from '../../common/js/utils.js';
  export default{
    data() {
      return {
        headTitle: {
          titleName: '重建索引', // 标题的名字
          isBack: true    // 是否显示返回上一步的骚操作，可不传
        },
        buttonDisable:true, // 控制提交button的disabled
        isShow: false, // 增加框的控制器
        tableRealData: [], // 表格显示的数据
        tableData: [], // 抓取的表格数据
        rowData: {},   // 头部数据
        tableSetting: {
          selection: false,
          index: true
        }, // 初始化表格的可选项和序号
        title: [
          {
            prop: 'field_name',
            label: '字段名称'
          },
          {
            prop: 'field_type',
            label: '类型'
          },
          {
            prop: 'format',
            label: '格式'
          },
          {
            prop: 'analyzer',
            label: '分词'
          },
          // {
          //   prop: 'create_time',
          //   label: '创建时间'
          // }
        ], // 配置表头
        columnsOperation:{
          title: "操作",
          align: "center",
          buttons:[{
            label: "删除",
            size: "small",
            type: "text",
            methods:{
              click:(index, row)=>{
                // 点击删除，就删除这条数据
                this.$confirm("确定删除该字段","提示",{
                  confirmButtonText: '是',
                  cancelButtonText: '否',
                  type: 'warning'
                }).then(() => {
                  let realIndex = 0;
                  if (this.page.current === undefined) {
                    realIndex = index;
                  } else {
                    realIndex = index + (this.page.current - 1) * this.page.size;
                  }
                  this.buttonDisable = false;
                  this.tableData.splice(realIndex, 1);
                  this.tableRealData.splice(index, 1);
                  this.pageBreak(this.page.current,this.page.size);
                  this.page.total--;
                }).catch(() => {

                });
              }
            }
          }]
        },
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
      // 重建索引数据请求
      updatePageData() {
        let sendData = this.formatSendData(this.tableData);
        let params = {
          "appid": "10001",
          "index_name": String(this.rowData.index_name),
          "mapping": sendData,
          "process_type": String(this.rowData.process_type),
          "desc": String(this.rowData.desc)
        };
        requestRebuildIndex(params).then(res => {
          if (res.msg == "ok" && res.errorCode == 0) {
            this.$notify({
              message: '修改成功',
              type: 'success'
            });
            this.$router.go(-1);
          } else {
            this.$notify.error({
              message: '修改失败'
            });
          }
        })
      },
      // 确认重建索引，提交页面
      sureRebuild() {
        this.$confirm("修改索引字段将清除原有数据，需要重新推送数据，是否继续提交修改？","提示",{
          confirmButtonText: '是',
          cancelButtonText: '否',
          type: 'warning'
        }).then(() => {
          this.updatePageData();
        }).catch(() => {

        });
      },
      // 从新增框里面传出来的值
      getFormData(formData) {
        this.buttonDisable = false;
        this.tableData.push(formData);
        this.tableRealData.push(formData);
        this.page.total++;
        this.pageBreak(this.page.current, this.page.size);
      },
      // 从新增框传出来控制显示隐藏的值
      closeState(val) {
        this.isShow = val;
      },
      // 抓取数据
      getIndexList() {
        let routerParams = this.$route.query;
        // 这里可以写点逻辑   if--else  如果是上一个页面有keywords带过来就请求requestSearchIndex这个接口
        // 如果没有keywords就请求requestGetIndexList这个接口
        if (routerParams.keywords != '' || routerParams.keywords) {
          let params1 = {"query_word": String(routerParams.keywords),"page": String(routerParams.fatherPage),"size": String(routerParams.fatherSize)};
          requestSearchIndex(params1).then(res => {
            if (res.errorCode == 0 && res.msg == 'ok') {
//              this.page.current = res.data.num; // 给分页器的当前页
              this.page.total = res.data.info[routerParams.index].field_list.length;   // 给分页器的总条数
              this.rowData = res.data.info[routerParams.index]; // field_list
              this.tableData = this.formatTableData(res.data.info[routerParams.index].field_list);
              this.pageBreak();
//              this.pageBreak(routerParams.fatherPage, routerParams.fatherSize);
            }
          })
        }
        else {
          let params = {
            "appid": "10001",
            "page": String(routerParams.fatherPage),      //从第几页开始
            "size": String(routerParams.fatherSize)       //每页查询多少条
          }
          requestGetIndexList(params).then(res => {
            if (res.errorCode == 0 && res.msg == 'ok') {
              this.page.current = res.data.num; // 给分页器的当前页
              // let realIndex = routerParams.index + routerParams.fatherSize * (routerParams.fatherPage - 1);
              this.page.total = res.data.info[routerParams.index].field_list.length;   // 给分页器的总条数
              this.rowData = res.data.info[routerParams.index]; // field_list
              this.tableData = this.formatTableData(res.data.info[routerParams.index].field_list);
              this.pageBreak(); // 赋值给  显示数据
            }
          })
        }
      },
      // 分页逻辑
      pageBreak(page=1, size=10) {
        let nowPageData = [];
        for ( var i = (page - 1) * size; i < page * size; i++ ) {
          if (this.tableData[i] !== undefined) {
            nowPageData.push(this.tableData[i]);
          }
        }
        this.tableRealData = nowPageData;
      },
      /**
       * 封装了一个去除不符合规格的参数
       * */
      formatSendData(dataArr) {
        let newArr = [];
        for(var i = 0; i < dataArr.length; i++) { // 遍历数组
          let newObj = {};
          for (var key in dataArr[i]) {  // 遍历对象
            if (dataArr[i][key] == 'false' || dataArr[i][key] == 'true') {
              newObj[key] = dataArr[i][key] ==="false" ? false : true;
            }
            else if(dataArr[i][key] == '') {}
            else {
              newObj[key] = dataArr[i][key];
            }
          }
          newArr.push(newObj);
        }
        return newArr;
      },
      /**
       * 封装了一个格式化表格数据的方法
       * @params dataArr, type:objArray
       * @return Array
       * */
      formatTableData(dataArr) {
        let newArr = [];
        for(var i = 0; i < dataArr.length; i++) {
          let newObj = {};
          for (var key in dataArr[i]) {
            if (typeof dataArr[i][key] != 'string') {
              newObj[key] = String(dataArr[i][key]);
            } else {
              newObj[key] = dataArr[i][key];
            }
          }
          newArr.push(newObj);
        }
        return newArr;
      },
      // 返回的逻辑
      backBefore() {
        this.$router.go(-1);
      },
      addNewOne() {
        this.$nextTick(() => {
          this.$refs.addBtn.refreshFormStatus();
        });
        this.isShow = true;
      },
      /**
       * 页码大小变
       */
      sizeChange(size) {
        this.page.size = size;
        this.pageBreak(this.page.current, size);
      },
      /**
       * 跳转页
       */
      currentChange(current) {
        this.page.current = current;
        this.pageBreak(current, this.page.size);
      }
    },
    components: {
      "full-table": FullTable,
      "son-title": SonTitle,
      "border-one-px": BorderOnePx,
      "add-index-field": addIndexField,
      "paper": Paper
    }
  }
</script>
