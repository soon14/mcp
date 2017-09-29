<template>
  <div>
    <Paper>
      <SonTitle :headTitle="headTitle"></SonTitle>
      <table>
        <thead>
          <tr>
            <th colspan="6" class="thead">实例详情</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th class="thLeft">主机名</th>
            <td colspan="2">{{hostName}}</td>
            <th>主机ID</th>
            <td colspan="2">{{hostIdDetails}}</td>
          </tr>
          <tr>
            <th class="thLeft">所属地域</th>
            <td colspan="2">{{regionAddr}}</td>
            <th>创建时间</th>
            <td colspan="2">{{createTime}}</td>
          </tr>
          <tr>
            <th class="thLeft">公网IP</th>
            <td colspan="2">{{publicIp}}</td>
            <th>内网IP</th>
            <td colspan="2">{{privateIp}}</td>
          </tr>
          <tr>
            <th class="assist"></th>
            <th class="assist"></th>
            <th class="assist"></th>
            <th class="assist"></th>
            <th class="assist"></th>
            <th class="assist"></th>
          </tr>
        </tbody>
      </table>
      <!--<el-button type="primary">系统监控</el-button>-->
      <SonTitle :headTitle="systemTitle"></SonTitle>
      <el-button @click="createRules">创建报警规则</el-button>
      <!--<div class="chart">-->
      <div class="bnt">
        <el-button class="timeLag" style="margin-left: 0px" size="small" @click="funTime(0)">5分钟</el-button>
        <el-button class="timeLag" size="small" @click="funTime(1)">10分钟</el-button>
        <el-button class="timeLag" size="small" @click="funTime(2)" :autofocus="true">30分钟</el-button>
        <el-button class="timeLag" size="small" @click="funTime(3)">1小时</el-button>
        <el-button class="timeLag" size="small" @click="funTime(4)">6小时</el-button>
        <el-button class="timeLag" size="small" @click="funTime(5)">12小时</el-button>
        <el-button class="timeLag" size="small" @click="funTime(6)">1天</el-button>
        <el-button class="timeLag" size="small" @click="funTime(7)">7天</el-button>
        <el-button class="timeLag" size="small" @click="funTime(8)">15天</el-button>
        <el-button class="timeLag" size="small" @click="funTime(9)">30天</el-button>
      </div>
      <!--1=======2-->
      <p class="smallTitle" @click="funShowCPU" title="显示/隐藏" style="cursor:pointer;"><i class="el-icon-caret-right colorRed"></i>CPU/内存</p>
      <div class="line_chart"></div>
      <div v-show="showCPU">
        <div class="content">
          <div id="cpu" class="table-left" ></div>
        </div>
        <div class="content">
          <div id="memory" class="table-right"></div>
        </div>
      </div>
      <!--3=======6-->
      <p class="smallTitle" @click="funShowDisk" title="显示/隐藏" style="cursor:pointer;"><i class="el-icon-caret-right colorRed"></i>磁盘监控指标</p>
      <div class="line_chart"></div>
      <div v-show="showDisk">
        <div class="content">
          <div id="diskRead"  class="table-left"></div>
        </div>
        <div class="content">
          <div id="diskWrite"  class="table-right"></div>
        </div>
        <div class="content">
          <div id="diskReadIops"  class="table-left"></div>
        </div>
        <div class="content">
          <div id="diskWriteIops"  class="table-right"></div>
        </div>
      </div>
      <!--7=======10-->
      <p class="smallTitle" @click="funShowNetwork" title="显示/隐藏" style="cursor:pointer;"><i class="el-icon-caret-right colorRed"></i>网络监控指标</p>
      <div class="line_chart"></div>
      <div v-show="showNetwork">
        <div class="content">
          <div id="networkInRat"  class="table-left"></div>
        </div>
        <div class="content">
          <div id="networkOutRat"  class="table-right"></div>
        </div>
        <div class="content">
          <div id="networkInPackages"  class="table-left"></div>
        </div>
        <div class="content">
          <div id="networkOutPackages"  class="table-right"></div>
        </div>
      </div>
      <!--</div>-->
      <CreateRules :createRulesData="createRulesData" ref="createSon"></CreateRules>
    </Paper>
  </div>
</template>
<script type="text/ecmascript-6">
  import ElButton from "../../../../../node_modules/element-ui/packages/button/src/button"
  import echarts from 'echarts'
  import Through from 'components/utils/user_authorization/Through.vue'
  import SonTitle from 'components/awesome/son_title/SonTitle.vue'
  import CreateRules from './CreateRules.vue'
  import Paper from 'components/awesome/paper/Paper.vue'
  import {getCpu,getMemory,getDiskRead,getAllGroups} from '../../api/service'
  export default {
    components: {
        ElButton,
        Through,
        SonTitle,
        CreateRules,
        Paper
    },
    data () {
      return ({
        headTitle: {
          titleName: '',
          isBack: {
            type: Boolean,
            default: true
          }
        },
        systemTitle: {
          titleName: '系统监控'
        },
        confirmFalse:false,
        hostName:'',
        hostId:'',
        hostIdDetails:'',
        regionAddr:'',
        createTime:'',
        publicIp:'',
        privateIp:'',
        chart:null,
        showCPU:true,
        showDisk:true,
        showNetwork:true,
        valueList:[],
        color:[
          ['rgba(224,4,52, 0.3)','rgba(224,4,52, 0)','rgb(224,4,52)','rgba(224,4,52,0.27)'],
          ['rgba(27, 107, 155, 0.3)','rgba(27, 107, 155, 0)','rgb(27, 107, 155)','rgba(27, 107, 155,0.27)'],
          ['rgba(36, 144, 66, 0.3)','rgba(36, 144, 66, 0)','rgb(36, 144, 66)','rgba(36, 144, 66,0.27)'],
          ['rgba(239, 179, 4, 0.3)','rgba(239, 179, 4, 0)','rgb(239, 179, 4)','rgba(239, 179, 4,0.27)'],
          ['rgba(147, 67, 131, 0.3)','rgba(147, 67, 131, 0)','rgb(147, 67, 131)','rgba(147, 67, 131,0.27)'],
          ['rgba(266, 112, 60, 0.3)','rgba(266, 112, 60, 0)','rgb(266, 112, 60)','rgba(266, 112, 60,0.27)'],
          ['rgba(101, 188, 232, 0.3)','rgba(101, 188, 232, 0)','rgb(101, 188, 232)','rgba(101, 188, 232,0.27)'],
          ['rgba(224, 101, 152, 0.3)','rgba(224, 101, 152, 0)','rgb(224, 101, 152)','rgba(224, 101, 152,0.27)'],
          ['rgba(117, 160, 154, 0.3)','rgba(117, 160, 154, 0)','rgb(117, 160, 154)','rgba(117, 160, 154,0.27)'],
        ],
        showTime:'30m',
        timeArrayCpu:[],
        valueArrayCpu:[],
        timeArrayMemory:[],
        valueArrayMemory:[],
        diskNameList:[],
        timeArrayDiskRead:[],
        diskReadValue:[],
        seriesDiskRead:[],
        timeArrayDiskWrite:[],
        diskWriteValue:[],
        seriesDiskWrite:[],
        timeArrayDiskReadIops:[],
        diskReadIopsValue:[],
        seriesDiskReadIops:[],
        timeArrayDiskWriteIops:[],
        diskWriteIopsValue:[],
        seriesDiskWriteIops:[],
        networkNameList:[],
        timeArrayNetworkRead:[],
        networkReadValue:[],
        seriesNetworkRead:[],
        timeArrayNetworkWrite:[],
        networkWriteValue:[],
        seriesNetworkWrite:[],
        timeArrayNetworkReadIops:[],
        networkReadIopsValue:[],
        seriesNetworkReadIops:[],
        timeArrayNetworkWriteIops:[],
        networkWriteIopsValue:[],
        seriesNetworkWriteIops:[],
        diskLegend:'',
        networkLegend:'',

        //浮层
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
            type: ['邮件']
          },
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
              { required: true, message: '请选择规则类型', trigger: 'change' }
            ],
            disk: [
              { required: true, message: '请选择规则类型', trigger: 'change' }
            ],
            value2: [
              { required: true, message: '请选择上下行', trigger: 'change' }
            ],
            value3: [
              { required: true, message: '请选择读写', trigger: 'change' }
            ],
            time_item: [
              { required: true, message: '请输入时间', trigger: 'change' },
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
        },
      })
    },
    methods: {
      init(){
        this.diskNameList=JSON.parse(window.sessionStorage.getItem("diskNameList"));
        this.networkNameList=JSON.parse(window.sessionStorage.getItem("networkNameList"));
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

        });
        var changeTime = document.getElementsByClassName("timeLag");
        changeTime[2].className = "el-button timeLag el-button--default el-button--small current";
        //判断host_id是否存在
        if(this.$route.params.id === undefined){
          this.$router.push({name: '主机监控'});
        }
      },
      getDiskReadData(){
        let diskValueList=[];
        //取值
        for(let i=0,ii=this.diskNameList.length;i<ii;i++){
          let params = {
            'host_id': this.$route.params.id,
            'type':'disk.read.rate',
            'instance': this.diskNameList[i],
            'range':this.showTime
          };
          getDiskRead(params).then(res => {
            // this.$nextTick(function(){
            let cpuData = JSON.parse(res);
            let timeArr = [];
            let valueArr = [];
            for (let j=0,jj=cpuData.length;j<jj;j++){
              timeArr = timeArr.concat(new Date(cpuData[j][0]).toLocaleString());
              valueArr = valueArr.concat(cpuData[j][1]);
            }
            this.timeArrayDiskRead = timeArr;
            diskValueList[i] = valueArr;
            this.diskReadValue = diskValueList;
            this.getDiskReadSeries();
            this.getDiskLegend();
            let diskRead = {
              id:"diskRead",
              text:"磁盘读取字节数(B/s)",
              name:"Bps",
              legend:this.diskLegend,
              time:this.timeArrayDiskRead.map(function (str) {
                return str.replace(' ', '\n')
              }),
              series:this.seriesDiskRead
            };
            this.drawGraph(diskRead);
            // this.drawGraphDiskRead('diskRead')
            // });
          });
        }
      },
      getDiskWriteData(){
        let diskValueList=[];
        //取值
        for(let i=0,ii=this.diskNameList.length;i<ii;i++){
          let params = {
            'host_id': this.$route.params.id,
            'type':'disk.write.rate',
            'instance': this.diskNameList[i],
            'range':this.showTime
          };
          getDiskRead(params).then(res => {
            let cpuData = JSON.parse(res);
            let timeArr = [];
            let valueArr = [];
            for (let j=0,jj=cpuData.length;j<jj;j++){
              timeArr = timeArr.concat(new Date(cpuData[j][0]).toLocaleString());
              valueArr = valueArr.concat(cpuData[j][1]);
            }
            this.timeArrayDiskWrite = timeArr;
            diskValueList[i] = valueArr;
            this.diskWriteValue = diskValueList;
            this.getDiskWriteSeries();
            this.getDiskLegend();
            let diskWrite = {
              id:"diskWrite",
              text:"磁盘写入字节数(B/s)",
              name:"Bps",
              legend:this.diskLegend,
              time:this.timeArrayDiskWrite.map(function (str) {
                return str.replace(' ', '\n')
              }),
              series:this.seriesDiskWrite
            };
            this.drawGraph(diskWrite);
          });
        }
      },
      getDiskReadIopsData(){
        let diskValueList=[];
        //取值
        for(let i=0,ii=this.diskNameList.length;i<ii;i++){
          let params = {
            'host_id': this.$route.params.id,
            'type':'disk.read.ops',
            'instance': this.diskNameList[i],
            'range':this.showTime
          };
          getDiskRead(params).then(res => {
            let cpuData = JSON.parse(res);
            let timeArr = [];
            let valueArr = [];
            for (let j=0,jj=cpuData.length;j<jj;j++){
              timeArr = timeArr.concat(new Date(cpuData[j][0]).toLocaleString());
              valueArr = valueArr.concat(cpuData[j][1]);
            }
            this.timeArrayDiskReadIops = timeArr;
            diskValueList[i] = valueArr;
            this.diskReadIopsValue = diskValueList;
            this.getDiskReadIopSeries();
            this.getDiskLegend();
            let diskReadIops = {
              id:"diskReadIops",
              text:"磁盘读取请求数(ops)",
              name:"Count/s",
              legend:this.diskLegend,
              time:this.timeArrayDiskReadIops.map(function (str) {
                return str.replace(' ', '\n')
              }),
              series:this.seriesDiskReadIops
            };
            this.drawGraph(diskReadIops);
          });
        }
      },
      getDiskWriteIopsData(){
        let diskValueList=[];
        //取值
        for(let i=0,ii=this.diskNameList.length;i<ii;i++){
          let params = {
            'host_id': this.$route.params.id,
            'type':'disk.write.ops',
            'instance': this.diskNameList[i],
            'range':this.showTime
          };
          getDiskRead(params).then(res => {
            let cpuData = JSON.parse(res);
            let timeArr = [];
            let valueArr = [];
            for (let j=0,jj=cpuData.length;j<jj;j++){
              timeArr = timeArr.concat(new Date(cpuData[j][0]).toLocaleString());
              valueArr = valueArr.concat(cpuData[j][1]);
            }
            this.timeArrayDiskWriteIops = timeArr;
            diskValueList[i] = valueArr;
            this.diskWriteIopsValue = diskValueList;
            this.getDiskWriteIopSeries();
            this.getDiskLegend();
            let diskWriteIops = {
              id:"diskWriteIops",
              text:"磁盘写入请求数(ops)",
              name:"Count/s",
              legend:this.diskLegend,
              time:this.timeArrayDiskWriteIops.map(function (str) {
                return str.replace(' ', '\n')
              }),
              series:this.seriesDiskWriteIops
            };
            this.drawGraph(diskWriteIops);
          });
        }
      },

      getNetworkReadData(){
        let diskValueList=[];
        //取值
        for(let i=0,ii=this.networkNameList.length;i<ii;i++){
          let params = {
            'host_id': this.$route.params.id,
            'type':'network.downstream.traffic.rate',
            'instance': this.networkNameList[i],
            'range':this.showTime
          };
          getDiskRead(params).then(res => {
            var cpuData = JSON.parse(res);
            var timeArr = [];
            var valueArr = [];
            for (let j=0,jj=cpuData.length;j<jj;j++){
              timeArr = timeArr.concat(new Date(cpuData[j][0]).toLocaleString());
              valueArr = valueArr.concat(cpuData[j][1]);
            }
            this.timeArrayNetworkRead = timeArr;
            diskValueList[i] = valueArr;
            this.networkReadValue = diskValueList;
            this.getNetworkReadSeries();
            this.getNetworkLegend();
            let networkRead = {
              id:"networkInRat",
              text:"网络下行速率（B/s）",
              name:"bps",
              legend:this.networkLegend,
              time:this.timeArrayNetworkRead.map(function (str) {
                return str.replace(' ', '\n')
              }),
              series:this.seriesNetworkRead
            };
            this.drawGraph(networkRead);
          });
        }
      },
      getNetworkWriteData(){
        let diskValueList=[];
        //取值
        for(let i=0,ii=this.networkNameList.length;i<ii;i++){
          let params = {
            'host_id': this.$route.params.id,
            'type':'network.upstream.traffic.rate',
            'instance': this.networkNameList[i],
            'range':this.showTime
          };
          getDiskRead(params).then(res => {
            var cpuData = JSON.parse(res);
            var timeArr = [];
            var valueArr = [];
            for (let j=0,jj=cpuData.length;j<jj;j++){
              timeArr = timeArr.concat(new Date(cpuData[j][0]).toLocaleString());
              valueArr = valueArr.concat(cpuData[j][1]);
            }
            this.timeArrayNetworkWrite = timeArr;
            diskValueList[i] = valueArr;
            this.networkWriteValue = diskValueList;
            this.getNetworkWriteSeries();
            this.getNetworkLegend();
            let networkWrite = {
              id:"networkOutRat",
              text:"网络上行速率（B/s）",
              name:"bps",
              legend:this.networkLegend,
              time:this.timeArrayNetworkWrite.map(function (str) {
                return str.replace(' ', '\n')
              }),
              series:this.seriesNetworkWrite
            };
            this.drawGraph(networkWrite);
          });
        }
      },
      getNetworkReadIopsData(){
        let diskValueList=[];
        //取值
        for(let i=0,ii=this.networkNameList.length;i<ii;i++){
          let params = {
            'host_id': this.$route.params.id,
            'type':'network.downstream.packet.rate',
            'instance': this.networkNameList[i],
            'range':this.showTime
          };
          getDiskRead(params).then(res => {
            var cpuData = JSON.parse(res);
            var timeArr = [];
            var valueArr = [];
            for (let j=0,jj=cpuData.length;j<jj;j++){
              timeArr = timeArr.concat(new Date(cpuData[j][0]).toLocaleString());
              valueArr = valueArr.concat(cpuData[j][1]);
            }
            this.timeArrayNetworkReadIops = timeArr;
            diskValueList[i] = valueArr;
            this.networkReadIopsValue = diskValueList;
            this.getNetworkReadIopsSeries();
            this.getNetworkLegend();
            let networkReadIops = {
              id:"networkInPackages",
              text:"网络下行数据包(pps)",
              name:"pps",
              legend:this.networkLegend,
              time:this.timeArrayNetworkReadIops.map(function (str) {
                return str.replace(' ', '\n')
              }),
              series:this.seriesNetworkReadIops
            };
            this.drawGraph(networkReadIops);
          });
        }
      },
      getNetworkWriteIopsData(){
        let diskValueList=[];
        //取值
        for(let i=0,ii=this.networkNameList.length;i<ii;i++){
          let params = {
            'host_id': this.$route.params.id,
            'type':'network.upstream.packet.rate',
            'instance': this.networkNameList[i],
            'range':this.showTime
          };
          getDiskRead(params).then(res => {
            var cpuData = JSON.parse(res);
            var timeArr = [];
            var valueArr = [];
            for (let j=0,jj=cpuData.length;j<jj;j++){
              timeArr = timeArr.concat(new Date(cpuData[j][0]).toLocaleString());
              valueArr = valueArr.concat(cpuData[j][1]);
            }
            this.timeArrayNetworkWriteIops = timeArr;
            diskValueList[i] = valueArr;
            this.networkWriteIopsValue = diskValueList;
            this.getNetworkWriteIopsSeries();
            this.getNetworkLegend();
            let networkWriteIops = {
              id:"networkOutPackages",
              text:"网络上行数据包(pps)",
              name:"pps",
              legend:this.networkLegend,
              time:this.timeArrayNetworkWriteIops.map(function (str) {
                return str.replace(' ', '\n')
              }),
              series:this.seriesNetworkWriteIops
            };
            this.drawGraph(networkWriteIops);
          });
        }
      },

      //取series
      getDiskReadSeries(){
        var series=[];
        for (let i = 0, ii = this.diskNameList.length; i < ii; i++) {
          let temp = [{
            name: this.diskNameList[i],
            type: 'line',
            smooth: true, //平滑曲线
            symbol: 'circle', //鼠标标记图形
            symbolSize: 5, //鼠标标记图形大小
            showSymbol: false, //显示标记点
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: { //面积
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: this.color[i][0],
                }, {
                  offset: 0.8,
                  color: this.color[i][1]
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: { //折线的拐点样式
              normal: {
                color: this.color[i][2],
                borderColor: this.color[i][3],
                borderWidth: 12
              }
            },
            data: this.diskReadValue[i]
          }];
          series = series.concat(temp)
        }
        this.seriesDiskRead = series;
      },
      getDiskWriteSeries(){
        var series=[];
        for (let i = 0, ii = this.diskNameList.length; i < ii; i++) {
          let temp = [{
            name: this.diskNameList[i],
            type: 'line',
            smooth: true, //平滑曲线
            symbol: 'circle', //鼠标标记图形
            symbolSize: 5, //鼠标标记图形大小
            showSymbol: false, //显示标记点
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: { //面积
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: this.color[i][0],
                }, {
                  offset: 0.8,
                  color: this.color[i][1]
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: { //折线的拐点样式
              normal: {
                color: this.color[i][2],
                borderColor: this.color[i][3],
                borderWidth: 12
              }
            },
            data: this.diskWriteValue[i]
          }];
          ;
          series = series.concat(temp)
        }
        this.seriesDiskWrite = series;
      },
      getDiskReadIopSeries(){
        var series=[];
        for (let i = 0, ii = this.diskNameList.length; i < ii; i++) {
          let temp = [{
            name: this.diskNameList[i],
            type: 'line',
            smooth: true, //平滑曲线
            symbol: 'circle', //鼠标标记图形
            symbolSize: 5, //鼠标标记图形大小
            showSymbol: false, //显示标记点
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: { //面积
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: this.color[i][0],
                }, {
                  offset: 0.8,
                  color: this.color[i][1]
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: { //折线的拐点样式
              normal: {
                color: this.color[i][2],
                borderColor: this.color[i][3],
                borderWidth: 12
              }
            },
            data: this.diskReadIopsValue[i]
          }];
          series = series.concat(temp)
        }
        this.seriesDiskReadIops = series;
      },
      getDiskWriteIopSeries(){
        var series=[];
        for (let i = 0, ii = this.diskNameList.length; i < ii; i++) {
          let temp = [{
            name: this.diskNameList[i],
            type: 'line',
            smooth: true, //平滑曲线
            symbol: 'circle', //鼠标标记图形
            symbolSize: 5, //鼠标标记图形大小
            showSymbol: false, //显示标记点
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: { //面积
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: this.color[i][0],
                }, {
                  offset: 0.8,
                  color: this.color[i][1]
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: { //折线的拐点样式
              normal: {
                color: this.color[i][2],
                borderColor: this.color[i][3],
                borderWidth: 12
              }
            },
            data: this.diskWriteIopsValue[i]
          }];
          series = series.concat(temp)
        }
        this.seriesDiskWriteIops = series;
      },

      getNetworkReadSeries(){
        var series=[];
        for (let i = 0, ii = this.networkNameList.length; i < ii; i++) {
          let temp = [{
            name: this.networkNameList[i],
            type: 'line',
            smooth: true, //平滑曲线
            symbol: 'circle', //鼠标标记图形
            symbolSize: 5, //鼠标标记图形大小
            showSymbol: false, //显示标记点
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: { //面积
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: this.color[i][0],
                }, {
                  offset: 0.8,
                  color: this.color[i][1]
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: { //折线的拐点样式
              normal: {
                color: this.color[i][2],
                borderColor: this.color[i][3],
                borderWidth: 12
              }
            },
            data: this.networkReadValue[i]
          }];
          series = series.concat(temp)
        }
        this.seriesNetworkRead = series;
      },
      getNetworkWriteSeries(){
        var series=[];
        for (let i = 0, ii = this.networkNameList.length; i < ii; i++) {
          let temp = [{
            name: this.networkNameList[i],
            type: 'line',
            smooth: true, //平滑曲线
            symbol: 'circle', //鼠标标记图形
            symbolSize: 5, //鼠标标记图形大小
            showSymbol: false, //显示标记点
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: { //面积
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: this.color[i][0],
                }, {
                  offset: 0.8,
                  color: this.color[i][1]
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: { //折线的拐点样式
              normal: {
                color: this.color[i][2],
                borderColor: this.color[i][3],
                borderWidth: 12
              }
            },
            data: this.networkWriteValue[i]
          }];
          series = series.concat(temp)
        }
        this.seriesNetworkWrite = series;
      },
      getNetworkReadIopsSeries(){
        var series=[];
        for (let i = 0, ii = this.networkNameList.length; i < ii; i++) {
          let temp = [{
            name: this.networkNameList[i],
            type: 'line',
            smooth: true, //平滑曲线
            symbol: 'circle', //鼠标标记图形
            symbolSize: 5, //鼠标标记图形大小
            showSymbol: false, //显示标记点
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: { //面积
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: this.color[i][0],
                }, {
                  offset: 0.8,
                  color: this.color[i][1]
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: { //折线的拐点样式
              normal: {
                color: this.color[i][2],
                borderColor: this.color[i][3],
                borderWidth: 12
              }
            },
            data: this.networkReadIopsValue[i]
          }];
          series = series.concat(temp)
        }
        this.seriesNetworkReadIops = series;
      },
      getNetworkWriteIopsSeries(){
        var series=[];
        for (let i = 0, ii = this.networkNameList.length; i < ii; i++) {
          let temp = [{
            name: this.networkNameList[i],
            type: 'line',
            smooth: true, //平滑曲线
            symbol: 'circle', //鼠标标记图形
            symbolSize: 5, //鼠标标记图形大小
            showSymbol: false, //显示标记点
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: { //面积
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: this.color[i][0],
                }, {
                  offset: 0.8,
                  color: this.color[i][1]
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: { //折线的拐点样式
              normal: {
                color: this.color[i][2],
                borderColor: this.color[i][3],
                borderWidth: 12
              }
            },
            data: this.networkWriteIopsValue[i]
          }];
          series = series.concat(temp)
        }
        this.seriesNetworkWriteIops = series;
      },
      //取legend
      getDiskLegend(){
        let selected=[];
        for (let i = 0, ii = this.diskNameList.length; i < ii; i++) {
          var temp = `this.diskNameList[i]:true`;
          selected = selected.concat(temp)
        }
        var legend={
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: this.diskNameList,
          selected: selected,
          right: '4%',
          bottom: '2%',
          textStyle: {
            fontSize: 12,
            color: '#62c0e0'
          }
        };
        this.diskLegend = legend;
      },
      getNetworkLegend(){
        let selected=[];
        for (let i = 0, ii = this.networkNameList.length; i < ii; i++) {
          var temp = `this.networkNameList[i]:true`;
          selected = selected.concat(temp)
        }
        var legend={
          icon: 'rect',
          itemWidth: 14,
          itemHeight: 5,
          itemGap: 13,
          data: this.networkNameList,
          selected: selected,
          right: '4%',
          bottom: '2%',
          textStyle: {
            fontSize: 12,
            color: '#62c0e0'
          }
        };
        this.networkLegend = legend;
      },
      //获取详情数据
      getDetails (){
        this.hostName = this.$route.params.name;
        this.headTitle.titleName = this.$route.params.name;
        this.hostIdDetails= this.$route.params.id;
        this.regionAddr='深圳测试环境';
        this.createTime = new Date(this.$route.params.created).toLocaleString();
        this.publicIp = '';
        this.privateIp = this.$route.params.ip;
      },
      //获取数据
      getCpuData (){
        let params = {
          "host_id":this.$route.params.id,
          "type":"cpu",
          "range":this.showTime
        };
        getCpu(params).then(res => {
          let cpuData = JSON.parse(res);
          let timeArr = [];
          let valueArr = [];
          for (let i=0,ii=cpuData.length;i<ii;i++){
            timeArr = timeArr.concat(new Date(cpuData[i][0]).toLocaleString());
            valueArr = valueArr.concat(cpuData[i][1]);
          }
          this.timeArrayCpu = timeArr;
          this.valueArrayCpu = valueArr;
          this.cpuChart.setOption({
            legend: {
              selected: {'cpu_user':true},
            },
            xAxis: [{ //X轴
              data: this.timeArrayCpu.map(function (str) {
                return str.replace(' ', '\n')
              }),
            }],
            series: [{
              data: this.valueArrayCpu
            } ]
          })
        });
      },
      getMemoryData (){
        let params = {
          "host_id":this.$route.params.id,
          "type":"memory",
          "range":this.showTime
        };
        getMemory(params).then(res => {
          let memoryData = JSON.parse(res);
          let timeArr = [];
          let valueArr = [];
          for (let i=0;i<memoryData.length;i++){
            timeArr = timeArr.concat(new Date(memoryData[i][0]).toLocaleString());
            valueArr = valueArr.concat(memoryData[i][1]);
          }
          this.timeArrayMemory = timeArr;
          this.valueArrayMemory = valueArr;
          this.memorychart.setOption({
            legend: {
              selected: {'memory_rate':true},
            },
            xAxis: [{ //X轴
              data: this.timeArrayMemory.map(function (str) {
                return str.replace(' ', '\n')
              }),
            }],
            series: [{
              data: this.valueArrayMemory
            } ]
          })
        })
      },
      // 绘图
      drawGraphCpu(id) {
        this.cpuChart = echarts.init(document.getElementById(id));
        this.cpuChart.showLoading();
        //set
        try{
          this.cpuChart.setOption({
            //option的配置开始
            title: { //标题
              text: 'CPU使用率',
              padding:[15,5],
              x: 'center',
              textStyle: {
                fontWeight: 600,
                fontSize: 16,
                color: '#0099cc'
              },
            },
            tooltip: { //提示
              trigger: 'axis',
              axisPointer: {
                lineStyle: {
                  color: '#57617B'
                }
              },
              textStyle: {
                fontWeight: 200,
                fontSize: 8,
                color: '#fff'
              }
            },
            legend: {  //图例
              //selectedMode:false,//图例开关关闭
              icon: 'rect',
              itemWidth: 14,
              itemHeight: 5,
              itemGap: 13,
              data: ['cpu_user'],
              selected: {'cpu_user':true},
              right: '4%',
              bottom: '2%',
              textStyle: {
                fontSize: 12,
                color: '#62c0e0'
              }
            },
            grid: { //绘制位置
              left: '10%',
              right: '15%',
              bottom: '20%',
              containLabel: true
            },
            xAxis: [{ //X轴
              type: 'category',
              boundaryGap: false,
              axisLine: { //轴线
                lineStyle: {
                  color: '#0099cc'
                }
              },
              data: this.timeArrayCpu.map(function (str) {
                return str.replace(' ', '\n')
              }),
            }],
            yAxis: [{ //Y轴
              type: 'value',
              name: '%',
              axisTick: {
                show: false
              },
              axisLine: {  //轴线
                lineStyle: {
                  color: '#0099cc'
                }
              },
              axisLabel: { //文字距离Y轴
                margin: 10,
                textStyle: {
                  fontSize: 14
                }
              },
              splitLine: { //栅格线
                lineStyle: {
                  color: '#e9e8e8'
                }
              }
            }],
            //系列配置
            series: [{
              name: 'cpu_user',
              type: 'line',
              smooth: true, //平滑曲线
              symbol: 'circle', //鼠标标记图形
              symbolSize: 5, //鼠标标记图形大小
              showSymbol: false, //显示标记点
              lineStyle: {
                normal: {
                  width: 1
                }
              },
              areaStyle: { //面积
                normal: {
                  color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                    offset: 0,
                    color: 'rgba(224,4,52, 0.3)'
                  }, {
                    offset: 0.8,
                    color: 'rgba(224,4,52, 0)'
                  }], false),
                  shadowColor: 'rgba(0, 0, 0, 0.1)',
                  shadowBlur: 10
                }
              },
              itemStyle: { //折线的拐点样式
                normal: {
                  color: 'rgb(224,4,52)',
                  borderColor: 'rgba(224,4,52,0.27)',
                  borderWidth: 12
                }
              },
              data: this.valueArrayCpu
            } ]
            // 以上为option的配置结束
          })
        } catch(e) {
          console.log(e+"CPU");
        }
        this.cpuChart.hideLoading()
      },
      drawGraphMemory(id) {
        this.memorychart = echarts.init(document.getElementById(id));
        this.memorychart.showLoading();
        //set
        this.memorychart.setOption({
          //option的配置开始
          title: { //标题
            text: '内存使用率',
            padding:[15,5],
            x: 'center',
            textStyle: {
              fontWeight: 600,
              fontSize: 16,
              color: '#0099cc'
            },
            /*left: '6%'*/
          },
          tooltip: { //提示
            trigger: 'axis',
            axisPointer: {
              lineStyle: {
                color: '#57617B'
              }
            },
            textStyle: {
              fontWeight: 200,
              fontSize: 8,
              color: '#fff'
            },
          },
          legend: {  //图例
            icon: 'rect',
            itemWidth: 14,
            itemHeight: 5,
            itemGap: 13,
            data: ['memory_rate'],
            selected: {'memory_rate':true},
            right: '4%',
            bottom: '2%',
            textStyle: {
              fontSize: 12,
              color: '#62c0e0'
            }
          },
          grid: { //绘制位置
            left: '10%',
            right: '15%',
            bottom: '20%',
            containLabel: true
          },
          xAxis: [{ //X轴
            type: 'category',
            boundaryGap: false,
            axisLine: { //轴线
              lineStyle: {
                color: '#0099cc'
              }
            },
            data: this.timeArrayMemory.map(function (str) {
              return str.replace(' ', '\n')
            }),
          }],
          yAxis: [{ //Y轴
            type: 'value',
            name: '%',
            axisTick: {
              show: false
            },
            axisLine: {  //轴线
              lineStyle: {
                color: '#0099cc'
              }
            },
            axisLabel: { //文字距离Y轴
              margin: 10,
              textStyle: {
                fontSize: 14
              }
            },
            splitLine: { //栅格线
              lineStyle: {
                color: '#e9e8e8'
              }
            }
          }],
          series: [{
            name: 'memory_rate',
            type: 'line',
            smooth: true, //平滑曲线
            symbol: 'circle', //鼠标标记图形
            symbolSize: 5, //鼠标标记图形大小
            showSymbol: false, //显示标记点
            lineStyle: {
              normal: {
                width: 1
              }
            },
            areaStyle: { //面积
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                  offset: 0,
                  color: 'rgba(224,4,52, 0.3)'
                }, {
                  offset: 0.8,
                  color: 'rgba(224,4,52, 0)'
                }], false),
                shadowColor: 'rgba(0, 0, 0, 0.1)',
                shadowBlur: 10
              }
            },
            itemStyle: { //折线的拐点样式
              normal: {
                color: 'rgb(224,4,52)',
                borderColor: 'rgba(224,4,52,0.27)',
                borderWidth: 12

              }
            },
            data: this.valueArrayMemory
          } ]
          // 以上为option的配置结束
        })
        this.memorychart.hideLoading()
      },
      // 磁盘网卡绘图
      drawGraph(params) {
        this.chart = echarts.init(document.getElementById(params.id));
        this.chart.showLoading();
        //set
        this.chart.setOption({
          //option的配置开始
          baseOption: {
            title: { //标题
              text: params.text, // '磁盘读取字节数(B/s)'
              padding: [15, 5],
              x: 'center',
              textStyle: {
                fontWeight: 600,
                fontSize: 16,
                color: '#0099cc'
              },
            },
            tooltip: { //提示
              trigger: 'axis',
              axisPointer: {
                lineStyle: {
                  color: '#57617B'
                }
              },
              textStyle: {
                fontWeight: 200,
                fontSize: 8,
                color: '#fff'
              },
            },
            legend: params.legend,
            grid: { //绘制位置
              left: '10%',
              right: '15%',
              bottom: '20%',
              containLabel: true
            },
            xAxis: [{ //X轴
              type: 'category',
              boundaryGap: false,
              axisLine: { //轴线
                lineStyle: {
                  color: '#0099cc'
                }
              },
              data: params.time
            }],
            yAxis: [{ //Y轴
              type: 'value',
              name: params.name, // 'Bps',
              axisTick: {
                show: false
              },
              axisLine: {  //轴线
                lineStyle: {
                  color: '#0099cc'
                }
              },
              axisLabel: { //文字距离Y轴
                margin: 10,
                textStyle: {
                  fontSize: 14
                }
              },
              splitLine: { //栅格线
                lineStyle: {
                  color: '#e9e8e8'
                }
              }
            }],
            series: params.series
            // 以上为option的配置结束
          }
        });
        this.chart.hideLoading()
      },
      drawChart(){
        //磁盘读取
        let diskRead = {
          id:"diskRead",
          text:"磁盘读取字节数(B/s)",
          name:"Bps",
          legend:this.diskLegend,
          time:this.timeArrayDiskRead.map(function (str) {
            return str.replace(' ', '\n')
          }),
          series:this.seriesDiskRead
        };
        this.drawGraph(diskRead);
        //磁盘写入
        let diskWrite = {
          id:"diskWrite",
          text:"磁盘写入字节数(B/s)",
          name:"Bps",
          legend:this.diskLegend,
          time:this.timeArrayDiskWrite.map(function (str) {
            return str.replace(' ', '\n')
          }),
          series:this.seriesDiskWrite
        };
        this.drawGraph(diskWrite);
        //磁盘读取iops
        let diskReadIops = {
          id:"diskReadIops",
          text:"磁盘读取请求数(ops)",
          name:"Count/s",
          legend:this.diskLegend,
          time:this.timeArrayDiskReadIops.map(function (str) {
            return str.replace(' ', '\n')
          }),
          series:this.seriesDiskReadIops
        };
        this.drawGraph(diskReadIops);
        //磁盘写入iops
        let diskWriteIops = {
          id:"diskWriteIops",
          text:"磁盘写入请求数(ops)",
          name:"Count/s",
          legend:this.diskLegend,
          time:this.timeArrayDiskWriteIops.map(function (str) {
            return str.replace(' ', '\n')
          }),
          series:this.seriesDiskWriteIops
        };
        this.drawGraph(diskWriteIops);
        //
        let networkRead = {
          id:"networkInRat",
          text:"网络下行速率（B/s）",
          name:"bps",
          legend:this.networkLegend,
          time:this.timeArrayNetworkRead.map(function (str) {
            return str.replace(' ', '\n')
          }),
          series:this.seriesNetworkRead
        };
        this.drawGraph(networkRead);
        //
        let networkWrite = {
          id:"networkOutRat",
          text:"网络上行速率（B/s）",
          name:"bps",
          legend:this.networkLegend,
          time:this.timeArrayNetworkWrite.map(function (str) {
            return str.replace(' ', '\n')
          }),
          series:this.seriesNetworkWrite
        };
        this.drawGraph(networkWrite);
        //
        let networkReadIops = {
          id:"networkInPackages",
          text:"网络下行数据包(pps)",
          name:"pps",
          legend:this.networkLegend,
          time:this.timeArrayNetworkReadIops.map(function (str) {
            return str.replace(' ', '\n')
          }),
          series:this.seriesNetworkReadIops
        };
        this.drawGraph(networkReadIops);
        //
        let networkWriteIops = {
          id:"networkOutPackages",
          text:"网络上行数据包(pps)",
          name:"pps",
          legend:this.networkLegend,
          time:this.timeArrayNetworkWriteIops.map(function (str) {
            return str.replace(' ', '\n')
          }),
          series:this.seriesNetworkWriteIops
        };
        this.drawGraph(networkWriteIops);
      },
      //显示隐藏
      funShowCPU(){
        this.showCPU = !this.showCPU;
      },
      funShowDisk(){
        this.showDisk = !this.showDisk;
      },
      funShowNetwork(){
        this.showNetwork = !this.showNetwork;
      },
      //时间切换
      funTime(index){
        if(index===0){
          this.showTime = '5m';
        }else if(index===1){
          this.showTime = '10m';
        }else if(index===2){
          this.showTime = '30m';
        }else if(index===3){
          this.showTime = '60m';
        }else if(index===4){
          this.showTime = '6h';
        }else if(index===5){
          this.showTime = '12h';
        }else if(index===6){
          this.showTime = '24h';
        }else if(index===7){
          this.showTime = '7d';
        }else if(index===8){
          this.showTime = '15d';
        }else if(index===9){
          this.showTime = '30d';
        }
        this.showCPU = true;
        this.showDisk = true;
        this.showNetwork = true;
        this.getCpuData();
        this.getMemoryData();
        this.getDiskReadData();
        this.getDiskWriteData();
        this.getDiskReadIopsData();
        this.getDiskWriteIopsData();
        this.getNetworkReadData();
        this.getNetworkWriteData();
        this.getNetworkReadIopsData();
        this.getNetworkWriteIopsData();
        var changeTime = document.getElementsByClassName("timeLag");
        for(var i = 0, ii=changeTime.length; i< ii; i++) {
          changeTime[i].className = "el-button timeLag el-button--default el-button--small";
        }
        changeTime[index].className = "el-button timeLag el-button--default el-button--small current";
      },
      //浮层
      createRules(){
        this.createRulesData.create_show=true;
        this.confirmFalse=false;
        this.hostId = this.$route.params.id;
        this.createRulesData.ruleForm.example = this.$route.params.name;
        this.$refs.createSon.getDisklist(this.$route.params.id);
        this.$refs.createSon.getNic(this.$route.params.id);
      }
    },
    created (){
    },
    mounted() {
      //浮层
      this.drawGraphCpu('cpu');
      this.drawGraphMemory('memory');
      this.drawChart();

      this.init();
      this.getDetails();
      this.getCpuData();
      this.getMemoryData();
      this.getDiskReadData();
      this.getDiskWriteData();
      this.getDiskReadIopsData();
      this.getDiskWriteIopsData();
      this.getNetworkReadData();
      this.getNetworkWriteData();
      this.getNetworkReadIopsData();
      this.getNetworkWriteIopsData();
    },
  }
</script>

<style lang="stylus" rel="stylesheet/stylus" scoped="scoped">
  table
    width 100%
    border-collapse separate
    /*table-layout fixed*/
    thead
      tr
        .thead
          border-top 1px solid #cecece
          border-left 1px solid #cecece
          border-right 1px solid #cecece
          height 40px
          line-height 40px
          font-weight 700
          font-size 16px
          text-align center
          background-color #f6f6f6
    tbody
      tr
        .thLeft
          border-left 1px solid #cecece
        th,td
          width 16%
          height 40px
          line-height 40px
          padding-left 20px
          padding-right 20px
          border-right 1px solid #cecece
          border-bottom 1px solid #cecece
          white-space nowrap
          overflow hidden
          text-overflow ellipsiss
        th
          font-weight 700
          text-align left
        .assist
          border transparent
  .bnt
    margin-top 20px
    .timeLag
      margin-left 8px
      width 75px
  .current
    color: #21B8D5;
    border-color: #21B8D5;
  .smallTitle
    font-size 14px
    font-weight 700
    margin-top 40px
    clear both
  .table-left
    height 320px
    width 46%
    border 1px solid #cecece
    float left
    margin-right 20px
    margin-bottom 40px
  .table-right
    height 320px
    width 46%
    border 1px solid #cecece
    float right
    /*margin-right 20px*/
    margin-bottom 40px
  .line_chart
    width 100%
    height 1px
    background-color #21B8D5
    margin-top 10px
    margin-bottom 20px
  .colorRed
    margin-right: 5px
    color: #0099cb
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

  .page
    padding 20px 0 0 20px
  .page-space > *
    margin 0 10px 10px 0
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
    .back
      cursor pointer
      width 15%
      float right
      span
        border none
        color #8a8a8a
        font-weight normal
        font-size 14px
        float right
      i
        float right
        margin-left 10px
  .pull-right
    float right
  .el-transfer .el-transfer-panel
    width 200px !important
  .footer
    margin 20px auto
    text-align center
</style >
