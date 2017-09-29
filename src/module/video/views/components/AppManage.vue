<template>
	<div id="video_app">
		<div id="video_open_tittle">
			<p>应用管理</p>
			<el-button id="newCreateApp" size="small" type="primary" @click="createApp()" :disabled="isable">&nbsp;创建应用&nbsp;</el-button>
		</div>
		<div id="video_app_list">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="appid" label="应用ID" min-width="180px">
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
				<el-table-column prop="appkey" label="密钥" min-width="180">
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
				<el-table-column prop="createtime" label="创建时间" width="200">
				</el-table-column>
				<el-table-column prop="status" label="状态" width="100">
					<template scope="scope">
						<span id="statusVideo">
							{{scope.row.status==='1'?'启用中':'已禁用'}}
						</span>
					</template>
				</el-table-column>
				<!--<el-table-column label="操作" width="120">
					<template scope="scope">
						<el-button type="text" size="small" @click="stopApp()">{{scope.row.status==='1'?'禁用':'启用'}}</el-button>
					</template>
				</el-table-column>-->
			</el-table>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import { videoapplist,videosetstate } from '../../api/service';
	import storage from 'utils/local_storage_tool';
	import session from 'utils/session_storage_tool';
	import { hex_md5 } from '../../utils/md5';
	import Bus from '../../api/bus';
	import { Notification } from 'element-ui';
//	import Vue from 'vue'
//	import VueRouter from 'vue-router';
//	import routes from 'src/router';
//	import { videoLogin, requestgetUserProject, videoapplist, videosetstate, log } from 'common/api/video';
//	import Bus from 'common/api/bus';
//
//	const router = new VueRouter({
//		// mode: 'history',
//		routes
//	})
	export default {
		data() {
			return {
				appid: "",
				projectid: '',
				uid: '',
				token: '',
				hide: true,
				requestData_:false,
				tableData: []
			}
		},
		computed:{
	    		isable() {
	    			if(this.tableData.length === 0){
	    				return false;
	    			}else{
	    				return true;
	    			}
	    		}
	    },
		methods: {
			open2(mes) {
				this.$message({
					message: mes,
					type: 'success'
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
			open7(mesa) {
				this.$notify.success({
					title: '成功',
					message: mesa,
					offset: 100,
					duration: 1000
				});
			},
			'hideShow' () {
				if(this.hide) {
					this.hide = false;
				} else {
					this.hide = true;
				}
			},
			'mouseenter_' (id) {
				let abcd = document.getElementById(id);
				abcd.select();
				document.execCommand('Copy');
				this.open2('复制' + id + '成功')
			},
			requestData() {
				let postData = JSON.stringify({
					"token": this.token,
					'projectid': this.projectid
				})
				videoapplist(postData).then(data => {
					if (data.code === 200) {
						if(data.data.apps.length > 0) {
							if (data.data.apps[0].isShow === "true") {
								this.requestData_ = true;
								this.tableData = data.data.apps;
								this.appid = data.data.apps[0].appid;
								window.sessionStorage.videoappkey = data.data.apps[0].appkey;
							}else{
								this.requestData_ = false;
							}
							this.videoappid = data.data.apps[0].appid
							window.sessionStorage.videoappid = data.data.apps[0].appid;
						} else {
							Notification.error('该项目下尚未开通视频点播，请开通应用再继续其他操作！');
							this.$router.replace('/video/create');
//							router.push({
//								path: '/home/videoCreate'
//							});
						}
					}
				})
			},
			createApp() {
				let postSetstate = JSON.stringify({
					'uid': this.uid,
					"token": this.token,
					'projectId': this.projectid,
					'appid': this.videoappid,
					"isShow": 'true'
				});
				videosetstate(postSetstate).then(res => {
					if (res.code === 200) {
						this.requestData_ = true;
						this.requestData();
					}
				})
			}
		},
		beforeCreate: function(){
//			if (window.sessionStorage.isonreload === "true") {
//				window.sessionStorage.isonreload = ""
//				window.location.reload();
//			}
		},
		created() {
//			if (window.localStorage.token === '' || !window.localStorage.token) {
//				router.push({
//					path: '/login'
//				});
//			}
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
			this.requestData();
			Bus.$emit('active', '2');
			Bus.$emit('videoMenu','appmanage');
		},
		components: {

		},
		mounted() {
			
			let that = this;
			window.sessionStorage.video_File = window.sessionStorage.videoFile;
			Bus.$on('videoFlieAll', function(msg) {
				Bus.$emit('videoFileSelect', msg);
			})
			Bus.$on('fileTime',function(msg){
	    			Bus.$emit('getfileTime',msg);
	    		})
		}
	}
</script>
<style lang="less" scoped>
	#video_app {
		width: 98%;
		height: 100%;
		margin: 0 auto;
		/*padding: 0 15px;*/
		#video_open_tittle {
			width: 100%;
			padding-top: 1px;
			height: 60px;
			border-bottom: 1px solid #D3DCE6;
			text-align: left;
			p {
				margin-top: 16px;
				float: left;
				font-size: 16px;
				font-weight: bold;
				padding-left: 15px;
				height: 16px;
				border-left: 3px solid #09c;
				line-height: 16px;
			}
			#newCreateApp {
				line-height: 15px;
				margin-top: 16px;
				float: right;
				margin-right: 20px;
			}
		}
		#statusVideo{
			color: #09c;
		}
		#video_app_list {
			overflow-x: auto;
			width: 100%;
			margin-top: 15px;
		}
	}
</style>