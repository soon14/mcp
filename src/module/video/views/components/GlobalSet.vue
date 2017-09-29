<template>
	<div id="video_set" ref='get_golHeight'>
		<el-dialog :title="dealName" v-model="dialogVisible" size="small" style="width: 1000px;margin-left: auto;margin-right: auto;" :close-on-click-modal="false">
			<div id="set_nav">
				<el-row>
					<el-col :span="5"><i class="glyphicon glyphicon-asterisk"></i>&nbsp;<span id="">分类名称</span>&nbsp;&nbsp;</el-col>
					<el-col :span="18">
						<input :class="titlewarnning?'videotitlewarnning':''" id="videotitlewarnning" placeholder="最多不超过70字符" v-model="setName" @input="getvideTitle(setName)" @blur="getvide_Title(setName)" />
					</el-col>
				</el-row>
				<el-row>
					<el-col :span="5">&nbsp;&nbsp;&nbsp;&nbsp;<span id="">分类描述</span>&nbsp;&nbsp;</el-col>
					<el-col :span="18">
						<textarea id="videodesc" maxlength="128" @input="getdescription(setDescribe)" rows="3" placeholder="最多不超过128字符" v-model="setDescribe"></textarea>
						<!--<el-input type="textarea" autosize placeholder="最多不超过128个字符" v-model="setDescribe"></el-input>-->
					</el-col>
				</el-row>
			</div>
			<span slot="footer" class="dialog-footer">
		  	<el-button type="primary" @click="doIt" :disabled="setName===''?true:false">确 定</el-button>
		    <el-button @click="clossdialog()">取 消</el-button>
		  </span>
		</el-dialog>
		<div id="video_open_tittle">
			<p>全局设置</p>
		</div>
		<div id="video_set_nav">
			<div id="video_set_nav_tittle">
				<div id="video_set_nav_left">
					<span id="">
						分类设置
					</span>
				</div>
				<div id="video_set_nav_right">

				</div>
			</div>
			<div id="video_set_nav_list" :style="'max-height:' + (gol_height) + 'px'">
				<div id="video_set_nav_add_btn" @click="handleOpen()" v-if="typeData">
					+&nbsp;添加分类
				</div>
				<div id="video_set_nav_type_list" v-if="!typeData">
					<ul>
						<li v-for="data in data">
							<div id="set_first">
								<div id="set_text" :title="data.description">
									<span v-if="data.subcateList">
										<i class="el-icon-caret-right" style="cursor: pointer;" @click="select(data.cateId)" :id="data.cateId + 'asa'"></i>
									</span>
									<span>&nbsp;&nbsp;{{data.name}}</span>
								</div>
								<div id="set_edit">
									<div id="set_icon" @click="beforeEdit(data.cateId,data.name,data.description)">
										<li class="edit"></li>
									</div>
									<div id="set_icon1" @click="beforeAdd(-1)">
										<li class="set_menu"></li>
									</div>
									<div id="set_icon2" @click="beforeAdd(data.cateId)">
										<li class="set_menu_child"></li>
									</div>
									<div id="set_icon3" @click="del(data.cateId)">
										<li class="set_delete"></li>
									</div>
								</div>
							</div>
							<ul :id="data.cateId" class="second">
								<li v-for="dataChild in data.subcateList">
									<div id="set_first">
										<div id="set_text" :title="dataChild.description">
											<span v-if="dataChild.subcateList">
												<i class="el-icon-caret-right" style="cursor: pointer;" @click="select(dataChild.cateId)" :id="dataChild.cateId + 'asa'"></i>
											</span>
											<span>&nbsp;&nbsp;{{dataChild.name}}</span>
										</div>
										<div id="set_edit">
											<div id="set_icon" @click="beforeEdit(dataChild.cateId,dataChild.name,dataChild.description)">
												<li class="edit"></li>
											</div>
											<div id="set_icon1" @click="beforeAdd(data.cateId)">
												<li class="set_menu"></li>
											</div>
											<div id="set_icon2" @click="beforeAdd(dataChild.cateId)">
												<li class="set_menu_child"></li>
											</div>
											<div id="set_icon3" @click="del(dataChild.cateId)">
												<li class="set_delete"></li>
											</div>
										</div>
									</div>
									<ul :id="dataChild.cateId" class="second">
										<li v-for="dataChildChild in dataChild.subcateList">
											<div id="set_first">
												<div id="set_text" :title="dataChildChild.description">
													<span>&nbsp;&nbsp;{{dataChildChild.name}}</span>
												</div>
												<div id="set_edit">
													<div id="set_icon" @click="beforeEdit(dataChildChild.cateId, dataChildChild.name, dataChildChild.description)">
														<li class="edit"></li>
													</div>
													<div id="set_icon1" @click="beforeAdd(dataChild.cateId)">
														<li class="set_menu"></li>
													</div>
													<div id="set_icon3" @click="del(dataChildChild.cateId)">
														<li class="set_delete"></li>
													</div>
												</div>
											</div>
										</li>
									</ul>
								</li>
							</ul>
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import { videocategorylist, videocategoryadd, videocategoryupdate, videocategorydel, requireNullMsg, maxLengthTest, delHtmlTag, videoapplist } from '../../api/service';
	import storage from 'utils/local_storage_tool';
	import session from 'utils/session_storage_tool';
	import { hex_md5 } from '../../utils/md5';
	import Bus from '../../api/bus';
	import { Notification } from 'element-ui';
	
//	import Vue from 'vue'
//	import VueRouter from 'vue-router';
//	import axios from 'axios';
//	import { videocategorylist, videocategoryadd, videocategoryupdate, videocategorydel, requireNullMsg, maxLengthTest, log, delHtmlTag } from 'common/api/video';
//	import routes from 'src/router';
//	import Bus from 'common/api/bus';
//	const router = new VueRouter({
//		// mode: 'history',
//		routes
//	})
	let id = 1000
	export default {
		data() {
			return {
				uid:'',
				token:'',
				projectid: '',
				isadd: '',
				titlewarnning: false,
				title_warnning: false,
				dealName: "创建分类", //新建分类显示创建分类，修改分类显示修改分类
				gol_height: 450,
				setDescribe: '',
				currentAddId: "", //添加项的父id
				currentEditId: "", //当前需要编辑的id
				setName: '',
				changeName: true,
				dialogVisible: false,
				typeData: false,
				isfisrt:false,
				data: []
			}
		},
		methods: {
			//树形节点
			select(str) {
				let obj = document.getElementById(str);
				let obj1 = document.getElementById(str + 'asa');
				if(obj.style.display === "block") {
					obj.style.display = "none";
					obj1.className = "el-icon-caret-right"
				} else {
					obj.style.display = "block";
					obj1.className = "el-icon-caret-bottom"
				}
			},
			//显示对话跨
			handleOpen() {
				this.titlewarnning = false;
				this.dialogVisible = true
			},
			//关闭对话框
			clossdialog() {
				this.titlewarnning = false;
				this.dialogVisible = false
				this.setName = '';
				this.setDescribe = '';
			},
			getList() {
				let ts = Date.parse(new Date()).toString();
				let signature = hex_md5(window.sessionStorage.videoappid + ts + window.sessionStorage.videoappkey);
				let postData = {
					"appid": window.sessionStorage.videoappid,
					"ts": ts,
					"signature": signature
				}
				videocategorylist(postData).then(data => {
					if(data.code === 200) {
						if(data.data.length > 0) {
							this.data = data.data;
							this.typeData = false;
						} else {
							this.typeData = true;
						}
					}
				})
			},
			doIt() {
				if(this.currentAddId) {
					this.add();
				} else if(this.currentEditId) {
					this.edit();
				} else {
					this.add();
				}
			},
			beforeAdd(id) {
				this.titlewarnning = false;
				this.dialogVisible = true;
				this.dealName = "创建分类";
				this.currentAddId = id;
			},
			add() {
				if(requireNullMsg(this, this.setName, "标签名称不能为空.")) return;
				if(maxLengthTest(this, this.setName, 70, "分类标题最长不超过70个字符")) return;
				if(maxLengthTest(this, this.setDescribe, 128, "分类描述最长不超过128个字符")) return;
				this.titlewarnning = false;
				this.dialogVisible = false;
				if(this.currentAddId === '') {
					this.currentAddId = null
				}
				console.log(this.currentAddId)
				let postData = JSON.stringify({
					"appid": window.sessionStorage.videoappid,
					"token": window.localStorage.token,
					'parentId': this.currentAddId != null ? this.currentAddId : -1,
					"name": this.setName,
					"description": this.setDescribe
				})
				videocategoryadd(postData).then(data => {
					if(data.code === 200) {
						this.currentAddId = null;
						this.setName = "";
						this.setDescribe = "";

						this.$notify({
							title: '成功',
							message: '添加分类成功！',
							type: 'success'
						});
						this.getList();
					}
				})
			},
			beforeEdit(id, strname, strdrc) {
				this.setName = strname;
				this.setDescribe = strdrc;
				this.titlewarnning = false;
				this.dialogVisible = true;
				this.dealName = "修改分类";
				this.currentEditId = id;
			},
			edit(id, pid) {
				if(requireNullMsg(this, this.setName, "标签名称不能为空.")) return;
				if(maxLengthTest(this, this.setName, 70, "分类标题最长不超过70个字符")) return;
				if(maxLengthTest(this, this.setDescribe, 128, "分类描述最长不超过128个字符")) return;
				this.titlewarnning = false;
				this.dialogVisible = false;
				let postData = JSON.stringify({
					"appid": window.sessionStorage.videoappid,
					"token": window.localStorage.token,
					'cateId': this.currentEditId,
					"name": this.setName,
					"description": this.setDescribe
				})
				videocategoryupdate(postData).then(data => {
					if(data.code === 200) {
						this.currentEditId = null;
						this.setName = "";
						this.setDescribe = "";
						this.$notify({
							title: '成功',
							message: '修改分类成功！',
							type: 'success'
						});
						this.getList();
					}
				})
			},
			del(id) {
				this.$confirm('确认删除该分类?', '提示', {
					closeOnClickModal: false,
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let postData = JSON.stringify({
						"appid": window.sessionStorage.videoappid,
						token: window.localStorage.token,
						'cateId': id
					})
					videocategorydel(postData).then(data => {
						this.getList();
					})
				}).catch((e) => {
					console.log(e);
				});
			},
			getVideoName() {
				console.log(this.setName)
			},
			changename() {
				console.log(this.setName)
			},
			getvide_Title(str) {
				//				if(requireNullMsg(this, str, "标签名称不能为空.")) {
				//					this.titlewarnning = true;
				//					return;
				//				}else{
				//					this.titlewarnning = false;
				//				}
				//				if(maxLengthTest(this, str, 70, "分类标题最长不超过70个字符")) {
				//					this.titlewarnning = true;
				//					return;
				//				}else{
				//					this.titlewarnning = false;
				//				}
			},
			//判断描述是否正确
			getdescription(str) {
				let viname = delHtmlTag(str)
				if(str.length > 128) {
					this.setDescribe = str.substring(0, 128);
				} else if(viname === "") {
					this.setDescribe = ''
				}
				//				if(maxLengthTest(this, str, 128, "视频描述最长不超过128个字符")) return;
			},
			//判断ie浏览器
			isIE(){
//				let v = 3;
//				let div = document.createElement('div');
//				let all = div.getElementsByTagName('i');
//	            while (
//	                div.innerHTML = '<!--[if gt IE ' + (++v) + ']><i></i><![endif]-->',
//	                all[0]
//	            );
//	            return v > 4 ? v : false;
				if (!!window.ActiveXObject || "ActiveXObject" in window) {
					return true;
				}else{
					return false
				}
			},
			getvideTitle(str) {
				//				let viname = delHtmlTag(str);
				if (this.isfisrt) {
					let viname = delHtmlTag(str)
					if(viname === "" || str.length > 70) {
						this.setName = str.substring(0, 70);
						if(viname === "") {
							this.setName = '';
							this.titlewarnning = true;
						}
					} else {
						this.titlewarnning = false;
					}
				}
				this.isfisrt = true;
				
			},
			//获取应用列表
			videoapplist_() {
				if(window.localStorage.token) {
					let postData = JSON.stringify({
						//						"token": "klasehikfjgdjsgfjhdgshj",
						"token": this.token,
						'projectid': this.projectid
					})
					videoapplist(postData).then(data => {
						if(data.code === 200) {
							if(data.data.apps.length > 0) {
								this.tableData = data.data.apps;
								this.appid = data.data.apps[0].appid;
								window.sessionStorage.videoappid = data.data.apps[0].appid;
								window.sessionStorage.videoappkey = data.data.apps[0].appkey;
							} else {
								Notification.error('该项目下尚未开通视频点播，请开通应用再继续其他操作！');
								this.$router.replace('/video/create');
								//								router.push({
								//									path: '/home/videoCreate'
								//								});
							}
						}
					})
				}

			}
		},
		created() {
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
//			if(window.sessionStorage.videoappid === '' || !window.sessionStorage.videoappid || window.sessionStorage.videoappkey === '' || !window.sessionStorage.videoappkey) {
//				router.push({
//					path: '/home/video/app/appmanage'
//				});
//			}
			this.videoapplist_();
			this.getList();
		},
		components: {

		},
		mounted() {
			let that = this;
//			let video_height = this.$refs.get_golHeight.clientHeight - 185;
//			this.gol_height = video_height;
			window.sessionStorage.video_File = window.sessionStorage.videoFile;
			Bus.$on('videoFlieAll', function(msg) {
				Bus.$emit('videoFileSelect', msg);
			})
			Bus.$on('fileTime', function(msg) {
				Bus.$emit('getfileTime', msg);
			})
		}
	}
</script>
<style lang="less" scoped>
	.videotitlewarnning {
		/*color: red;*/
		border: 1px solid red !important;
	}
	/*.videotitlewarnning::-webkit-input-placeholder{
		color: red;
	}
	.videotitlewarnning::-moz-placeholder{
		color: red;
	}
	.videotitlewarnning:-moz-placeholder{
		color: red;
	}
	.videotitlewarnning:-ms-input-placeholder{
		color: red;
	}*/
	
	#video_set {
		width: 98%;
		height: 100%;
		margin: 0 auto;
		/*padding: 0 15px;*/
		#set_nav {
			width: 100%;
			padding: 20px 15px;
			border-top: 1px solid #D3DCE6;
			border-bottom: 1px solid #D3DCE6;
			margin-top: -15px;
			input:focus {
				/*outline: none;*/
				border: 1px solid #0190FE !important;
			}
			input[class=videotitlewarnning]:focus {
				outline: none;
				border: 1px solid red !important;
			}
			textarea {
				resize: none;
				border: 1px solid #8391A5 !important;
			}
			textarea:focus {
				/*outline: none;*/
				border: 1px solid #0190FE !important;
			}
			#videotitlewarnning {
				width: 100%;
				height: 30px;
				border: 1px solid #8391A5;
			}
			#videodesc {
				border: 1px solid #8391A5;
				width: 100%;
			}
			.el-row {
				margin-bottom: 10px;
				.el-col {
					line-height: 30px !important;
					i {
						font-size: 8px;
						color: red;
					}
				}
			}
		}
		#video_open_tittle {
			width: 100%;
			padding-top: 1px;
			height: 60px;
			border-bottom: 1px solid #D3DCE6;
			text-align: left;
			p {
				margin-top: 16px;
				font-size: 16px;
				font-weight: bold;
				padding-left: 15px;
				height: 16px;
				border-left: 3px solid #09c;
				line-height: 16px;
			}
		}
		#video_set_nav {
			width: 100%;
			margin-top: 15px;
			#video_set_nav_tittle {
				height: 50px;
				position: relative;
				#video_set_nav_left {
					position: absolute;
					left: 0;
					top: 0;
					border-left: 1px solid #D3DCE6;
					border-right: 1px solid #D3DCE6;
					border-top: 2px solid #09c;
					width: 120px;
					height: 40px;
					line-height: 40px;
					text-align: center;
				}
				#video_set_nav_right {
					position: absolute;
					left: 120px;
					right: 0;
					top: 0;
					height: 40px;
					border-bottom: 1px solid #D3DCE6;
				}
			}
			#video_set_nav_list {
				width: 100%;
				margin-top: 15px;
				overflow: auto;
				#video_set_nav_add_btn {
					cursor: pointer;
					width: 400px;
					height: 40px;
					text-align: center;
					line-height: 38px;
					border: 1px solid #D3DCE6;
				}
				#video_set_nav_add_btn:hover {
					border: 1px solid #09c;
				}
				#video_set_nav_type_list {
					width: 100%;
					>ul>li {
						.second {
							margin-left: 15px;
							display: none;
						}
						#set_first {
							display: block;
							position: relative;
							color: #000000;
							width: 100%;
							height: 30px;
							line-height: 30px;
							overflow: hidden;
							/*padding-left: 10px;*/
							#set_text {
								text-overflow: ellipsis;
								white-space: nowrap;
								width: 100%;
								overflow: hidden;
								float: left;
								>i {
									cursor: pointer;
								}
								>span {
									.off {
										display: none;
									}
								}
							}
							#set_edit {
								position: absolute;
								right: 20px;
								top: 0;
								overflow: hidden;
								display: none;
								/*float: right;*/
								font-size: 15px;
								padding-right: 20px;
								#set_icon,
								#set_icon1,
								#set_icon2,
								#set_icon3 {
									cursor: pointer;
									float: left;
									width: 30px;
									height: 30px;
									text-align: center;
									padding-top: 6px;
									padding-left: 6px;
									line-height: 30px;
									>li {
										width: 18px;
										height: 18px;
									}
									.edit {
										background: url(../../mock/img/edit.png) no-repeat;
										background-size: 100% 100%;
									}
									.set_menu {
										background: url(../../mock/img/menu.png) no-repeat;
										background-size: 100% 100%;
									}
									.set_menu_child {
										background: url(../../mock/img/menu_child.png) no-repeat;
										background-size: 100% 100%;
									}
									.set_delete {
										background: url(../../mock/img/delete.png) no-repeat;
										background-size: 100% 100%;
									}
								}
								#set_icon:hover {
									background-color: #000000;
									.edit {
										background: url(../../mock/img/edit_hover.png) no-repeat;
										background-size: 100% 100%;
									}
								}
								#set_icon1:hover {
									background-color: #000000;
									.set_menu {
										background: url(../../mock/img/menu_hover.png) no-repeat;
										background-size: 100% 100%;
									}
								}
								#set_icon2:hover {
									background-color: #000000;
									.set_menu_child {
										background: url(../../mock/img/menu_child_hover.png) no-repeat;
										background-size: 100% 100%;
									}
								}
								#set_icon3:hover {
									background-color: #000000;
									.set_delete {
										background: url(../../mock/img/delete_hover.png) no-repeat;
										background-size: 100% 100%;
									}
								}
							}
						}
						#set_first:hover {
							background-color: #EFF2F7;
							>#set_edit {
								display: inline-block;
							}
						}
					}
				}
			}
		}
	}
</style>