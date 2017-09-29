<template>
  <paper>
    <son-title :headTitle="headTitle"></son-title>

    <el-form :inline="true" label-width="90px">
      <el-form-item class="item-title" label="部门领域">
        <el-select placeholder="请选择活动区域" v-model="selectDept" @change="getProductList(selectDept)">
          <el-option v-for="(item,index) in deptList" :label="item" :value="item" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="item-title" label="产品模块" style="margin-left:12%">
        <el-select  placeholder="请选择产品模块" v-model="selectProduct" @change="getEnvironmentList(selectDept,selectProduct)">
          <el-option v-for="(item,index) in productList" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <br>

      <el-form-item class="item-title" label="环境类型" >
        <el-select  placeholder="请选择环境类型" v-model="selectEnvironment" @change="getAppList(selectDept,selectProduct,selectEnvironment)">
          <el-option v-for="(item,index) in environmentList" :label="item.name" :value="item.code" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item class="item-title" label="应用名称" style="margin-left:12%">
        <el-select placeholder="请选择应用名称" v-model="selectAppName" @change="getAdminMsg(selectAppName)">
          <el-option v-for="(item,index) in appNameList" :label="item.name" :value="item.id" :key="index"></el-option>
        </el-select>
      </el-form-item>
      <br>

      <el-form-item class="item-title" label="应用管理员">
        <el-input v-if="adminMsg.managerName" readonly v-model="adminMsg.managerName"></el-input>
        <el-input v-else readonly v-model="adminMsg.managerId"></el-input>
      </el-form-item>
      <el-form-item class="item-title" label="系统管理员" style="margin-left:12%">
        <el-input v-if="adminMsg.systemManagerName" readonly v-model="adminMsg.systemManagerName"></el-input>
        <el-input v-else readonly v-model="adminMsg.systemManagerId"></el-input>
      </el-form-item>
    </el-form>

    <div id="applyDialogTitle">资源申请（云主机+数据库）</div>
			<div id="applyList">
				<el-table :data="submitDbList" style="width: 100%">
					<el-table-column label="所属区域">
						<template scope="scope">
							<span v-if="scope.row.region">{{scope.row.region}}</span>
							<el-select v-else placeholder="--请选择--" v-model="scope.row.addRow.region">
								<el-option label="三水" :value="'三水'"></el-option>
								<el-option label="南海" :value="'南海'"></el-option>
								<el-option label="顺德" :value="'顺德'"></el-option>
								<el-option label="深圳" :value="'深圳'"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column label="集群架构" width="140px">
						<template scope="scope">
							<span v-if="scope.row.cluster">{{scope.row.cluster}}</span>
							<el-select v-else placeholder="--请选择--" v-model="scope.row.addRow.cluster">
								<el-option v-for="(item,index) in groupList" :label="item.name" :value="item.id" :key="index"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column label="版本" width="120px">
						<template scope="scope">
							<span v-if="scope.row.version">{{scope.row.version}}</span>
							<el-select v-else placeholder="--请选择--" v-model="scope.row.addRow.version">
								<el-option label="mariadb 10.1" :value="'mariadb 10.1'"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column  label="字符集" width="120px">
						<template scope="scope">
							<span v-if="scope.row.charset">{{scope.row.charset}}</span>
							<el-select v-else placeholder="--请选择--" v-model="scope.row.addRow.charset">
								<el-option label="utf8mb4" :value="'utf8mb4'"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column label="主机套餐">
						<template scope="scope">
							<span v-if="scope.row.flavorId">{{scope.row.hostConfig}}</span>
							<el-select v-else placeholder="--请选择--" v-model="scope.row.addRow.flavorId" @change="changePackageMsg(scope.row.addRow.flavorId,scope.row)">
								<el-option v-for="(item,index) in hostConfigList" :label="item.vcpus+'C '+(item.ram/1024)+'G'" :value="item.id" :key="index"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column label="CPU(Cores)" width="120px">
						<template scope="scope">
							<span v-if="scope.row.cpu">{{scope.row.cpu}}</span>
							<el-input v-else :disabled="!selfConfig" v-model.number="scope.row.addRow.cpu" type="number"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="内存(G)">
						<template scope="scope">
							<span v-if="scope.row.memory">{{scope.row.memory}}</span>
							<el-input v-else :disabled="!selfConfig" v-model.number="scope.row.addRow.memory" type="number"></el-input>
						</template>
					</el-table-column>
					<el-table-column label="硬盘(G)">
						<template scope="scope">
							<span v-if="scope.row.hardware">{{scope.row.hardware}}</span>
							   <input v-else class="default_input" v-model="scope.row.addRow.hardware" :onkeyup="judgeNum(submitDbList[0].addRow.hardware)" >
						</template>
					</el-table-column>
					<el-table-column label="操作系统">
						<template scope="scope">
							<span v-if="scope.row.operatSystem">{{scope.row.operatSystem}}</span>
							<el-select v-else placeholder="--请选择--" v-model="scope.row.addRow.operatSystem">
								<el-option label="centos 6.6" :value="'centos 6.6'"></el-option>
							</el-select>
						</template>
					</el-table-column>
					<el-table-column label="集群描述">
						<template scope="scope">
							<span v-if="scope.row.clusterDesc">{{scope.row.clusterDesc}}</span>
							<el-input v-else type="textarea" :rows="1" :title="scope.row.addRow.clusterDesc" v-model="scope.row.addRow.clusterDesc" :maxlength="100" :onkeyup="judgeExpre(submitDbList[0].addRow.clusterDesc)"></el-input>
						</template>
					</el-table-column>
				</el-table>
			</div>
			<div style="text-align: center;right;margin: 30px 0 20px 0;">
				<el-button class="w100" @click="submitApplyFun">申请数据库</el-button>
        <el-button class="w100" @click="$router.go(-1)">取消</el-button>
			</div>
  </paper>
</template>
<script>
  import paper from 'components/awesome/paper/Paper.vue'
  import SonTitle from 'components/awesome/son_title/SonTitle.vue'
  import {getDeptList,getProductList,getEnvironmentList,getApplicationList,getAdminMsg,submitDbApply,getPackageMsg} from '../../api/service';

  export default{
    components:{
      "paper":paper,
      "son-title":SonTitle
    },
    created(){
      this.token = window.localStorage.token;//全局参数（标记值）
			this.proid = window.localStorage.project?JSON.parse(window.localStorage.project).projectId:'';//全局参数（项目id）
			this.userName = window.localStorage.user?JSON.parse(window.localStorage.user).account:'';//全局参数（用户id）
      this.getDeptList();
      this.getPackageMsg();
      console.log('create');
    },

    data(){
      return {
        headTitle:{
          titleName:'申请数据库',
          isBack: {
            type: Boolean,
            default: true
          }
				},

        deptList:[],//部门列表
        selectDept:'',//选中部门

        productList:[],//模块列表
        selectProduct:'',//选中模块

        environmentList:[],//环境列表
        selectEnvironment:'',//选中环境

        appNameList:[],//应用名称列表
        selectAppName:'',//选中应用名称

        adminMsg:{managerName:'',systemManagerName:''},//管理员
        submitDbList:[//提交数据库申请数据
          {addRow:{region:'',cluster:'',version:'',charset:'',hostConfig:'',flavorId:'',cpu:'',memory:'',hardware:'',operatSystem:'',clusterDesc:''}}
        ],
        hostConfigList:[],//主机套餐列表
        selfConfig:false,//自定义cup/内存配置

        groupList:[
					{name:'单节点',id:'mysql_01'},
					{name:'一主一从',id:'mysql_02'},
					{name:'一主两从',id:'mysql_03'},
        ],
        submitFlag:false//控制重复提交
      }
    },
    methods:{
      //获取主机套餐
			getPackageMsg:function(){
        console.log('getPackage');
				this.hostConfigList = [];
				getPackageMsg({token:this.token,projectId:this.proid}).then(data => {
					if(data.errorCode === '0' && data.result){
						this.hostConfigList = data.result;
					}
				})
			},

			//修改主机套餐
			changePackageMsg:function(hostConfigId,row){
				if(!hostConfigId){
					return;
				}

				if(hostConfigId === '自定义'){
					row.addRow.cpu = '';
					row.addRow.memory = '';
					row.addRow.hostConfig = '自定义';
					this.selfConfig = true;
					return;
				}

				this.selfConfig = false;
				this.hostConfigList.forEach(function(val) {
					if(val.id === hostConfigId){
						row.addRow.cpu = val.vcpus;
						row.addRow.memory = (val.ram/1024);
						row.addRow.hostConfig = val.vcpus+'C '+(val.ram/1024)+'G';
					}
				});
			},


      //获取部门领域列表
			getDeptList:function(){
				getDeptList({token:this.token}).then(data => {
					if(data.errorCode === '0' && data.result){
						this.deptList = data.result;
					}else{

					}
				})
			},


			//获取产品模块列表
			getProductList:function(deptName){
				this.selectProduct = '';
				this.productList = [];
				if(!deptName){
					return;
				}

				getProductList({token:this.token,department:deptName}).then(data => {
					if(data.errorCode === '0' && data.result){
						this.productList = data.result;
					}else{

					}

				})
			},

			//获取环境类型列表
			getEnvironmentList:function(deptName,productId){
				this.selectEnvironment = '';
				this.environmentList = [];
				if(!deptName || !productId){
					return;
				}

				let product = {};
				this.productList.forEach(data => {
					if(data.id === productId){
						product = data;
					}
				})

				getEnvironmentList({token:this.token,department:deptName,product:product.name}).then(data => {
					if(data.errorCode === '0' && data.result){
						this.environmentList = data.result
					}else{

					}
				})
			},

			//获取应用名称列表
			getAppList:function(deptName,productId,environment){
				this.selectAppName = '';
				this.appNameList = [];
				if(!deptName || !productId || !environment){
					return;
				}

				let product = {};
				this.productList.forEach(data => {
					if(data.id === productId){
						product = data;
					}
				})

				getApplicationList({token:this.token,department:deptName,product:product.name,environment:environment}).then(data => {
					if(data.errorCode === '0' && data.result){
						this.appNameList = data.result;
					}else{

					}
				})
			},

			//获取管理员信息
			getAdminMsg:function(appName){
				this.adminMsg = {managerName:'',systemManagerName:''};
				if(!appName){
					return;
				}

				let app = {};
				this.appNameList.forEach(data => {
					if(data.id === appName){
						app = data;
					}
				})

				getAdminMsg({token:this.token,appid:app.id}).then(data => {
					if(data.errorCode === '0' && data.result){
						this.adminMsg = data.result;
					}else{

					}
				})
			},

			//申请数据库添加一行
			addRowFun:function(){
				let rowData = this.submitDbList[0].addRow;
				//如果数据没有填写完整return。

				if(!rowData.region){
					this.$notify({title: '提示',message: '请选择所属区域！',type: 'warning'});
					return false;
				}else if(!rowData.cluster){
					this.$notify({title: '提示',message: '请选择集群架构！',type: 'warning'});
					return false;
				}else if(!rowData.version){
					this.$notify({title: '提示',message: '请选择版本！',type: 'warning'});
					return false;
				}else if(!rowData.charset){
					this.$notify({title: '提示',message: '请选择字符集！',type: 'warning'});
					return false;
				}else if(!rowData.flavorId){
					this.$notify({title: '提示',message: '请选择主机套餐！',type: 'warning'});
					return false;
				}else if(!rowData.hardware){
					this.$notify({title: '提示',message: '请选择硬盘容量！',type: 'warning'});
					return false;
				}else if(!rowData.operatSystem){
					this.$notify({title: '提示',message: '请选择操作系统！',type: 'warning'});
					return false;
				}else if(!rowData.clusterDesc){
					this.$notify({title: '提示',message: '请填写集群描述！',type: 'warning'});
					return false;
				}

				return true;
			},

			//提交数据库申请
			submitApplyFun:function(){

				if(this.submitFlag){ //控制重复提交
					return;
				}

				let [first, ...list] = this.submitDbList;

				if(!this.selectDept){
					this.$notify({title: '提示',message: '请选择部门领域！',type: 'warning'});
					return;
				}else if(!this.selectProduct){
					this.$notify({title: '提示',message: '请选择产品模块！',type: 'warning'});
					return;
				}else if(!this.selectEnvironment){
					this.$notify({title: '提示',message: '请选择环境类型！',type: 'warning'});
					return;
				}else if(!this.selectAppName){
					this.$notify({title: '提示',message: '请选择应用名称！',type: 'warning'});
					return;
				}else if(!this.adminMsg.managerId){
					this.$notify({title: '提示',message: '请选择应用管理员！',type: 'warning'});
					return;
				}else if(!this.adminMsg.systemManagerId){
					this.$notify({title: '提示',message: '请选择系统管理员！',type: 'warning'});
					return;
				}

				if(!this.addRowFun()){
					return;
				}

				let selectEnvironmentName = '';
				this.environmentList.forEach(data => {
					if(data.code === this.selectEnvironment){
						selectEnvironmentName = data.name;
					}
				})

				this.groupList.forEach(data => {
					if(first.addRow.cluster === data.id){
						first.addRow.clusterCode = data.name;
					}
				})

				let product = {};
				this.productList.forEach(data => {
					if(data.id === this.selectProduct){
						product = data;
					}
				})

				let app = {};
				this.appNameList.forEach(data => {
					if(data.id === this.selectAppName){
						app = data;
					}
				})

				let params = {
					token:this.token,
					type:'1',//类型 1：数据库 2：缓存
					projectId:this.proid,
					department:this.selectDept,
					groupId:product.id,
					productName:product.name,
					productId:product.id,
					// environment:this.selectEnvironment,
					environment:selectEnvironmentName,
					applicationName:app.name,
					applicationId:app.id,
					applicationManager:this.adminMsg.managerId,
					systemManager:this.adminMsg.systemManagerId,
					createBy:this.userName,
					resourceList:[first.addRow]
				}
				this.submitFlag = true;
				submitDbApply(params).then(data => {
					this.submitFlag = false;
					if(data.errorCode === '0'){
						this.$notify({
							title: '成功',
							message: '提交成功',
							type: 'success'
            });
            this.$router.go(-1);
					}else{
						this.$notify.error({
							title: '错误',
							message: data.msg
						});
					}
				})
      },
      
      //输入必须为数字
			judgeNum:function(num){
				//不能输入0
				if(num === '0'){
					this.$set(this.submitDbList[0].addRow,'hardware', '');
					return;
				}

				let result = num.replace(/[^\d]/g,'');
				if(result.length > 0){
					result = parseInt(result)+'';
				}
				this.$set(this.submitDbList[0].addRow,'hardware', result);
			},

			//判断输入表情。
			judgeExpre:function(str){
				let result = '';
				result = str.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
				this.$set(this.submitDbList[0].addRow,'clusterDesc', result);
			}
    }
  }
</script>
<style lang="less">
  #applyDialogTitle{
    font-size: 16px;
    font-weight: 700;
    hr{
      width: 80.5%;
    }
  }

  #applyList{
    margin: 20px 0px;
  }

  .default_input{
    width:100%;
    height:36px;
    background-color: #fff;
    background-image: none;
    border-radius: 4px;
    border: 1px solid #bfcbd9;
  }

  .item-title{
    .el-form-item__label{
      text-align: left;
      padding: 11px 10px 11px 0
    }
    .el-form-item__content{
      width: 350px;
      .el-select{
        width: 350px;
      }
    }
  }

</style>

