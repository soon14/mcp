<template>
	<div class="wrapper">
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
						<span>Bucket 属性</span>
					</div>
				</div>-->
				<ul class="ul_table">
					<li>
						<p>读写权限</p>
					</li>
				</ul>
				<div class="attr_nav">
					<el-row>
						<el-col :span="3">
							<p id="bucket_tittle">读写权限：</p>
						</el-col>
						<el-col :span="12">
							<el-select v-model="jurisdiction" size='small' placeholder="请选择">
								<el-option v-for="item in jurisdiction_limits" :label="item.label" :value="item.jurisdiction">
								</el-option>
							</el-select>
						</el-col>
					</el-row>
					<p class="attention">» 私有：对object的所有访问操作需要进行身份验证。</p>
					<p>» 公共读：对object写操作需要进行身份验证；可以对object进行匿名读。</p>
					<p>» 公共读写：所有人都可以对object进行读写操作。</p>
					<p style="margin-top: 16px">
						<button type="button" class="el-button el-button--primary" @click='setBucket(jurisdiction)'>
            <span>设置</span>
          </button>
					</p>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import { getAppList, getBucketMessage, setBucket } from '../../api/service';
	import storage from 'utils/local_storage_tool';
	import session from 'utils/session_storage_tool';
	import { hex_md5 } from '../../utils/md5';
	import Bus from '../../api/bus';
	import CoreHeader from '../CoreHeader.vue'
	//	import {getBucketMessage,getAppList,setBucket,log} from 'common/api/api';
	//	import VueRouter from 'vue-router'
	//import routes from 'src/router'
	//import Bus from 'common/api/bus';
	//const router = new VueRouter({
	//	routes
	//})
	export default {
		data() {
			return {
				projectid: '',
				bucketNmae: '',
				appid: '',
				appkey: '',
				uid: '',
				jurisdiction_limits: [{
					jurisdiction: 'private',
					label: '私有'
				}, {
					jurisdiction: 'public-read',
					label: '公共读'
				}, {
					jurisdiction: 'public-read-write',
					label: '公共读写'
				}],
				setting: {
					title: ''
				},
				jurisdiction: '',
				token: ''
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
			'setBucket' (val) {
				let ts = Date.parse(new Date()).toString();
				let signature = hex_md5(this.appid + ts + this.appkey);
				let setbucketData = JSON.stringify({
					'appid': this.appid,
					'bucket': this.bucketNmae,
					acl: val,
					'ts': ts,
					'signature': signature
				});
				setBucket(setbucketData).then(res => {
					if(res.code === 200) {
						//						let params_log = {
						//							'token': this.token,
						//							'level': '1',
						//							'uid': this.uid,
						//							'msg': res.msg,
						//							'app': '设置bucket'
						//						};
						//						log(params_log).then(data => {
						//
						//						})
						this.open7('设置成功！');
					} else {
						//						let params_log = {
						//							'token': this.token,
						//							'level': '3',
						//							'uid': this.uid,
						//							'msg': res.msg,
						//							'app': '设置bucket'
						//						};
						//						log(params_log).then(data => {
						//
						//						})
					}
				})
			},
			'getappid' () {
				let that = this;
				let ts = Date.parse(new Date()).toString();
				this.bucketNmae = this.$route.params.bucket_key;
				this.setting.title = this.bucketNmae;
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
							let signature = hex_md5(this.appid + ts + this.appkey);
							let getmessData = JSON.stringify({
								'appid': this.appid,
								'bucket': this.bucketNmae,
								'ts': ts,
								'signature': signature
							});
							getBucketMessage(getmessData).then(res => {
								if(res.code === 200) {
									//									let params_log = {
									//										'token': this.token,
									//										'level': '1',
									//										'uid': this.uid,
									//										'msg': res.msg,
									//										'app': '获取bucket详细信息'
									//									};
									//									log(params_log).then(data => {
									//
									//									})
									this.jurisdiction = res.data.acl
								} else {
									//									let params_log = {
									//										'token': this.token,
									//										'level': '3',
									//										'uid': this.uid,
									//										'msg': res.msg,
									//										'app': '获取bucket详细信息'
									//									};
									//									log(params_log).then(data => {
									//
									//									})
									if(res.code === 701) {
										router.push({
											path: '/home/oss/overview'
										});
									}
								}
							})
						} else {
							//							router.push({
							//								path: '/home/oss/bucket/newapp'
							//							})
							//							this.open4('该项目下尚未开通对象存储，请重新创建应用！');
						}
					} else {
						//						let params_log = {
						//							'token': this.token,
						//							'level': '3',
						//							'uid': this.uid,
						//							'msg': data.msg,
						//							'app': '获取应用列表'
						//						};
						//						log(params_log).then(data => {
						//
						//						})
						//						if(data.code === 618) {
						//							this.open4('您的登录信息已过期，请重新登录！');
						//							router.push({
						//								path: '/login'
						//							})
						//						}

					}
				})
			}
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
			//			window.sessionStorage.bucketName = this.$route.params.bucket_key;
			//			if(window.localStorage.token && window.localStorage.token !== ""){
			//				this.uid = window.localStorage.name;
			//	    			this.token = window.localStorage.token;
			//	    			if(window.localStorage.proid && window.localStorage.proid !== ""){
			//	    				this.projectid = window.localStorage.proid;
			//	    			}else{
			//	    				this.open4('您尚未创建项目');
			//	    				router.push({path: '/home/oss/newproject'});
			//	    			}
			//	    		}else{
			//	    			router.push({path: '/login'});
			//	    		}
			this.bucketNmae = this.$route.params.bucket_key
			//			//this.token = window.localStorage.token;
			//			//this.projectid = window.localStorage.proid;
			this.getappid();
			//			Bus.$emit('active','2');
		},
		components: {
			'core-header': CoreHeader,
		},
		beforeCreate() {
			//	    		Bus.$on('upload',function(msg){
			//	    //			window.location.reload();
			//	    		})
		}
	}
</script>
<style lang="less" scoped>
	.wrapper {
		height: 100%;
		background-color: #E6E4EA;
		position: relative;
		.wrap {
			/*position: absolute;
			left: 20px;
			top: 20px;
			right: 60px;
			bottom: 20px;*/
			margin-top: 20px;
			padding-bottom: 20px;
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
		.wrapper_main {
			.main_header {
				height: 20px;
				line-height: 20px;
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
			.attr_nav {
				width: 100%;
				margin-top: 20px;
				padding-left: 30px;
				p {
					margin-bottom: 0;
					padding-left: 20px;
					line-height: 2;
				}
				.attention {
					margin-top: 20px;
				}
			}
			.ul_table {
				margin-top: 20px;
				width: 100%;
				border: 1px solid #ccc;
				overflow: hidden;
				padding: 0;
				li {
					height: 50px;
					width: 100%;
					line-height: 50px;
					padding-left: 15px;
				}
				li:nth-of-type(2) {
					border-bottom: 1px solid #ccc;
				}
				li:first-of-type {
					background-color: #CCCCCC;
					p {
						font-size: 16px;
						margin: 0;
						line-height: 50px;
						padding-left: 10px;
						border-left: 5px solid #777;
						height: 50px;
					}
				}
			}
		}
	}
</style>