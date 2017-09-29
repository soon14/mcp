<template>
	<div class="wrapper" ref='getHeight'>
		<div class="wrap">
		<div class="wrapper_head">
			<core-header :setting="setting"></core-header>
			<!--<div class="page_header">
				<div id="title">
					<span><i class="mf mf-oss"></i>{{bucketNmae}}</span>
				</div>
				<div class="right_group">
					<div>
					</div>
				</div>
			</div>-->
		</div>
		<div class="wrapper_main">
			<!--<div class="main_header">
				<div class="l_title">
					<span>任务管理</span>
				</div>
				<div class="ringht_group">
				</div>
			</div>-->
			<el-table :data="upload_arr" style="width: 100%;margin-top: 16px">
				<el-table-column prop="name" align="center" :show-overflow-tooltip=true label="文件名称">
				</el-table-column>
				<el-table-column prop="size" align="center" label="大小">
					<template scope="scope">
						{{scope.row.size | capacity}}
					</template>
				</el-table-column>
				<el-table-column prop="state" align="center" label="状态">
					<template scope="scope">
						<el-progress :text-inside="true" v-if='scope.row.states_stop_sta' :stroke-width="18" :percentage="scope.row.state" :status="scope.row.state === 100 ? 'success':''"></el-progress>
						<p style="color: red;margin-bottom: 0px;" v-if='!scope.row.states_stop'>已取消该文件上传</p>
						<p style="color: red;margin-bottom: 0px;" v-if='!scope.row.states_stop_'>文件上传失败</p>
					</template>
				</el-table-column>
				<el-table-column align="center" label="操作">
					<template scope="scope">
						<el-button @click.native.prevent="deleteRow(scope.$index, upload_arr)" type="text" size="small" v-if='!scope.row.states_'>
							移除
						</el-button>
						<el-button @click="close_xhr(scope)" type="text" size="small" v-if='scope.row.states_'>
							取消
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<!--<list-table :data="table.data" :title="table.title" :setting="table.setting" :loading="table.loading" :columnsOperation="table.columnsOperation"></list-table>-->
		</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	//import {mapGetters, mapActions} from 'vuex'
	import { abandonBurstUpLoad,burstUpLoadInit,getAppList,getBucketMessage,applyPermission } from '../../api/service';
	//import {burstUpLoadInit,listBurstUpLoad,suceesBurstUpLoad,abandonBurstUpLoad,BurstUpLoad,simpleUpLoda,applyPermission,getAppList,getBucketMessage,log} from 'common/api/api';
	import Bus from '../../api/bus';
	import storage from 'utils/local_storage_tool';
	import session from 'utils/session_storage_tool';
	import { hex_md5 } from '../../utils/md5';
	import CoreHeader from '../CoreHeader.vue';
	import ListTable from 'components/awesome/list_table/ListTable.vue';
	//import VueRouter from 'vue-router'
	//import routes from 'src/router'

	//const router = new VueRouter({
	//	routes
	//})
	export default {
		//computed:{
		//  ...mapGetters([
		//    'upload_arr'
		//  ])
		// },
		data() {
			return {
				arr: '',
				projectid: '',
				appid: '',
				appkey: '',
				bucketNmae: '',
				certification: '',
				setting: {
					title: ''
				},
				ts: '',
				signature: '',
				uploadid: '',
				numstates: '',
				token: '',
				tableHeight: 400,
				upload_arr: [],
				table: {
					setting: {

					},
					loading: false,
					title: [{
						prop: "name",
						label: "文件名称"
					}, {
						prop: "size",
						label: "大小",
//					    type: 'slot',   //可自定义插入元素，处理方法，进行格式化操作
//					    computed: function(scope){
//						    let className = scope.row.id === 1 ? "m-success": "m-warning";
//						    return "<span class='show_hide'>" + scope.row.appkey + "</span><span class='hide_show' style='display:none'>.........</span>&nbsp;&nbsp;<span class='hide_show' @click='hideShow' style='background-color: #20b8d5;color: #fff;border-color: #20b8d5;padding:3px 5px;cursor: pointer;border: 1px solid #c4c4c4;border-radius: 4px;'>显示</span><span class='show_hide' style='cursor: pointer;border: 1px solid #c4c4c4;border-radius: 4px;background-color: #20b8d5;color: #fff;border-color: #20b8d5;padding:3px 5px;display:none;'>隐藏</span>";
//					    }
						
					}, {
						prop: "type",
						label: "类型"
					}, {
						prop: "state",
						label: "创建时间",
						type: 'slot',   //可自定义插入元素，处理方法，进行格式化操作
					    computed: function(scope){
					    		return "<el-progress :text-inside='true' v-if='scope.row.states_stop_sta' :stroke-width='18' :percentage='scope.row.state'>"+scope.row.state+"</el-progress>"
//						    return "<span class='show_hide'>" + scope.row.appkey + "</span><span class='hide_show' style='display:none'>.........</span>&nbsp;&nbsp;<span class='hide_show' @click='hideShow' style='background-color: #20b8d5;color: #fff;border-color: #20b8d5;padding:3px 5px;cursor: pointer;border: 1px solid #c4c4c4;border-radius: 4px;'>显示</span><span class='show_hide' style='cursor: pointer;border: 1px solid #c4c4c4;border-radius: 4px;background-color: #20b8d5;color: #fff;border-color: #20b8d5;padding:3px 5px;display:none;'>隐藏</span>";
					    }
					}],
					data: [{
						name:'hajks',
						size:'asa',
						type:'aklsh',
						state:1267
					}],
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
		methods: {
			'open7' (mesa) {
				this.$notify({
					title: '成功',
					message: mesa,
					offset: 100,
					type: 'success',
					duration: 2000
				});
			},
			'open6' (mesa) {
				this.$notify({
					title: '警告',
					message: mesa,
					offset: 200,
					type: 'warning',
					duration: 2000
				});
			},
			open4(mesa) {
				this.$notify({
					title: '提示',
					message: mesa,
					offset: 100,
					duration: 1500
				});
			},
			'deleteRow' (index, rows) {
				rows.splice(index, 1);
				this.open7('任务移除成功！');
				window.sessionStorage.setArr = JSON.stringify(rows);
				if(rows.length === 0) {
					Bus.$emit('fileupnum', '');
				} else {
					Bus.$emit('fileupnum', rows.length.toString());
				}
			},
			'burstUpLoadInit_' (val) {
				let that = this;
				let UpLoadInit_Data = JSON.stringify({
					'appid': this.appid,
					'bucket': this.bucketNmae,
					'certification': this.certification,
					'object': val.row.name
				});
				burstUpLoadInit(UpLoadInit_Data).then(res => {
					if(res.code === 200) {
//						let params_log = {
//							'token': this.token,
//							'level': '1',
//							'uid': this.uid,
//							'msg': res.msg,
//							'app': '初始化分片上传'
//						};
//						log(params_log).then(data => {
//
//						})
						this.uploadid = res.data.uploadid;
						let abandonBurstUpLoadData = JSON.stringify({
							'appid': this.appid,
							'bucket': this.bucketNmae,
							'certification': this.certification,
							'object': val.row.name,
							'uploadid': this.uploadid
						});
						abandonBurstUpLoad(abandonBurstUpLoadData).then(res => {
							if(res.code === 200) {
//								let params_log = {
//									'token': this.token,
//									'level': '1',
//									'uid': this.uid,
//									'msg': res.msg,
//									'app': '放弃分片上传'
//								};
//								log(params_log).then(data => {
//
//								})
								val.row.states_ = false;
								val.row.states_stop = false;
								val.row.states_stop_ = true;
								val.row.states_stop_sta = false;
								this.open7('取消任务成功！');
								let shut_stop = {};
								//shut_stop = {
								//	'name':val.row.name,
								//	'stopnum': '1',
								//}
								for(let i = 0; i < that.upload_arr.length; i++) {
									if(that.upload_arr[i].name === val.row.name) {
										that.upload_arr[i].states_ = false;
										that.upload_arr[i].states_stop = false;
										that.upload_arr[i].states_stop_ = true;
										that.upload_arr[i].states_stop_sta = false;
									}
								}
								//for(let i = 0;i < that.upload_arr.length;i++){
								//	if(that.upload_arr[i].states_stop_sta){
								//		return
								//	}else{
								//		Bus.$emit('fileupnum','');
								//		//console.log(that.upload_arr[i].states_stop_sta)
								//	}
								// 	}
								window.sessionStorage.setArr = JSON.stringify(that.upload_arr);
								//Bus.$emit('fliestop',shut_stop);
							} else {
								let params_log = {
									'token': this.token,
									'level': '3',
									'uid': this.uid,
									'msg': res.msg,
									'app': '放弃分片上传'
								};
//								log(params_log).then(data => {
//
//								})
								this.open6('取消任务失败！')
							}
						})
					} else {
						let params_log = {
							'token': this.token,
							'level': '3',
							'uid': this.uid,
							'msg': res.msg,
							'app': '初始化分片上传'
						};
//						log(params_log).then(data => {
//
//						})
					}
				})
			},
			'getAppList_' () {
//				debugger
				this.bucketNmae = this.$route.params.bucket_key;
				let postData = JSON.stringify({
					'projectid': this.projectid,
					'token': this.token
				});
				getAppList(postData).then(data => {
					if(data.code === 200) {
//						let params_log = {
//							'token': this.token,
//							'level': '1',
//							'uid': this.uid,
//							'msg': data.msg,
//							'app': '获取应用列表'
//						};
//						log(params_log).then(data => {
//
//						})
						if(data.data.apps.length > 0) {
							window.sessionStorage.issync = data.data.apps[0].issync;
							this.appid = data.data.apps[0].appid;
							this.appkey = data.data.apps[0].appkey;
							this.ts = Date.parse(new Date()).toString();
							this.signature = hex_md5(this.appid + this.ts + this.appkey);
							let applyData = JSON.stringify({
								'appid': this.appid,
								'ts': this.ts,
								'signature': this.signature
							});
							let getmessData = JSON.stringify({
								'appid': this.appid,
								'bucket': this.bucketNmae,
								'ts': this.ts,
								'signature': this.signature
							});
							getBucketMessage(getmessData).then(res => {
								if(res.code === 200) {
									let params_log = {
										'token': this.token,
										'level': '1',
										'uid': this.uid,
										'msg': res.msg,
										'app': '获取bucket详细信息'
									};
//									log(params_log).then(data => {
//
//									})
									this.jurisdiction = res.data.acl
								} else {
									let params_log = {
										'token': this.token,
										'level': '3',
										'uid': this.uid,
										'msg': res.msg,
										'app': '获取bucket详细信息'
									};
//									log(params_log).then(data => {
//
//									})
//									if(res.code === 701) {
//										router.push({
//											path: '/home/oss/overview'
//										});
//									}
								}
							})
							applyPermission(applyData).then(response => {
								if(response.code === 200) {
									let params_log = {
										'token': this.token,
										'level': '1',
										'uid': this.uid,
										'msg': response.msg,
										'app': '申请临时凭证'
									};
//									log(params_log).then(data => {
//
//									})
									this.certification = response.data.certification;
								} else {
									let params_log = {
										'token': this.token,
										'level': '3',
										'uid': this.uid,
										'msg': response.msg,
										'app': '申请临时凭证'
									};
//									log(params_log).then(data => {
//
//									})
								}
							})
						} else {
//							this.open4('该项目下尚未开通对象存储，请重新创建应用！');
//							router.push({
//								path: '/home/oss/bucket/newapp'
//							})
						}
					} else {
						let params_log = {
							'token': this.token,
							'level': '3',
							'uid': this.uid,
							'msg': data.msg,
							'app': '获取应用列表'
						};
//						log(params_log).then(data => {
//
//						})
//						if(data.code === 618) {
//							//this.open6('您的登录信息已过期，请重新登录！');
//							router.push({
//								path: '/login'
//							});
//						}
					}
				})
			},
			'close_xhr' (obj) {
				let that = this;
				obj.row.xhr.abort();
				if(obj.row.size > 10 * 1024 * 1024) {
					Bus.$emit('errorNum', obj.row.name);
					this.burstUpLoadInit_(obj);
					//Bus.$emit('fileupnum','');
					obj.row.xhr.abort();
				} else {
					obj.row.states_ = false;
					obj.row.states_stop = false;
					obj.row.states_stop_ = true;
					obj.row.states_stop_sta = false;
					obj.row.xhr.abort();
					this.open7('取消任务成功！');
					for(let i = 0; i < that.upload_arr.length; i++) {
						if(that.upload_arr[i].name === obj.row.name) {
							that.upload_arr[i].states_ = false;
							that.upload_arr[i].states_stop = false;
							that.upload_arr[i].states_stop_ = true;
							that.upload_arr[i].states_stop_sta = false;
						}
					}
					window.sessionStorage.setArr = JSON.stringify(that.upload_arr);
				}
			},
			'contains' (arr, obj) {
				let i = arr.length;
				while(i--) {
					if(arr[i].time === obj) {
						return i;
					}
				}
				return -1;
			}
		},
		mounted: function() {
			this.tableHeight = this.$refs.getHeight.clientHeight - 150;
			let that = this;
			if(window.sessionStorage.setArr) {
				that.upload_arr = JSON.parse(window.sessionStorage.setArr);
				let abc = that.upload_arr.length;
				let arr_num = ''
				if(abc > 0) {
					arr_num = abc.toString();
				} else {
					arr_num = '';
				}
				Bus.$emit('fileupnum', arr_num);
			}
			Bus.$on('nameflie', function(msg) {
				let arrdata = {
					'name': msg.filename_,
					'size': msg.filesize_,
					'state': Math.round(msg.filestatus_ * 100),
					'xhr': msg.xtthr,
					'states_': true,
					'states_stop': true,
					'states_stop_': true,
					'states_stop_sta': true,
					'time': msg.time
				}
				let num;
				if(that.upload_arr.length === 0) {
					that.upload_arr.push(arrdata);
				} else {
					if(that.contains(that.upload_arr, arrdata.time) === -1) {
						that.upload_arr.push(arrdata);
					} else {
						that.upload_arr[that.contains(that.upload_arr, arrdata.time)].xhr = arrdata.xhr
						that.upload_arr[that.contains(that.upload_arr, arrdata.time)].state = arrdata.state
					}
				}
				num = that.upload_arr.length
				if(arrdata.state === 100) {
					for(let i = 0; i < that.upload_arr.length; i++) {
						if(that.upload_arr[i].time === arrdata.time) {
							that.upload_arr[i].states_ = false;
							that.upload_arr[i].states_stop_sta = true;
							that.upload_arr[i].states_stop = true;
							that.upload_arr[i].states_stop_ = true;
						}
					}
				}
				if(arrdata.state === 20000) {
					for(let i = 0; i < that.upload_arr.length; i++) {
						if(that.upload_arr[i].time === arrdata.time) {
							that.upload_arr[i].states_ = false;
							that.upload_arr[i].states_stop = true;
							that.upload_arr[i].states_stop_ = false;
							that.upload_arr[i].states_stop_sta = false;
						}
					}
				}
				let arr_Name = ''
				if(num > 0) {
					arr_Name = num.toString();
				} else {
					arr_Name = '';
				}
				if(!window.sessionStorage.delete || window.sessionStorage.delete === '') {
					window.sessionStorage.setArr = JSON.stringify(that.upload_arr);
					Bus.$emit('fileupnum', arr_Name);
				}
			})
		},
		created() {
			this.bucketNmae = this.$route.params.bucket_key;
			this.setting.title = this.bucketNmae;
			if(window.localStorage.token && window.localStorage.token !== ""){
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
			this.getAppList_();
			//  		if(window.localStorage.token && window.localStorage.token !== ""){
			//	    		this.uid = window.localStorage.name;
			//	    		this.token = window.localStorage.token;
			//	    		if(window.localStorage.proid && window.localStorage.proid !== ""){
			//	    			this.projectid = window.localStorage.proid;
			//	    		}else{
			//	    			this.open6('您尚未创建项目');
			//	    			router.push({path: '/home/oss/newproject'});
			//	    		}
			//	    	}else{
			//	    		router.push({path: '/login'});
			//	    	}
			//  		//this.token = window.localStorage.token;
			//    	window.sessionStorage.bucketName = this.$route.params.bucket_key;
			//   	Bus.$on('name_flie',function(msg){
			//     		
			//     	})
			//  		//this.projectid = window.localStorage.proid;
		},
		components: {
			'core-header': CoreHeader,
			'list-table': ListTable
		}
	}
</script>
<style lang="less" scoped>
	.wrapper {
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
		.wrapper_head {
			padding-left: 20px;
			border-bottom: 1px solid #cecece;
			.page_header {
				height: 65px;
				line-height: 65px;
				font-size: 14px;
				/*border-bottom: 1px solid rgb(188, 194, 199);*/
				div#title {
					float: left;
					>span {
						font-size: 18px;
						font-weight: 600;
						padding-left: 8px;
						border-left: 3px solid #09c;
						i {
							font-size: 30px;
							color: #21b8d5;
							margin-right: 15px;
						}
					}
				}
				div.right_group {
					float: right;
					div {
						height: 45px;
						display: inline-block;
						margin-left: 8px;
					}
				}
			}
		}
	}
	
	.wrapper_main {
		width: 97%;
		/*margin-bottom: 30px;*/
		.main_header {
			height: 40px;
			line-height: 40px;
			.l_title {
				float: left;
				>span {
					font-size: 14px;
					font-weight: 600;
					padding-left: 8px;
					border-left: 3px solid #09c;
				}
			}
		}
	}
</style>