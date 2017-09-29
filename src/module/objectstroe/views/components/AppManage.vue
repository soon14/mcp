<template>
	<div class="wrapper">
		<div class="wrap">
			<div class="wrapper_head">
				<core-header :setting="setting"></core-header>
				<!--<div class="page_header">
					<div id="title">
						<div class="title-left">
							
						</div>
						<div id="">
							<span>应用管理</span>
						</div>
					</div>
					<div class="right_group">
						<div>
							<el-button type="button" @click="createAppModel()" class="el-button el-button--primary" :plain="listnum" :disabled="listnum">
								<i class="iconfont icon-8fuzhi"></i>
								<span>创建应用</span>
							</el-button>
						</div>
					</div>
				</div>-->
			</div>
			<div class="wrapper_main">
				<div class="create_btn">
					<el-button type="button" @click="createAppModel()" class="el-button el-button--primary" :plain="true" :disabled="listnum">
						<i class="iconfont icon-8fuzhi"></i>
						<span>创建应用</span>
					</el-button>
				</div>
				<!--<list-table :data="table.data" :title="table.title" :setting="table.setting" :loading="table.loading" :columnsOperation="table.columnsOperation"></list-table>-->
				<el-table :data="tableData" style="width: 100%" id="table1">
					<el-table-column prop="appid" align="center" label="应用ID">
						<template scope="scope">
							<input type="text" :value='scope.row.appid' readonly name="" id="appId" style="opacity:0;position:absolute;top:0;" />
							<el-tooltip placement="top" style='position: relative;' popper-class="liheight" :visible-arrow="false">
								<p style="cursor: pointer;margin-bottom: -5px;margin-top: -2px;" slot="content" type="primary" @click="mouseenter_('appId')" size="mini">复制</p>
								<span id="" style="text-overflow: ellipsis;display: block;white-space: nowrap;overflow: hidden;">
        		  	{{scope.row.appid}}
        		  </span>
							</el-tooltip>
						</template>
					</el-table-column>
					<el-table-column prop="appkey" align="center" label="应用密钥" :show-overflow-tooltip=false>
						<template scope="scope">
							<input type="text" :value='scope.row.appkey' readonly name="" id="appKey" style="opacity:0;position:absolute;top:0;z-index: -1;" />
							<el-tooltip placement="top" style='position: relative;float: left;width: 70%;' popper-class="liheight" :visible-arrow="false">
								<p style="cursor: pointer;margin-bottom: -5px;margin-top: -2px;" slot="content" type="primary" @click="mouseenter_('appKey')" size="mini">复制</p>
								<span id="" v-if='!hide' style="text-overflow: ellipsis;display: block;white-space: nowrap;overflow: hidden;">
        		  	{{scope.row.appkey}}
        		  </span>
								<span id="" v-if='hide' style="text-overflow: ellipsis;display: block;white-space: nowrap;overflow: hidden;">
        		  	.........
        		  </span>
							</el-tooltip>
							<el-button type="primary" style='margin-right: 3px;float: right;' @click='hideShow()' size="mini">{{hide?'显示':'隐藏'}}</el-button>
						</template>
					</el-table-column>

					<el-table-column prop="createtime" align="center" label="创建时间">
					</el-table-column>
					<el-table-column prop="status" align="center" label="状态">
						<template scope="scope">
							<span :style="scope.row.status === '0'?{'color':'red'}:{'color':'green'}">
         		{{scope.row.status ==='0'?'已禁用':'使用中'}}
         	</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="操作">
						<template scope="scope">
							<a href="javascript:void(0)" @click='stopApp(scope.row)'>{{scope.row.status === '0'?'启用':'禁用'}}</a>
						</template>
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	//	import Vue from 'vue'
	//	import VueRouter from 'vue-router';
	//	import routes from 'src/router'
	import { getAppList, createApp, startApp } from '../../api/service';
	import storage from 'utils/local_storage_tool';
	import session from 'utils/session_storage_tool';
	import { hex_md5 } from '../../utils/md5';
	import { Notification } from 'element-ui';
	import CoreHeader from '../CoreHeader.vue';
	import ListTable from 'components/awesome/list_table/ListTable.vue';
	//	import Bus from 'common/api/bus';
	//	const router = new VueRouter({
	//	  // mode: 'history',
	//	  routes
	//	})
	export default {
		data() {
			return {
				options: [{
					value: 'true',
					label: '展示'
				}, {
					value: 'false',
					label: '不展示'
				}],
				value: 'true',
				projectid: '',
				uid: '',
				token: '',
				relation: "0",
				hide: true,
				fullscreenLoading: false,
				tableData: [{
						appid: '2cc672598f6847ccad4b7c3c0712b9df',
						appkey: "abc",
						createtime: "2017-09-06 14:00:42",
						status: '已禁用'
					}, {
						appid: '2cc672598f6847ccad4b7c3c0712b9df',
						appkey: "acb",
						createtime: "2017-09-06 14:00:42",
						status: '已禁用'
					}, {
						appid: '2cc672598f6847ccad4b7c3c0712b9df',
						appkey: "acb",
						createtime: "2017-09-06 14:00:42",
						status: '已禁用'
					}],
				setting: {
					title: '应用管理'
				},
				table: {
					setting: {

					},
					loading: false,
					title: [{
						prop: "appid",
						label: "应用ID"
					}, {
						prop: "appkey",
						label: "应用密钥",
//						prop: "name",
//					    label: "名称",
					    type: 'slot',   //可自定义插入元素，处理方法，进行格式化操作
					    computed: function(scope){
						    let className = scope.row.id === 1 ? "m-success": "m-warning";
						    return "<span class='show_hide'>" + scope.row.appkey + "</span><span class='hide_show' style='display:none'>.........</span>&nbsp;&nbsp;<span class='hide_show' @click='hideShow' style='background-color: #20b8d5;color: #fff;border-color: #20b8d5;padding:3px 5px;cursor: pointer;border: 1px solid #c4c4c4;border-radius: 4px;'>显示</span><span class='show_hide' style='cursor: pointer;border: 1px solid #c4c4c4;border-radius: 4px;background-color: #20b8d5;color: #fff;border-color: #20b8d5;padding:3px 5px;display:none;'>隐藏</span>";
					    }
						
					}, {
						prop: "createtime",
						label: "创建时间"
					}, {
						prop: "status",
						label: "状态",
						type: 'text',
						methods: {
							click: (index, row) => {

							}
						}
					}],
					data: [],
					columnsOperation: {
						title: "操作",
						align: "center",
						buttons: [{
							label: "禁用",
							size: "small",
							type: "text",
							methods: {
								click: (index, row) => {
									this.stopApp(row)
								}
							}
						}]
					}
				}
			}
		},
		computed: {
			listnum() {
				if(this.table.data.length === 0) {
					return false;
				} else {
					return true;
				}

			}
		},
		methods: {
			open7(mesa) {
				this.$notify.success({
					title: '成功',
					message: mesa,
					offset: 100,
					duration: 1000
				});
			},
			open2(mes) {
				this.$message({
					message: mes,
					type: 'success'
				});
			},
			open6(mesa) {
				this.$notify({
					title: '警告',
					message: mesa,
					offset: 200,
					type: 'warning',
					duration: 2000
				});
			},
			hideShow() {
//				let str = document.getElementsByClassName("show_hide");
//				console.log(str)
//				if(obj.appkey === "........."){
//					
//				}
				if(this.hide) {
					this.hide = false;
				} else {
					this.hide = true;
				}
			},
			open4(mesa) {
				this.$notify({
					title: '提示',
					message: mesa,
					offset: 100,
					duration: 1500
				});
			},
			createAppModel() {
				let that = this;
				let createData = JSON.stringify({
					'projectid': this.projectid,
					'uid': this.uid,
					'isshow': 'true',
					'token': this.token
				})
				this.createdApp = false;
				createApp(createData).then(data => {
					if(data.code === 200) {
						this.$notify({
							title: '警告',
							message: "创建应用成功！请到" + this.uid + "的邮箱进行激活使用",
							offset: 200,
							type: 'success'
						});
						//	        		let params_log = {'token':this.token,'level':'1','uid':this.uid,'msg':data.msg,'app':'新建应用'};
						//	    			log(params_log).then(data => {
						//
						//		    		})
						//	        		this.open7(data.data.result);
						//	        		//this.requstgetlist()
						//	        	}else{
						//	        		let params_log = {'token':this.token,'level':'3','uid':this.uid,'msg':data.msg,'app':'新建应用'};
						//	    			log(params_log).then(data => {
						//
						//		    		})
					}
				})
			},
			mouseenter_(id) {
				let abcd = document.getElementById(id);
				abcd.select();
				document.execCommand('Copy');
				this.open2('复制' + id + '成功')
			},
			requstgetlist() {
				let that = this;
				let postData = JSON.stringify({
					'projectid': this.projectid,
					'token': this.token
				});
				getAppList(postData).then(data => {
					if(data.code === 200) {

						//    			let params_log = {'token':this.token,'level':'1','uid':this.uid,'msg':data.msg,'app':'获取应用列表'};
						//	    			log(params_log).then(data => {
						//
						//		    		})
						//						this.setting.btn[0].disabled = false;
						if(data.data.apps.length === 0) {
							Notification.error('该项目下尚未开通对象存储，请开通应用再继续其他操作！');
							this.$router.replace('/object/create');
							//    				router.push({path: '/home/oss/bucket/newapp'})
						} else if(data.data.apps[0].isshow === 'true') {
							//							this.setting.btn[0].disabled = true;
							this.tableData = data.data.apps;
//							this.table.data = data.data.apps;
//							for(let i=0;i<this.table.data.length;i++){
//								if(this.table.data[i].status === "0"){
//									this.table.data[i].status = '已禁用';
////									this.table.title[3].type = 'text';
//									this.table.columnsOperation.buttons[0].label = "启用";
//								}else if(this.table.data[i].status === "1"){
//									this.table.data[i].status = '使用中';
//									this.table.columnsOperation.buttons[0].label = "禁用";
////									this.table.title[3].type = 'operate';
//								}
//								
//							}
							
						}
						if(data.data.apps.length > 0) {
							session.addItem('issync', data.data.apps[0].issync)
						}
					} else {
						//    			let params_log = {'token':this.token,'level':'3','uid':this.uid,'msg':data.msg,'app':'获取应用列表'};
						//	    			log(params_log).then(data => {
						//
						//		    		})
						if(data.code === 618) {
							this.open4('您的登录信息已过期，请重新登录！');
						}
					}
				})
			},
			stopApp(res) {
				let that = this;
				let ts = Date.parse(new Date()).toString();
				let signature = hex_md5(res.appid + ts + res.appkey);
				let status;
				if(res.status === "0") {
					status = "1";
				} else {
					status = "0";
				}
				let stopdata = JSON.stringify({
					'appid': res.appid,
					'uid': this.uid,
					'status': status,
					'token': this.token
				});
				startApp(stopdata).then(data => {
					if(data.code === 200) {
						//   				let params_log = {'token':this.token,'level':'1','uid':this.uid,'msg':data.msg,'app':'启用/禁用应用'};
						//		    			log(params_log).then(data => {
						//
						//			    		})
						this.requstgetlist();
					} else {
						//	      			let params_log = {'token':this.token,'level':'3','uid':this.uid,'msg':data.msg,'app':'启用/禁用应用'};
						//		    			log(params_log).then(data => {
						//
						//			    		})
					}
				})
			},
			//   	'relationOfApp'(res){
			//   		let that = this;
			//   		let ts = Date.parse(new Date()).toString();
			//   		let signature = window.hex_md5(res.row.appid + ts + res.row.appkey);
			//   		let relationdata = JSON.stringify({'projectid':this.projectid,'appid':res.row.appid,'uid':this.uid,'op':this.relation,'token':this.token});
			//   		relationOfApp(relationdata).then(data => {
			//   			if(data.code === 200){
			//   				let params_log = {'token':this.token,'level':'1','uid':this.uid,'msg':data.msg,'app':'应用于项目之间的关系'};
			//		    			log(params_log).then(data => {
			//
			//			    		})
			//   				if(this.relation === '0'){
			//	     				this.relation = '1';
			//	     				this.open7('已取消关联');
			//		      		}else{
			//		      			this.relation = '0';
			//		      			this.open7('已建立关联');
			//		      		}
			//		      		this.requstgetlist();
			//	      		}else{
			//	      			let params_log = {'token':this.token,'level':'3','uid':this.uid,'msg':data.msg,'app':'应用于项目之间的关系'};
			//		    			log(params_log).then(data => {
			//
			//			    		})
			//	      		}
			//   		})
			//   	}
		},
		components: {
			'core-header': CoreHeader,
			'list-table': ListTable
		},
		created() {
			if(window.localStorage.token && window.localStorage.token !== "") {
				//  			this.uid = JSON.stringify(window.localStorage.user);
				this.uid = storage.getObject("user").account;

				this.token = storage.getItem("token");
				this.projectid = storage.getObject("project").projectId;
				//  			if(window.localStorage.proid && window.localStorage.proid !== ""){
				//  				this.projectid = window.localStorage.proid;
				//  			}else{
				//  				this.open4('您尚未创建项目');
				//  				router.push({path: '/home/oss/newproject'});
				//  			}
			}
			let that = this;
			//			this.setting = {
			//				title: '应用管理',
			//					btn:[
			//						{
			//							label:"创建应用",
			//							plain: true,
			//							loading: false,
			//							disabled: true,
			//							methods:{
			//							   click:function(){
			//							   	  that.createAppModel();
			//							   }
			//							}
			//						}
			//					]
			//			}
			this.requstgetlist()
//			this.table.columnsOperation.buttons[0].methods = {
//				click: (index, row) => {
//					console.log(row);
//					that.stopApp(row)
//				}
//			}
			//  	    //this.uid = window.localStorage.name;
			//  	    //this.projectid = window.localStorage.proid;
			//  	    //this.token = window.localStorage.token;
			//   	this.requstgetlist();
			//   	Bus.$emit('active','2');
		}
	}
	
</script>
<style lang="less" scoped>
	.wrapper {
		/*padding: 20px 20px 0 20px;*/
		height: 100%;
		background-color: #E6E4EA;
		position: relative;
		padding-top: 1px;
		.wrap {
			/*position: absolute;
			left: 20px;
			top: 20px;
			right: 20px;
			bottom: 20px;*/
			margin-top: 19px;
			padding-bottom: 20px;
			margin-bottom: 20px;
			background-color: #FFFFFF;
		}
		/*height: 100%;*/
		/*padding: 0px 20px;*/
		.wrapper_head {
			/*height: 59px;
			padding-top: 8px;*/
			padding-left: 20px;
			border-bottom: 1px solid #cecece;
			/*padding-bottom: 10px;*/
		}
		.wrapper_main {
			margin-top: 20px;
			padding: 0 20px;
			.create_btn {
				margin-bottom: 20px;
			}
			
		}
	}
	.show_hide{
				line-height: 20px;
				background-color: #0190FE;
				border: 1px solid #11151A;
			}
	#table1 tbody tr td:last-child a {
		margin-right: 8px;
		&:last-child {
			margin-right: 0px;
		}
	}
	
	#table1 tbody tr td {
		overflow: hidden;
		cursor: pointer;
	}
</style>