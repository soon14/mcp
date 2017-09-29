<template>
	<div class="wrapper" ref='getHeight'>
		<div class="object_dialog">
			<el-dialog title="获取Object地址" v-model="dialogVisible" size="small">
				<el-row>
					<el-col :span='3'>
						文件：
					</el-col>
					<el-col :span='21'>
						{{fileName}}
					</el-col>
				</el-row>
				<el-row class='getaddress'>
					<el-col :span='3' style="line-height: 30px;">
						地址：
					</el-col>
					<el-col :span='21'>
						<div id="" v-if="!showUrl" style="line-height: 30px;">
							<span id="" style="float: left;">
  						请输入链接有效时间：
  					</span>
							<el-input v-model="timeOut" size="small" style="width: 100px;float: left;"></el-input>
							<span id="" style="margin-left: 10px;float: left;">
			  			秒
			  		</span>
							<div id="" style="float: right;display: inline;position: relative;color: #f7ba2a;line-height: 30px;">
								<div id="" v-if="iscopy" style="position: absolute;left:-172px;top: -50px;width: 350px;line-height: 17px;color: #FFFFFF;" slot="content">
									<p style="background-color: rgba(31, 53, 61, .7);padding:4px;font-size:12px;">注意：1、设置时间为大于0的整数或等于-1。<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2、当设置时间等于-1时，则改下载地址为长期有效。</p>
									<p style="margin:0 auto;width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid rgba(31, 53, 61, .7);"></p>
								</div>
								<i class="el-icon-warning" @mouseover="isCopy_()" @mouseleave="isCopyleave_()"></i>
							</div>
							<el-button style="margin-right: 10px;float: right;background-color: #CCCCCC;" size="small" @click="get_presignedurl_(timeOut)">&nbsp;&nbsp;获取url&nbsp;&nbsp;</el-button>
						</div>
						<div id="" v-if="showUrl" style="position: relative;" @mouseover="isCopy_()" @mouseleave="isCopyleave_()">
							<input type="text" :value='fileAddress' readonly name="" id="addressLink" style="opacity:0;position:absolute;top:0;" />
							<div v-if="iscopy" class="" style="color:#FFFFFF;cursor: pointer;position: absolute;left: 2%;top:-25px;padding-bottom: 5px;opacity: .7;">
								<p style="padding: 3px;font-size:12px;background: rgb(31, 53, 61);" slot="content" type="primary" @click="mouseenter_('addressLink')" size="mini">复制链接</p>
								<p style="margin:0 auto;width:0;height:0;border-left:5px solid transparent;border-right:5px solid transparent;border-top:5px solid rgb(31, 53, 61);"></p>
							</div>
							<a :href="fileAddress" target="_blank" style="text-decoration: underline;display: block;word-wrap: break-word;" :download="fileName">
								{{fileAddress}}
							</a>
							<el-tooltip placement="top-start" style='' popper-class="liheight" :visible-arrow="false">
								<!--<p  style="cursor: pointer;position: absolute;left: 45%;top:-20px;" slot="content" type="primary" @click="mouseenter_('addressLink')" size="mini">复制链接</p>
							<a :href="fileAddress" target="_blank" style="text-decoration: underline;display: block;word-wrap: break-word;" :download="fileName">
								{{fileAddress}}
							</a>-->
							</el-tooltip>
						</div>
						<!--<a :href="fileAddress" target="_blank" style="text-decoration: underline;display: block;word-wrap: break-word;">{{fileAddress}}</a>-->
					</el-col>
				</el-row>
				<span slot="footer" class="dialog-footer">
	    <el-button type="primary" @click="dialogVisible = false;showUrl = false;">确 定</el-button>
	  </span>
			</el-dialog>
		</div>
		<div class="wrap">
			<div class="wrapper_head">
				<core-header :setting="setting"></core-header>
				<!--<div class="page_header">
				<div id="title">
					<span><i class="mf mf-oss"></i>{{bucketNmae}}</span>
				</div>
			</div>-->
			</div>
			<div class="wrapper_main">
				<div class="main_header">
					<!--<div class="l_title">
						<span>Object 管理</span>
					</div>-->
					<!--<div class="alldelete" style="float:left;margin-left: 40px;">
      	   <el-button type="primary" size="small" @click='dataSelectionChange()'>全选</el-button>
        </div>-->
					<div class="alldelete" style="float:left;">
						<el-button size="small" :plain="true" style="height: 36px !important;font-size: 14px;float: left;" :disabled="deletenum" @click='batchDeleteObject_'>批量删除</el-button>
						<button type="button" style="height: 36px !important;font-size: 14px;margin-left: 10px;float: left;" @click='getrefr()' class="el-button el-button--small">
			              <i class="mf mf-refresh1"></i>
			              <span>刷新</span>
			            </button>
						<div style="float: left;height: 40px;overflow: hidden;width: 100px;margin-top: -3px;margin-left: 10px;display: inline;">
							<div style="position: relative;font-size: 14px;height: 36px !important;cursor: pointer;border-radius: 4px;padding-left: 10px;padding-right: 10px;line-height: 20px;" class="el-button el-button--small">
								<i class="mf mf-upload" style="cursor: pointer;"></i>
								<span style="cursor: pointer;font-size: 14px;">文件上传</span>
								<input type="file" name="fileNav" style="opacity: 0;overflow:hidden;filter: Alpha(opacity=0);width: 100px;height: 36px;position: absolute;top: 0;left: 0;z-index: 1000;cursor: pointer;" @change='filebefore()' id="fileNav" value="" />
							</div>
						</div>
					</div>
					<div class="ringht_group">
						<!--<div>
            <button type="button" class="el-button el-button--primary el-button--small">
              <i class="iconfont icon-8fuzhi"></i>
              <span>新建文件夹</span>
            </button>
          </div>-->
						<div style="width: 300px; float: right;">
							<user-search placewords="搜索Bucket" @search-enter="searchObject_(searchVal)" :value="searchVal" v-model="searchVal"></user-search>
							<!--<el-row>
								<el-col :span="15" :offset='1'> <input class='searchInp' style='margin-top: 3px;' v-model="searchVal" placeholder="请输入内容" @keydown.enter='searchObject_(searchVal)'></input>
								</el-col>
								<el-col :span="5" :offset='1'>
									<button class="el-button el-button--primary el-button--small" @click='searchObject_(searchVal)' type="button" style="height: 36px !important;font-size: 15px;">
				  		<span>搜索</span>
				  	</button></el-col>
							</el-row>-->
						</div>
					</div>
				</div>
				<full-table :data="table.data" :title="table.title" :setting="table.setting" :columnsOperation="table.columnsOperation" @select="dataSelectionChange"></full-table>
				<!--<pagination :currentPage="page.current" :pageSize="page.size" :total="page.total" @size-change="sizeChange" @current-change="currentChange"></pagination>-->
				<!--<full-table :data="table.data" :title="table.title" :setting="table.setting" :page="table.page" @size-change="sizeChange" @current-change="currentChange" @select="dataSelectionChange"></full-table>-->
				<!--<el-table id="redata" ref='refind' border :data="tableData" v-loading="loading" element-loading-text="拼命加载中..." tooltip-effect="dark" style="width: 100%" @selection-change="dataSelectionChange">
					<el-table-column type="selection" width='40' align="left">
					</el-table-column>
					<el-table-column prop="name" align="left" label="文件名称" min-width=100 :show-overflow-tooltip="selectNum">
						<template scope="scope">
							<span>{{scope.row.name}}</span>
						</template>
					</el-table-column>
					<el-table-column prop="size" align="center" label="大小" show-overflow-tooltip>
						<template scope="scope">
							<span>
	          		{{scope.row.size | capacity}}
	          	</span>
						</template>
					</el-table-column>
					<el-table-column prop="name" align="center" label="类型" show-overflow-tooltip>
						<template scope="scope">
							<span>
	          		{{scope.row.name.split('').reverse().join('').substring(0,(scope.row.name.split('').reverse().join('').indexOf('.') + 1)).split('').reverse().join('')}}
	          	</span>
						</template>
					</el-table-column>
					<el-table-column prop="createtime" align="center" label="创建时间" show-overflow-tooltip>
						<template scope="scope">
							<span>
	          		{{scope.row.createtime}}
	          	</span>
						</template>
					</el-table-column>
					<el-table-column align="center" label="操作" width=140 show-overflow-tooltip>
						<template scope="scope">
							<span>
							<el-button type="text" @click='getAddress(scope.row.name)' style="cursor: pointer;">获取地址</el-button>
							<el-button type="text" @click='singleDeleteObject_(scope.row.name)' style="cursor: pointer;">删除</el-button>
	          	</span>
						</template>
					</el-table-column>
				</el-table>-->
				<a href="javascript:void(0)" @click='nextsearchObject_()' v-if='seardata' id="loadingmore">
					加载更多
				</a>
				<a href="javascript:void(0)" @click='nextgetObject_()' v-if='nonedata' id="loadingmore">
					加载更多
				</a>
			</div>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import { getAppList, getBucketMessage, applyPermission, getObject, simpleUpLoda, singleDeleteObject, batchDeleteObject, searchObject, get_presignedurl, burstUpLoadInit, listBurstUpLoad, BurstUpLoad } from '../../api/service';
	import VueRouter from 'vue-router'
	import storage from 'utils/local_storage_tool';
	import session from 'utils/session_storage_tool';
	import Vue from '../../utils/http';
	import { hex_md5 } from '../../utils/md5';
	import CoreHeader from '../CoreHeader.vue';
	import Pagination from 'components/awesome/pagination/Pagination.vue';
	import UserSearch from 'components/awesome/user_search/UserSearch.vue';
	import FullTable from 'components/awesome/list_table/ListTable.vue';
	//import routes from 'src/router'
	import Bus from '../../api/bus';
	//const router = new VueRouter({
	//	routes
	//})
	export default {
		data() {
			return {
				setting: {
					title: ''
				},
				page: {
					current: 1,
					size: 50,
					total: 0
				},
				table: {
					setting: {
						selection: true
					},
					title: [{
						prop: "name",
						label: "文件名称"
					}, {
						prop: "size",
						label: "大小"
					}, {
						prop: "type",
						label: "类型"
					}, {
						prop: "createtime",
						label: "创建时间"
					}],
					data: [],
					page: {
						current: 1,
						size: 10,
						total: 10
					},
					columnsOperation: {
						title: "操作",
						align: "center",
						buttons: [{
							label: "获取地址",
							size: "small",
							type: "text",
							methods: {
								click: (index, row) => {
									this.getAddress(row.name)
								}
							}
						}, {
							label: "删除",
							size: "small",
							type: "text",
							methods: {
								click: (index, row) => {
									this.singleDeleteObject_(row.name)
								}
							}
						}]
					}
				},
				iscopy: false,
				timeCer: '',
				regionid: '',
				timeOut: '3600',
				showUrl: false,
				check: false,
				token: '',
				file_shut: '',
				file_name: '',
				count: 1,
				projectid: '',
				appid: '',
				appkey: '',
				bucketNmae: '',
				ts: '',
				num: 1,
				numSearch: 1,
				signature: '',
				pagesize: '',
				pageSizeSearch: '',
				certification: '',
				seardata: false,
				nonedata: false,
				refrs: 0,
				searchVal: '',
				val: '',
				pageNum: 20,
				fileName: '',
				fileAddress: '',
				uploadid: '',
				dialogVisible: false,
				loading: false,
				tableHeight: 400,
				nameHoer: true,
				selectNum: true,
				domainDNS: '',
				tableData: [],
				multipleSelection: [],
				objects: [],
				fileList: [],
				fileArray: [],
				objectall: {}
			}
		},
		computed: {
			deletenum() {
				if(this.multipleSelection.length === 0) {
					return true;
				} else {
					return false;
				}
			}
		},
		methods: {
			sizeChange() {
				//				console.log(val)
			},
			currentChange() {
				//				console.log(val)
			},
			'capacity' (sizeOfByte) {
				if(sizeOfByte < 1024) {
					return sizeOfByte + 'B';
				} else if(sizeOfByte >= 1024 && sizeOfByte < 1024 * 1024) {
					return(sizeOfByte / 1024).toFixed(2) + 'KB';
				} else if(sizeOfByte >= 1024 * 1024 && sizeOfByte < 1024 * 1024 * 1024) {
					return(sizeOfByte / (1024 * 1024)).toFixed(2) + 'MB';
				} else if(sizeOfByte >= 1024 * 1024 * 1024) {
					return(sizeOfByte / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
				}
			},
			'filebefore' () {
				let arry = '';
				let filenav = document.getElementById('fileNav').files[0];
				let mynewdate = Date.parse(new Date()).toString();
				if(filenav.size > 0) {
					if(window.sessionStorage.setArr && JSON.parse(window.sessionStorage.setArr).length > 0) {
						let fileall_nav = JSON.parse(window.sessionStorage.setArr);
						//if(window.sessionStorage.setArr.indexOf(filenav.name) > 0){
						//	this.open6("您的任务中已存在该文件，请将该文件移除再进行上传！")
						//}else{
						let item = {
							'name': filenav.name,
							'size': arry,
							'state': ''
						};
						let item_str = JSON.stringify(item);
						window.localStorage.setItem('up_item', item_str);
						//						this.$store.dispatch('addfile');
						let src_str = window.location.href;
						let src_new = src_str.replace('object', 'task');
						//window.location.href=src_new;
						let arrlist = {};
						arrlist.filename_ = filenav.name;
						arrlist.filesize_ = filenav.size;
						arrlist.filestatus_ = 0;
						arrlist.xtthr = '';
						arrlist.states_ = true;
						arrlist.states_stop = true;
						arrlist.states_stop_ = true;
						arrlist.states_stop_sta = true;
						arrlist.time = mynewdate;
						Bus.$emit('nameflie', arrlist);
						let inArray = false;
						window.sessionStorage.delete = ''

						let numArray = []
						if(!inArray) {
							//window.sessionStorage.setArr = 
						}
						if(filenav.size > 10 * 1024 * 1024) {
							this.burstUpLoadInit_(filenav, mynewdate);
						} else {
							simpleUpLoda(filenav, this.certification, this.appid, this.bucketNmae, filenav.name, mynewdate)
						}
						//}
					} else {
						let item = {
							'name': filenav.name,
							'size': arry,
							'state': ''
						};
						let item_str = JSON.stringify(item);
						window.localStorage.setItem('up_item', item_str);
						//						this.$store.dispatch('addfile');
						let src_str = window.location.href;
						let src_new = src_str.replace('object', 'task');
						//window.location.href=src_new;
						let arrlist = {};
						arrlist.filename_ = filenav.name;
						arrlist.filesize_ = filenav.size;
						arrlist.filestatus_ = 0;
						arrlist.xtthr = '';
						arrlist.states_ = true;
						arrlist.states_stop = true;
						arrlist.states_stop_ = true;
						arrlist.states_stop_sta = true;
						arrlist.time = mynewdate;
						Bus.$emit('nameflie', arrlist);
						let inArray = false;
						window.sessionStorage.delete = ''
						if(window.sessionStorage.setArr) {
							if(JSON.parse(window.sessionStorage.setArr).length > 0) {
								for(let i = 0; i < JSON.parse(window.sessionStorage.setArr).length; i++) {
									if(JSON.parse(window.sessionStorage.setArr)[i].name === filenav.name) {
										inArray = true;
									} else {
										inArray = false;
									}
								}
							}
						}
						let numArray = []
						if(!inArray) {
							//window.sessionStorage.setArr = 
						}
						if(filenav.size > 20 * 1024 * 1024) {
							this.burstUpLoadInit_(filenav, mynewdate);
						} else {
							simpleUpLoda(filenav, this.certification, this.appid, this.bucketNmae, filenav.name, mynewdate)
						}
					}
				} else {
					this.open6("您上传的文件大小为0，请重新选择文件")
				}
			},
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
			'open8' (mesa) {
				this.$notify({
					title: '成功',
					message: mesa,
					offset: 100,
					type: 'success',
					duration: 0
				});
			},
			'open9' (mesa) {
				this.$notify.error({
					title: '出错',
					message: mesa,
					offset: 200,
					type: 'warning',
					duration: 0
				});
			},
			open2(mesg) {
				this.$confirm('此操作将永久删除' + mesg + ', 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			open3(mes) {
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
			'isCopy_' () {
				this.iscopy = true;
			},
			'isCopyleave_' () {
				this.iscopy = false;
			},
			'mouseenter_' (id) {
				let abcd = document.getElementById(id);
				abcd.select();
				document.execCommand('Copy');
				this.open3('复制下载地址成功');
				this.iscopy = false;
			},
			'burstUpLoadInit_' (filenav, mynewdate) {
				let that = this;
				let UpLoadInit_Data = JSON.stringify({
					'appid': this.appid,
					'bucket': this.bucketNmae,
					'certification': this.certification,
					'object': filenav.name
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
						} else if(num >= 2500 && num < 5000) {
							if(filenav.size % (2 * 1024 * 1024) === 0) {
								num = parseInt(filenav.size / (2 * 1024 * 1024));
							} else {
								num = parseInt(filenav.size / (2 * 1024 * 1024)) + 1;
							}
							let filesize = 2.5 * 1024 * 1024;
							for(let i = 0; i < num; i++) {
								if(i < num) {
									filenavlist[i] = filenav.slice(i * filesize, (i + 1) * filesize);
								} else if(i === num) {
									filenavlist[i] = filenav.slice(i * filesize, filenav.size);
								}
							}
						} else if(num < 2500) {
							if(filenav.size % (1.5 * 1024 * 1024) === 0) {
								num = parseInt(filenav.size / (1.5 * 1024 * 1024));
							} else {
								num = parseInt(filenav.size / (1.5 * 1024 * 1024)) + 1;
							}
							let filesize = 1.5 * 1024 * 1024;
							for(let i = 0; i < num; i++) {
								if(i < num) {
									filenavlist[i] = filenav.slice(i * filesize, (i + 1) * filesize);
								} else if(i === num) {
									filenavlist[i] = filenav.slice(i * filesize, filenav.size);
								}
							}
						}
						//else if (num >= 1000 && num < 1250){
						//	if (filenav.size%(1*1024*1024) === 0) {
						//		num = parseInt(filenav.size/(1*1024*1024));
						//	} else{
						//		num = parseInt(filenav.size/(1*1024*1024)) + 1;
						//	}
						//	let filesize = 1*1024*1024;
						//	for (let i = 0;i < num;i++) {
						//			if (i < num) {
						//			filenavlist[i] = filenav.slice(i*filesize,(i+1)*filesize);
						//		} else if (i === num) {
						//			filenavlist[i] = filenav.slice(i*filesize,filenav.size);
						//		}
						// 	}
						//} 
						//else if (num >= 700 && num < 1000){
						//	if (filenav.size%(0.7*1024*1024) === 0) {
						//		num = parseInt(filenav.size/(0.7*1024*1024));
						//	} else{
						//		num = parseInt(filenav.size/(0.7*1024*1024)) + 1;
						//	}
						//	let filesize = 0.7*1024*1024;
						//	for (let i = 0;i < num;i++) {
						//    		if (i < num) {
						//			filenavlist[i] = filenav.slice(i*filesize,(i+1)*filesize);
						//			} else if (i === num) {
						//				filenavlist[i] = filenav.slice(i*filesize,filenav.size);
						//			}
						//    	}
						//} else if (num < 700){
						//	if (filenav.size%(0.5*1024*1024) === 0) {
						//		num = parseInt(filenav.size/(0.5*1024*1024));
						//	} else{
						//		num = parseInt(filenav.size/(0.5*1024*1024)) + 1;
						//	}
						//	let filesize = 0.5*1024*1024;
						//	for (let i = 0;i < num;i++) {
						//   		if (i < num) {
						//				filenavlist[i] = filenav.slice(i*filesize,(i+1)*filesize);
						//			} else if (i === num) {
						//				filenavlist[i] = filenav.slice(i*filesize,filenav.size);
						//			}
						//     	}
						//}
						let size = filenav.size;
						this.listBurstUpLoad_object(filenavlist, this.certification, this.appid, this.bucketNmae, filenav.name, num, this.uploadid, numlist, size, mynewdate)
					} else {
						//						let params_log = {
						//							'token': this.token,
						//							'level': '3',
						//							'uid': this.uid,
						//							'msg': res.msg,
						//							'app': '初始化分片上传'
						//						};
						//						log(params_log).then(data => {
						//
						//						})
					}
				})
			},
			'BurstUpLoad_' (params, certification, appid, bucket, objet, partNumber, uploadId, numlist, size, mynewdate) {
				let that = this;
				let number = numlist + 1;
				let objetName = encodeURIComponent(objet)
				if(objetName.indexOf('*')) {
					objetName = objetName.replace(/\*/g, "%2A");
				}
				if(objetName.indexOf('(')) {
					objetName = objetName.replace(/\(/g, "%28");
				}
				if(objetName.indexOf(')')) {
					objetName = objetName.replace(/\)/g, "%29");
				}
				if(objetName.indexOf('!')) {
					objetName = objetName.replace(/!/g, "%21");
				}
				if(objetName.indexOf("'")) {
					objetName = objetName.replace(/'/g, "%27");
				}
				let appId = encodeURIComponent(appid);
				if(appId.indexOf('*')) {
					appId = appId.replace(/\*/g, "%2A");
				}
				if(appId.indexOf('(')) {
					appId = appId.replace(/\(/g, "%28");
				}
				if(appId.indexOf(')')) {
					appId = appId.replace(/\)/g, "%29");
				}
				if(appId.indexOf('!')) {
					appId = appId.replace(/!/g, "%21");
				}
				if(appId.indexOf("'")) {
					appId = appId.replace(/'/g, "%27");
				}
				let bucKetname = encodeURIComponent(bucket);
				if(bucKetname.indexOf('*')) {
					bucKetname = bucKetname.replace(/\*/g, "%2A");
				}
				if(bucKetname.indexOf('(')) {
					bucKetname = bucKetname.replace(/\(/g, "%28");
				}
				if(bucKetname.indexOf(')')) {
					bucKetname = bucKetname.replace(/\)/g, "%29");
				}
				if(bucKetname.indexOf('!')) {
					bucKetname = bucKetname.replace(/!/g, "%21");
				}
				if(bucKetname.indexOf("'")) {
					bucKetname = bucKetname.replace(/'/g, "%27");
				}
				BurstUpLoad(params, certification, appId, bucKetname, objetName, partNumber, uploadId, numlist, size, objet, mynewdate);
			},
			'listBurstUpLoad_' (objet) {
				let listBurstUpLoadData = JSON.stringify({
					'appid': this.appid,
					'bucket': this.bucketNmae,
					'certification': this.certification,
					'object': objet,
					'uploadid': this.uploadid
				});
				listBurstUpLoad(listBurstUpLoadData).then(res => {
					if(res.code === 200) {
						let params_log = {
							'token': this.token,
							'level': '1',
							'uid': this.uid,
							'msg': res.msg,
							'app': '列出已上传分片列表'
						};
						log(params_log).then(data => {

						})
						this.suceesBurstUpLoad_(objet, res.data.parts);
					} else {
						let params_log = {
							'token': this.token,
							'level': '3',
							'uid': this.uid,
							'msg': res.msg,
							'app': '列出已上传分片列表'
						};
						log(params_log).then(data => {

						})
					}
				})
			},
			'listBurstUpLoad_object' (params, certification, appid, bucket, objet, partNumber, uploadId, numlist, filesize, mynewdate) {
				let listBurstUpLoadData = JSON.stringify({
					'appid': this.appid,
					'bucket': this.bucketNmae,
					'certification': this.certification,
					'object': objet,
					'uploadid': this.uploadid
				});
				listBurstUpLoad(listBurstUpLoadData).then(res => {
					if(res.code === 200) {
						//						let params_log = {
						//							'token': this.token,
						//							'level': '1',
						//							'uid': this.uid,
						//							'msg': res.msg,
						//							'app': '列出已上传分片列表'
						//						};
						//						log(params_log).then(data => {
						//
						//						})
						if(res.data.parts.length > 0) {
							this.BurstUpLoad_(params, certification, appid, bucket, objet, partNumber, uploadId, res.data.parts.length, filesize, mynewdate)
						} else {
							this.BurstUpLoad_(params, certification, appid, bucket, objet, partNumber, uploadId, numlist, filesize, mynewdate)
						}
					} else {
						let params_log = {
							'token': this.token,
							'level': '3',
							'uid': this.uid,
							'msg': res.msg,
							'app': '列出已上传分片列表'
						};
						log(params_log).then(data => {

						})
					}
				})
			},
			'suceesBurstUpLoad_' (objet, parts) {
				let suceesBurstUpLoadData = JSON.stringify({
					'appid': this.appid,
					'bucket': this.bucketNmae,
					'certification': this.certification,
					'object': objet,
					'uploadid': this.uploadid,
					'parts': parts
				});
				suceesBurstUpLoad(suceesBurstUpLoadData).then(res => {
					if(res.code === 200) {
						//						let params_log = {
						//							'token': this.token,
						//							'level': '1',
						//							'uid': this.uid,
						//							'msg': res.msg,
						//							'app': '确认上传成功'
						//						};
						//						log(params_log).then(data => {
						//
						//						})
						this.getObject_();
					} else {
						//						let params_log = {
						//							'token': this.token,
						//							'level': '3',
						//							'uid': this.uid,
						//							'msg': res.msg,
						//							'app': '确认上传成功'
						//						};
						//						log(params_log).then(data => {
						//
						//						})
					}
				})
			},
			'singleDeleteObject_' (val) {
				//this.getcertification();
				let simpleDeleteData = JSON.stringify({
					'appid': this.appid,
					'bucket': this.bucketNmae,
					'certification': this.certification,
					'object': val
				});
				this.$confirm('您确定要删除"' + val + '"吗?', '删除Object', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					singleDeleteObject(simpleDeleteData).then(res => {
						if(res.code === 200) {
							//							let params_log = {
							//								'token': this.token,
							//								'level': '1',
							//								'uid': this.uid,
							//								'msg': res.msg,
							//								'app': '单个删除'
							//							};
							//							log(params_log).then(data => {
							//
							//							})
							let that = this;
							//							that.getObject_();
							window.setTimeout(function() {
								that.getObject_();
							}, 300)
							this.open7('删除成功！');
						} else {
							//							let params_log = {
							//								'token': this.token,
							//								'level': '3',
							//								'uid': this.uid,
							//								'msg': res.msg,
							//								'app': '单个删除'
							//							};
							//							log(params_log).then(data => {
							//
							//							})
						}
					}).catch(e => {
						console.log(e)
					})
				}).catch(() => {

				});
			},
			'batchDeleteObject_' () {
				let batchDeleteData = JSON.stringify({
					'appid': this.appid,
					'bucket': this.bucketNmae,
					'certification': this.certification,
					'objects': this.objects,
					'quiet': 'false'
				});
				this.$confirm('您确定要删除选中的' + this.objects.length + '个Object吗?', '删除Object', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					batchDeleteObject(batchDeleteData).then(res => {
						let successData = '';
						let sucData = [];
						let errorData = '';
						let failedData = [];
						let a = 0;
						let b = 0;
						if(res.code === 200) {
							//							let params_log = {
							//								'token': this.token,
							//								'level': '1',
							//								'uid': this.uid,
							//								'msg': res.msg,
							//								'app': '批量删除'
							//							};
							//							log(params_log).then(data => {
							//
							//							})
							for(let j = 0; j < res.data.results.length; j++) {
								if(res.data.results[j].result === 'success') {
									sucData[a] = res.data.results[j].object;
									a++;
								} else {
									failedData[b] = res.data.results[j].object;
									b++;
								}
							}
							if(sucData.length > 0) {
								for(let n = 0; n < sucData.length; n++) {
									if(n + 1 === sucData.length) {
										successData += sucData[n];
									} else {
										successData += sucData[n] + ',';
									}
								}
								this.open7('删除' + this.objects.length + '个Object成功！');
								sucData = [];
							}
							if(failedData.length > 0) {
								for(let n = 0; n < failedData.length; n++) {
									if(n + 1 === failedData.length) {
										errorData += failedData[n];
									} else {
										errorData += failedData[n] + ',';
									}
								}
								this.open9('删除' + errorData + '失败！');
								failedData = [];
							}
							let that = this;
							//							that.getObject_();
							window.setTimeout(function() {
								that.getObject_();
							}, 300)
						} else {
							//							let params_log = {
							//								'token': this.token,
							//								'level': '3',
							//								'uid': this.uid,
							//								'msg': res.msg,
							//								'app': '批量删除'
							//							};
							//							log(params_log).then(data => {
							//
							//							})
						}
					})
				}).catch(() => {

				});

			},
			'nextsearchObject_' () {
				this.numSearch++;
				this.searchObject_(this.val)
			},
			'searchObject_' (val) {
				this.loading = true;
				this.seardata = false;
				this.nonedata = false;
				if(val === this.val) {
					this.pageSizeSearch = this.numSearch * this.pageNum;
				} else {
					this.numSearch = 1;
					this.pageSizeSearch = this.numSearch * this.pageNum
				}
				this.val = val;
				let applyData = JSON.stringify({
					'appid': this.appid,
					'ts': this.ts,
					'signature': this.signature,
					'Int': '3600'
				});
				//applyPermission(applyData).then(response => {
				//if(response.code === 200){
				//	let params_log = {'token':this.token,'level':'1','uid':this.uid,'msg':response.msg,'app':'申请临时凭证'};
				//	log(params_log).then(data => {

				//	})
				//	this.certification = response.data.certification;
				let searchData = JSON.stringify({
					'appid': this.appid,
					'object': val,
					'bucket': this.bucketNmae,
					'pageindex': '1',
					'pagesize': this.pageSizeSearch.toString(),
					'ts': this.ts,
					'certification': this.certification
				});
				if(val === '') {
					this.getObject_();
					//this.open6('请输入object名！');
				} else {
					searchObject(searchData).then(res => {
						this.loading = false;
						this.tableHeight = this.$refs.getHeight.clientHeight - 150;
						if(res.code === 200) {
							//							let params_log = {
							//								'token': this.token,
							//								'level': '1',
							//								'uid': this.uid,
							//								'msg': res.msg,
							//								'app': '对象搜索'
							//							};
							//							log(params_log).then(data => {
							//
							//							})
							if(res.data.objects.length >= this.pageSizeSearch) {
								this.seardata = true;
							} else {
								this.seardata = false;
							}
							this.tableData = res.data.objects;
							for(let a = 0; a < res.data.objects.length; a++) {
								//							console.log(res.data.objects[a].name.indexOf("/"));
								let type = res.data.objects[a].name;
								let size = res.data.objects[a].size;
								this.tableData[a].size = this.capacity(size);
								this.tableData[a].type = type.split('').reverse().join('').substring(0, (type.split('').reverse().join('').indexOf('.') + 1)).split('').reverse().join('')
								if(res.data.objects[a].name.indexOf("/") > 0) {
									this.tableData[a].selectNum = false;
								} else {
									this.tableData[a].selectNum = true;
								}
							}
							this.table.data = this.tableData;
						} else {
							//							let params_log = {
							//								'token': this.token,
							//								'level': '3',
							//								'uid': this.uid,
							//								'msg': res.msg,
							//								'app': '对象搜索'
							//							};
							//							log(params_log).then(data => {
							//
							//							})
						}
					})
				}
				//}else{
				//	let params_log = {'token':this.token,'level':'3','uid':this.uid,'msg':response.msg,'app':'申请临时凭证'};
				//	log(params_log).then(data => {

				//	})
				//}
				// })
			},
			'nextgetObject_' () {
				this.num++;
				this.getObject_();
			},
			'getObject_' () {
				this.loading = true;
				this.nonedata = false;
				if(this.refrs === 1) {
					this.pagesize = this.pageNum;
					this.num = 1;
				} else {
					this.pagesize = this.num * this.pageNum;
				}
				let getObjectData = JSON.stringify({
					'appid': this.appid,
					'bucket': this.bucketNmae,
					'pageindex': '1',
					'pagesize': this.pagesize.toString(),
					'ts': this.ts,
					'certification': this.certification
				});
				getObject(getObjectData).then(res => {
					this.loading = false;
					if(this.refrs === 1) {
						this.refrs = 0;
					}
					this.seardata = false;
					if(res.code === 200) {
						//						let params_log = {
						//							'token': this.token,
						//							'level': '1',
						//							'uid': this.uid,
						//							'msg': res.msg,
						//							'app': '获取文件对象'
						//						};
						//						log(params_log).then(data => {
						//
						//						})
						//						this.tableHeight = this.$refs.getHeight.clientHeight - 150;
						if(res.data.objects.length >= this.pagesize) {
							this.nonedata = true;
						} else {
							this.nonedata = false;
						}
						this.tableData = res.data.objects;
						for(let a = 0; a < res.data.objects.length; a++) {
							//							console.log(res.data.objects[a].name.indexOf("/"));
							let type = res.data.objects[a].name;
							let size = res.data.objects[a].size;
							this.tableData[a].size = this.capacity(size);
							this.tableData[a].type = type.split('').reverse().join('').substring(0, (type.split('').reverse().join('').indexOf('.') + 1)).split('').reverse().join('')
							if(res.data.objects[a].name.indexOf("/") > 0) {
								this.tableData[a].selectNum = false;
							} else {
								this.tableData[a].selectNum = true;
							}
						}
						this.table.data = this.tableData;
					} else {
						//						let params_log = {
						//							'token': this.token,
						//							'level': '3',
						//							'uid': this.uid,
						//							'msg': res.msg,
						//							'app': '获取文件对象'
						//						};
						//						log(params_log).then(data => {
						//
						//						})
						//						if(res.code === 701) {
						//							router.push({
						//								path: '/home/oss/overview'
						//							});
						//						}
					}
				})
			},
			'simpleUpLoda_' (val) {
				let getuploadid = JSON.stringify({
					'appid': this.appid,
					'bucket': this.bucketNmae,
					'certification': this.certification,
					'object': val.name
				});
				burstUpLoadInit(getuploadid).then(res => {
					if(res.code === 200) {
						let params_log = {
							'token': this.token,
							'level': '1',
							'uid': this.uid,
							'msg': res.msg,
							'app': '初始化分片上传'
						};
						log(params_log).then(data => {

						})
						this.uploadid = res.data.uploadid;
					} else {
						let params_log = {
							'token': this.token,
							'level': '3',
							'uid': this.uid,
							'msg': res.msg,
							'app': '初始化分片上传'
						};
						log(params_log).then(data => {

						})
					}
				})
			},
			'getAddress' (val) {
				this.showUrl = false;
				this.dialogVisible = true;
				this.fileName = val;
				this.timeOut = "3600";
				//this.fileAddress = this.domainDNS + "/app_" + this.appid + "_" + this.bucketNmae + "_bucket/" + val;
			},
			'get_presignedurl_' (time) {
				let setTime = parseInt(time);
				let re = /^[1-9]+[0-9]*]*$/
				if(re.test(time) || setTime === -1) {
					let params = JSON.stringify({
						'appid': this.appid,
						'bucket': this.bucketNmae,
						'certification': this.certification,
						'object': this.fileName,
						'acl': 'private',
						'expire': parseInt(time),
						'regionid': this.regionid
					});
					get_presignedurl(params).then(res => {
						if(res.code === 200) {
							//							let params_log = {
							//								'token': this.token,
							//								'level': '1',
							//								'uid': this.uid,
							//								'msg': res.msg,
							//								'app': '获取下载地址'
							//							};
							//							log(params_log).then(data => {
							//
							//							})
							this.showUrl = true;
							this.fileAddress = res.data.url;
						} else {
							//							let params_log = {
							//								'token': this.token,
							//								'level': '3',
							//								'uid': this.uid,
							//								'msg': res.msg,
							//								'app': '获取下载地址'
							//							};
							//							log(params_log).then(data => {
							//
							//							})
						}
					})
				} else {
					this.open6("请检查输入的时间是否正确？")
				}
			},
			'dataSelectionChange' (val) {
				this.objects = [];
				//if(this.check === false){
				//	this.check = true;
				//}else{
				//	this.check = false;
				//}
				this.multipleSelection = val;
				for(let i = 0; i < val.length; i++) {
					this.objects[i] = val[i].name;
				}
			},
			'getrefr' () {
				this.refrs = 1;
				this.getObject_()
			},
			'getcertification' () {
				let applyData = JSON.stringify({
					'appid': this.appid,
					'ts': this.ts,
					'signature': this.signature,
					'Int': '3600'
				});
				applyPermission(applyData).then(response => {
					if(response.code === 200) {
						let params_log = {
							'token': this.token,
							'level': '1',
							'uid': this.uid,
							'msg': response.msg,
							'app': '申请临时凭证'
						};
						log(params_log).then(data => {

						})
						this.certification = response.data.certification;
					} else {
						let params_log = {
							'token': this.token,
							'level': '3',
							'uid': this.uid,
							'msg': response.msg,
							'app': '申请临时凭证'
						};
						log(params_log).then(data => {

						})
					}
				})
			},
			'contains' (arr, obj) {
				let i = arr.length;
				while(i--) {
					if(arr[i].time === obj) {
						return i;
					}
				}
				return -1;
			},
			'setclean_' () {
				this.ts = Date.parse(new Date()).toString();
				this.signature = window.hex_md5(this.appid + this.ts + this.appkey);
				let setcleanData = JSON.stringify({
					'appid': this.appid,
					'bucket': this.bucketNmae,
					'ts': this.ts,
					'signature': this.signature,
					'activity': 'y',
					'deadline': 1
				});
				setclean(setcleanData).then(res => {
					if(res.code === 200) {
						let params_log = {
							'token': this.token,
							'level': '1',
							'uid': this.uid,
							'msg': res.msg,
							'app': '设置bucket自动清除分片'
						};
						log(params_log).then(data => {

						})
					} else {
						let params_log = {
							'token': this.token,
							'level': '3',
							'uid': this.uid,
							'msg': res.msg,
							'app': '设置bucket自动清除分片'
						};
						log(params_log).then(data => {

						})
					}
				})
			},
			'getappid' () {
				let that = this;
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
							this.ts = Date.parse(new Date()).toString();
							this.signature = hex_md5(this.appid + this.ts + this.appkey);
							let getmessData = JSON.stringify({
								'appid': this.appid,
								'bucket': this.bucketNmae,
								'ts': this.ts,
								'signature': this.signature
							});
							getBucketMessage(getmessData).then(res => {
								if(res.code === 200) {
									this.domainDNS = res.data.region.dns;
									this.regionid = res.data.region.regionid;
								}
							})
							let applyData = JSON.stringify({
								'appid': this.appid,
								'ts': this.ts,
								'signature': this.signature,
								'Int': '3600'
							});
							applyPermission(applyData).then(response => {
								if(response.code === 200) {
									this.certification = response.data.certification;
									this.getObject_();
								}
							})
							//		     				this.setclean_();
						} else {
							//							this.open6('该项目下尚未开通对象存储，请重新创建应用！');
							//							router.push({
							//								path: '/home/oss/bucket/newapp'
							//							})
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
						//							//this.open6('您的登录信息已过期，请重新登录！');
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
			//this.token = window.localStorage.token;
			//    	window.sessionStorage.bucketName = this.$route.params.bucket_key;
			//  		let that = this;
			//  	    if(window.sessionStorage.setArr){
			//  	     	that.fileArray = JSON.parse(window.sessionStorage.setArr);
			//	    	   	    let a = that.fileArray.length;
			//	    	   	    let arr_num = ''
			//	    	   	    if(a > 0){
			//	    				arr_num = a.toString();
			//	    			}else{
			//	    				arr_num = '';
			//	    			}
			//	    			Bus.$emit('fileupnum',arr_num);
			//  	    }
			//  	    if(window.localStorage.token && window.localStorage.token !== ""){
			//	    		this.uid = window.localStorage.name;
			//	    		this.token = window.localStorage.token;
			//	    		if(window.localStorage.proid && window.localStorage.proid !== ""){
			//	    			this.projectid = window.localStorage.proid;
			//	    		}else{
			//	    			this.open4('您尚未创建项目');
			//	    			router.push({path: '/home/oss/newproject'});
			//	    		}
			//	    	}else{
			//	    		router.push({path: '/login'});
			//	    	}
			//  	   // this.projectid = window.localStorage.proid;
			this.getappid();
			//  	    this.upload();
		},
		components: {
			'core-header': CoreHeader,
			'full-table': FullTable,
			'user-search': UserSearch,
			'pagination': Pagination
		},
		mounted() {
			let that = this;
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
				if(that.fileArray.length === 0) {
					that.fileArray.push(arrdata);
				} else {
					if(that.contains(that.fileArray, arrdata.time) === -1) {
						that.fileArray.push(arrdata);
					} else {
						that.fileArray[that.contains(that.fileArray, arrdata.time)].xhr = arrdata.xhr
						that.fileArray[that.contains(that.fileArray, arrdata.time)].state = arrdata.state
					}
				}
				num = that.fileArray.length
				if(arrdata.state === 100) {
					for(let i = 0; i < that.fileArray.length; i++) {
						if(that.fileArray[i].name === arrdata.name) {
							that.fileArray[i].states_ = false;
							that.fileArray[i].states_stop_sta = true;
							that.fileArray[i].states_stop = true;
							that.fileArray[i].states_stop_ = true;
						}
					}
				}
				if(arrdata.state === 20000) {
					for(let i = 0; i < that.fileArray.length; i++) {
						if(that.fileArray[i].name === arrdata.name) {
							that.fileArray[i].states_ = false;
							that.fileArray[i].states_stop = true;
							that.fileArray[i].states_stop_ = false;
							that.fileArray[i].states_stop_sta = false;
						}
					}
				}
				let arr_Name = '';
				if(num > 0) {
					arr_Name = num.toString();
				} else {
					arr_Name = '';
				}
				if(!window.sessionStorage.delete || window.sessionStorage.delete === '') {
					window.sessionStorage.setArr = JSON.stringify(that.fileArray);
					Bus.$emit('fileupnum', arr_Name);
				}
				Bus.$emit('fileNumList', that.fileArray);
			})
			Bus.$on('fliestop', function(msg) {
				this.file_shut = msg.stopnum;
				this.file_name = msg.name;
			})
			//console.log(this.$refs.getHeight.clientHeight)
			//console.log(this.$refs.refind.$vnode.child.$el);
		}
	}
</script>
<style lang="less">
	.wrapper {
		/*padding: 20px 20px 0 20px;*/
		height: 100%;
		background-color: #E6E4EA;
		position: relative;
		padding-top: 1px;
		.object_dialog{
			.el-dialog--small {
				width: 465px;
				.el-dialog__body{
					padding-top: 20px;
				}
				.el-dialog__footer{
					padding: 0px;
					margin-top: 30px;
					margin-bottom: 20px;
					text-align: center;
				}
				.dialog-footer{
					margin: 0 auto;
				}
				.el-dialog__title{
					font-size: 14px;
					font-weight: normal;
					color: #211E2E;
					font-family: Ping Fang SC;
				}
			}
		}
		
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
		.wrapper_main {
			width: 97%;
			/*margin-bottom: 30px;*/
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
			}
		}
	}
	
	.ringht_group {
		float: right
	}
	
	.ringht_group div {
		display: inline-block;
	}
	
	.searchInp {
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		background-color: #fff;
		background-image: none;
		border-radius: 4px;
		border: 1px solid #bfcbd9;
		box-sizing: border-box;
		color: #1f2d3d;
		display: block;
		font-size: 14px;
		height: 36px;
		line-height: 1;
		outline: 0;
		padding: 3px 10px;
		transition: border-color .2s cubic-bezier(.645, .045, .355, 1);
		width: 100%;
	}
	
	.l_title {
		float: left
	}
	
	.main_header {
		height: 40px;
		line-height: 40px;
		margin-bottom: 20px;
	}
	
	.l_title span {
		font-size: 14px;
		font-weight: 600;
		padding-left: 8px;
		border-left: 3px solid #09c
	}
	
	.ringht_group div {
		display: inline-block;
	}
	
	.ringht_group div:nth-of-type(1) {
		margin-right: 5px;
	}
	
	.ringht_group div:last-child {
		margin-right: 0px;
		height: 45px;
	}
	
	#loadingmore {
		display: block;
		cursor: pointer;
		line-height: 40px;
		color: #20a0ff;
		text-align: center;
		width: 100%;
		height: 40px;
		border-bottom: 1px solid #f2f2f2;
		border-left: 1px solid #f2f2f2;
		border-right: 1px solid #f2f2f2;
	}
	
	#asas {
		width: 100%;
		height: 30px;
		background-color: red;
	}
	
	.getaddress {
		margin-top: 20px;
	}
</style>