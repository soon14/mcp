<template>
  <div>
    <el-dialog title="创建报警规则" v-model="createRulesData.create_show" size="small" :before-close="handleClose" :close-on-click-modal="false">
      <el-form :model="createRulesData.ruleForm" :rules="createRulesData.rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left" label-color>
        <h4 class="titleSmall"><i class="mf mf-star"></i>  关联资源 </h4>
        <hr class="hr"/>
        <el-form-item label="产    品" prop="product">
          <el-select v-model="createRulesData.ruleForm.product" placeholder="请选产品" size="small" class="table-with">
            <el-option label="云服务器ECS" value="product"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="资源范围" prop="resource" >
          <el-select v-model="createRulesData.ruleForm.resource" placeholder="请选实例名称" size="small" class="table-with">
            <el-option label="实例" value="resource1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="主 机 名" prop="example">
          <el-select v-model="createRulesData.ruleForm.example" placeholder="请选资源" size="small" @change="hostID_change" class="table-with">
            <el-option  :label='item.label' :value='item.label' v-for="item in example_options"></el-option>
          </el-select>
        </el-form-item>
        <h4 class="titleSmall"><i class="mf mf-star" ></i>  设置报警规则 </h4>
        <hr class="hr"/>
        <el-form-item label="规则名称" prop="name">
          <el-input v-model="createRulesData.ruleForm.name" size="small" :maxlength="20" placeholder="请输入1~20位规则名称" class="table-with"></el-input>
        </el-form-item>
        <el-form-item label="规则类型" prop="ruleType">
          <el-select v-model="createRulesData.ruleForm.ruleType" placeholder="请选类型" size="small" class="table-with">
            <el-option :label="item" :value="item" v-for="item in rule_options"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择网卡" v-if="createRulesData.ruleForm.ruleType==='网络流量速率'||createRulesData.ruleForm.ruleType==='网络数据包速率'" prop="network">
          <el-select v-model="createRulesData.ruleForm.network" placeholder="请选类型" size="small" class="table-with">
            <el-option :label="item" :value="item" v-for="item in nicList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="选择磁盘" v-if="createRulesData.ruleForm.ruleType==='磁盘速率'||createRulesData.ruleForm.ruleType==='磁盘OPS'" prop="disk">
          <el-select v-model="createRulesData.ruleForm.disk" placeholder="请选类型" size="small" class="table-with">
            <el-option :label="item" :value="item" v-for="item in diskList"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="上 下 行" v-if="createRulesData.ruleForm.ruleType==='网络流量速率'||createRulesData.ruleForm.ruleType==='网络数据包速率'" prop="value2">
          <el-select v-model="createRulesData.ruleForm.value2" placeholder="请选类型" size="small">
            <el-option label="上行" value="上行"></el-option>
            <el-option label="下行" value="下行"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="读    写" v-if="createRulesData.ruleForm.ruleType==='磁盘速率'||createRulesData.ruleForm.ruleType==='磁盘OPS'" prop="value3">
          <el-select v-model="createRulesData.ruleForm.value3" placeholder="请选类型" size="small" class="table-with">
            <el-option label="读" value="读"></el-option>
            <el-option label="写" value="写"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="阈    值" required>
          <el-col :span="5">
            <el-select v-model="createRulesData.ruleForm.time_item" filterable placeholder="请选择" size="small" prop="time_item">
              <el-option
                v-for="item in time"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="1"> &nbsp; </el-col>
          <el-col :span="5">
            <el-select v-model="createRulesData.ruleForm.moreThan_item" filterable placeholder="" size="small" prop="moreThan_item">
              <el-option
                v-for="item in moreThan"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-col>
          <el-col :span="1"> &nbsp; </el-col>
          <el-tooltip content="取值：0-100" placement="top" v-if="createRulesData.ruleForm.ruleType==='cpu平均使用率'||createRulesData.ruleForm.ruleType==='cpu瞬时使用率'||createRulesData.ruleForm.ruleType==='内存平均使用率'">
            <el-col :span="5" style="margin-right: 2px;">
              <el-form-item prop="percentnum" style="margin:0;">
                <el-input v-model="createRulesData.ruleForm.percentnum" placeholder="" size="small"></el-input>
              </el-form-item>
            </el-col>
          </el-tooltip>
          <el-tooltip content="取值：大于0" placement="top" v-if="createRulesData.ruleForm.ruleType==='网络流量速率'||createRulesData.ruleForm.ruleType==='网络数据包速率'||createRulesData.ruleForm.ruleType==='磁盘速率'||createRulesData.ruleForm.ruleType==='磁盘OPS'">
            <el-col :span="5" style="margin-right: 2px;">
              <el-form-item prop="percentnum" style="margin:0;">
                <el-input v-model="createRulesData.ruleForm.percentnum" placeholder="" size="small"></el-input>
              </el-form-item>
            </el-col>
          </el-tooltip>
          <el-col class="line" :span="5" v-if="createRulesData.ruleForm.ruleType==='cpu平均使用率'||createRulesData.ruleForm.ruleType==='cpu瞬时使用率'||createRulesData.ruleForm.ruleType==='内存平均使用率'"> % </el-col>
          <el-col class="line" :span="5" v-if="createRulesData.ruleForm.ruleType==='网络流量速率'"> KB/S</el-col>
          <el-col class="line" :span="5" v-if="createRulesData.ruleForm.ruleType==='网络数据包速率'"> PPS</el-col>
          <el-col class="line" :span="5" v-if="createRulesData.ruleForm.ruleType==='磁盘速率'"> MB/S</el-col>
          <el-col class="line" :span="5" v-if="createRulesData.ruleForm.ruleType==='磁盘OPS'"> OPS</el-col>
        </el-form-item>
        <el-form-item label="连续几次超过阈值报警：" prop="numb" v-if="this.createRulesData.ruleForm.ruleType ==='cpu瞬时使用率'">
          <el-input-number v-model="createRulesData.ruleForm.numb" size="small" :min="1"></el-input-number>
        </el-form-item>
        <h4 class="titleSmall"><i class="mf mf-star"></i>  通知方式</h4><hr class="hr"/>
        <el-form-item label="通知对象" prop="contact_select">
          <Through :settings="createRulesData.title" :orderData="createRulesData.contact" v-model="createRulesData.groupData"></Through>

        </el-form-item>
        <el-form-item label="通知方式" prop="type">
          <el-checkbox-group v-model="createRulesData.ruleForm.type">
            <el-checkbox label="邮件" name="type"></el-checkbox>
            <el-checkbox label="手机" name="type" disabled></el-checkbox>
            <el-checkbox label="美信" name="type" disabled></el-checkbox>
            <el-checkbox label="MIP待办" name="type" disabled></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
      </el-form>
      <div class="footer" >
        <el-button @click="create_cancel('ruleForm')" style="width: 100px;margin-right: 10px">取消 </el-button>
        <el-button type="primary" @click="create_confirm()" :disabled="confirmFalse" style="width: 100px">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script type="text/ecmascript-6">
  import {getHosts,getDisk,createNewAlarm,getAlarmClass,getAllGroups} from '../../api/service'
  import Through from 'components/utils/user_authorization/Through.vue'
  export default {
    props: {
        createRulesData: {
          create_show: "",
          hostId:"",
          ruleForm:{
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
          confirmFalse: false,
          title:{
            ableAuthor: '联系人通知组',
            acceptAuthor: '已选联系组'
          },
          groupData: [{name:"wwwwwww",id:"333333"}],
          contact: []
        }
    },
    data(){
        return({
          example_options:[{
            value: '',
            label: ''
          }],
          rule_options: [],
          moreThan: [{
            value: 'gt',
            label: '>'
          },{
            value: 'lt',
            label: '<'
          }],
          time: [{
            value: '5m',
            label: '5分钟'
          }, {
            value: '10m',
            label: '10分钟'
          }, {
            value: '15m',
            label: '15分钟'
          }, {
            value: '30m',
            label: '30分钟'
          }, {
            value: '60m',
            label: '60分钟'
          }],
          hostName:'',
          measurement:'',
          cpuCount:'',
          dbMetaType:'',
          description:'',
          field:'',
          threshold:'',
          nicList:'',
          diskList:'',
          typeInstance:'',
          groupsInf:[],
          typeName:'',
          hostId:'',
          // contact:{}
        })
    },
    methods: {
      //浮层
      init (){
        let params = {};
        var that = this;
        getAllGroups(params).then(res => {
          let data = [];
          res.data.forEach((item, index) => {
            data.push({
              name: item.name,
              key: item.group_id,
              active: ''
            });
          });
          that.createRulesData.contact = data;
//          that.contact = data;
//          this.$emit('createRulesData','contact',data)
        }).catch(res => {
          console.log(res)
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
      },
      getAlarms(){
        let params = {};
        getAlarmClass(params).then(res => {
          let alarmClasses = [];
          for(let i=0,ii=res.length;i<ii;i++){
            alarmClasses = alarmClasses.concat(res[i].description)
          }
          this.rule_options = alarmClasses ;
        })
      },
      hostID_change(){
        let that = this ;
        let new_example_options = this.example_options.filter(function(item){
          return that.createRulesData.ruleForm.example.indexOf(item.label) !== -1 ;
        });
        this.hostId = new_example_options[0].value ;
        this.getNic();
        this.getDisklist();
        this.createRulesData.ruleForm.name='';
        this.createRulesData.ruleForm.ruleType='';
        this.createRulesData.ruleForm.network='';
        this.createRulesData.ruleForm.disk='';
        this.createRulesData.ruleForm.value2='';
        this.createRulesData.ruleForm.value3='';
        this.createRulesData.ruleForm.time_item='5m';
        this.createRulesData.ruleForm.moreThan_item='gt';
        this.createRulesData.ruleForm.percentnum='';
        this.createRulesData.ruleForm.numb='';
        this.createRulesData.ruleForm.contact_select=[];
      },
      //获取type_instance
      getNic (temp){
        if(!this.hostId){
            this.hostId=temp;
        }
        let params = {
          'type': 'network',
          'host_id': this.hostId
        };
        getDisk(params).then(data => {
          let nicList = [];
          for(let i=0,ii=data.length;i<ii;i++){
            nicList = nicList.concat(data[i][1])
          }
          this.nicList = nicList;
        })
      },
      getDisklist (temp){
        if(!this.hostId){
          this.hostId=temp;
        }
        let params = {
          'type': 'disk',
          'host_id': this.hostId
        };
        getDisk(params).then(data => {
//          console.log(data);
          let disList = [];
          for(let i=0,ii=data.length;i<ii;i++){
            disList = disList.concat(data[i][1])
          }
          this.diskList = disList;
        })
      },
      create_confirm(){
        //选中组id
        let select_contact =[];
        this.createRulesData.groupData.forEach((item)=>{
          return select_contact.push(item.key)
        });
        this.createRulesData.ruleForm.contact_select = select_contact;
        //确定measurement值
        if(this.createRulesData.ruleForm.ruleType ==='cpu平均使用率' ||this.createRulesData.ruleForm.ruleType ==='内存平均使用率' ||this.createRulesData.ruleForm.ruleType ==='cpu瞬时使用率') {
          this.measurement = 'virt_value'
        } else if(this.createRulesData.ruleForm.ruleType ==='磁盘OPS' || this.createRulesData.ruleForm.ruleType ==='磁盘速率'){
          this.measurement = 'virt_read_write'
        } else {
          this.measurement = 'virt_rx_tx'
        }
        //count
        if (this.createRulesData.ruleForm.ruleType ==='cpu瞬时使用率'){
          this.cpuCount = this.createRulesData.ruleForm.numb;
        } else {
          this.cpuCount = 0
        }
        //field
        if((this.createRulesData.ruleForm.ruleType ==='网络流量速率' || this.createRulesData.ruleForm.ruleType ==='网络数据包速率') && this.createRulesData.ruleForm.value2==="上行"){
          this.field = "rx"
        }else if((this.createRulesData.ruleForm.ruleType ==='网络流量速率' || this.createRulesData.ruleForm.ruleType ==='网络数据包速率') && this.createRulesData.ruleForm.value2==="下行"){
          this.field = "tx"
        }else if((this.createRulesData.ruleForm.ruleType ==='磁盘速率' || this.createRulesData.ruleForm.ruleType ==='磁盘OPS') && this.createRulesData.ruleForm.value3==="读"){
          this.field = "read"
        }else if((this.createRulesData.ruleForm.ruleType ==='磁盘速率' || this.createRulesData.ruleForm.ruleType ==='磁盘OPS') && this.createRulesData.ruleForm.value3==="写"){
          this.field = "write"
        }else{
          this.field = ""
        }
        //type
        if(this.createRulesData.ruleForm.ruleType ==='cpu平均使用率' || this.createRulesData.ruleForm.ruleType ==='cpu瞬时使用率'){
          this.dbMetaType = "percent"
        } else if (this.createRulesData.ruleForm.ruleType ==='内存平均使用率'){
          this.dbMetaType = "memory"
        }else if (this.createRulesData.ruleForm.ruleType ==='网络流量速率'){
          this.dbMetaType = "if_octets"
        }else if (this.createRulesData.ruleForm.ruleType ==='网络数据包速率'){
          this.dbMetaType = "if_packets"
        }else if (this.createRulesData.ruleForm.ruleType ==='磁盘速率'){
          this.dbMetaType = "disk_octets"
        }else if (this.createRulesData.ruleForm.ruleType ==='磁盘OPS'){
          this.dbMetaType = "disk_ops"
        }
        //中文周期
        let rangeChina ="";
        if(this.createRulesData.ruleForm.time_item==="5m"){
          rangeChina = "5分钟"
        }else if(this.createRulesData.ruleForm.time_item==="10m"){
          rangeChina = "10分钟"
        }else if(this.createRulesData.ruleForm.time_item==="15m"){
          rangeChina = "15分钟"
        }else if(this.createRulesData.ruleForm.time_item==="30m"){
          rangeChina = "30分钟"
        }else if(this.createRulesData.ruleForm.time_item==="60m"){
          rangeChina = "60分钟"
        }
        let moreThan ="";
        if(this.createRulesData.ruleForm.moreThan_item==="gt"){
          moreThan = "大于"
        }else {
          moreThan = "小于"
        }
        //单位
        let unit = "";
        if(this.createRulesData.ruleForm.ruleType ==='内存平均使用率'){
          unit = "%";
          this.threshold = this.createRulesData.ruleForm.percentnum / 100;
        }else if(this.createRulesData.ruleForm.ruleType ==='cpu平均使用率' ||this.createRulesData.ruleForm.ruleType ==='cpu瞬时使用率'){
          unit = "%";
          this.threshold = this.createRulesData.ruleForm.percentnum;
        }else if(this.createRulesData.ruleForm.ruleType ==='网络流量速率'){
          unit = "KB/S";
          this.threshold = this.createRulesData.ruleForm.percentnum * 1024
        }else if(this.createRulesData.ruleForm.ruleType ==='网络数据包速率'){
          unit = "PPS";
          this.threshold = this.createRulesData.ruleForm.percentnum
        }else if(this.createRulesData.ruleForm.ruleType ==='磁盘速率'){
          unit = "MB/S";
          this.threshold = this.createRulesData.ruleForm.percentnum * 1024 * 1024
        }else {
          unit = "OPS";
          this.threshold = this.createRulesData.ruleForm.percentnum
        }
        //type_name
        if(this.createRulesData.ruleForm.ruleType ==='内存平均使用率'){
          this.typeName = 'memory_usage';
        }else if(this.createRulesData.ruleForm.ruleType ==='cpu平均使用率'){
          this.typeName = 'cpu_usage';
        }else if(this.createRulesData.ruleForm.ruleType ==='网络流量速率'){
          this.typeName ='nic_octets_rate';
        }else if(this.createRulesData.ruleForm.ruleType ==='网络数据包速率'){
          this.typeName = 'nic_package_rate';
        }else if(this.createRulesData.ruleForm.ruleType ==='磁盘速率'){
          this.typeName = 'disk_octets_rate';
        }else if(this.createRulesData.ruleForm.ruleType ==='cpu瞬时使用率'){
          this.typeName = 'cpu_top_n' ;
        }else {
          this.typeName = 'disk_ops';
        }
        //描述
        if(this.createRulesData.ruleForm.ruleType ==='内存平均使用率' || this.createRulesData.ruleForm.ruleType ==='cpu平均使用率'){
          this.description = rangeChina+this.createRulesData.ruleForm.ruleType+moreThan+this.createRulesData.ruleForm.percentnum+unit+"则告警";
        }else if(this.createRulesData.ruleForm.ruleType ==='网络流量速率'||this.createRulesData.ruleForm.ruleType ==='网络数据包速率'){
          this.description = rangeChina+this.createRulesData.ruleForm.network+"网卡的"+this.createRulesData.ruleForm.ruleType+this.createRulesData.ruleForm.value2+moreThan+this.createRulesData.ruleForm.percentnum+unit+"则告警";
        }else if(this.createRulesData.ruleForm.ruleType ==='磁盘速率'||this.createRulesData.ruleForm.ruleType ==='磁盘OPS'){
          this.description = rangeChina+this.createRulesData.ruleForm.disk+"磁盘的"+this.createRulesData.ruleForm.ruleType+this.createRulesData.ruleForm.value3+moreThan+this.createRulesData.ruleForm.percentnum+unit+"则告警";
        }else if(this.createRulesData.ruleForm.ruleType ==='cpu瞬时使用率'){
          this.description = rangeChina+this.createRulesData.ruleForm.ruleType+moreThan+this.createRulesData.ruleForm.percentnum+unit+"连续"+this.createRulesData.ruleForm.numb+"次则告警";
        }
        //type_instance
        if(this.createRulesData.ruleForm.ruleType ==='cpu平均使用率' || this.createRulesData.ruleForm.ruleType ==='cpu瞬时使用率'){
          this.typeInstance = "virt_cpu_total";
        }else if(this.createRulesData.ruleForm.ruleType ==='内存平均使用率'){
          this.typeInstance = "used";
        }else if(this.createRulesData.ruleForm.ruleType ==='网络流量速率' || this.createRulesData.ruleForm.ruleType ==='网络数据包速率'){
          this.typeInstance = this.createRulesData.ruleForm.network;
        }else if(this.createRulesData.ruleForm.ruleType ==='磁盘速率' || this.createRulesData.ruleForm.ruleType ==='磁盘OPS'){
          this.typeInstance = this.createRulesData.ruleForm.disk;
        }
        //已选通知组
        this.groupsInf = this.createRulesData.contact;
        //hostId
        for(let i=0, ii=this.example_options.length;i<ii;i++){
          if(this.createRulesData.ruleForm.example === this.example_options[i].label){
            this.hostId = this.example_options[i].value
          }
        }
        //提交数据
        let params = {
          "data": {
            "name":	this.createRulesData.ruleForm.name,
            "type_name": this.typeName,
            "description": this.description,
            "channel_groups": this.createRulesData.ruleForm.contact_select,
            "db_meta": {
              "host": this.hostId,
              "hostname":this.createRulesData.ruleForm.example,
              "field": this.field,
              "range": this.createRulesData.ruleForm.time_item,
              "type":this.dbMetaType,
              "type_instance":this.typeInstance,
              "measurement": this.measurement
            },
            "rule":{
              "compare":this.createRulesData.ruleForm.moreThan_item,
              "threshold":this.threshold.toString(),
              "count":this.cpuCount.toString(),
              "period": this.createRulesData.ruleForm.numb1
            }
          }
        };
        if(this.createRulesData.ruleForm.name.replace(/(^\s*)|(\s*$)/g, "").length===0 || this.createRulesData.ruleForm.name.length===0){
          this.$notify({
            title: '警告',
            message: '请正确输入规则名称',
            type: 'warning'
          });
        }else if(this.createRulesData.ruleForm.contact_select.length===0){
          this.$notify({
            title: '警告',
            message: '通知对象不能为空',
            type: 'warning'
          });
        }else if(this.createRulesData.ruleForm.percentnum.length===0 || isNaN(this.createRulesData.ruleForm.percentnum)){
          this.$notify({
            title: '警告',
            message: '请正确输入阈值',
            type: 'warning'
          });
        }else if(this.createRulesData.ruleForm.percentnum>=1 && (this.createRulesData.ruleForm.percentnum.match(/^0+/g) || this.createRulesData.ruleForm.percentnum.match(/[.]\d+0+$|[.]0+$/g))){
          this.$notify({
            title: '警告',
            message: '请检查阈值前后是否有多余的0！',
            type: 'warning'
          });
        }else if(this.createRulesData.ruleForm.percentnum.match(/^[.]\d+|[.]$/g)){
          this.$notify({
            title: '警告',
            message: '请检查阈值前后是否有多余的小数点！',
            type: 'warning'
          });
        }else if(this.createRulesData.ruleForm.percentnum<1 && (this.createRulesData.ruleForm.percentnum.match(/^00+[.]/g) || this.createRulesData.ruleForm.percentnum.match(/[.]\d+0+$|[.]0+$/g))){
          this.$notify({
            title: '警告',
            message: '请检查阈值前后是否有多余的0！',
            type: 'warning'
          });
        }else if(this.createRulesData.ruleForm.percentnum.match(/^\+/g)){
          this.$notify({
            title: '警告',
            message: '请检查阈值前有多余的+！',
            type: 'warning'
          });
        }else if(this.createRulesData.ruleForm.type.length===0){
          this.$notify({
            title: '警告',
            message: '通知方式不能为空',
            type: 'warning'
          });
        }else if((this.createRulesData.ruleForm.ruleType==='cpu平均使用率'|| this.createRulesData.ruleForm.ruleType==='cpu瞬时使用率'|| this.createRulesData.ruleForm.ruleType==='内存平均使用率') && !isNaN(this.createRulesData.ruleForm.percentnum) && this.createRulesData.ruleForm.percentnum>0 && this.createRulesData.ruleForm.percentnum<100 && this.createRulesData.ruleForm.name.length>0 && this.createRulesData.ruleForm.contact_select.length>0 && this.createRulesData.ruleForm.type.length>0){
          createNewAlarm(params).then(res => {
            /*console.log(res);*/
            this.$notify({
              title: '提示',
              message: '恭喜你，创建规则成功！',
              type: 'success'
            });
            this.createRulesData.confirmFalse=true;
            this.createRulesData.create_show = false ;
          }).catch(err => {
            console.log(err);
          });
          this.$router.push({name: '报警规则'});
        }else if((this.createRulesData.ruleForm.ruleType==='网络流量速率'||this.createRulesData.ruleForm.ruleType==='网络数据包速率'||this.createRulesData.ruleForm.ruleType==='磁盘速率'||this.createRulesData.ruleForm.ruleType==='磁盘OPS') && this.createRulesData.ruleForm.percentnum>0 &&this.createRulesData.ruleForm.name.length>0 && this.createRulesData.ruleForm.contact_select.length>0 && this.createRulesData.ruleForm.type.length>0){
          createNewAlarm(params).then(res => {
            this.$notify({
              title: '提示',
              message: '恭喜你，创建规则成功！',
              type: 'success'
            });
            this.createRulesData.confirmFalse=true;
            this.createRulesData.create_show = false ;
          }).catch(err => {
            console.log(err);
          });
          this.$router.push({name: '报警规则'});
        }else {
          this.$notify({
            title: '警告',
            message: '请正确输入阈值',
            type: 'warning'
          });
        }
      },
      create_cancel(formName){
//        this.$emit('groupData',[]);
        /*this.createRulesData.groupData=[];
        this.init();
        this.createRulesData.contact = this.contact;*/
        this.createRulesData.ruleForm.name='';
        this.createRulesData.ruleForm.ruleType='';
        this.createRulesData.ruleForm.network='';
        this.createRulesData.ruleForm.disk='';
        this.createRulesData.ruleForm.value2='';
        this.createRulesData.ruleForm.value3='';
        this.createRulesData.ruleForm.time_item='5m';
        this.createRulesData.ruleForm.moreThan_item='gt';
        this.createRulesData.ruleForm.percentnum='';
        this.createRulesData.ruleForm.numb='';
        this.createRulesData.ruleForm.contact_select=[];
        this.createRulesData.create_show = false ;
        this.$refs[formName].resetFields();
      },
      handleClose(done) {
        this.create_cancel('ruleForm');
        done();
      }
    },
    watch: {
      example:{
        handler(){
          this.getNic();
          this.getDisklist();
        },
        deep:true
      },
      hostId:['getNic','getDisklist'],
    },
    created (){
    },
    mounted (){
      //浮层
      this.init();
      this.getTableData();
      this.getAlarms();
      this.getDisklist();
    },
    components: {
      Through
    },
  }

</script>
<style lang="stylus" rel="stylesheet/stylus" scoped>
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
  .pull-right
    float right
  .footer
    margin 20px auto
    text-align center
</style>
