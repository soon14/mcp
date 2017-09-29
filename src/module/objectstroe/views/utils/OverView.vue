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
						<span>Bucket 概览</span>
					</div>
				</div>-->
				<ul class="bucketMessage">
					<li>
						<span>所在区域：</span>
						<span>{{address}}</span>
					</li>
					<li>
						<span>使用容量：</span>
						<span>{{memory}}</span>
					</li>
					<li>
						<span>创建时间：</span>
						<span>{{createtime}}</span>
					</li>
				</ul>
				<ul class="ul_table">
					<li>
						<p>OSS域名</p>
					</li>
					<li> <span> OSS外网域名： </span> <span> {{domain}} </span> </li>
					<li> <span> OSS内网域名： </span> <span> {{domainDNS}} </span> </li>
				</ul>
				<ul class="ul_table">
					<li>
						<p>基础配置</p>
					</li>
					<li> <span> Bucket权限： </span> <span> {{acl}} </span>
						<router-link :to="'/object/detail/attribute/'+bucketNmae">设置</router-link>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import { getAppList, getBucketMessage } from '../../api/service';
	//	import {getBucketMessage,getAppList,log} from 'common/api/api';
	import VueRouter from 'vue-router';
	import storage from 'utils/local_storage_tool';
	import session from 'utils/session_storage_tool';
	import { hex_md5 } from '../../utils/md5';
	import Bus from '../../api/bus';
	import CoreHeader from '../CoreHeader.vue'
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
				address: '',
				memory: '',
				createtime: '',
				domain: '暂无',
				domainDNS: '',
				acl: '',
				setting: {
					title: ''
				},
				token: ''
			}
		},
		methods: {
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
						//		      			let params_log = {'token':this.token,'level':'1','uid':this.uid,'msg':data.msg,'app':'获取应用列表'};
						//			    			log(params_log).then(data => {
						//				    			
						//				    		})
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
									//			      					let params_log = {'token':this.token,'level':'1','uid':this.uid,'msg':res.msg,'app':'获取bucket详细信息'};
									//						    			log(params_log).then(data => {
									//							    			
									//							    		})
									this.address = res.data.region.chinesename;
									if(res.data.usage.size_kb > 1024) {
										this.memory = Math.round((res.data.usage.size_kb / 1024) * 10) / 10 + 'M';
									} else if(res.data.usage.size_kb > 1024 * 1024) {
										this.memory = Math.round((res.data.usage.size_kb / 1024 * 1024) * 10) / 10 + 'G';
									} else {
										this.memory = res.data.usage.size_kb + 'KB';
									}
									this.createtime = res.data.createtime;
									this.domainDNS = res.data.region.dns;
									if(res.data.acl === 'public-read') {
										this.acl = '公有读';
									} else if(res.data.acl === 'private') {
										this.acl = '私有';
									} else {
										this.acl = '公有读写';
									}
								} else {
									//			      					let params_log = {'token':this.token,'level':'3','uid':this.uid,'msg':res.msg,'app':'获取bucket详细信息'};
									//						    			log(params_log).then(data => {
									//							    			
									//							    		})
									//							    		if(res.code === 701){
									//							    			router.push({path: '/home/oss/overview'});
									//							    		}
								}

							})
						} else {
							//		      				this.open4('该项目下尚未开通对象存储，请重新创建应用！');
							//	      					router.push({path: '/home/oss/bucket/newapp'})
						}

					} else {
						//		      			let params_log = {'token':this.token,'level':'3','uid':this.uid,'msg':data.msg,'app':'获取应用列表'};
						//			    			log(params_log).then(data => {
						//				    			
						//				    		})
						//				    		if(data.code === 618){
						//				    			this.open4('您的登录信息已过期，请重新登录！');
						//		      				router.push({path: '/login'})
						//				    		}
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
			this.bucketNmae = this.$route.params.bucket_key
			//			//this.token = window.localStorage.token;
			//			//this.projectid = window.localStorage.proid;
			this.getappid();
			//			Bus.$emit('active','2');
		},
		beforeCreate() {
			Bus.$on('upload', function(msg) {
				//window.location.reload();
			})
		},
		components: {
			'core-header': CoreHeader,
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
	}
	
	#table1 tbody tr td:last-child a {
		margin-right: 8px;
		&:last-child {
			margin-right: 0px;
		}
	}
	
	.wrapper_main {
		width: 96%;
		.bucketMessage {
			width: 100%;
			overflow: hidden;
			border: 1px solid #ccc;
			>li {
				width: 33%;
				float: left;
				text-align: center;
				line-height: 60px;
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
	
	.wrapper_main .main_header {
		height: 40px;
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
</style>