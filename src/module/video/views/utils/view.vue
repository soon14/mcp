<template>
	<div id="video_edit_nav" ref='get_editHeight'>
		<el-dialog title="生成二维码" size="mini" v-model="dialogCore" :close-on-click-modal="false">
			<div id="getcorenav">
				<div id="video_time">
					<div id="">
						<label id="">有效期&nbsp;&nbsp;</label>
						<el-input
						  id="tist"
						  :placeholder="timestart"
						  v-model="timestart"
						  :disabled="true">
						</el-input>
						<!--<el-date-picker v-model="timestart" align="right" type="date" :editable="false" @click="selectStart(timestart)" placeholder="选择开始日期" :picker-options="pickerstart">
						</el-date-picker>-->
						&nbsp;&nbsp;至&nbsp;&nbsp;
						<el-date-picker v-model="timeend" align="right" type="date" format="yyyy/MM/dd" :editable="false" placeholder="永久有效" :picker-options="pickerend">
						</el-date-picker>
					</div>
					<div id="tooltip">
						<label id="">提示：&nbsp;&nbsp;</label>
						<span id="">
		  				系统不保存二维码信息，二维码生成之后，请立即手动存储二维码信息！
		  			</span>
					</div>
				</div>
			</div>
			<span slot="footer" class="dialog-footer">
		  	<el-button type="primary" @click="getcodepic()" :disabled="issettime">确 定</el-button>
		    <el-button @click="dialogCore = false">取 消</el-button>
		  </span>
		</el-dialog>
		<div id="dialoggetcode" v-if="isshowcore" @click="isshowcore = false">
			<div id="opencorepic" :style="'background: url(' + codePicData + ') no-repeat;background-size: 100% 100%;'">

			</div>
		</div>
		<div id="video_edit_tittle">
			<p @click="test">视频详情</p>
		</div>
		<div id="video_edit_detail" :style="'max-height:' + edit_height + 'px'">
			<div id="video_message">
				<div id="video_edit_pic" :style="video.coverURL?'background: url('+video.coverURL+') no-repeat;background-size: 100% 100%;':'background: rgba(215,215,215,1)'">
					<p v-if="!video.coverURL">美的云</p>
				</div>
				<div id="video_edit_text">
					<p>{{video.title}}</p>
					<p id="video_edit_name">视频ID：{{video.videoId}}</p>
					<p id="video_edit_name">视频时长：{{video.duration | videoTime}}</p>
					<p id="video_edit_name">视频大小：{{video.size | capacity}}</p>
					<p id="video_edit_name">创建时间：{{video.createTime}}</p>
					<p id="video_edit_name">更新时间：{{video.modifyTime}}</p>
				</div>
				<div id="video_edit_code">
					<p id="video_edit_code_tittle" @click="showTimeSet()">点击生成二维码</p>
					<div id="video_edit_code_pic" @click="showcorepic()" v-if="codePicData_">
						<img id="videoDetailImg" :src="codePicData" width="110" height="110" />
						<!--<vue-q-art :config="config" :downloadButton="downloadButton"></vue-q-art>-->
					</div>
					<p class="freeTime" v-if="codePicData_">有效期：{{freetime}}</p>
				</div>
			</div>
			<div id="video_edit_nav_edit">
				<p>编辑信息</p>
				<div id="tittle_video_edit">
					<el-row style="height: 30px;line-height: 30px;">
						<el-col style="float: left;width: 80px;">
							&nbsp;&nbsp;<i class="glyphicon glyphicon-asterisk"></i>&nbsp;标题
						</el-col>
						<el-col :span="12">
							<input type="text" name="" id="video_text_edit" :class="titlewarnning?'videotitlewarnning':''" @input="getvideTitle(video.title)" @focus="nowarnning_(video.title)" @blur="iswarnning_(video.title)" placeholder="最多不超过50个字符" v-model="video.title" />
						</el-col>
					</el-row>
					<el-row style="margin-top: 20px;">
						<el-col style="float: left;width: 80px;text-align: center;">
							描述
						</el-col>
						<el-col :span="12">
							<textarea maxlength="128" style="width: 100%;height: 120px;" :class="title_warnning?'videotitlewarnning':''"  @input="getdescription(description)" placeholder="最多不超过128个字符" v-model="description">{{video.description}}</textarea>
						</el-col>
					</el-row>
					<el-row style="margin-top: 20px;height: 30px;">
						<el-col style="float: left;width: 80px;text-align: center;">
							分类
						</el-col>
						<el-col :span="10" style="float: left;text-align: center;position: relative;">
							<div id="video_edit_type_select" @click.stop="showcalssifySelect()">
								<p>{{video.cateName3||video.cateName2||video.cateName1||"未分类"}}</p>
								<div id="video_edit_type_select_icon">
									<i class="el-icon-caret-bottom"></i>
								</div>
							</div>
							<div id="video_edit_type_list" v-show="classfiy_select">
								<ul>
									<!--<p>
										<a>全部</a>
									</p>-->
									<li @click="setCategray(null, null, null, null)">
										<a>未分类</a>
									</li>
									<li>
										<div id="">
											<ul>
												<li v-for="data in select_data">
													<div id="set_first">
														<div id="set_text">
															<span v-if="data.subcateList"><i class="el-icon-caret-right" style="cursor: pointer;" @click="select(data.cateId)" :id="data.cateId + 'asa'"></i></span>
															<span id="childlast" :title="data.name" @click="setCategray(data.cateId, data.name, null, null)">{{data.name}}</span>
														</div>
													</div>
													<ul :id="data.cateId" class="second">
														<li v-for="dataChild in data.subcateList">
															<div id="set_first">
																<div id="set_text">
																	<span v-if="dataChild.subcateList">
																			<i class="el-icon-caret-right" style="cursor: pointer;" @click="select(dataChild.cateId)" :id="dataChild.cateId + 'asa'"></i>
																	</span>
																	<span id="childlast" :title="dataChild.name" @click="setCategray(dataChild.cateId, data.name, dataChild.name, null)">{{dataChild.name}}</span>
																</div>
															</div>
															<ul :id="dataChild.cateId" class="second">
																<li v-for="dataChildChild in dataChild.subcateList">
																	<div id="set_first">
																		<div id="set_text" @click="setCategray(dataChildChild.cateId, data.name, dataChild.name, dataChildChild.name)">
																			<span id="childlast" :title="dataChildChild.name">{{dataChildChild.name}}</span>
																		</div>
																	</div>
																</li>
															</ul>
														</li>
													</ul>
												</li>
											</ul>
										</div>
									</li>
								</ul>
							</div>
						</el-col>
						<el-col :span="2" style="float: left;text-align: center;color: #09c;line-height: 30px;">
							<router-link to="/video/globalset" id="" style="color: #09c;">管理分类</router-link>
						</el-col>
					</el-row>
					<el-row style="margin-top: 20px;">
						<!--<el-col style="float: left;width: 75px;text-align: center;line-height: 30px;">
							标签
						</el-col>
						<div id="" style="float: left;max-width: 80%;" v-if="!show_tag">
							<input type="text" v-model="tags" name="" id="video_tags" value="" @keydown.enter='addTagsVideo()'/>
							<div id="video_tag_trun">
								<div id="video_tags_edit" @click="addTagsVideo()"></div>
							</div>
						</div>-->
						<!--<div id="" style="float: left;max-width: 80%;" v-if="show_tag">
							<p id="tag_video" v-for="(tag,index) in video.tags">
								{{tag}}
								<span id="tag_delete" @click="deleteTag(index)"></span>
							</p>
						</div>
						<el-col v-if="show_tag" style="float: left;width: 30px;text-align: center;height: 30px;margin-left: 15px;">
							<div id="add_tag" @click="addtags()">
								<i class="el-icon-plus"></i>
							</div>
						</el-col>-->
					</el-row>
					<div id="video_edit_btn">
						<el-button type="primary" size="small" style="font-size: 15px;" :disabled="btnwarnning" @click="edit">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;确认&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import Vue from 'vue';
	import { videoinfo, videocategorylist, videoupdate, getVideoUrl, getQp, maxLengthTest, myBrowser, videoapplist } from '../../api/service';
	import storage from 'utils/local_storage_tool';
	import session from 'utils/session_storage_tool';
	import { hex_md5 } from '../../utils/md5';
	import Bus from '../../api/bus';
	import { Notification } from 'element-ui';
//	import { videoinfo, videocategorylist, videoupdate, getVideoUrl, getQp, log, maxLengthTest, myBrowser } from 'common/api/video';
//	import VueRouter from 'vue-router';
//	import routes from 'src/router';
//	const router = new VueRouter({
//		// mode: 'history',
//		routes
//	})
	new Vue({
		directives: {}
	})
	export default {
		data() {
			return {
				uid: '',
				token: '',
				projectid: '',
				freetime:'',
				description:'',
				tags: '',
				timestart: '',
				timeend: '',
				stTime: '',
				endTime: -1,
				issettime:false,
				dialogCore: false,
				isshowcore: false,
				title_warnning:false,
				titlewarnning: false,
				btnwarnning:false,
				iswarnning:false,
				wideoid: '',
				codePicData: "",
				expireTime: -1,
				codePicData_: false,
				show_tag: true,
				classfiy_select: false,
				edit_height: '',
				config: {},
				downloadButton: false,
				"video": {},
				select_data: [],
				pickerstart: {
					disabledDate(time) {
						return time.getTime() < Date.now() - 8.64e7;
					}
				},
				pickerend: {
					disabledDate(time) {
						return time.getTime() < Date.now();
					},
					shortcuts: [{
						text: '永久有效',
						onClick(picker) {
							let that = this;
							picker.$emit('pick', "永久有效");
							that.endTime = -1;
						}
					}]
				}
			}
		},
		watch: {
//			timestart: function(val) {
//				if(this.timeend !== '') {
//					if(Date.parse(this.timeend) > Date.parse(val)) {
//						console.log(Date.parse(val) / 1000);
//						this.stTime = Date.parse(val) / 1000;
//						this.issettime = false;
//					} else {
//						this.$notify({
//							title: '警告',
//							message: '选择的结束时间不能小于或等于开始时间',
//							type: 'warning',
//							duration: 1500
//						});
//						this.issettime = true;
//						return
//					}
//				}
//			},
			timeend: function(val) {
//				if(this.timestart !== '') {
//					if(Date.parse(val) > Date.parse(this.timestart)) {
	                    if(val !== "永久有效"){
	                    		this.endTime = Date.parse(val) / 1000;
							this.issettime = false;
	                    }else{
	                    		this.endTime = -1;
	                    }
//					} else {
//						this.endTime = -2;
//						this.$notify({
//							title: '警告',
//							message: '选择的结束时间不能小于或等于开始时间',
//							type: 'warning',
//							duration: 1500
//						});
//						this.issettime = true;
//						return
//					}
//				} else {
//					this.$notify({
//						title: '警告',
//						message: '您还未选择开始时间',
//						type: 'warning',
//						duration: 1500
//					});
//					this.issettime = true;
//					return
//				}
			}
		},
		methods: {
			test() {
				//				global.busy = true;
			},
			selectStart(str) {
				console.log(str)
			},
			showTimeSet() {
				this.dialogCore = true;
				let timeNow = new Date();
				this.timestart = timeNow.toLocaleDateString()
			},
			transform(str){
				if (str.indexOf("/") > -1) {
					str = str.split("/").join("-")
				}else if (str.indexOf("年") > -1){
					str = str.replace("年","-");
					str = str.replace("月","-");
					str = str.replace("日","");
				}
				return str
			},
			//获取二维码
			getcodepic() {
				this.stTime = Date.parse(new Date(new Date().setHours(0,0,0,0)))/1000;
				if(this.endTime !== -1 && this.endTime) {
					this.expireTime = this.endTime - this.stTime;
					if(this.endTime === -2) {
						this.$notify({
							title: '警告',
							message: '选择的结束时间不能小于或等于开始时间',
							type: 'warning',
							duration: 1500
						});
						return
					}
					let startTime = new Date(parseInt(this.stTime) * 1000).toLocaleString();
					let end_Time = new Date(parseInt(this.endTime) * 1000).toLocaleString();
					startTime = startTime.substring(0,startTime.indexOf(" "))
					end_Time = end_Time.substring(0,end_Time.indexOf(" "))
					window.localStorage.qrcodeTime = this.transform(startTime) + "至" + this.transform(end_Time);
				} else {
					this.expireTime = -1;
					window.localStorage.qrcodeTime = "永久有效"
				}
				// 二维码对象
				let ts = Date.parse(new Date()).toString();
				let signature = hex_md5(window.sessionStorage.videoappid + ts + window.sessionStorage.videoappkey);
				let postData = {
					"appid": window.sessionStorage.videoappid,
					"videoId": this.wideoid,
					"ts": ts,
					"expire": this.expireTime,
					"signature": signature
				}

				getVideoUrl(postData).then(data => {
					let postData1 = {
						"token": this.token,
						"url": data.data.playURL,
						"height": 1000,
						"width": 1000
					}
					getQp(postData1).then(data1 => {
						if(data1.code === 200) {
							this.dialogCore = false;
							var img = document.getElementById("videoDetailImg");
							this.codePicData = "data:image/png;base64," + data1.data.QRCode;
							window.localStorage.qrcode = this.codePicData;
							this.freetime = window.localStorage.qrcodeTime;
							window.localStorage.videoid = this.wideoid;
							if(data1.data.QRCode !== "") {
								this.codePicData_ = true
							} else {
								this.codePicData_ = false
							}
						}

					})
				})

			},
			transfromTittle(){
				console.log("aaaa")
			},
			//去掉空格
			delHtmlTag(str) {
				let result = ''
				if (str !== "") {
//					let res = str.replace(/<\[^>]*>/gim,"");//去掉所有的html标记
			        result = str.replace(/(^\s+)|(\s+$)/g,"");//去掉前后空格
			        result = result.replace(/\s/g,"");//去除文章中间空格
				}
				return result
			},
			addtags() {
				this.show_tag = false;
				if(this.video.tags) {
					this.tags = this.video.tags.join(",");
				}
			},
			addTagsVideo() {
				this.show_tag = true;
				if(this.tags !== "") {
					this.video.tags = this.tags.split(",");
				}
			},
			deleteTag(num) {
				this.video.tags.splice(num, 1)
			},
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
			//显示分类选择框
			showcalssifySelect() {
				if(this.classfiy_select) {
					this.classfiy_select = false;
				} else {
					this.classfiy_select = true;
				}
			},
			setCategray(id, name1, name2, name3) {
				this.video.cateName1 = name1;
				this.video.cateName2 = name2;
				this.video.cateName3 = name3;
				this.video.cateId = id;
				this.classfiy_select = false;
			},
			getCategrayList() {
				let ts = Date.parse(new Date()).toString();
				let signature = hex_md5(window.sessionStorage.videoappid + ts + window.sessionStorage.videoappkey);
				let postData = {
					"appid": window.sessionStorage.videoappid,
					"ts": ts,
					"signature": signature
				}
				videocategorylist(postData).then(data => {
					this.select_data = data.data;
				})
			},
			getDetail() {
				let ts = Date.parse(new Date()).toString();
				let signature = hex_md5(window.sessionStorage.videoappid + ts + window.sessionStorage.videoappkey);
				let postData = {
					"appid": window.sessionStorage.videoappid,
					"videoId": this.wideoid,
					"ts": ts,
					"signature": signature
				}

				videoinfo(postData).then(data => {
					if(data.code === 200) {
						this.video = data.data;
						this.description = this.video.description;
					}
				})
			},
			edit() {
				let ts = Date.parse(new Date()).toString();
				let signature = hex_md5(window.sessionStorage.videoappid + ts + window.sessionStorage.videoappkey);
				//videoId: this.$route.params.video,
				let viname = this.delHtmlTag(this.video.title)
				if(viname === "" || viname.length > 50) {
					this.titlewarnning = true;
					this.btnwarnning = true;
					return;
				} else {
					this.titlewarnning = false;
					if(!this.title_warnning){
						this.btnwarnning = false;
					}
				}
				this.$confirm('是否确认修改该视频信息?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					let tagsVideo = '';
					if(this.video.tags) {
						tagsVideo = this.video.tags.join(",")
					}
					if(this.video.cateId === null) {
						this.video.cateId = -1;
					}
					let postData = {
						"appid": window.sessionStorage.videoappid,
						"videoId": this.wideoid,
						"cateId": this.video.cateId,
						"title": this.video.title,
						"description": this.description,
						"coverURL": this.video.coverURL,
						"tags": tagsVideo,
						"ts": ts,
						"signature": signature,
					}
					videoupdate(postData).then(data => {
						if(data.code === 200) {
							this.getCategrayList();
							this.getDetail();
							this.$router.replace('/video/overview')
//							router.push({
//								path: '/home/video/Manage/manage'
//							})
						}
					})
				}).catch((e) => {
					console.log(e);
				});
			},
			//判断描述是否正确
			getdescription(str){
				if (this.video.videoId) {
					let viname = this.delHtmlTag(str)
					if(str.length > 128) {
//						this.title_warnning = true;
//						this.btnwarnning = true;
						this.description = str.substring(0,128);
					} else {
						if (viname === "") {
							this.description = ''
						}
						this.title_warnning = false;
						if(!this.titlewarnning){
							this.btnwarnning = false;
						}
					}
				}
//				if(maxLengthTest(this, str, 128, "视频描述最长不超过128个字符")) return;
			},
			//判断视频标题是否正确
			getvideTitle(str) {
//				let fileTypeNum = str.lastIndexOf(".");
//				let fileType = str.substring(fileTypeNum + 1)
				//				 || fileType.toUpperCase() !== "MP4"
//				if (this.myBrowser == "ie") {
//					
//				}
				if (this.video.videoId) {
					let viname = this.delHtmlTag(str)
					if(viname === "" || str.length > 50) {
						this.video.title = str.substring(0,50);
						if (viname === "") {
							this.video.title = '';
							this.btnwarnning = true;
							this.titlewarnning = true;
							this.iswarnning = true;
						}
					} else {
						this.titlewarnning = false;
						this.iswarnning = false;
						if(!this.title_warnning){
							this.btnwarnning = false;
						}
					}
				}
				
//				if(maxLengthTest(this, str, 50, "视频标题最长不超过50个字符")) return;
			},
			iswarnning_(str){
				let viname = this.delHtmlTag(str);
				if(viname === "") {
					this.iswarnning = true;
					this.titlewarnning = true;
				} else {
					this.iswarnning = false;
					this.titlewarnning = false;
				}
			},
			nowarnning_(str){
				this.iswarnning = false;
				this.titlewarnning = false;
			},
			showcorepic() {
				if(this.codePicData !== '') {
					this.isshowcore = true;
				} else {
					this.isshowcore = false;
				}
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
								this.getCategrayList();
								this.getDetail();
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
		},
		mounted() {
			this.wideoid = this.$route.params.video;
//			this.edit_height = this.$refs.get_editHeight.clientHeight - 70;
			this.videoapplist_();
			if(window.localStorage.videoid === this.wideoid) {
				this.codePicData_ = true
				this.codePicData = window.localStorage.qrcode;
				this.freetime = window.localStorage.qrcodeTime;
			} else {
				this.codePicData_ = false;
			}
			let that = this;
			window.sessionStorage.video_File = window.sessionStorage.videoFile;
			Bus.$on('videoFlieAll', function(msg) {
				Bus.$emit('videoFileSelect', msg);
			})
			Bus.$on('fileTime', function(msg) {
				Bus.$emit('getfileTime', msg);
			})
		},
		components: {}
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
	
	#video_edit_nav {
		width: 100%;
		height: 100%;
		padding: 0 15px;
		#getcorenav {
			/*width: 100%;*/
			height: 110px;
			border-top: 1px solid #ccc;
			border-bottom: 1px solid #ccc;
			margin-top: -10px;
			padding: 20px 30px;
			margin-bottom: 0px;
			#video_time {
				width: 100%;
				line-height: 30px;
				#tooltip {
					margin-top: 10px;
				}
				#tist{
					width: 190px;
				}
			}
		}
		#dialoggetcode {
			position: fixed;
			top: 0;
			right: 0;
			bottom: 0;
			left: 0;
			overflow-y: auto;
			margin: 0;
			background-color: rgba(0, 0, 0, 0.3);
			z-index: 9999;
			#opencorepic {
				width: 400px;
				height: 400px;
				margin-top: 100px;
				margin-left: auto;
				margin-right: auto;
			}
		}
		#video_edit_tittle {
			width: 100%;
			padding-top: 20px;
			height: 50px;
			border-bottom: 1px solid #D3DCE6;
			text-align: left;
			p {
				margin-top: 10px;
				font-size: 16px;
				font-weight: bold;
				padding-left: 15px;
				height: 16px;
				border-left: 3px solid #09c;
				line-height: 16px;
			}
		}
		#video_edit_detail {
			width: 100%;
			padding: 15px 0 60px;
			overflow-x: hidden;
			overflow-y: auto;
			#video_edit_nav_edit {
				width: 100%;
				margin-top: 15px;
				#tittle_video_edit {
					margin-top: 20px;
					width: 100%;
					#video_tags {
						width: 300px;
						height: 30px;
						line-height: 30px;
						border: 1px solid #D3DCE6;
						float: left;
					}
					#video_tag_trun {
						width: 30px;
						height: 30px;
						float: left;
						border-right: 1px solid #D3DCE6;
						border-top: 1px solid #D3DCE6;
						border-bottom: 1px solid #D3DCE6;
						#video_tags_edit {
							width: 50%;
							height: 50%;
							margin: 7.5px auto;
							cursor: pointer;
							background: url(../../mock/img/trun_true.png) no-repeat;
							background-size: 100% 100%;
						}
					}
					#add_tag {
						width: 30px;
						height: 30px;
						line-height: 30px;
						text-align: center;
						border: 1px solid #D3DCE6;
						cursor: pointer;
						background-color: #EFF2F7;
						i {
							color: #000000;
						}
					}
					#tag_video {
						padding: 0 15px;
						height: 30px;
						line-height: 30px;
						text-align: center;
						font-size: 14px;
						float: left;
						margin-left: 5px;
						border: 1px solid #D3DCE6;
						position: relative;
						#tag_delete {
							width: 18px;
							height: 18px;
							background: url(../../mock/img/deleteTag_icon.png) no-repeat;
							background-size: 100% 100%;
							position: absolute;
							right: -9px;
							top: -9px;
							cursor: pointer;
							display: none;
						}
					}
					#tag_video:hover {
						#tag_delete {
							display: block;
						}
					}
					#video_edit_btn {
						margin-top: 60px;
						margin-left: 25px;
						padding-bottom: 50px;
					}
					i {
						color: red;
						font-size: 10px;
					}
					input:focus{
						/*outline: none;*/
						border: 1px solid #0190FE !important;
					}
					input[class=videotitlewarnning]:focus{
						outline: none;
						border: 1px solid red !important;
					}
					textarea{
						resize: none;
						border: 1px solid #8391A5 !important;
					}
					textarea:focus{
						/*outline: none;*/
						border: 1px solid #0190FE !important;
					}
					#video_text_edit {
						width: 100%;
						height: 32px;
						border: 1px solid #8391A5;
					}
					#video_edit_type_select {
						padding-right: 5px;
						width: 100%;
						height: 30px;
						border: 1px solid #D3DCE6;
						background-color: #EFF2F7;
						p {
							float: left;
							width: 90%;
							/*text-align: left;*/
							padding-left: 10px;
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							margin: 0;
							line-height: 30px;
						}
						#video_edit_type_select_icon {
							float: right;
							text-align: center;
							line-height: 30px;
							width: 20px;
							i {
								color: #000000;
								cursor: pointer;
							}
						}
					}
					#manageType {
						color: #09c;
						cursor: pointer;
					}
					#video_edit_type_list {
						width: 100%;
						overflow-x: hidden;
						overflow-y: auto;
						max-height: 240px;
						position: absolute;
						top: 32px;
						left: 0;
						z-index: 999;
						background-color: #FFFFFF;
						border: 1px solid #D3DCE6;
						p {
							font-size: 10px;
							height: 30px;
							padding: 0 15px;
							border-bottom: 1px solid #CCCCCC;
							cursor: default;
							line-height: 30px;
							margin: 0;
							cursor: pointer;
							text-align: left;
							a {
								color: #000000;
							}
						}
						i {
							color: #000000;
						}
						>ul {
							width: 100%;
							padding: 5px 0;
							>li {
								padding: 0 15px;
								cursor: pointer;
							}
							>li:nth-of-type(1) {
								border-bottom: 1px solid #CCCCCC;
								height: 30px;
							}
							>li:nth-of-type(1):hover {
								background-color: rgba(22, 155, 213, 1);
								a {
									color: #FFFFFF;
								}
							}
							>li {
								font-size: 12px;
								width: 100%;
								line-height: 25px;
								text-align: left;
								>a {
									color: #000000;
								}
								>div {
									border-bottom: 1px solid #CCCCCC;
								}
								>div>ul>li {
									ul {
										margin-left: 15px;
										display: none;
									}
									#set_first {
										display: block;
										color: #000000;
										width: 100%;
										height: 30px;
										line-height: 30px;
										/*padding-left: 10px;*/
										#set_text {
											float: left;
											width: 100%;
											>i {
												cursor: pointer;
											}
											>span {
												/*display: block;*/
												float: left;
												.off {
													display: none;
												}
											}
											>span:nth-of-type(2),
											#childlast {
												width: 93%;
												margin-left: 5px;
												overflow: hidden;
												text-overflow: ellipsis;
												white-space: nowrap;
												/*display: block;*/
												float: left;
											}
										}
										#set_edit {
											display: none;
											float: right;
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
										background-color: rgba(22, 155, 213, 1);
										color: #FFFFFF;
										>#set_edit {
											display: inline-block;
										}
									}
								}
							}
						}
					}
				}
			}
			#video_message {
				width: 100%;
				padding-bottom: 20px;
				border-bottom: 1px solid #D3DCE6;
				overflow: hidden;
				#video_edit_pic {
					width: 250px;
					height: 170px;
					float: left;
					p {
						line-height: 170px;
						font-size: 30px;
						color: #FFFFFF;
						font-weight: bold;
						margin: 0 auto;
						text-align: center;
					}
				}
				#video_edit_text {
					float: left;
					margin-left: 10px;
					display: inline;
					width: 44%;
					min-width: 380px;
					font-size: 14px;
					p {
						color: #333333;
						width: 100%;
						overflow: hidden;
						text-overflow: ellipsis;
						white-space: nowrap;
					}
					p:nth-of-type(1) {
						line-height: 20px;
						font-size: 18px;
					}
					#video_edit_name {
						line-height: 15px;
						font-size: 14px;
					}
				}
				#video_edit_code {
					width: 220px;
					height: 165px;
					border: 1px solid #D3DCE6;
					float: right;
					display: inline;
					margin-right: 20px;
					#video_edit_code_tittle {
						cursor: pointer;
						width: 100%;
						height: 30px;
						background-color: #09c;
						line-height: 30px;
						color: #FFFFFF;
						font-size: 14px;
						text-align: center;
						margin-bottom: 2px;
					}
					.freeTime{
						margin: 0 auto;
						width: 96%;
						text-align: center;
						font-size: 12px;
					}
					div {
						width: 110px;
						height: 110px;
						margin: 0 auto;
						cursor: move;
						cursor: -webkit-zoom-in;
					}
				}
			}
		}
	}
</style>