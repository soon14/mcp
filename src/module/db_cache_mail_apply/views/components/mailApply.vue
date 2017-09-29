<template>
	<div id="db_app">
		<div id="db_open_tittle">
			<p>申请数据库云主机资源</p>
		</div>
		<el-form id="applyForm" :inline="true" label-width="80px">
			<el-form-item class="item-title" label="部门领域">
				<el-select :disabled="true" v-model="formData.department"></el-select>
			</el-form-item>
			<el-form-item class="item-title" label="产品模块" style="margin-left:15%">
				<el-select :disabled="true" v-model="formData.product"></el-select>
			</el-form-item>
			<br>

			<el-form-item class="item-title" label="环境类型" >
				<el-select :disabled="true" v-model="formData.environment"></el-select>
			</el-form-item>
			<el-form-item class="item-title" label="应用名称" style="margin-left:15%">
				<el-select :disabled="true" v-model="formData.applicationName"></el-select>
			</el-form-item>
			<br>

			<el-form-item class="item-title" label="应用管理员">
				<el-input readonly v-model="formData.applicationManager"></el-input>
			</el-form-item>
			<el-form-item class="item-title" label="系统管理员" style="margin-left:15%">
				<el-input readonly v-model="formData.systemManager"></el-input>
			</el-form-item>
		</el-form>
		<div id="list">
			<el-table :data="messageList" width="100%">
				<el-table-column prop="region" label="所属区域" ></el-table-column>
				<el-table-column prop="cluster" label="集群架构" width="140px"></el-table-column>
				<el-table-column prop="version" label="版本" ></el-table-column>
				<el-table-column prop="charset" label="字符集" width="120px"></el-table-column>
				<el-table-column prop="hostConfig" label="主机套餐"></el-table-column>
				<el-table-column prop="cpu" label="CPU(Cores)" width="120px"></el-table-column>
				<el-table-column prop="memory" label="内存(G)"></el-table-column>
				<el-table-column prop="hardware" label="硬盘(G)"></el-table-column>
				<el-table-column prop="operatSystem" label="操作系统"></el-table-column>
				<el-table-column prop="clusterDesc" label="集群描述"></el-table-column>
    	</el-table>
		</div>
		<div style="text-align: center;right;margin-top: 30px;" v-if="isShowBtn">
			<el-button @click="applyConfirm('2')">审批通过</el-button>
			<el-button @click="applyConfirm('1')">审批不通过</el-button>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import {getApplyList,getApplyDetail,mailLinkSubmit} from '../../api/service';
  export default{
    data(){
      return {
				hintMsg:'',//提示信息
				type:'',//提交类型
				formData:{
					department:'',
					product:'',
					environment:'',
					applicationName:'',
					applicationManager:'',
					systemManager:''
				},
				messageList:[],
				isShowBtn:true,//请求之后按钮隐藏
				submitFlag:false//防止重复提交
      }
    },
    created(){
			this.name = window.localStorage.user?JSON.parse(window.localStorage.user).account:'';//全局参数
			this.applyId = window.location.href.substr(window.location.href.indexOf("?")+1,window.location.href.length).split('=')[1]; 
			this.applyId = this.applyId?this.applyId:'2';
			if(!this.name){
				window.location.href = '/#/login';
			}else{
				this.initData();
			}
		},
		methods:{
			//获取数据
			initData:function(){
				getApplyDetail({applyId:this.applyId,userName:this.name}).then(data => {
					if(data.errorCode === '0' && data.result){
						this.formData.department = data.result.department;
						this.formData.product = data.result.productName;
						this.formData.environment = data.result.environment;
						this.formData.applicationName = data.result.applicationName;
						this.formData.applicationManager = data.result.applicationManager;
						this.formData.systemManager = data.result.systemManager;
						this.messageList = data.result.resourceList;
						this.messageList.forEach(data => {
							data.hostConfig = data.cpu+'C '+data.memory+'G';
						})
						if(data.result.status === 0 && data.result.operateFlag === '0'){
							this.isShowBtn = true;
						}else{
							this.isShowBtn = false;
						}

						if(data.result.operateFlag === '1'){
								this.$notify({
									title: '警告',
									message: '您没有审批权限！',
									offset: 200,
									type: 'warning',
									duration: 2000
								});
							}
					}else{

					}
				})
			},

			//提交弹出框确认
			applyConfirm:function(type){
				this.type = type;
				this.hintMsg = type === '1'?'您确定云主机资源申请，审批不通过吗？':'审批通过会创建云主机资源，您确定审批通过吗？';
				this.$confirm(this.hintMsg, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.submitApply();
        }).catch(() => {      
        });
				
			},

			/**
			 * 交审批 通过/不通过
			 * @param type 1不通过，2通过。
			 */
			submitApply:function(){
				
				//控制重复提交
				if(this.submitFlag || !this.isShowBtn){
					this.$notify({
						title: '警告',
						message: '正在提交，请不要重复提交！',
						type: 'warning',
					});
					return;
				}

				this.submitFlag = true;
				mailLinkSubmit({applyId:this.applyId,status:this.type,approveBy:this.name}).then(data => {
					this.submitFlag = false;
					this.isShowBtn = false;
					if(data.errorCode === '0'){
						this.$notify({
							title: '成功',
							message: '提交成功',
							type: 'success'
						});
					}else{
						this.$notify.error({
							title: '错误',
							message: '提交失败'
						});
					}
				})
			}
		}
  }
</script>
<style lang="less">
	body{
		background-color: #e5e5e5;
	}
	#app{
		padding: 20px;
	}

	#db_app{
		height: 100%;
		padding: 0 20px;
		background-color: #ffffff;
    border-radius: 5px;
    padding: 20px;
		#db_open_tittle{
			width: 100%;
			height: 35px;
			text-align: left;
			p {
				float: left;
				font-size: 20px;
				height: 16px;
				line-height: 16px;
			}
		}
		#applyForm{
			margin-top:20px;
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
	}
</style>