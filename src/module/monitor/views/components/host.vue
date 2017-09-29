<template>
  <div>
    <Paper>
      <div>
        <SonTitle :headTitle="headTitle"></SonTitle>
        <div class="action">
          <el-row>
            <a style="color: #20a0ff" >
              <el-button class="button is-info pull-left" @click="viewRules">
                查看全部报警规则</el-button></a>
            <el-button @click="loading" class="glyphicon glyphicon-refresh pull-left" style="margin: 0 10px" title="刷新">刷新</el-button>
            <el-select  filterable placeholder="导出报表" size="8" v-model="report" @change="exReport">
              <el-option :label='item.label' :value='item.value' v-for="item in reportData"></el-option>
            </el-select>
            <el-col style="float:right;width: 20%">
              <user-search @search-enter="searchHost" :placeword="placeword" v-model="keyword"></user-search>
            </el-col>
          </el-row>
        </div>
        <!--分页-->
        <section class="container" style="margin-top: 20px">
          <full-table :data="table.data" :title="table.title" :setting="table.setting" :columnsOperation="table.columnsOperation" :page="table.page" @size-change="sizeChange" @current-change="currentChange"></full-table>
        </section>
        <CreateRules :createRulesData="createRulesData" ref="createSon"></CreateRules>
      </div>
    </Paper>
  </div>
</template>

<script type="text/ecmascript-6">
  import {getHosts,getReports,getInt,getCpu,getMemory,getDisk,getAllGroups} from '../../api/service'
  import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button";
  import FullTable from 'components/awesome/full_table/FullTable.vue';
  import UserSearch from 'components/awesome/user_search/UserSearch.vue';
  import Through from 'components/utils/user_authorization/Through.vue'
  import SonTitle from 'components/awesome/son_title/SonTitle.vue'
  import Paper from 'components/awesome/paper/Paper.vue'
  import CreateRules from './CreateRules.vue'
  export default {
    components: {
      ElButton,
      Through,
      SonTitle,
      Paper,
      CreateRules,
      "full-table": FullTable,
      "user-search": UserSearch
    },
    data () {
      return ({
        headTitle: {
          titleName: '主机监控',
        },
        searchData:[],
        //搜索框
        placeword:"输入IP或主机名",
        //report
        report:'',
        reportData: [
          {label:'项目资源使用（周）报表导出',value:'项目资源使用（周）报表导出'},
          {label:'项目资源使用（月）报表导出',value:'项目资源使用（月）报表导出'}
        ],
        table: {
          setting: {
            selection: false
          },
          title: [
            {
              prop: "name",
              label:"主机名"
            },{
              prop: "region",
              label:"所在地域"
            },{
              prop: "public_ip",
              label:"公共IP"
            },{
              prop: "ipk",
              label:"私有IP"
            },{
              prop: "cpu",
              label:"CPU使用率"
            },{
              prop: "memory",
              label:"内存使用率"
            }],
          data: [],
          columnsOperation:{
            title: "操作",
            align: "center",
            width:'200px' ,
            buttons:[{
              label: "监控图表",
              size: "small",
              type: "text",
              methods:{
                click:(index, row)=>{
                  let ip = [];
                  for(let i=0,ii=Object.values(row.addresses)[0].length;i<ii;i++){
                    ip = ip.concat(Object.values(row.addresses)[0][i].addr);
                  }
                  let params = {
                    'type': 'disk',
                    'host_id': row.id
                  };
                  getDisk(params).then(data => {
                    var hdNameList = [];
                    for (let i=0,ii=data.length;i<ii;i++){
                      hdNameList = hdNameList.concat(data[i][1]);
                    }
                    window.sessionStorage.setItem("diskNameList",JSON.stringify(hdNameList));
                    this.diskNameList = hdNameList;
                  });
                  let params_s = {
                    'type': 'network',
                    'host_id': row.id
                  };
                  getDisk(params_s).then(data => {
                    let hdNameList = [];
                    for (let i = 0, ii = data.length; i < ii; i++) {
                      hdNameList = hdNameList.concat(data[i][1]);
                    }
                    window.sessionStorage.setItem("networkNameList", JSON.stringify(hdNameList));
                    this.$router.push({name: '监控图表', params: { id: row.id,name: row.name,created: row.created,ip:ip.toString() }});
                  })
                }
              }
            },{
              label: "创建报警规则",
              size: "small",
              type: "text",
              methods:{
                click:(index, row)=>{
                  this.createRulesData.create_show=true;
                  this.createRulesData.confirmFalse=false;
                  this.hostId = row.id;
                  this.createRulesData.ruleForm.example = row.name;
                  this.$refs.createSon.getDisklist(row.id);
                  this.$refs.createSon.getNic(row.id);
                }
              }
            }]
          },
          page: {
            current: 1,
            size: 10,
            total: 10
          }
        },
        confirmFalse:false,
        keyword: "",
        tableData: [{
          name:"",
          public_ip:"",
          ipk:"",
          cpu:"",
          memory:""
        }],
        oldTableData: [{
          name:"",
          public_ip:"",
          ipk:"",
          cpu:"",
          memory:""
        }],
        cpuData:"",
        memoryData:"",
        host_id_list:[],
        //浮层---------------------------
        createRulesData:{
          create_show:false,
          ruleForm: {
            product: '云服务器ECS',
            resource: '实例',
            example: '',
            name: '',
            ruleType: '',
            network:'',
            disk:'',
            value2:'',
            value3:'',
            time_item: '5m',
            moreThan_item:'gt',
            percentnum: '',
            numb:'1',
            numb1:'1',
            contact_select:[],
            type: ['邮件'],
          },
          new_contact:[],
          contact: [],
          rules: {
            product: [
              { required: true, message: '请选择产品', trigger: 'change' }
            ],
            resource: [
              { required: true, message: '请选择资源', trigger: 'change' }
            ],
            example: [
              { required: true, message: '请选择实例', trigger: 'change' }
            ],
            name: [
              { required: true, message: '请输入规则名称', trigger: 'blur' },
              { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
            ],
            ruleType: [
              { required: true, message: '请选择规则类型', trigger: 'change' }
            ],
            network: [
              { required: true, message: '请选择网卡', trigger: 'change' }
            ],
            disk: [
              { required: true, message: '请选择磁盘', trigger: 'change' }
            ],
            value2: [
              { required: true, message: '请选择上下行', trigger: 'change' }
            ],
            value3: [
              { required: true, message: '请选择读写', trigger: 'change' }
            ],
            time_item: [
              { required: true, message: '请选择时间', trigger: 'change' },
            ],
            moreThan_item: [
              { required: true, message: '请输入范围', trigger: 'change' },
            ],
            percentnum: [
              { required: true, message: '请输入数值', trigger: 'blur' }
            ],
            namb: [
              { required: true, message: '请选择次数', trigger: 'change' }
            ],
            contact_select: [
              { required: true, message: '请选择通知对象', trigger: 'blur' }
            ],
            type: [
              { type: 'array', required: true, message: '请至少选择一个通知方式', trigger: 'change' }
            ]
          },
          title:{
            ableAuthor: '联系人通知组',
            acceptAuthor: '已选联系组'
          },
          groupData: []
        }
      })
    },
    methods: {
      //获取主机信息
      getTableData_1 () {
        let params = {
          'project_id': JSON.parse(window.localStorage.project).projectId
        };
        getHosts(params).then(data => {
          for(let i=0,ii=data.length;i<ii;i++){
            this.$nextTick(function(){
              let ip = [];
              for(let j=0,jj=Object.values(data[i].addresses)[0].length;j<jj;j++){
                ip = ip.concat(Object.values(data[i].addresses)[0][j].addr);
              }
              this.$set(data[i], "ipk", ip.toString().replace(',', '<br/>'));
            });
            let params = {
              "host_id": data[i].id,
              "type": "cpu",
              "range": "10m"
            };
            getCpu(params).then(res => {
              this.$nextTick(function(){
                var cpuData = JSON.parse(res);
                var cpu_value="";
                var data_len = cpuData.length;
                if(data_len >= 1) {
                  cpu_value= cpuData[data_len - 1][1].toFixed(4) + "%";
                  this.$set(data[i], "cpu", cpu_value);
                  this.$set(data[i], "region", "深圳测试环境");
                  if(!data[i].public_ip){
                    this.$set(data[i], "public_ip", "暂无");
                  }
                }
              })
            });
            let params_m = {
              "host_id": data[i].id,
              "type": "memory",
              "range": "10m"
            };
            getMemory(params_m).then(res => {
              this.$nextTick(function(){
                var memoryData = JSON.parse(res);
                var memory_value="";
                var data_len = memoryData.length;
                if(data_len >= 1) {
                  memory_value= memoryData[data_len - 1][1].toFixed(4) + "%";
                  this.$set(data[i], "memory", memory_value);
                }
              });
            });
          }
          this.table.data = data.slice(0,this.table.page.size);
          this.oldTableData = data;
          //总页码
          this.Allpage();
        })
      },
      exReport(){
        if(this.report==="项目资源使用（周）报表导出"){
          this.weeklyReport ();
        }else if(this.report==="项目资源使用（月）报表导出"){
          this.monthlyReport ();
        }
        this.report=""
      },
      weeklyReport (){
        let projectName = JSON.parse(window.localStorage.project).projectName;
        let nowTime = new Date();
        let houTime = (new Date().getTime() - 7*86400000);
        let endTime = new Date(houTime);
        let ST = endTime.getFullYear().toString() + getInt(endTime.getMonth()+1) + getInt(endTime.getDate()).toString();
        let ET = nowTime.getFullYear().toString() + getInt(nowTime.getMonth()+1) + getInt(nowTime.getDate()).toString();
        // let theEndTime = nowTime.toLocaleDateString()+"T"+nowTime.toLocaleTimeString({ hour12: false })+"Z";
        let theEndTime = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+nowTime.getDate()+"T"+nowTime.getHours()+":"+nowTime.getMinutes()+":"+nowTime.getSeconds()+"Z";
        let startTime = endTime.getFullYear()+"-"+(endTime.getMonth()+1)+"-"+endTime.getDate()+"T"+endTime.getHours()+":"+endTime.getMinutes()+":"+endTime.getSeconds()+"Z";
        /*if(this.table.data.length!==''){*/
        this.$confirm('您确定要导出' + projectName +'_' + ST + '-' + ET + '.csv'+'项目资源使用（周）报表文件吗？', '项目资源使用（周）报表导出', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            'start': startTime,
            'end': theEndTime
          };
          getReports(params).then(response => {
            var blob = new window.Blob([response.data], {type:'application/csv'});
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            console.log(link.href)
            link.download = projectName +'_' + ST + '-' + ET + '.csv';
            // link.click(); // ie火狐不兼容
            if (!!window.ActiveXObject || "ActiveXObject" in window){
              window.navigator.msSaveBlob(blob, link.download);
            }else {
              var e = document.createEvent('MouseEvents');
              e.initEvent('click', false, false);
              link.dispatchEvent(e);
            }
            return false;
          })
          this.$notify({
            title: '提示',
            type: 'success',
            message: '正在导出!'
          });
        }).catch(() => {
          this.$notify({
            title: '提示',
            type: 'info',
            message: '已取消导出'
          });
        });


      },
      monthlyReport (){
        let projectName = JSON.parse(window.localStorage.project).projectName;
        let nowTime = new Date();
        let houTime = (new Date().getTime() - 30*86400000);
        let endTime = new Date(houTime);
        let ST = endTime.getFullYear().toString() + getInt(endTime.getMonth()+1) + getInt(endTime.getDate()).toString();
        let ET = nowTime.getFullYear().toString() + getInt(nowTime.getMonth()+1) + getInt(nowTime.getDate()).toString();
        let theEndTime = nowTime.getFullYear()+"-"+(nowTime.getMonth()+1)+"-"+nowTime.getDate()+"T"+nowTime.getHours()+":"+nowTime.getMinutes()+":"+nowTime.getSeconds()+"Z";
        let startTime = endTime.getFullYear()+"-"+(endTime.getMonth()+1)+"-"+endTime.getDate()+"T"+endTime.getHours()+":"+endTime.getMinutes()+":"+endTime.getSeconds()+"Z";
        this.$confirm('您确定要导出' + projectName +'_' + ST + '-' + ET + '.csv'+'项目资源使用（月）报表文件吗？', '项目资源使用（月）报表导出', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let params = {
            'start': startTime,
            'end': theEndTime
          };
          getReports(params).then(response => {
            var blob = new window.Blob([response.data], {type:'application/csv'});
            let link = document.createElement('a');
            link.href = window.URL.createObjectURL(blob);
            link.download = projectName +'_' + ST + '-' + ET + '.csv';
            // link.click(); // ie火狐不兼容
            if (!!window.ActiveXObject || "ActiveXObject" in window){
              window.navigator.msSaveBlob(blob, link.download);
            }else {
              var e = document.createEvent('MouseEvents');
              e.initEvent('click', false, false);
              link.dispatchEvent(e);
            }
            return false;
          })
          this.$notify({
            title: '提示',
            type: 'success',
            message: '正在导出!'
          });
        }).catch(() => {
          this.$notify({
            title: '提示',
            type: 'info',
            message: '已取消导出'
          });
        });
      },
      //模糊搜索
      searchHost() {
        let len = this.oldTableData.length;
        this.table.page.current = 1;
        let newdata = [];
        var str = this.keyword.replace(/(^\s*)|(\s*$)/g, "");
        for(let i = 0; i < len; i++){
          if(this.oldTableData[i].name.toLocaleLowerCase().indexOf(str.toLocaleLowerCase()) >= 0 || this.oldTableData[i].ipk.indexOf(str) >= 0){
            newdata = newdata.concat(this.oldTableData[i])
          }
        }
        if(newdata.length !==0){
          let lent = 0;
          if(newdata.length<this.table.page.size){
            lent = newdata.length
          }else {
            lent = this.table.page.size;
          }
          let singlePageData = [];
          for(let i = 0; i< lent; i++) {
            singlePageData = singlePageData.concat(newdata[i])
          }
          this.table.data = singlePageData;
          this.searchData = newdata;
        }else {
          this.table.data = "";
        }
        if(this.keyword===''){
          this.table.data = this.oldTableData
        }
        //总页码
        this.Allpage();
      },
      //总页码
      Allpage(){
        if(this.searchData.length!==0){
          this.table.page.total = this.searchData.length;
        }else {
          this.table.page.total = this.oldTableData.length;
        }
      },
      BackContamination(){
        this.table.data = this.oldTableData;
        this.keyword = '';
        //总页码
        this.table.page.total = this.oldTableData.length;
      },
      //刷新
      loading (){
        this.getTableData_1();
        //浮层
        this.init();
        this.getTableData();
        this.getAlarms();
      },
      viewRules(){
        this.$router.push({name: '报警规则'});
      },

      sizeChange(size){
        //每页条目
        this.table.page.size = size;
        this.table.data = this.oldTableData.slice((this.table.page.current - 1)*size,size * this.table.page.current);
        this.keyword = ''
      },
      currentChange(current){
        //页码
        this.table.page.current = current;
        if(this.searchData.length!==0){
          this.table.data = this.searchData.slice((current - 1)*this.table.page.size,this.table.page.size * current);
        }else {
          this.table.data = this.oldTableData.slice((current - 1)*this.table.page.size,this.table.page.size * current);
        }
      },
      //浮层
      init (){
        let params = {};
        getAllGroups(params).then(res => {
          let data = [];
          res.data.forEach((item, index) => {
            data.push({
              name: item.name,
              key: item.group_id,
              active: ''
            });
          });
          this.createRulesData.contact = data;
        }).catch(res => {
//          console.log('err获取所有报警联系组');
        });
      },
      getTableData () {
        let params = {
          'project_id': JSON.parse(window.localStorage.project).projectId
        };
        getHosts(params).then(data => {
          let hostName = [];
          for(let i=0,ii=data.length;i<ii;i++){
            hostName = hostName.concat({label:data[i].name,value:data[i].id})
          }
          this.example_options = hostName;
        })
      }
    },
    created (){
    },
    mounted (){
      this.getTableData_1();
      //浮层
      this.init();
      this.getTableData();
    }
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
  .titleSmall
    font-weight 200px
    font-size 16px
    margin-top 16px
    margin-bottom 10px
  .hr
    margin-top 0
    border  none
    border-top 1px solid #cecece
  .el-form-item
    margin 20px 0
  .table-with
    display inline

  .page-title
    margin-bottom 20px
    border-bottom 1px solid #cecece
    padding-top 8px
    padding-bottom 20px
    span
      padding-left 8px
      font-size 16px
      font-weight 600
      border-left 2px solid #21B8D5
      color #21B8D5
  .pull-right
    float right
</style>
