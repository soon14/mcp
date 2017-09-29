<template>
	<div id="video_manage" ref='get_Height'>
		<!--删除框-->
		<!--<el-dialog title="提示" v-model="delvideo" size="small">
			<span>确定删除？</span>
			<span slot="footer" class="dialog-footer">
		    <el-button @click="delvideo = false">取 消</el-button>
		    <el-button type="primary" @click="delVideoall()">确 定</el-button>
		  </span>
		</el-dialog>-->
		<!--视频上传-->
		<el-dialog title="视频文件上传" v-model="dialogupload" size="small" :show-close="false" :close-on-click-modal="false">
			<div id="set_nav">
				<div class="closeIcon" @click="dialogupload_()">
					<i class="el-icon-close"></i>
				</div>
				<div id="tabTittle">
					<div id="tab_first" :style="active_Tab? 'background-color: #09c':'background-color: #C0CCDA'">添加视频文件</div>
					<div id="tab_second" :style="!active_Tab? 'background-color: #09c':'background-color: #C0CCDA'">视频文件上传</div>
				</div>
				<div id="tabNav">
					<div id="tabNavFirst" v-if="!active_Tab">
						<table id="tabNavFirstTittle">
							<thead>
								<tr>
									<th id="file_Name">视频标题</th>
									<th id="fileSize">视频大小</th>
									<th id="fileStatus">进度</th>
									<th id="fileBuild">操作</th>
								</tr>
							</thead>
							<tbody v-if="videouploadlist">
								<tr v-for="(file_,index) in filedata" v-if="file_.isshow">
									<td id="file_Name" :title="file_.rename">
										<span>{{file_.rename}}</span>
									</td>
									<td id="fileSize">{{file_.size | capacity}}</td>
									<td id="fileStatus">
										<li v-if="file_.sucessFileUpload"><i class="el-icon-circle-check" id="sucess"></i>上传成功</li>
										<li v-if="file_.waitingFileUpload"><i class="el-icon-time" id="waiting"></i>等待上传</li>
										<li v-if="file_.delecteFileUpload" id="delecteFile">
											<div><i id="delecte"></i>已取消</div>
										</li>
										<li v-if="file_.errorFileUpload"><i class="el-icon-circle-cross" id="fileuploaderror"></i>上传失败</li>
										<li v-if="file_.runningFileUpload">
											<el-progress :percentage="file_.status"></el-progress>
										</li>
									</td>
									<td id="fileBuild">
										<span id="" v-show="file_.runningFileUpload" @click="fileonabort(index)" :disabled="isdelBtn">取消</span>
										<span id="" v-show="file_.waitingFileUpload" @click="fileremove(index)" :disabled="isdelBtn">取消</span>
										<span id="fileBuild_" v-show="file_.errorFileUpload || file_.delecteFileUpload">
											重新上传
											<input type="file" name="filereupload" @change.stop="filereupload(index)" :id="'file_reupload' + index" value="" />
										</span>
									</td>
								</tr>
							</tbody>
						</table>
						<div class="video_table" v-if="!videouploadlist">
							暂无数据......
						</div>
					</div>

					<div id="tabNavsecond" v-if="active_Tab">
						<p>目前平台只支持mp4格式的视频上传<br />注意：请将视频文件编码格式设置为H264，否则可能造成视频文件无法在线预览</p>
						<div id="">
							<table id="tabNavFirstTittle">
								<thead>
									<tr>
										<th id="fileName">视频标题</th>
										<th id="fileSize">视频格式</th>
										<th id="fileStatus">视频大小</th>
										<th id="fileBuild">操作</th>
									</tr>
								</thead>
								<tbody>
									<tr v-for="(filenav,index) in fileselectData">
										<td id="fileName">
											<input v-model="filenav.rename" :class="filenav.iserror?'videotitlewarnning':''" type="text" placeholder="最多不超过50个字符" name="" :id="'filename_' + index" @input="changFileName(index)" value="" @blur="changFileName(index)" />
										</td>
										<td id="fileSize">{{filenav.file.name | fileType}}</td>
										<td id="fileStatus">{{filenav.file.size | capacity}}</td>
										<td id="fileBuild">
											<span id="" @click="deleteFile(index)">删除</span>
										</td>
									</tr>
								</tbody>
							</table>
							<div class="video_table" v-if="!video_uploadlist">
								暂无数据......
							</div>
						</div>
					</div>
				</div>
			</div>
			<div slot="footer" v-if="active_Tab" class="dialog-footer">
				<el-button id="closeDialo" @click="dialogupload_()" v-if="active_Tab">取消</el-button>
				<div id="addfileBtn_" v-if="active_Tab" @click="uploadFilePush()">
					<span v-if="!addfile">&nbsp;&nbsp;&nbsp;添加视频文件&nbsp;&nbsp;&nbsp;</span>
					<span v-if="addfile" id="starUpload">&nbsp;&nbsp;&nbsp;开始上传&nbsp;&nbsp;&nbsp;</span>
					<input type="file" name="selectFile" multiple="" id="selectFile" @change="getfile('selectFile')" v-if="!addfile" value="" />
				</div>
				<a id="addfileBtn" v-if="addfile">
					&nbsp;&nbsp;&nbsp;继续添加视频&nbsp;&nbsp;&nbsp;
					<input type="file" multiple="" name="selectAddFile" id="selectAddFile" @change="getfile('selectAddFile')" value="" />
				</a>
			</div>
			<div slot="footer" v-if="!active_Tab" class="dialog-footer">
				<div id="delectLog" v-if="!active_Tab">
					<el-button @click.stop="videoclearfailed_()" style='width: 120px;text-align: center;'>清除出错记录</el-button>
				</div>
				<el-button @click="dialogupload = false" style="float: right;" v-if="!active_Tab">完成</el-button>
				<el-button type="primary" v-if="!active_Tab" style="float: right;margin-right: 20px;" @click.stop="dialogupload = true;active_Tab = true">继续上传</el-button>
			</div>
		</el-dialog>
		<!--预览视频-->
		<el-dialog :title="videoName" v-model="dialogview" size="small" :before-close="videoClose()" :close-on-click-modal="false">
			<div id="video_view">
				<div id="videoView">
					<video id="videoplay" v-if="isvideo" :src="videoUrl" width="100%" height="400" style="margin: 0 auto;" controls="controls" autoplay="">你的浏览器不支持该播放功能</video>
				</div>
			</div>
		</el-dialog>
		<div class="wrap">
			<div id="video_open_tittle">
				<li id="warnning" v-if="showWarnning">
					<i class="el-icon-warning"></i>&nbsp;&nbsp; 注意：文件上传中，离开视频点播页面将放弃文件上传，请不要切换服务或者菜单，刷新或者关闭页面，关闭浏览器等操作
					<i class="el-icon-close" @click="closewarnning()" id="floatRight"></i>
				</li>
				<core-header :setting="setting"></core-header>
				<!--<p :style="paddingTop===0?'margin-top:15px':'margin-top:17px'">视频管理</p>
			<el-button id="uploadBtn" size="small" type="primary" :style="paddingTop===0?'margin-top:3px':'margin-top:10px'" @click="dialogupload = true;classfiy_select = false;active_Tab = true">&nbsp;上传视频&nbsp;</el-button>-->
			</div>
			<div id="video_list">
				<div id="video_list_tittle">
					<el-button id="uploadBtn" size="small" style="float: left;font-size: 14px;" @click="dialogupload = true;classfiy_select = false;active_Tab = true">&nbsp;上传视频&nbsp;</el-button>
					<el-button id="video_delete_btn" style="float: left;font-size: 14px;" :disabled="delete_All" size="small" @click="delVideo_del()">&nbsp;&nbsp;&nbsp;批量删除&nbsp;&nbsp;&nbsp;</el-button>
					<div id="video_search_text" @click.stop="classfiy_select = false;">
						<user-search :placewords="'请输入' + videoType" @search-enter="" :value="videoText" v-model="videoText"></user-search>
						<!--<el-input v-model="videoText" size="small" icon="search" @click="handleIconClick(videoText)" :placeholder="'请输入' + videoType"></el-input>-->
					</div>
					<div id="video_select_type" @click.stop="classfiy_select = false;">
						<el-select v-model="videoType" size="small" id="typeSelect" placeholder="请选择">
							<el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label">
							</el-option>
						</el-select>
					</div>
					<div id="video_search_time" @click.stop="classfiy_select = false;">
						<el-date-picker id="videoTime" v-model="value6" :editable="false" range-separator="至" :picker-options="pickerOptions0" size="small" type="datetimerange" placeholder="选择日期范围"></el-date-picker>
						<!--<div id="videoTime_">&nbsp;&nbsp;至&nbsp;&nbsp;</div>
					<el-date-picker id="videoTime" v-model="value7" :editable="false" size="small" type="date" placeholder="选择日期范围"></el-date-picker>-->
					</div>
					<!--<div id="video_search_1" @click="searchVideoList()">
						<el-button type="primary" size="small">搜索</el-button>
					</div>-->
					
				</div>
				<p class="task_num">
						<span id="">{{videoSucc}}/{{videoTotal}}&nbsp;&nbsp;</span>
						<span id="checkUploadList" @click="dialogupload = true;classfiy_select = false;active_Tab = false">查看上传任务</span>
				</p>
				<div id="video_list_nav" :style="videotable?'':'position: relative'">
					<div id="video_table">
						<table border="" cellspacing="" cellpadding="" id="videoTblsort" :style="videotable?'position: relative':''">
							<thead style="width: 100%;border: 1px solid rgba(255,255,255,0);">
								<tr>
									<th id="checkbox" style="position: absolute;top: 0;left: 0;"></th>
									<th id="video_name">视频名称</th>
									<th id="video_handle" style="margin-right: 10px;">操作</th>
									<th id="video_createtime">
										<div id="">
											<span>创建时间</span>
											<i :class="timeClass" style="cursor: pointer;" @click="sortTable('videoTblsort', 4, 'date')"></i>
											<!--<div id="video_timeselect" @click="sortTable('videoTblsort', 4, 'date')">
											<li>
												<i class="el-icon-caret-top"></i>
											</li>
											<li>
												<i class="el-icon-caret-bottom"></i>
											</li>
										</div>-->
										</div>

									</th>
									<th id="video_classify">
										<p style="margin: 0;cursor: pointer;" @click.stop="showcalssifySelect()">
											视频分类&nbsp;
											<i class="el-icon-caret-bottom"></i>
										</p>
										<ul v-if="classfiy_select">
											<p @click="setVideoCateId(-2)">
												<a>全部</a>
											</p>
											<li @click="setVideoCateId(-1)">
												<a>未分类</a>
											</li>
											<li>
												<div id="">
													<ul>
														<li v-for="data in select_data">
															<div id="set_first">
																<div id="set_text">
																	<span v-if="data.subcateList"><i class="el-icon-caret-right" style="cursor: pointer;" @click="select(data.cateId)" :id="data.cateId + 'asa'"></i></span>
																	<span id="childlast" :title="data.name" @click="setVideoCateId(data.cateId)">{{data.name}}</span>
																</div>
															</div>
															<ul :id="data.cateId" class="second">
																<li v-for="dataChild in data.subcateList">
																	<div id="set_first">
																		<div id="set_text">
																			<span v-if="dataChild.subcateList">
																			<i class="el-icon-caret-right" style="cursor: pointer;" @click="select(dataChild.cateId)" :id="dataChild.cateId + 'asa'"></i>
																		</span>
																			<span id="childlast" :title="dataChild.name" @click="setVideoCateId(dataChild.cateId)">{{dataChild.name}}</span>
																		</div>
																	</div>
																	<ul :id="dataChild.cateId" class="second">
																		<li v-for="dataChildChild in dataChild.subcateList">
																			<div id="set_first">
																				<div id="set_text" @click="setVideoCateId(dataChildChild.cateId)">
																					<span :title="dataChildChild.name" id="childlast">{{dataChildChild.name}}</span>
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
									</th>
									<th id="video_status" @mouseleave.stop="hidestatusSelect()">
										视频状态
										<!--<i class="el-icon-caret-bottom" @click.stop="showstatusSelect()"></i>
									<ul v-if="status_select">
										<li @click="changeStatus('Released')">
											<a>正常</a>
										</li>
										<li @click="changeStatus('Uploading')">
											<a>上传中</a>
										</li>
									</ul>-->
									</th>
								</tr>
							</thead>
							<tbody>
								<div id="get_tableHeight" ref='get_tableHeight' :style="'overflow-y:auto;overflow-x:hide'">
									<div v-for="data in data1.videos" v-if="videotable">
										<td id="checkbox"><input type="checkbox" @change="select_checkbox()" @click="click_checkbox()" name="videocheckbox" :id="data.videoId" /></td>
										<td id="video_name">
											<div id="video_name_nav">
												<div id="video_pic">
													<div id="video_pic_" :title="data.description" :style="data.coverURL?'background: url('+data.coverURL+') no-repeat;background-size: 100% 100%;':'background: rgba(215,215,215,1)'">
														<span id="" v-if="!data.coverURL">美的云</span>
														<div id="video_pic_hover">
															<div id="video_pic_hover_play" @click="playVideo(data.title, data.videoId)"></div>
														</div>
													</div>
													<div id="video_tittle">
														<p id="video_tittle_first" :title="data.title">视频标题：<span>{{data.title}}</span></p>
														<p id="video_tittle_second" :title="data.videoId">视频ID：<span>{{data.videoId}}</span></p>
														<p id="video_tittle_second" :title="data.duration | videoTime">视频时长：<span>{{data.duration | videoTime}}</span></p>
													</div>

												</div>

											</div>
										</td>
										<td id="video_handle"><span id=""><router-link :to="'/video/detail/' + data.videoId">管理</router-link></span>&nbsp;&nbsp;|&nbsp;&nbsp;<span id="" @click="delVideo_del(data.videoId)">删除</span></td>
										<td id="video_createtime">{{data.createTime}}</td>
										<td id="video_classify">
											<a v-if="data.cateId" :title="data.cateName1,data.cateName2,data.cateName3 | videoType">{{data.cateName1}}{{data.cateName2?'-'+data.cateName2:''}}{{data.cateName3?'-'+data.cateName3:''}}</a>
											<a v-if="!data.cateId" title="未分类">未分类</a>
										</td>
										<td id="video_status"><i class=""></i><span>{{data.status === 'Normal'? '正常':'上传中'}}</span></td>
									</div>
								</div>
							</tbody>
						</table>
					</div>
					<div id="video_table" class="video_table" v-if="!videotable">
						{{msg}}
					</div>
					<div id="video_header" v-if="videotable" :style="'top:'+tableHeight+'px'">
						<div id="video_header_left">
							<input type="checkbox" name="selectall" v-model="deleteAll" @change="deleteAll_()" id="selectall" value="" />
							<el-button id="video_delete_btn" type="primary" :disabled="delete_All" size="small" @click="delVideo_del()">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;批量删除&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</el-button>
						</div>
						<div id="video_header_right">
							<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageindex" :page-sizes="[100, 200, 300, 400]" :page-size="pagesize" layout="total, prev, pager, next, jumper" :total="data1.totalNum">
							</el-pagination>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import { videoapplist, videolist, videocreate, delHtmlTag, BurstUpLoad, simpleUpLoda, videocommit, videouploadlist, videocategorylist, getVideoUrl, videodelete, videoclearfailed } from '../../api/service';
	import storage from 'utils/local_storage_tool';
	import session from 'utils/session_storage_tool';
	import { hex_md5 } from '../../utils/md5';
	import MP4Box from '../../utils/mp4box.all.min';
	import Bus from '../../api/bus';
	import { Notification } from 'element-ui';
	import CoreHeader from '../CoreHeader.vue';
	import UserSearch from 'components/awesome/user_search/UserSearch.vue';

	//	let mp4box = new MP4Box();
	//	console.log(mp4box)
	//	import Vue from 'vue'
	//	import VueRouter from 'vue-router';
	//	import routes from 'src/router';
	//	import { requireNullMsg, delHtmlTag, videoapplist, videocategorylist, videolist, videodelete, getVideoUrl, log, videocreate, simpleUpLoda, videocommit, BurstUpLoad, videouploadlist, videoclearfailed, maxLengthTest } from 'common/api/video';
	//	import Bus from 'common/api/bus';
	//	const router = new VueRouter({
	//		// mode: 'history',
	//		routes
	//	})
	//	let fileTime = []; //视频时长
	export default {
		data() {
			return {
				projectid: '',
				uid: '',
				token: '',
				isdelBtn: false,
				isdelete: false,
				videotitle_warnning: false,
				isshowDilo: false,
				tableHeight: 0,
				videoTotal: 0,
				videoSucc: 0,
				isvideo: true,
				video_uploadlist: false,
				videouploadlist: false,
				videotable: false,
				delvideo: false,
				showWarnning: false,
				paddingTop: 10,
				spliceFile: 0,
				addvideoId: [],
				videoId: '',
				videoCateId: -2,
				videoStatus: "Released",
				startTime: null,
				endTime: null,
				pageindex: 1,
				pagesize: 10,
				submitVideoTitle: "",
				submitVideoId: "",
				dialogview: false,
				videoName: '',
				videoUrl: "",
				setting: {
					title: '视频管理'
				},
				keywords: '请输入',
				addfile: false,
				active_Tab: false,
				activeName: 'second',
				timeClass: 'el-icon-caret-bottom',
				classfiy_select: false,
				status_select: false,
				dialogupload: false,
				delete_All: true,
				deleteAll: false,
				nav_height: 450,
				createtime: "Desc",
				msg: "暂无数据......",
				chunkSize: 1024 * 1024, //分片大小
				offset: 0, //第几片
				fileTime: [], //视频时长
				options: [{
					label: '视频名称'
				}, {
					label: '视频ID'
				}],
				videoType: '视频名称',
				videoText: '',
				value6: '',
				value7: '',
				fileselectData: [],
				pickerOptions0: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					}
				},
				filedata: [],
				select_data: [],
				data1: {
					totalNum: 20,
					videos: []
				}
			}
		},
		watch: {
			value6: function(val) {
				if(val instanceof Array && val[0] && val[1]) {
					this.startTime = val[0].getFullYear() + "-" + (val[0].getMonth() + 1) + "-" + val[0].getDate() + " " + val[0].getHours() + ":" + val[0].getMinutes() + ":" + val[0].getSeconds();
					this.endTime = val[1].getFullYear() + "-" + (val[1].getMonth() + 1) + "-" + val[1].getDate() + " " + val[1].getHours() + ":" + val[1].getMinutes() + ":" + val[1].getSeconds();
				} else {
					this.startTime = '';
					this.endTime = '';
				}
			}
		},
		methods: {
			/*
			 * 提醒框设置
			 */
			handleClose(done) {
				console.log(this.dialogupload);
			},
			//1、警告
			open4(msg) {
				this.$notify({
					title: '警告',
					message: msg,
					type: 'warning',
					duration: 3000
				});
			},
			handleIconClick(str) {
				this.msg = "没有查询到符合条件的数据";
				this.pageindex = 1;
				this.getVideoList();
			},
			searchVideoList() {
				this.msg = "没有查询到符合条件的数据";
				this.pageindex = 1;
				this.getVideoList();
			},
			handleSizeChange(val) {
				this.pagesize = val;
				this.getVideoList();
				//				console.log(`每页 ${val} 条`);
			},
			videoClose(done) {
				if(!this.dialogview) {
					let videoobj = document.getElementById("videoplay");
					this.isvideo = false;
					this.videoUrl = '';
				} else {
					this.isvideo = true;
				}
			},
			handleCurrentChange(val) {
				this.delvideo = false;
				this.delete_All = true;
				let video_table = document.getElementById("video_table");
				let Checkbox = video_table.getElementsByTagName("input");
				for(let i = 0; i < Checkbox.length; i++) {
					Checkbox[i].checked = false;
				}
				this.pageindex = val;
				this.getVideoList();
				//				console.log(`当前页: ${val}`);
			},
			//全选
			deleteAll_() {
				this.classfiy_select = false;
				let video_table = document.getElementById("video_table");
				let Checkbox = video_table.getElementsByTagName("input")
				if(this.deleteAll) {
					this.delete_All = false;
					for(let i = 0; i < Checkbox.length; i++) {
						Checkbox[i].checked = true;
					}
				} else {
					for(let i = 0; i < Checkbox.length; i++) {
						Checkbox[i].checked = false;
					}
					this.delete_All = true;
				}
			},
			//选择
			select_checkbox() {
				this.classfiy_select = false;
				let video_table = document.getElementById("video_table");
				let Checkbox = video_table.getElementsByTagName("input");
				for(let i = 0; i < Checkbox.length; i++) {
					if(!Checkbox[i].checked) {
						this.deleteAll = false;
						return false;
					} else {
						this.deleteAll = true;
					}
				}
			},
			//全部选
			click_checkbox() {
				this.classfiy_select = false;
				let video_table = document.getElementById("video_table");
				let Checkbox = video_table.getElementsByTagName("input");
				for(let i = 0; i < Checkbox.length; i++) {
					if(Checkbox[i].checked) {
						this.delete_All = false;
						return false;
					} else {
						this.delete_All = true;
					}
				}
			},
			//初始化input框
			clearInputFile(obj) {
				if(obj.value) {
					try {
						obj.value = '';
					} catch(err) {

					}
					if(obj.value) {
						let form = document.createElement('form');
						let ref = obj.nextSibling;
						let p = obj.parentNode;
						form.appendChild(obj);
						form.reset();
						p.insertBefore(obj, ref);
					}
				}
			},
			dialogupload_(done) {
				//				if (this.isshowDilo) {
				//					if (!this.dialogupload) {
				//						this.dialogupload = true;
				//					}else{
				this.dialogupload = false;
				this.active_Tab = false;
				this.fileselectData = [];
				this.video_uploadlist = false;
				this.addfile = false;
				this.isshowDilo = false;
				//					}
				//				}else{
				//					this.isshowDilo = true;
				//					return
				//				}

			},
			//显示状态选择框
			showstatusSelect() {
				if(this.status_select) {
					this.status_select = false;
				} else {
					this.status_select = true;
				}
			},
			hidestatusSelect() {
				this.status_select = false;
			},
			//显示分类选择框
			showcalssifySelect() {
				if(this.classfiy_select) {
					this.classfiy_select = false;
				} else {
					this.classfiy_select = true;
				}

			},
			hidecalssifySelect() {
				this.classfiy_select = false;
			},
			//关闭提醒框
			closewarnning() {
				window.sessionStorage.isupload = "2";
				this.showWarnning = false;
				this.paddingTop = 10;
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
			//排序
			sortTable(sTableId, iCol, sDataType) {
				//				if(this.timeClass === 'el-icon-caret-bottom') {
				//					this.timeClass = 'el-icon-caret-top'
				//				} else {
				//					this.timeClass = 'el-icon-caret-bottom'
				//				}
				//				let oTable = document.getElementById(sTableId); //获得表
				//				let oTBody = oTable.tBodies[0]; //获得放数据的body,因为该表格只有一个tbody,所以直接用[0]
				//				let colRows = oTBody.rows; //获得tbody里所有的tr
				//				let aTRs = []; //声明一个数组
				//				for(var i = 0; i < colRows.length; i++) {
				//					aTRs[i] = colRows[i]; //将tr依次放入数组中;
				//				}
				//				if(oTable.sortCol === iCol) {
				//					aTRs.reverse(); //如果当前要排的列和上次排的列是一样的,就直接逆向排序;也就是说连着对一列点两次,就会进行升序,降序的转换.
				//				} else {
				//					aTRs.sort(this.getSortFunction(iCol, sDataType)); //排序,并且传入一个获得到的比较函数; 
				//				}
				//
				//				let oFragement = document.createDocumentFragment(); //创建文档碎片,用来存放排好的tr
				//				for(let i = 0; i < aTRs.length; i++) {
				//					oFragement.appendChild(aTRs[i]); //将tr绑定到碎片上.
				//				}
				//				oTBody.appendChild(oFragement); //将碎片绑定在表格上
				//				oTable.sortCol = iCol; //记住当前列,这个可以用来判断是对数组进行反向排序还是重新按列排;
				if(this.createtime === "Desc") {
					this.createtime = "Asc";
					this.timeClass = 'el-icon-caret-top'
				} else {
					this.createtime = "Desc"
					this.timeClass = 'el-icon-caret-bottom'
				}
				this.getVideoList()
			},
			getSortFunction(iCol, sDataType) {
				return function compareTRs(oTR1, oTR2) {
					//					window.alert("aaa")
					let vValue1, vValue2;
					if(oTR1.cells[iCol].getAttribute("value")) {
						vValue1 = new Date(Date.parse(oTR1.cells[iCol].getAttribute("value")))
						vValue2 = new Date(Date.parse(oTR2.cells[iCol].getAttribute("value")));
					} else {
						vValue1 = new Date(Date.parse(oTR1.cells[iCol].firstChild.nodeValue))
						vValue2 = new Date(Date.parse(oTR2.cells[iCol].firstChild.nodeValue))
					}
					if(vValue1 < vValue2) {
						return -1;
					} else if(vValue1 > vValue2) {
						return 1;
					} else {
						return 0;
					}
				}
			},
			convert(sValue, sDataType) {
				switch(sDataType) {
					case "int":
						return parseInt(sValue);
					case "float":
						return parseFloat(sValue);
					case "date":
						return new Date(Date.parse(sValue));
					default:
						return sValue.toString();
				}
			},
			//TAB切换
			tabChange() {
				this.active_Tab = false;
				this.addfile = false;
			},
			//TAB切换
			tabChange1() {
				this.active_Tab = true;
				if(this.fileselectData.length > 0) {
					this.addfile = true;
				}
			},
			//选择文件
			getfile(id) {
				let obj = document.getElementById(id)
				let filenav = obj.files;
				let isMP4;
				for(let i = 0; i < filenav.length; i++) {
					if(filenav[i].name.length < 53 && filenav[i].name.length > 1 && filenav) {
						let fileTypeNum = filenav[i].name.lastIndexOf(".");
						let fileType = filenav[i].name.substring(fileTypeNum + 1)
						let file_name = filenav[i].name.substring(0, fileTypeNum);
						if(fileType.toUpperCase() === "MP4") {
							this.fileselectData.push({
								file: filenav[i],
								rename: file_name,
								status: 0,
								xhr: '',
								iserror: false,
								filename: filenav[i].name,
								size: filenav[i].size,
								isshow: true,
								isture: false,
								duration: 0,
								sucessFileUpload: false,
								errorFileUpload: false,
								waitingFileUpload: true,
								runningFileUpload: false,
								delecteFileUpload: false
							});
							isMP4 = true;
						} else {
							this.open4("你选择的文件中含有非MP4格式的文件，请重新选择MP4格式的视频");
							isMP4 = false;
							return
						}
					} else {
						this.open4("你选择的文件中含有文件名长度超过50个字节的文件，请重新选择");
						isMP4 = false;
						return
					}
				}

				if(isMP4 === true) {
					if(this.fileselectData.length > 0) {
						this.video_uploadlist = true;
						this.addfile = true;
					} else {
						this.video_uploadlist = false;
					}
					this.clearInputFile(obj)
				}
			},
			//获取文件上传数以及成功数
			getTotal_Succ() {
				let num = 0;
				let total = 0
				for(let i = 0; i < this.filedata.length; i++) {
					if(this.filedata[i].isshow) {
						total = total + 1;
						if(this.filedata[i].sucessFileUpload) {
							num = num + 1;
						}
					}

				}
				this.videoTotal = total;
				this.videoSucc = num;
			},
			//删除所选文件
			deleteFile(index) {
				this.fileselectData.splice(index, 1);
				if(this.fileselectData.length === 0) {
					this.addfile = false;
					this.video_uploadlist = false;
				}
			},
			//获取视频时长
			onparsedbuffer(mp4box, buffer, offset) {
				buffer.fileStart = offset;
				mp4box.appendBuffer(buffer);
			},
			//开始获取视频时长
			getduration(paramsVuplist, filenav, num, total, ischange) {
				//				console.log(filenav)
				let that = this;
				let flti = {
					duration: 0,
					filename: filenav[total].filename,
					xhr: '',
					isactive: false,
					time: Date.parse(new Date()).toString()
				}
				//				if(!ischange) {
				//					for(let i = total; i < num; i++) {
				//						fileTime.push({
				//							duration: 0,
				//							filename: filenav[i].filename,
				//							xhr: '',
				//							isactive: false,
				//							time: Date.parse(new Date()).toString()
				//						});
				//					}
				//				}
				//				Bus.$emit("fileTime", fileTime)
				//				window.sessionStorage.fileTime = JSON.stringify(fileTime);

				let mp4box = new MP4Box();
				let offset = 0;
				let chunkSize = 1024 * 1024;
				let readBlock = function(offset, length, file_) {
					let r = new window.FileReader();
					let blob = file_.slice(offset, length + offset);
					r.onload = function(evt) {
						if(evt.total === 0) {
							if(ischange) {
								that.videouploadlist_(paramsVuplist, total, 0);
							} else {
								that.videocommit_(that.addvideoId[total], total, [], 0);
							}
							return
						} else {
							if(evt.target.error == null) {
								that.onparsedbuffer(mp4box, evt.target.result, offset);
								offset += evt.target.result.byteLength;
								let info = mp4box.getInfo();
								if(info.hasMoov) {
									if(ischange) {
										that.videouploadlist_(paramsVuplist, total, Math.round(info.duration / info.timescale));
									} else {
										that.videocommit_(that.addvideoId[total], total, [], Math.round(info.duration / info.timescale));
									}
									return;
								}

							} else {
								return;
							}
						}
						readBlock(offset, length, file_)
					};
					r.readAsArrayBuffer(blob);
				}
				readBlock(offset, chunkSize, filenav[total].file)
				//				let fetvideotime = function(filenav, num, total) {
				//					let mp4box = new window.MP4Box();
				//					let offset = 0;
				//					let chunkSize = 1024 * 1024;
				//					let readBlock = function(offset, length, file_) {
				//						let r = new window.FileReader();
				//						fileTime[total].xhr = r;
				//						let blob = file_.slice(offset, length + offset);
				//						r.onload = function(evt) {
				//							if(evt.total === 0) {
				//								total = total + 1;
				//								fetvideotime(filenav, num, total);
				//								return
				//							} else {
				//								if(evt.target.error == null) {
				//									that.onparsedbuffer(mp4box, evt.target.result, offset);
				//									offset += evt.target.result.byteLength;
				//									let info = mp4box.getInfo();
				//									if(info.hasMoov) {
				//										fileTime[total].duration = Math.round(info.duration / info.timescale);
				//										fileTime[total].xhr = "";
				//										Bus.$emit("fileTime", fileTime);
				//										window.sessionStorage.fileTime = JSON.stringify(fileTime);
				//										total = total + 1;
				//										fetvideotime(filenav, num, total)
				//										return fileTime[total].duration;
				//									}
				//
				//								} else {
				//									//									console.log("Read error: " + evt.target.error);
				//									return;
				//								}
				//							}
				//							readBlock(offset, length, file_)
				//						};
				//						r.readAsArrayBuffer(blob);
				//					}
				//					if(total < num) {
				//						if(ischange) {
				//							fileTime[total] = {
				//								duration: 0,
				//								filename: filenav[total].filename,
				//								xhr: '',
				//								time: Date.parse(new Date()).toString()
				//							}
				//							Bus.$emit("fileTime", fileTime)
				//						}
				//						window.sessionStorage.fileTime = JSON.stringify(fileTime);
				//						window.setTimeout(function() {
				//							readBlock(offset, chunkSize, filenav[total].file)
				//						}, 200)
				//					}else{
				//						
				//					}
				//				}
				//				fetvideotime(filenav, num, total)
			},
			//开始上传
			uploadFilePush() {
				if(this.addfile === true) {
					let isMP4;
					for(let i = 0; i < this.fileselectData.length; i++) {
						this.fileselectData[i].rename = delHtmlTag(this.fileselectData[i].rename)
						if(this.fileselectData[i].rename.length > 0 && this.fileselectData[i].rename.length <= 50) {
							this.filedata.push(this.fileselectData[i]);
							isMP4 = true;
						} else if(this.fileselectData[i].rename.length > 50) {
							this.open4("注意：你所选的视频中存在视频标题名长度超过50个字节，请重新修改");
							isMP4 = false;
							return
						} else {
							this.open4("注意：你所选的视频中存在视频标题名为空，请重新修改");
							isMP4 = false;
							return
						}
					}

					if(isMP4 === true) {
						let i = 0;
						let listnum = 0;
						let isRunning;
						let fileNum = 0;
						let num = this.filedata.length;
						this.videouploadlist = true;
						let noRunning;
						let t_num = num - this.fileselectData.length;
						let ischange = false;
						//						this.getduration(this.filedata, num, t_num, ischange)
						if(this.fileselectData.length === num) {
							this.createVideo(this.filedata, i)
						} else {
							for(let m = 0; m < (num - this.fileselectData.length); m++) {
								if(this.filedata[m].waitingFileUpload || this.filedata[m].runningFileUpload) {
									noRunning = false;
									break
								} else {
									noRunning = true;
								}
							}
							if(noRunning === true) {
								//							if(noRunning === true) {
								i = this.filedata.length - this.fileselectData.length
								//							}
								this.createVideo(this.filedata, i)
							}
						}
						//						if(noRunning === true) {
						////							if(noRunning === true) {
						//								i = this.filedata.length - this.fileselectData.length
						////							}
						//							console.log(isRunning)
						//							console.log(this.filedata)
						//							console.log(this.fileselectData)
						////							this.createVideo(this.filedata, i)
						//						}
						this.fileselectData = [];
						this.video_uploadlist = false;
						this.active_Tab = false
						this.addfile = false;
						window.sessionStorage.videoFile = JSON.stringify(this.filedata);
					}
				}
			},
			//改变文件名
			changFileName(index) {
				let videofile = document.getElementById("filename_" + index)
				let fileName = document.getElementById("filename_" + index).value;
				let viname = delHtmlTag(fileName)
				if(viname === "" || fileName.length > 50) {
					//					videofile.className = "videotitlewarnning"
					this.fileselectData[index].rename = fileName.substring(0, 50);
					if(viname === "") {
						this.fileselectData[index].rename = '';
						this.fileselectData[index].iserror = true;
						this.videotitle_warnning = true;
					}
					//					this.video.title = str.substring(0,50);
				} else {
					this.fileselectData[index].iserror = false;
					this.videotitle_warnning = false;
					videofile.className = ""
				}
				//				if(requireNullMsg(this, fileName, "视频标题不能为空.")) return;
				//				if(maxLengthTest(this, fileName, 50, "视频标题最长不超过50个字符")) return;
				//				this.fileselectData[index].rename = fileName;
			},
			//播放视频
			playVideo(str, id) {
				this.classfiy_select = false;
				this.isvideo = true;
				let ts = Date.parse(new Date()).toString();
				let signature = hex_md5(window.sessionStorage.videoappid + ts + window.sessionStorage.videoappkey);
				let postData = {
					"appid": window.sessionStorage.videoappid,
					"videoId": id,
					"ts": ts,
					"expire": -1,
					"signature": signature
				}

				getVideoUrl(postData).then(data => {
					if(data.code === 200) {
						this.dialogview = true;
						this.videoUrl = data.data.playURL;
					}
				})
				this.videoName = str;
			},
			//视频分片
			filePart(filenav) {
				let filemain = {};
				let filenavlist = {};
				let num;
				num = parseInt(filenav.size / (4 * 1024 * 1024))
				let numlist = 0;
				if(num >= 10000) {
					num = 10000;
					let filesize = filenav.size / 10000;
					for(let i = 0; i < num; i++) {
						if(i < num) {
							filenavlist[i] = filenav.slice(i * filesize, (i + 1) * filesize);
						} else if(i === num) {
							filenavlist[i] = filenav.slice(i * filesize, filenav.size);
						}
					}
				} else if(num >= 5000 && num < 10000) {
					if(filenav.size % (4 * 1024 * 1024) === 0) {
						num = parseInt(filenav.size / (4 * 1024 * 1024));
					} else {
						num = parseInt(filenav.size / (4 * 1024 * 1024)) + 1;
					}
					let filesize = 4 * 1024 * 1024;
					for(let i = 0; i < num; i++) {
						if(i < num) {
							filenavlist[i] = filenav.slice(i * filesize, (i + 1) * filesize);
						} else if(i === num) {
							filenavlist[i] = filenav.slice(i * filesize, filenav.size);
						}
					}
				} else if(num >= 3500 && num < 5000) {
					if(filenav.size % (3 * 1024 * 1024) === 0) {
						num = parseInt(filenav.size / (3 * 1024 * 1024));
					} else {
						num = parseInt(filenav.size / (3 * 1024 * 1024)) + 1;
					}
					let filesize = 3 * 1024 * 1024;
					for(let i = 0; i < num; i++) {
						if(i < num) {
							filenavlist[i] = filenav.slice(i * filesize, (i + 1) * filesize);
						} else if(i === num) {
							filenavlist[i] = filenav.slice(i * filesize, filenav.size);
						}
					}
				} else if(num < 3500) {
					if(filenav.size % (2 * 1024 * 1024) === 0) {
						num = parseInt(filenav.size / (2 * 1024 * 1024));
					} else {
						num = parseInt(filenav.size / (2 * 1024 * 1024)) + 1;
					}
					let filesize = 2 * 1024 * 1024;
					for(let i = 0; i < num; i++) {
						if(i < num) {
							filenavlist[i] = filenav.slice(i * filesize, (i + 1) * filesize);
						} else if(i === num) {
							filenavlist[i] = filenav.slice(i * filesize, filenav.size);
						}
					}
				}
				let size = filenav.size;
				filemain.filenavlist = filenavlist;
				filemain.num = num;
				filemain.size = size;
				return filemain;
			},
			/*
			 * 下面是接口
			 */
			//创建视频
			createVideo(filenav, i) {
				window.sessionStorage.isupload = '1'
				let num = filenav.length;
				let that = this;
				let openNum = 1;
				let isDelete;
				if(i < num) {
					filenav[i].time = new window.Date();
					if(that.filedata[i].waitingFileUpload) {
						let paramsCreate = {
							'token': window.localStorage.token,
							'appid': window.sessionStorage.videoappid,
							'title': filenav[i].rename,
							'filesize': filenav[i].size,
							'filename': filenav[i].filename
						}
						videocreate(paramsCreate).then(res => {
							if(res.code === 200) {
								that.videoId = res.data.videoId;
								window.sessionStorage.videoId = that.videoId
								if(filenav[i].isture) {
									that.addvideoId.splice(i, 1, res.data.videoId);
								} else {
									that.addvideoId.push(res.data.videoId);
								}
								window.sessionStorage.videoid = JSON.stringify(that.addvideoId);
								if(res.data.uploadId) {
									let fileParts = that.filePart(filenav[i].file)
									let BurstUpLoadparams = {
										'params': fileParts.filenavlist,
										'certification': res.data.uploadCert,
										'appid': res.data.oss_id,
										'bucket': res.data.bucket,
										'objet': res.data.fileName,
										'partNumber': fileParts.num,
										'uploadId': res.data.uploadId,
										'numlist': 0,
										'size': fileParts.size,
										'objetname': filenav[i].file.name,
										'time': filenav[i].time
									}
									BurstUpLoad(BurstUpLoadparams.params, BurstUpLoadparams.certification, BurstUpLoadparams.appid, BurstUpLoadparams.bucket, BurstUpLoadparams.objet, BurstUpLoadparams.partNumber, BurstUpLoadparams.uploadId, BurstUpLoadparams.numlist, BurstUpLoadparams.size, BurstUpLoadparams.objetname, BurstUpLoadparams.time, i).upload.addEventListener('progress', function(e) {
										if(e.lengthComputable) {
											if((e.loaded / e.total) === 1) {
												//												if(!that.filedata[i].delecteFileUpload) {
												//													Bus.$on('video_success_', function(msg) {
												//														debugger
												//														if(that.filedata[i].runningFileUpload) {
												//															let paramsVuplist = {
												//																'appid': res.data.oss_id,
												//																'bucket': res.data.bucket,
												//																'certification': res.data.uploadCert,
												//																'object': res.data.fileName,
												//																'uploadid': res.data.uploadId
												//															};
												//															that.getduration(paramsVuplist, that.filedata, i, i, true)
												//															that.getTotal_Succ();
												//														}
												//													})
												//												}
											}
										}
									}, false)
								} else {
									//简单上传
									simpleUpLoda(filenav[i].file, res.data.uploadCert, res.data.oss_id, res.data.bucket, res.data.fileName, filenav[i].time, i).onreadystatechange = function(res) {
										let statueData = res.target.status;
										if(res.target.readyState === 4) {
											if(res.target.status === 200) {
												if(!that.filedata[i].delecteFileUpload) {
													that.getduration("", that.filedata, i, i, false)
													//															console.log(that.getduration(that.filedata, i, i, false))
													//													that.videocommit_(that.addvideoId[i], i, []);
													that.getTotal_Succ();
												}
											}
										}
									}
								}
							} else {
								that.filedata[i].sucessFileUpload = false;
								that.filedata[i].runningFileUpload = false;
								that.filedata[i].errorFileUpload = true;
								that.filedata[i].waitingFileUpload = false;
								that.filedata[i].delecteFileUpload = false;
								window.sessionStorage.videoFile = JSON.stringify(that.filedata);
								Bus.$emit("videoFlieAll", that.filedata);
								i = i + 1;
								that.createVideo(that.filedata, i)
								if(window.sessionStorage.isupload === '1') {
									for(let k = 0; k < that.filedata.length; k++) {
										if(that.filedata[k].runningFileUpload || that.filedata[k].waitingFileUpload) {
											that.showWarnning = true;
											that.paddingTop = 0;
										} else {
											that.showWarnning = false;
											that.paddingTop = 10;
										}
									}
								}
								that.getTotal_Succ();
							}
						}).catch(e => {
							that.filedata[i].sucessFileUpload = false;
							that.filedata[i].runningFileUpload = false;
							that.filedata[i].errorFileUpload = true;
							that.filedata[i].waitingFileUpload = false;
							that.filedata[i].delecteFileUpload = false;
							window.sessionStorage.videoFile = JSON.stringify(that.filedata);
							Bus.$emit("videoFlieAll", that.filedata);
							i = i + 1;
							that.createVideo(that.filedata, i)
							if(window.sessionStorage.isupload === '1') {
								for(let k = 0; k < that.filedata.length; k++) {
									if(that.filedata[k].runningFileUpload || that.filedata[k].waitingFileUpload) {
										that.showWarnning = true;
										that.paddingTop = 0;
									} else {
										that.showWarnning = false;
										that.paddingTop = 10;
									}
								}
							}
							that.getTotal_Succ();
						})
					} else {
						i = i + 1;
						that.createVideo(that.filedata, i);
					}
				} else {
					for(let n = 0; n < that.filedata.length; n++) {
						if(that.filedata[n].waitingFileUpload) {
							that.createVideo(that.filedata, n);
							n = that.filedata.length + 1;
							return
						}
					}
				}
			},
			//获取上传分片
			videouploadlist_(paramsVuplist, i, videotime) {
				videouploadlist(JSON.stringify(paramsVuplist)).then(res => {
					if(res.code === 200) {
						//								console.log(this.getduration(this.filedata, i, i, false))
						//						this.getduration(this.filedata, num, t_num, ischange)
						this.videocommit_(this.addvideoId[i], i, res.data.parts, videotime)
					} else {
						this.filedata[i].sucessFileUpload = false;
						this.filedata[i].runningFileUpload = false;
						this.filedata[i].errorFileUpload = true;
						this.filedata[i].waitingFileUpload = false;
						this.filedata[i].delecteFileUpload = false;
						window.sessionStorage.videoFile = JSON.stringify(this.filedata);
						Bus.$emit("videoFlieAll", this.filedata);
						if(window.sessionStorage.isupload === '1') {
							for(let k = 0; k < this.filedata.length; k++) {
								if(this.filedata[k].runningFileUpload || this.filedata[k].waitingFileUpload) {
									this.showWarnning = true;
									this.paddingTop = 0;
								} else {
									this.showWarnning = false;
									this.paddingTop = 10;
								}
							}
						}
						this.getTotal_Succ();
					}
				})
			},
			//提交视频
			videocommit_(videoid, uploadfilenum, part, videotime) {
				let that = this;
				let file_Time = [];
				if(window.sessionStorage.fileTime && window.sessionStorage.fileTime !== '') {
					file_Time = JSON.parse(window.sessionStorage.fileTime);
				}
				if(this.filedata[uploadfilenum].delecteFileUpload) {
					return
				}
				//						if(file_Time.length > 0) {
				//							if(file_Time[uploadfilenum]) {
				if(videotime !== 0) {
					that.videoId = window.sessionStorage.videoId;
					let paramsVideocommit = JSON.stringify({
						'token': window.localStorage.token,
						'appid': window.sessionStorage.videoappid,
						'videoId': that.videoId,
						'duration': videotime,
						'parts': part
					});
					videocommit(paramsVideocommit).then(res => {
						let i = uploadfilenum;
						i = i + 1;
						if(res.code === 200) {
							this.filedata[uploadfilenum].sucessFileUpload = true;
							this.filedata[uploadfilenum].runningFileUpload = false;
							this.filedata[uploadfilenum].errorFileUpload = false;
							this.filedata[uploadfilenum].waitingFileUpload = false;
							this.filedata[uploadfilenum].delecteFileUpload = false;
							window.sessionStorage.videoFile = JSON.stringify(this.filedata);
							Bus.$emit("videoFlieAll", that.filedata);
							if(window.sessionStorage.isupload === '1') {
								for(let k = 0; k < that.filedata.length; k++) {
									if(that.filedata[k].runningFileUpload || that.filedata[k].waitingFileUpload) {
										that.showWarnning = true;
										that.paddingTop = 0;
									} else {
										that.showWarnning = false;
										that.paddingTop = 10;
									}
								}
							}
							that.getTotal_Succ();
						} else {
							that.filedata[uploadfilenum].sucessFileUpload = false;
							that.filedata[uploadfilenum].runningFileUpload = false;
							that.filedata[uploadfilenum].errorFileUpload = true;
							that.filedata[uploadfilenum].waitingFileUpload = false;
							that.filedata[uploadfilenum].delecteFileUpload = false;
							window.sessionStorage.videoFile = JSON.stringify(that.filedata);
							Bus.$emit("videoFlieAll", that.filedata);
							if(window.sessionStorage.isupload === '1') {
								for(let k = 0; k < that.filedata.length; k++) {
									if(that.filedata[k].runningFileUpload || that.filedata[k].waitingFileUpload) {
										that.showWarnning = true;
										that.paddingTop = 0;
									} else {
										that.showWarnning = false;
										that.paddingTop = 10;
									}
								}
							}
							//											let i = uploadfilenum;
							//											i = i + 1;
							//											that.createVideo(that.filedata, i);
							that.getTotal_Succ();
						}
						window.setTimeout(function() {
							that.createVideo(that.filedata, i);
						}, 100)
						window.setTimeout(function() {
							that.getVideoList();
						}, 100)
					})
				} else {
					that.filedata[uploadfilenum].sucessFileUpload = false;
					that.filedata[uploadfilenum].runningFileUpload = false;
					that.filedata[uploadfilenum].errorFileUpload = true;
					that.filedata[uploadfilenum].waitingFileUpload = false;
					that.filedata[uploadfilenum].delecteFileUpload = false;
					window.sessionStorage.videoFile = JSON.stringify(that.filedata);
					Bus.$emit("videoFlieAll", that.filedata);
					if(window.sessionStorage.isupload === '1') {
						for(let k = 0; k < that.filedata.length; k++) {
							if(that.filedata[k].runningFileUpload || that.filedata[k].waitingFileUpload) {
								that.showWarnning = true;
								that.paddingTop = 0;
							} else {
								that.showWarnning = false;
								that.paddingTop = 10;
							}
						}
					}
					let i = uploadfilenum;
					i = i + 1;
					window.setTimeout(function() {
						that.createVideo(that.filedata, i);
					}, 100)
					that.getTotal_Succ();
					window.setTimeout(function() {
						that.getVideoList();
					}, 100)
				}
				//							} else {
				//								that.filedata[uploadfilenum].sucessFileUpload = false;
				//								that.filedata[uploadfilenum].runningFileUpload = false;
				//								that.filedata[uploadfilenum].errorFileUpload = true;
				//								that.filedata[uploadfilenum].waitingFileUpload = false;
				//								that.filedata[uploadfilenum].delecteFileUpload = false;
				//								window.sessionStorage.videoFile = JSON.stringify(that.filedata);
				//								Bus.$emit("videoFlieAll", that.filedata);
				//								if(window.sessionStorage.isupload === '1') {
				//									for(let k = 0; k < that.filedata.length; k++) {
				//										if(that.filedata[k].runningFileUpload || that.filedata[k].waitingFileUpload) {
				//											that.showWarnning = true;
				//											that.paddingTop = 0;
				//										} else {
				//											that.showWarnning = false;
				//											that.paddingTop = 20;
				//										}
				//									}
				//								}
				//								let i = uploadfilenum;
				//								i = i + 1;
				//								that.createVideo(that.filedata, i);
				//								that.getTotal_Succ();
				//							}
				//				} else {
				//					that.filedata[uploadfilenum].sucessFileUpload = false;
				//					that.filedata[uploadfilenum].runningFileUpload = false;
				//					that.filedata[uploadfilenum].errorFileUpload = true;
				//					that.filedata[uploadfilenum].waitingFileUpload = false;
				//					that.filedata[uploadfilenum].delecteFileUpload = false;
				//					window.sessionStorage.videoFile = JSON.stringify(that.filedata);
				//					Bus.$emit("videoFlieAll", that.filedata);
				//					if(window.sessionStorage.isupload === '1') {
				//						for(let k = 0; k < that.filedata.length; k++) {
				//							if(that.filedata[k].runningFileUpload || that.filedata[k].waitingFileUpload) {
				//								that.showWarnning = true;
				//								that.paddingTop = 0;
				//							} else {
				//								that.showWarnning = false;
				//								that.paddingTop = 20;
				//							}
				//						}
				//					}
				//					that.getTotal_Succ();
				//						}
			},
			//取消上传
			fileonabort(index) {
				this.isdelBtn = true;
				let that = this;
				this.$confirm('是否确定取消该视频上传?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					closeOnClickModal: false,
					type: 'warning'
				}).then(() => {
					if(!that.filedata[index].sucessFileUpload) {
						this.isdelBtn = false;
						that.filedata[index].xhr.abort();
					}
				}).catch(() => {
					this.isdelBtn = false;
				});
			},
			//移除上传列表
			fileremove(index) {
				//				this.filedata.splice(index,1);
				let that = this;
				this.$confirm('是否确定取消该视频上传?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					closeOnClickModal: false,
					type: 'warning'
				}).then(() => {
					that.isdelBtn = false;
					that.filedata[index].sucessFileUpload = false;
					that.filedata[index].runningFileUpload = false;
					that.filedata[index].errorFileUpload = false;
					that.filedata[index].waitingFileUpload = false;
					that.filedata[index].delecteFileUpload = true;
					that.getTotal_Succ();
				}).catch(() => {
					that.isdelBtn = false;
					that.getTotal_Succ();
				});

			},
			//清除出错记录
			videoclearfailed_() {
				let videoIds = [];
				for(let j = 0; j < this.filedata.length; j++) {
					if((this.filedata[j].errorFileUpload || this.filedata[j].delecteFileUpload) && this.filedata[j].isshow === true) {
						this.filedata[j].isshow = false;
						window.sessionStorage.videoFile = JSON.stringify(this.filedata);
						Bus.$emit("videoFlieAll", this.filedata);
						if(this.addvideoId[j] !== '') {
							videoIds.push(this.addvideoId[j])
						}
					}
				}
				if(videoIds.length === this.filedata.length) {
					this.videouploadlist = false;
				}
				let paramsVclearfailed = JSON.stringify({
					'token': window.localStorage.token,
					'appid': window.sessionStorage.videoappid,
					'videoIds': videoIds
				})
				if(videoIds.length > 0) {
					videoclearfailed(paramsVclearfailed).then(res => {

					})
				}
				this.getTotal_Succ();
			},
			//重新上传
			filereupload(index) {
				let fileReupload = {};
				let addFileReupload = [];
				let iswaiting;
				let that = this
				//				this.filedata[index].isshow = false;
				let obj = document.getElementById('file_reupload' + index);
				let filenav = document.getElementById('file_reupload' + index).files[0];

				let isMP4;
				let fileTypeNum = filenav.name.lastIndexOf(".");
				let fileType = filenav.name.substring(fileTypeNum + 1)
				let file_name = filenav.name.substring(0, fileTypeNum);
				if(fileType.toUpperCase() === "MP4") {
					fileReupload = {
						file: filenav,
						rename: filenav.name,
						status: 0,
						xhr: '',
						size: filenav.size,
						filename: filenav.name,
						time: new window.Date(),
						isshow: true,
						isture: true,
						sucessFileUpload: false,
						errorFileUpload: false,
						waitingFileUpload: true,
						runningFileUpload: false,
						delecteFileUpload: false
					};
					if(window.sessionStorage.isupload === '1') {
						for(let k = 0; k < that.filedata.length; k++) {
							if(that.filedata[k].runningFileUpload || that.filedata[k].waitingFileUpload) {
								that.showWarnning = true;
								that.paddingTop = 0;
							} else {
								that.showWarnning = false;
								that.paddingTop = 10;
							}
						}
					}
					isMP4 = true;
				} else {
					this.open4("你选择的文件中含有非MP4格式的文件，请重新选择MP4格式的视频");
					isMP4 = false;
					return
				}
				if(isMP4 === true) {
					addFileReupload.push(fileReupload);
					let ischange = true;
					//							this.getduration(this.filedata, index + 1, index, ischange);
					this.filedata.splice(index, 1, fileReupload);
					this.clearInputFile(obj)
					let nueaddfile = 0;
					for(let i = 0; i < this.filedata.length; i++) {
						if(this.filedata[i].waitingFileUpload || this.filedata[i].runningFileUpload) {
							nueaddfile = nueaddfile + 1;
						}
					}
					if(nueaddfile === 1) {
						this.createVideo(this.filedata, index);
					}
					window.sessionStorage.videoFile = JSON.stringify(this.filedata);
				}
			},
			setVideoCateId(cateId) {
				this.msg = "没有查询到符合条件的数据";
				this.videoCateId = cateId;
				this.classfiy_select = false;
				this.pageindex = 1;
				this.getVideoList();
			},
			changeStatus(type) {
				this.videoStatus = type;
				this.pageindex = 1;
				this.getVideoList();
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
					if(data.data.length > 0) {}
				})
			},
			getVideoList() {
				let that = this
				if(this.videoType === "视频ID") {
					this.submitVideoId = this.videoText || null;
					this.submitVideoTitle = null;
				} else if(this.videoType === "视频名称") {
					this.submitVideoTitle = this.videoText || null;
					this.submitVideoId = null;
				}

				let ts = Date.parse(new Date()).toString();
				let signature = hex_md5(window.sessionStorage.videoappid + ts + window.sessionStorage.videoappkey);
				let endTime = '';
				let startTime = '';
				if(this.endTime) {
					endTime = ((parseInt(new Date(this.endTime.substring(0, this.endTime.length).replace(/-/g, '/')).getTime()) + 24 * 3600000) / 1000).toString()
					startTime = (parseInt(new Date(this.startTime.substring(0, this.startTime.length).replace(/-/g, '/')).getTime()) / 1000).toString()
				}

				let postData = {
					//					"appid": "alkghsaijgsagsuyg",
					"appid": window.sessionStorage.videoappid,
					"videoId": this.submitVideoId,
					"needTotalNum": "true",
					"title": this.submitVideoTitle,
					"cateId": this.videoCateId,
					"cateName1": "",
					"cateName2": "",
					"cateName3": "",
					"startts": startTime,
					"endts": endTime,
					"sortBy": this.createtime,
					"pageNo": this.pageindex,
					"pagesize": this.pagesize,
					"ts": ts,
					"signature": signature
				}

				videolist(postData).then(res => {
					if(res.code === 200) {
						if(res.data.totalNum > 0) {
							this.data1 = res.data;
							this.videotable = true;
						} else {
							this.videotable = false;
						}
						let video_height = this.$refs.get_Height.clientHeight - 185;
						this.nav_height = video_height;
						this.delvideo = false;
						this.classfiy_select = false;
						let video_table = document.getElementById("video_table");
						let Checkbox = video_table.getElementsByTagName("input");
						for(let i = 0; i < Checkbox.length; i++) {
							Checkbox[i].checked = false;
						}
						this.delete_All = true;
						this.deleteAll = false;
					} else if(res.code === 401) {
						//						router.push({
						//							path: '/home/video/app/appmanage'
						//						})
					}
					document.getElementById("get_tableHeight").scrollTop = 0;
					window.setTimeout(function() {
						if(that.$refs.get_tableHeight.clientHeight) {
							let video_tableheight = that.$refs.get_tableHeight.clientHeight;
							that.tableHeight = video_tableheight + 32
						}

					}, 100)
				})
			},
			delVideo_del(id) {
				this.classfiy_select = false;
				let waring
				if(id) {
					waring = "确认删除该视频?";
				} else {
					waring = "确认删除这些视频文件?";
				}
				this.$confirm(waring, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					closeOnClickModal: false,
					type: 'warning'
				}).then(() => {
					this.delvideo = false;
					let video_table = document.getElementById("video_table");
					let Checkbox = video_table.getElementsByTagName("input");
					var ids = [];
					for(let i = 0; i < Checkbox.length; i++) {
						if(Checkbox[i].checked) {
							ids.push(Checkbox[i].id);
						}
					}
					if(id == null && ids.length > 10) {
						this.$notify({
							title: '警告',
							message: "超过限制，最多同时删除10个视频",
							type: 'warning',
							duration: 3000
						});
						return;
					}
					let ts = Date.parse(new Date()).toString();
					let signature = hex_md5(window.sessionStorage.videoappid + ts + window.sessionStorage.videoappkey);
					let postData = {
						"appid": window.sessionStorage.videoappid || window.sessionStorage.videoappid,
						"videoIds": id != null ? [id] : ids,
						"ts": ts,
						"signature": signature
					}

					videodelete(postData).then(data => {
						if(data.code === 200) {
							this.$notify({
								title: '成功',
								message: '删除成功',
								type: 'success'
							});
							let video_height = this.$refs.get_Height.clientHeight - 185;
							this.nav_height = video_height;
							for(let i = 0; i < Checkbox.length; i++) {
								Checkbox[i].checked = false;
							}
							this.delete_All = true;
							this.deleteAll = false;
						}
						this.getVideoList();
					})
				}).catch((e) => {});
			},
			delVideo() {
				this.delvideo = true;
			},
			delVideoall(id) {
				this.classfiy_select = false;
				this.delvideo = false;
				let video_table = document.getElementById("video_table");
				let Checkbox = video_table.getElementsByTagName("input");
				var ids = [];
				for(let i = 0; i < Checkbox.length; i++) {
					if(Checkbox[i].checked) {
						ids.push(Checkbox[i].id);
					}
				}
				let ts = Date.parse(new Date()).toString();
				let signature = hex_md5(window.sessionStorage.videoappid + ts + window.sessionStorage.videoappkey);
				let postData = {
					"appid": window.sessionStorage.videoappid || window.sessionStorage.videoappid,
					//					"appid": "alkghsaijgsagsuyg",
					"videoIds": id != null ? [id] : ids,
					"ts": ts,
					"signature": signature
				}
				for(let i = 0; i < Checkbox.length; i++) {
					Checkbox[i].checked = false;
				}
				this.deleteAll = false;
				this.delete_All = true;
				videodelete(postData).then(data => {
					if(data.code === 200) {
						this.$notify({
							title: '成功',
							message: '删除成功',
							type: 'success'
						});
						let video_height = this.$refs.get_Height.clientHeight - 185;
						this.nav_height = video_height;
					}
					this.getVideoList();
				})
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
								this.getVideoList();
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
			let that = this;
			let fileVideoAll = [];
			window.sessionStorage.videoFile = ''
			if(window.sessionStorage.video_File && window.sessionStorage.video_File !== "") {
				window.sessionStorage.videoFile = window.sessionStorage.video_File;
				fileVideoAll = JSON.parse(window.sessionStorage.videoFile);
				let isrunning;
				Bus.$on('videoFileShowAll', function(msg) {
					if(msg === 1) {
						for(let i = 0; i < fileVideoAll.length; i++) {
							if(fileVideoAll[i].waitingFileUpload || fileVideoAll[i].runningFileUpload) {
								isrunning = true;
								break
							} else {
								isrunning = false;
							}
						}
						if(isrunning === false) {
							that.filedata = fileVideoAll;
						}
					}
				})
			}
			if(window.sessionStorage.videoid && window.sessionStorage.videoid !== "") {
				that.addvideoId = JSON.parse(window.sessionStorage.videoid)
			}
		},
		components: {
			'core-header': CoreHeader,
			'user-search':UserSearch
		},
		mounted() {
			//			let video_height = this.$refs.get_Height.clientHeight - 185;
			//			this.nav_height = video_height;
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
			this.videoapplist_();
			let that = this;
			Bus.$on('videoflie', function(msg) {
				that.videouploadlist = true;
				for(let i = 0; i < that.filedata.length; i++) {
					if(that.filedata[i].time === msg.time && that.filedata[i].file.name === msg.filename_) {
						let stutas = ''
						if(Math.round(msg.filestatus_ * 100) > 99) {
							stutas = 99
						} else {
							stutas = Math.round(msg.filestatus_ * 100)
						}
						if(!that.filedata[i].delecteFileUpload) {
							that.filedata[i].runningFileUpload = true;
							that.filedata[i].waitingFileUpload = false;
							that.filedata[i].status = Math.round(msg.filestatus_ * 100);
							that.filedata[i].xhr = msg.xtthr;
						}
						window.sessionStorage.videoFile = JSON.stringify(that.filedata);
						Bus.$emit("videoFlieAll", that.filedata);
						if(window.sessionStorage.isupload === '1') {
							for(let k = 0; k < that.filedata.length; k++) {
								if(that.filedata[k].runningFileUpload || that.filedata[k].waitingFileUpload) {
									that.showWarnning = true;
									that.paddingTop = 0;
								} else {
									that.showWarnning = false;
									that.paddingTop = 10;
								}
							}
						}
					}
				}
				that.getTotal_Succ();
			})
			Bus.$on('video_flie', function(msg) {
				that.videouploadlist = true;
				for(let i = 0; i < that.filedata.length; i++) {
					if(that.filedata[i].time === msg.time && that.filedata[i].file.name === msg.filename_) {
						let num = that.filedata.length;
						let FileloseNum = i + 1;
						that.createVideo(that.filedata, FileloseNum)
						that.filedata[i].sucessFileUpload = false;
						that.filedata[i].runningFileUpload = false;
						that.filedata[i].errorFileUpload = true;
						that.filedata[i].waitingFileUpload = false;
						that.filedata[i].delecteFileUpload = false;
						window.sessionStorage.videoFile = JSON.stringify(that.filedata);
						Bus.$emit("videoFlieAll", that.filedata);
						if(window.sessionStorage.isupload === '1') {
							for(let k = 0; k < that.filedata.length; k++) {
								if(that.filedata[k].runningFileUpload || that.filedata[k].waitingFileUpload) {
									that.showWarnning = true;
									that.paddingTop = 0;
								} else {
									that.showWarnning = false;
									that.paddingTop = 10;
								}
							}
						}
					}
				}
				that.getTotal_Succ();
			})
			Bus.$on('videoFileSelect', function(msg) {
				window.sessionStorage.video_File = window.sessionStorage.videoFile;
				that.filedata = msg;
				that.getTotal_Succ();
			})
			Bus.$on("getfileTime", function(msg) {
				fileTime = msg;
			});
			Bus.$on("isabort", function(msg) {
				//					if(fileTime[msg].xhr) {
				//						if(fileTime[msg].xhr !== "") {
				//							fileTime[msg].xhr.onabort = function(e) {}
				//							fileTime[msg].xhr.abort()
				//						}
				//					}
				//				that.filedata[msg].xhr
				that.filedata[msg].sucessFileUpload = false;
				that.filedata[msg].runningFileUpload = false;
				that.filedata[msg].errorFileUpload = false;
				that.filedata[msg].waitingFileUpload = false;
				that.filedata[msg].delecteFileUpload = true;
				let num = that.filedata.length;
				let i = msg + 1;
				that.createVideo(that.filedata, i);
				//					if(window.sessionStorage.fileTime) {
				//						if(window.sessionStorage.fileTime !== '') {
				//							fileTime = JSON.parse(window.sessionStorage.fileTime)
				//						}
				//					}
				//					that.getduration(that.filedata, num, i, true)
				//				if (fileTime.length < msg) {
				//					that.getduration(that.filedata, num, i, false)
				//				}

				if(window.sessionStorage.isupload === '1') {
					for(let k = 0; k < that.filedata.length; k++) {
						if(that.filedata[k].runningFileUpload || that.filedata[k].waitingFileUpload) {
							that.showWarnning = true;
							that.paddingTop = 0;
						} else {
							that.showWarnning = false;
							that.paddingTop = 10;
						}
					}
				}
				that.getTotal_Succ();
			});

			//			if(!that.filedata[i].delecteFileUpload) {
			Bus.$on('video_success_', function(msg) {
				//					debugger
				if(that.filedata[msg.fileid].runningFileUpload) {
					let paramsVuplist = {
						'appid': msg.appid,
						'bucket': msg.bucket,
						'certification': msg.certification,
						'object': msg.object,
						'uploadid': msg.uploadid
					};
					that.getduration(paramsVuplist, that.filedata, msg.fileid, msg.fileid, true)
					that.getTotal_Succ();
				}
			})
			//			}

			//获取上传任务
			if(window.sessionStorage.isupload === '1') {
				for(let k = 0; k < that.filedata.length; k++) {
					if(that.filedata[k].runningFileUpload || that.filedata[k].waitingFileUpload) {
						that.showWarnning = true;
						that.paddingTop = 0;
					} else {
						that.showWarnning = false;
						that.paddingTop = 10;
					}
				}
			}
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
	
	#video_manage {
		height: 100%;
		overflow: hidden;
		background-color: #E6E4EA;
		position: relative;
		/*width: 98%;
		height: 100%;*/
		padding: 0px 20px;
		margin: 0 auto;
		/*padding-left: 15px;''*/
		/*padding: 0 15px;*/
		.wrap {
			/*position: absolute;
			left: 20px;
			top: 20px;
			right: 20px;
			bottom: 20px;*/
			margin-top: 19px;
			padding-bottom: 20px;
			margin-bottom: 20px;
			padding-left: 20px;
			padding-right: 20px;
			background-color: #FFFFFF;
		}
		#video_view {
			width: 100%;
			margin-top: -20px;
			#videoView {
				width: 88%;
				margin: 0 auto;
			}
		}
		#set_nav {
			width: 100%;
			padding: 20px 0px;
			border-top: 1px solid #D3DCE6;
			border-bottom: 1px solid #D3DCE6;
			margin-top: -15px;
			margin-bottom: -25px;
			position: relative;
			.closeIcon {
				width: 16px;
				height: 16px;
				cursor: pointer;
				position: absolute;
				right: 10px;
				top: -25px;
				font-size: 15px;
			}
			#tabNav {
				width: 100%;
				#tabNavsecond {
					width: 100%;
					>div {
						max-height: 250px;
						overflow-x: hidden;
						overflow-y: auto;
					}
					.video_table {
						border: 1px solid #EFF2F7;
						width: 100%;
						height: 80px;
						line-height: 80px;
						text-align: center;
					}
				}
				#tabNavFirst {
					width: 100%;
					max-height: 250px;
					overflow-x: hidden;
					overflow-y: auto;
					#fileStatus {
						width: 150px !important;
					}
					.video_table {
						border: 1px solid #EFF2F7;
						width: 100%;
						height: 80px;
						line-height: 80px;
						text-align: center;
					}
				}
				#tabNavFirstTittle {
					width: 100%;
					border: 1px solid #E5E9F2;
					thead {
						border: 1px;
						background-color: #E5E9F2;
						th {
							text-align: center;
						}
						tr {
							line-height: 25px;
							height: 25px;
						}
					}
					tbody {
						tr {
							line-height: 35px;
							height: 35px;
							border-top: 1px solid #E5E9F2;
							td {
								line-height: 35px;
								cursor: default;
							}
							#fileName {}
						}
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
					}
					tr {
						font-size: 14px;
						width: 100%;
						text-align: center;
						#file_Name {
							overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							max-width: 300px;
						}
						#fileName,
						#file_Name {
							input {
								text-align: center;
								margin: 0 auto;
								display: block;
								width: 95%;
								height: 25px;
								line-height: 25px;
								font-size: 13px;
								border: 1px solid #CCCCCC;
								overflow: hidden;
								text-overflow: ellipsis;
								white-space: nowrap;
							}
						}
						#fileSize {
							width: 100px;
						}
						#fileStatus {
							width: 140px;
							#sucess {
								color: rgb(19, 206, 102);
							}
							#waiting {
								color: #09c;
							}
							#delecteFile>div {
								width: 60px;
								margin: 0 auto;
								#delecte {
									width: 13px;
									height: 13px;
									display: block;
									float: left;
									border-radius: 13px;
									margin-top: 10px;
									background-color: #CCCCCC;
								}
							}
							#fileuploaderror {
								color: red;
							}
						}
						#fileBuild {
							width: 60px;
							span {
								cursor: pointer;
								color: #0190FE;
								position: relative;
								overflow: hidden;
								input {
									position: absolute;
									left: 0;
									top: -4px;
									bottom: -2px;
									right: 0;
									opacity: 0;
									font-size: 1;
									-moz-opacity: 0;
									filter: alpha(opacity=0);
								}
							}
							span:hover {
								opacity: .7;
								color: #09c;
							}
						}
					}
				}
			}
			#tabTittle {
				width: 100%;
				height: 30px;
				cursor: default;
				margin-bottom: 10px;
				font-size: 14px;
				>div {
					float: left;
					width: 50%;
					height: 100%;
					line-height: 30px;
					text-align: center;
					color: #FFFFFF;
				}
				#tab_first {
					/*background-color: #C0CCDA;*/
				}
				.activeTab {
					background-color: #09c !important;
				}
				#tab_second {
					background-color: #C0CCDA;
				}
			}
		}
		.dialog-footer {
			overflow: hidden;
			padding-top: 30px;
			padding-bottom: 0px;
			#delectLog {
				float: left;
			}
			#closeDialo {
				float: right;
			}
			#addfileBtn {
				float: right;
				width: 140px;
				height: 36px;
				cursor: pointer;
				font-size: 14px;
				line-height: 36px;
				text-align: center;
				position: relative;
				#selectAddFile {
					position: absolute;
					left: 27px;
					top: 10px;
					width: 85px;
					height: 15px;
					display: inline-block;
					opacity: 0;
					font-size: 0;
					cursor: pointer;
					z-index: 999;
				}
			}
			#addfileBtn_ {
				float: right;
				width: 140px;
				height: 36px;
				cursor: pointer;
				background-color: #20a0ff;
				color: #fff;
				font-size: 14px;
				line-height: 36px;
				text-align: center;
				position: relative;
				margin-right: 15px;
				border-radius: 4px;
				span {
					display: block;
					width: 100%;
					height: 100%;
					cursor: pointer;
				}
				#starUpload {
					width: 100%;
					height: 100%;
				}
				#selectFile {
					cursor: pointer;
					position: absolute;
					left: 0px;
					top: 0px;
					width: 139px;
					height: 100%;
					display: inline-block;
					opacity: 0;
					font-size: 0;
					z-index: 9999;
				}
			}
		}
		#video_open_tittle {
			width: 100%;
			height: 65px;
			/*padding: 1px 20px;*/
			padding-top: 1px;
			border-bottom: 1px solid #D3DCE6;
			text-align: left;
			#warnning {
				width: 100%;
				background-color: rgba(255, 153, 0, 0.07);
				font-size: 12px;
				color: #ff6600;
				#floatRight {
					float: right;
					margin-right: 10px;
					display: inline;
					cursor: pointer;
				}
			}
			p {
				float: left;
				display: inline;
				font-size: 16px;
				font-weight: bold;
				padding-left: 15px;
				height: 16px;
				border-left: 3px solid #09c;
				line-height: 16px;
			}
			#uploadBtn {
				height: 30px;
				margin-top: -7px;
				float: right;
				margin-right: 30px;
			}
		}
		#video_list {
			width: 100%;
			margin-top: 20px;
			/*padding: 20px;*/
			/*margin: 20px;*/
			
			#video_list_nav {
				width: 100%;
				margin-top: 10px;
				/*overflow: hidden;*/
				position: relative;
				#video_header {
					position: absolute;
					/*border-left: 1px solid #ccc;
					border-bottom: 1px solid #ccc;
					border-right: 1px solid #ccc;*/
					width: 98%;
					height: 50px;
					line-height: 50px;
					padding: 10px;
					#video_header_left {
						float: left;
						height: 30px;
						line-height: 30px;
						#video_delete_btn {
							margin-left: 5px;
						}
					}
					#video_header_right {
						float: right;
						height: 30px;
						line-height: 30px;
					}
				}
				.video_table {
					height: 80px;
					text-align: center;
					line-height: 78px;
				}
				#video_table {
					/*border: 1px solid #EFF2F7;*/
					background-color: #FFFFFF;
					width: 100%;
					/*overflow-x: hidden;
					overflow-y: auto;*/
					#videoTblsort {
						width: 100%;
						thead {
							z-index: 999;
							width: 100%;
							height: 30px;
							line-height: 30px;
							font-size: 14px;
							color: #868686;
							overflow: hidden;
							background-color: #f6f6f6;
							tr>th {
								text-align: center;
								background-color: #f6f6f6;
							}
							#checkbox {
								width: 20px;
							}
						}
						tbody {
							width: 100%;
							>div {
								width: 100%;
								position: absolute;
								top: 30px;
								left: 0px;
								right: 0;
								border-left: 1px solid #EFF2F7;
								border-right: 1px solid #EFF2F7;
							}
							>div>div {
								overflow: hidden;
								width: 100%;
								border-bottom: 1px solid #EFF2F7;
								cursor: default;
								padding-bottom: 5px;
								background-color: #FFFFFF;
								td {
									height: 75px;
									line-height: 75px;
									padding-top: 5px;
								}
							}
						}
						tbody>div>div:hover {
							background-color: rgba(249, 249, 249, 1);
						}
						#checkbox {
							width: 30px;
							float: left;
							text-align: center;
						}
						#video_name {
							float: left;
							width: 30%;
							/*overflow: hidden;
							text-overflow: ellipsis;
							white-space: nowrap;
							-o-text-overflow: ellipsis;
							min-width: 280px;*/
							position: relative;
							#video_name_nav {
								width: 100%;
								#video_pic_hover {
									width: 130px;
									height: 70px;
									position: absolute;
									left: 0;
									top: 0;
									display: none;
									background-color: rgba(215, 215, 215, 1);
									opacity: 0.7;
									font-size: 0;
									filter: Alpha(opacity=70);
									-moz-opacity: 0.7;
									#video_pic_hover_play {
										width: 30px;
										height: 30px;
										background: url(../../mock/img/play_video.png);
										background-size: 100% 100%;
										margin: 20px auto;
										cursor: pointer;
									}
								}
								#video_pic_:hover #video_pic_hover {
									display: inline-block;
								}
								#video_pic {
									margin-top: 5px;
									width: 100%;
									height: 70px;
									position: absolute;
									left: 0;
									top: 0;
									color: #FFFFFF;
									font-weight: bold;
									font-size: 17px;
									text-align: center;
									line-height: 70px;
									#video_pic_ {
										width: 130px;
										height: 100%;
										background: rgba(215, 215, 215, 1);
										background-size: 100% 100%;
									}
									#video_tittle {
										width: 100%;
										padding-top: 5px;
										position: absolute;
										left: 135px;
										top: 0;
										#video_tittle_first {
											color: #000000;
										}
										#video_tittle_second {
											color: #868686;
										}
										p {
											width: 70%;
											/*width: 600px;*/
											font-size: 14px;
											line-height: 18px;
											text-align: left;
											min-width: 160px;
											overflow: hidden;
											text-overflow: ellipsis;
											white-space: nowrap;
											-o-text-overflow: ellipsis;
											margin-bottom: 0px;
										}
									}
								}
							}
						}
						#video_status {
							float: right;
							width: 130px;
							text-align: center;
							position: relative;
							span {
								color: #868686;
							}
							i {
								cursor: pointer;
								line-height: 30px;
							}
							ul {
								border: 1px solid #CCCCCC;
								position: absolute;
								right: 25px;
								padding: 5px 10px;
								z-index: 9999;
								top: 25px;
								background-color: #FFFFFF;
								li {
									font-size: 12px;
									width: 100%;
									height: 25px;
									line-height: 25px;
									border-bottom: 1px solid #CCCCCC;
									cursor: pointer;
									a {
										color: #000000;
									}
								}
								li:hover {
									background-color: #EFF2F7;
								}
							}
						}
						#video_classify {
							float: right;
							width: 170px;
							max-width: 170px;
							text-align: center;
							padding: 0 10px;
							/*position: relative;*/
							a {
								display: block;
								width: 100%;
								white-space: nowrap;
								overflow: hidden;
								text-overflow: ellipsis;
								color: #000000;
								font-size: 12px;
							}
							i {
								cursor: pointer;
								line-height: 30px;
							}
							>ul {
								max-height: 200px;
								overflow: auto;
								width: 170px;
								border: 1px solid #CCCCCC;
								position: absolute;
								right: 310px;
								padding: 5px 15px 10px;
								z-index: 9999;
								top: 30px;
								border-radius: 4px;
								background-color: #FFFFFF;
								transform-origin: center top 0px;
								box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
								>li:nth-of-type(1) {
									height: 30px;
									/*border-bottom: 1px solid #CCCCCC;*/
									cursor: pointer;
									a {
										line-height: 30px;
									}
								}
								p {
									font-size: 10px;
									height: 30px;
									/*padding: 0 15px;*/
									/*border-top: 1px solid #CCCCCC;
									border-bottom: 1px solid #CCCCCC;*/
									cursor: default;
									line-height: 30px;
									margin: 0;
									cursor: pointer;
									text-align: left;
									a {
										color: #000000;
									}
								}
								p:hover {
									background-color: #EFF2F7;
								}
								>li:nth-of-type(1):hover {
									background-color: #EFF2F7;
								}
								>li {
									font-size: 12px;
									width: 100%;
									line-height: 25px;
									text-align: left;
									>a {
										color: #000000;
									}
									>div>ul>li {
										ul {
											margin-left: 15px;
											display: none;
										}
										>div {
											/*border-bottom: 1px solid #CCCCCC;*/
										}
										#set_first {
											display: block;
											color: #000000;
											width: 100%;
											height: 30px;
											line-height: 30px;
											/*border-bottom: 1px solid #CCCCCC;*/
											#set_first {
												padding-left: 10px;
											}
											#set_text {
												float: left;
												>i {
													cursor: pointer;
												}
												>span {
													display: block;
													float: left;
													.off {
														display: none;
													}
												}
												>span:nth-of-type(2),
												#childlast {
													cursor: pointer;
													width: 92px;
													overflow: hidden;
													text-overflow: ellipsis;
													white-space: nowrap;
													display: block;
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
											background-color: #EFF2F7;
											>#set_edit {
												display: inline-block;
											}
										}
									}
								}
							}
						}
						#video_createtime {
							float: right;
							width: 160px;
							text-align: center;
							>div {
								width: 80px;
								margin: 0 auto;
								overflow: hidden;
								#video_timeselect {
									margin-top: -2px;
									float: right;
									height: 30px;
									cursor: pointer;
									display: inline;
									font-size: 13px;
									li {
										height: 7px;
									}
								}
							}
						}
						#video_handle {
							float: right;
							width: 130px;
							text-align: center;
							span {
								cursor: pointer;
								color: #09c;
								a {
									color: #09c;
								}
							}
						}
					}
				}
			}
			.task_num{
				margin-top: 10px;
				font-size: 14px;
				#checkUploadList {
					color: #09c;
					cursor: pointer;
				}
			}
			#video_list_tittle {
				width: 100%;
				height: 30px;
				>div {
					float: left;
				}
				>p {
					/*float: right;*/
					margin-top: 5px;
					margin-right: 20px;
					display: inline;
					#checkUploadList {
						color: #09c;
						cursor: pointer;
					}
				}
				#video_select_type {
					width: 130px;
					height: 30px;
					float: right;
					#typeSelect {
						border-radius: 0px;
						input {
							border-radius: 0px;
						}
					}
				}
				#video_search_text {
					float: right;
					margin-left: 10px;
					width: 200px;
					height: 30px;
				}
				#video_search_time {
					float: right;
					margin-right: 10px;
					width: 250px;
					height: 30px;
					#videoTime {
						width: 100%;
					}
					#videoTime_ {
						float: left;
						line-height: 30px;
					}
				}
				#video_search_1 {
					margin-left: 30px;
					button {
						font-size: 12px !important;
					}
				}
			}
		}
	}
</style>