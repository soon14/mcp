<template>
	<div class="wrapper" ref='getHeight'>
		<div class="wrap">
			<el-dialog title="新建Bucket" v-model="createdbucket" size="small" custom-class="dialog_wrap">
				<!--<div class="dialog_wrap">
					
				</div>-->
				<!--<div id="line">
				</div>-->
				<el-row>
					<el-col :span="4">
						<p id="bucket_tittle">BucketName：</p>
					</el-col>
					<el-col :span="19" :push="1">
						<el-input size='small' v-model="BucketName" @blur="" placeholder="请输入内容"></el-input>
					</el-col>
				</el-row>
				<!--<el-row v-if="!waring">
					<el-col :span="20" :push="7">
						<div id="waring" style="color: red;margin-top: 10px;">
							<i class="el-alert__icon el-icon-information" style="color: red;float: left;margin-right: 10px;"></i>
							<span id="">
  			 			该bucket已存在，请重新输入！！！
  			 		</span>
						</div>
					</el-col>
				</el-row>-->
				<p id="title_text">Bucket命名规范：»全局唯一；</p>
				<!--<p id="title_list"></p>-->
				<p id="title_list">»只能包含小写英文字母、数字、减号（-）、下划线</p>
				<p id="title_list">»只能以小写字母开头和结尾</p>
				<p id="title_list1_1">»bucketName的长度限制在3-64之间</p>
				<el-row>
					<el-col :span="4">
						<p id="bucket_tittle">所属地域：</p>
					</el-col>
					<el-col :span="19" :push="1">
						<el-select v-model="regionid" size='small' placeholder="请选择">
							<el-option v-for="item in belongaddress" :label="item.chinesename" :value="item.regionid">
							</el-option>
						</el-select>
					</el-col>
				</el-row>
				<p id="address_mess">相同地域内的产品内网可以互通；订购后不支持更换地域，请谨慎选择</p>
				<el-row>
					<el-col :span="4">
						<p id="bucket_tittle">读写权限：</p>
					</el-col>
					<el-col :span="19" :push="1">
						<el-select v-model="jurisdiction" size='small' placeholder="请选择">
							<el-option v-for="item in jurisdiction_limits" :label="item.label" :value="item.jurisdiction">
							</el-option>
						</el-select>
					</el-col>
				</el-row>
				<p id="title_list_1">» 私有：对object的所有访问操作需要进行身份验证</p>
				<p id="title_list_2">» 公共读：对object写操作需要进行身份验证；可以对object进行匿名读</p>
				<p id="title_list1">» 公共读写：所有人都可以对object进行读写操作</p>
				<!--<div id="line1">
				</div>-->
				<span slot="footer" class="dialog-footer">
			    		<el-button @click="createdbucket = false;BucketName = '';jurisdiction = 'private';regionid = ''">取 消</el-button>
			    		<el-button type="primary" @click="newCreateBucket(BucketName,regionid,jurisdiction)">确 定</el-button>
			    	</span>
			</el-dialog>
			<div class="wrapper_head">
				<core-header :setting="titlesetting"></core-header>
				<!--<div class="page_header">
				<div id="title">
					<span>Bucket</span>
				</div>
				<div class="right_group">
					<div style="height: 65px;float: right;">
						<button type="button" @click='opencreateModel()' class="el-button el-button--primary">
              <i class="mf mf-fuzhi"></i>
              <span>新建Bucket</span>
            </button>
					</div>

					<div style="height: 65px;float: right;">
						<button type="button" class="el-button el-button--primary" @click='searchBucket(searchData)'>
              <i class="mf mf-sousuo"></i>
              <span>搜索</span>
            </button>
					</div>
					<div style="height: 65px;float: right;">
						<input id="searchInp" style="margin-top: 15px;" v-model="searchData" placeholder="搜索Bucket" @keydown.enter='searchBucket(searchData)'></input>
					</div>
				</div>
			</div>-->
			</div>
			<div class="wrapper_main">
				<div class="btn_core">
					<el-button class="btn_create" @click="opencreateModel()">新建Bucket</el-button>
					<!--<user-button :setting="setting" class="btn_create"  @click="opencreateModel()"></user-button>-->
					<user-search placewords="搜索Bucket" @search-enter="searchBucket(searchData)" style="width:250px" :value="searchData" v-model="searchData" class="btn_search"></user-search>
				</div>
				<list-table :data="table.data" :title="table.title" :setting="table.setting" :loading="table.loading" :columnsOperation="table.columnsOperation"></list-table>
				<!--<el-table :data="tableData" border v-loading="loading" element-loading-text="拼命加载中..." style="width: 100%;" id="table1">
					<el-table-column prop="bucket" align="center" label="Bucket名称">
						<template scope="scope">
							<el-button type="text" @click='onload(scope.row.bucket)' style="cursor: pointer;">{{scope.row.bucket}}</el-button>
						</template>
					</el-table-column>
					<el-table-column prop="region.chinesename" align="center" label="地域">
					</el-table-column>
					<el-table-column prop="createtime" align="center" label="创建时间">
					</el-table-column>
					<el-table-column align="center" label="操作">
						<template scope="scope">
							<el-button type="text" @click='onload(scope.row.bucket)' style="cursor: pointer;">详情</el-button>
							<el-button type="text" @click='deleteBucket(scope.row.bucket)' style="cursor: pointer;">删除</el-button>
							<el-button type="text" @click='onload_(scope.row.bucket)' style="cursor: pointer;">设置</el-button>
						</template>
					</el-table-column>
				</el-table>-->
			</div>
		</div>
	</div>
</template>

<script type="text/ecmascript-6">
	//	import Vue from 'vue'
	import VueRouter from 'vue-router';
	import { getBucketList, getAppList, newCreateBucket, getregionList, isExist, deleteBucket, searchBucket } from '../../api/service';
	import { hex_md5 } from '../../utils/md5';
	import storage from 'utils/local_storage_tool';
	import session from 'utils/session_storage_tool';
	import Bus from '../../api/bus';
	import { Notification } from 'element-ui';
	import CoreHeader from '../CoreHeader.vue'
	import UserButton from 'components/awesome/user_button/UserButton.vue';
	import ListTable from 'components/awesome/list_table/ListTable.vue';
	import UserSearch from 'components/awesome/user_search/UserSearch.vue';
	//	import routes from 'src/router'
	//import {getAppList,newCreateBucket,deleteBucket,getBucketList,searchBucket,getregionList,isExist,log} from 'common/api/api';
	//import Bus from 'common/api/bus';
	const router = new VueRouter({})

	export default {
		data() {
			return({
				app_id: process.env.api.objectStore.appid,
				token: '',
				cookie: '',
				projectid: '',
				uid: '',
				fullscreenLoading: false,
				createdbucket: false,
				BucketName: '',
				appid: '',
				appkey: '',
				searchData: '',
				tableHeight: 400,
				belongaddress: [],
				fileListNum: [],
				regionid: '',
				loading: false,
				waring: false,
				placewords: '',
				titlesetting: {
					title: 'Bucket'
				},
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
				jurisdiction: 'private',
				tableData: [],
				setting: {
					label: "新建Bucket",
					methods: {
						click: ''
					}
				},
				table: {
					setting: {

					},
					loading: false,
					title: [{
						prop: "bucket",
						label: "Bucket名称",
						type: 'operate',
						methods: {
							click: (index, row) => {
								this.onload(row.bucket);
							}
						}
					}, {
						prop: "chinesename",
						label: "地域"

					}, {
						prop: "createtime",
						label: "创建时间"
					}],
					data: [],
					columnsOperation: {
						title: "操作",
						align: "center",
						buttons: [{
							label: "删除",
							size: "small",
							type: "text",
							methods: {
								click: (index, row) => {
									this.deleteBucket(row.bucket);
								}
							}
						}, {
							label: "设置",
							size: "small",
							type: "text",
							methods: {
								click: (index, row) => {
									this.onload_(row.bucket);
								}
							}
						}]
					}
				}
			})
		},
		methods: {
			open7(mesa) {
				this.$notify.success({
					title: '成功',
					message: mesa,
					offset: 100,
					duration: 1500
				});
			},
			open6(mesa) {
				this.$notify.error({
					title: '错误',
					message: mesa,
					offset: 100,
					duration: 1500
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
			//    'loading_full'(){
			//      this.fullscreenLoading = true;
			//      this.getBucketList(this.appid,this.appkey);
			//      setTimeout(() => {
			//        this.fullscreenLoading = false;
			//      }, 1000);
			//    },
			'onload' (urlNmae) {
				if(window.sessionStorage.bucketName) {
					if(urlNmae !== window.sessionStorage.bucketName) {
						window.sessionStorage.setArr = '';
						Bus.$emit('fileupnum', '');
						window.sessionStorage.delete = 'delete';
						for(let a = 0; a < this.fileListNum.length; a++) {
							if(this.fileListNum[a].states_) {
								this.fileListNum[a].xhr.abort();
							}
						}
					}
				}
				window.sessionStorage.bucketName = urlNmae;
				this.$router.push('/object/detail/overview/' + urlNmae)
			},
			'onload_' (urlNmae) {
				if(window.sessionStorage.bucketName) {
					if(urlNmae !== window.sessionStorage.bucketName) {
						window.sessionStorage.setArr = '';
						Bus.$emit('fileupnum', '');
						window.sessionStorage.delete = 'delete';
						for(let a = 0; a < this.fileListNum.length; a++) {
							if(this.fileListNum[a].states_) {
								this.fileListNum[a].xhr.abort();
							}
						}
					}
				}
				window.sessionStorage.bucketName = urlNmae;
				this.$router.push('/object/detail/attribute/' + urlNmae)
			},
			'opencreateModel' () {
				this.createdbucket = true;
				//    	let getregionData = JSON.stringify({'appid':'338875f26e044f419217df72e525e889'});
				//      	let getregionData = JSON.stringify({'appid':'836cdd06b7d84b6a98feb114d018c718'});
				let getregionData = JSON.stringify({
					'appid': this.app_id
				});
				//三水生产 115、116机器
				//    	let getregionData = JSON.stringify({'appid':'32ccf53a77a348219077c937eda9d6e5'});
				//跨机房 216机器
				//    	let getregionData = JSON.stringify({'appid':'2f85082be71c435590e61c5ea9f1650d'});
				getregionList(getregionData).then(res => {
					if(res.code === 200) {
						//    			let params_log = {'token':this.token,'level':'1','uid':this.uid,'msg':res.msg,'app':'获取region列表'};
						//			    	log(params_log).then(data => {
						//
						//				})
						this.belongaddress = res.data.regions;
					} else {
						//    			let params_log = {'token':this.token,'level':'3','uid':this.uid,'msg':res.msg,'app':'获取region列表'};
						//			    	log(params_log).then(data => {
						//
						//				})
					}
				})
			},
			'newCreateBucket' (BucketName, address, jurisdiction) {
				let ts = Date.parse(new Date()).toString();
				let signature = hex_md5(this.appid + ts + this.appkey);
				let createbucData = JSON.stringify({
					'appid': this.appid,
					'bucket': BucketName,
					'regionid': address,
					'acl': jurisdiction,
					'ts': ts,
					'signature': signature
				});
				if(BucketName === '') {
					this.open6("BucketName不能为空！");
				} else if(!BucketName.match('^[a-z0-9-_]*$') || !BucketName.substring(0, 1).match('^[a-z]*$') || !BucketName.substring(BucketName.length - 1, BucketName.length).match('^[a-z]*$')) {
					this.open6("BucketName格式错误，请重新输入！");
					this.BucketName = '';
				} else if(BucketName.length < 3 || BucketName.length > 31) {
					this.open6("BucketName的长度有误，请重新输入！");
					this.BucketName = '';
				} else if(address === '') {
					this.open6("所属地域不能为空！");
				} else {
					let isexistData = JSON.stringify({
						'appid': this.appid,
						'bucket': BucketName,
						'ts': ts,
						'signature': signature
					});
					isExist(isexistData).then(response => {
						if(response.code === 200) {
							//	     				let params_log = {'token':this.token,'level':'1','uid':this.uid,'msg':response.msg,'app':'判断bucket是否存在'};
							//					    	log(params_log).then(data => {
							//
							//						})
							if(response.data.isExist === 'false') {
								newCreateBucket(createbucData).then(res => {
									if(res.code === 200) {
										//			     					let params_log = {'token':this.token,'level':'1','uid':this.uid,'msg':res.msg,'app':'新建bucket'};
										//								    	log(params_log).then(data => {
										//
										//									})
										this.open7('创建Bucket成功！');
										this.getBucketList(this.appid, this.appkey);
										this.createdbucket = false;
										this.BucketName = '';
										this.jurisdiction = 'private';
										this.regionid = '';
									} else {
										//			     					let params_log = {'token':this.token,'level':'3','uid':this.uid,'msg':res.msg,'app':'新建bucket'};
										//								    	log(params_log).then(data => {
										//
										//									})
										this.createdbucket = true;
									}
								})
							} else {
								this.open6('该bucket已存在，请修改bucket名称！');
							}
						} else {
							//	     				let params_log = {'token':this.token,'level':'3','uid':this.uid,'msg':response.msg,'app':'判断bucket是否存在'};
							//					    	log(params_log).then(data => {
							//
							//						})
						}
					})

				}
			},
			//   	'changeName'(val){
			//   		let ts = Date.parse(new Date()).toString();
			//   		let signature = window.hex_md5(this.appid + ts + this.appkey);
			//   		let isexistData = JSON.stringify({'appid':this.appid,'bucket':val,'ts':ts,'signature':signature});
			//   		if(val !== ''){
			//   			isExist(isexistData).then(response => {
			//		     		if(response.code === 200){
			//		     			let params_log = {'token':this.token,'level':'1','uid':this.uid,'msg':response.msg,'app':'判断bucket是否存在'};
			//						log(params_log).then(data => {
			//
			//						})
			//		     			if(response.data.isExist === 'true'){
			//		     				this.waring = true;
			//		     			}else{
			//		     				this.waring = false;
			//		     			}
			//		     		}else{
			//		     			let params_log = {'token':this.token,'level':'3','uid':this.uid,'msg':response.msg,'app':'判断bucket是否存在'};
			//						log(params_log).then(data => {
			//
			//						})
			//		     		}
			//		     	})
			//   		}
			//
			//   	},
			'deleteBucket' (BucketName) {
				let ts = Date.parse(new Date()).toString();
				let signature = hex_md5(this.appid + ts + this.appkey);
				let deletebucData = JSON.stringify({
					'appid': this.appid,
					'bucket': BucketName,
					'ts': ts,
					'signature': signature
				});
				this.$confirm('您确定要删除"' + BucketName + '"吗?', '删除Object', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleteBucket(deletebucData).then(res => {
						if(res.code === 200) {
							//	     				let params_log = {'token':this.token,'level':'1','uid':this.uid,'msg':res.msg,'app':'删除bucket'};
							//						log(params_log).then(data => {
							//
							//						})
							this.searchData = ''
							this.open7('删除Bucket成功！');
							this.getBucketList(this.appid, this.appkey);
						} else {
							//	     				let params_log = {'token':this.token,'level':'3','uid':this.uid,'msg':res.msg,'app':'删除bucket'};
							//						log(params_log).then(data => {
							//
							//						})
						}
					})
				}).catch(() => {

				});

			},
			'getBucketList' (appid, appkey) {
				this.loading = true;
				let ts = Date.parse(new Date()).toString();
				let signature = hex_md5(appid + ts + appkey);
				let getbucData = JSON.stringify({
					'appid': appid,
					'ts': ts,
					'signature': signature
				});
				getBucketList(getbucData).then(res => {
					this.loading = false;
					if(res.code === 200) {
						//   				let params_log = {'token':this.token,'level':'1','uid':this.uid,'msg':res.msg,'app':'获取bucket'};
						//					log(params_log).then(data => {
						//
						//					})
						this.table.data = res.data.buckets;
						for (let i = 0;i < this.table.data.length;i++) {
							this.table.data[i].chinesename = this.table.data[i].region.chinesename;
						}
						//						this.tableData = res.data.buckets;
						//   				this.tableHeight = this.$refs.getHeight.clientHeight - 100;
					} else {
						//   				let params_log = {'token':this.token,'level':'3','uid':this.uid,'msg':res.msg,'app':'获取bucket'};
						//					log(params_log).then(data => {
						//
						//					})
					}
				})
			},
			'searchBucket' (searchData) {
				let ts = Date.parse(new Date()).toString();
				let signature = hex_md5(this.appid + ts + this.appkey);
				let searchbucData = JSON.stringify({
					'appid': this.appid,
					'bucket': searchData,
					'ts': ts,
					'signature': signature
				});
				if(searchData === '') {
					this.getBucketList(this.appid, this.appkey);
				} else {
					this.loading = true;
					searchBucket(searchbucData).then(res => {
						this.loading = false;
						if(res.code === 200) {
							//   					let params_log = {'token':this.token,'level':'1','uid':this.uid,'msg':res.msg,'app':'搜索bucket'};
							//						log(params_log).then(data => {
							//
							//						})
							this.table.data = res.data.buckets;
//							this.tableData = res.data.buckets;
						} else {
							//   					let params_log = {'token':this.token,'level':'3','uid':this.uid,'msg':res.msg,'app':'搜索bucket'};
							//						log(params_log).then(data => {
							//
							//						})
						}
					})
				}
			},
			'getappid' () {
				let that = this;
				let postData = JSON.stringify({
					'projectid': this.projectid,
					'token': this.token
				});
				getAppList(postData).then(data => {
					if(data.code === 200) {
						//	      			let params_log = {'token':this.token,'level':'1','uid':this.uid,'msg':data.msg,'app':'获取应用'};
						//					log(params_log).then(data => {
						//
						//					})
						if(data.data.apps.length > 0) {
							session.addItem('issync', data.data.apps[0].issync)
							this.appid = data.data.apps[0].appid;
							this.appkey = data.data.apps[0].appkey;
							//this.deleteBucket("tryjh")
							this.getBucketList(data.data.apps[0].appid, data.data.apps[0].appkey);
						} else {
							Notification.error('该项目下尚未开通对象存储，请开通应用再继续其他操作！');
							this.$router.replace('/object/create');
							//	      				router.push({path: '/home/oss/bucket/newapp'})
						}
					} else {
						//	      			let params_log = {'token':this.token,'level':'3','uid':this.uid,'msg':data.msg,'app':'获取应用'};
						//					log(params_log).then(data => {
						//
						//					})
						//					if(data.code === 618){
						//	      				router.push({path: '/login'})
						//					}
					}
				})
			}
		},
		/*beforeRouteEnter (to, from, next) {
		  let token = storage.getItem("token"),projectid = storage.getObject("project").projectId;
		  let postData = JSON.stringify({'projectid':projectid,'token':token});
		  getAppList(postData).then(data => {
		    console.log(data);
		  });
		},*/
		created() {
			//			window.location.reload();
			let is_isSuccess = true;
			let that = this;
			//			Bus.$on('is_openobject', function(msg) {
			//				debugger
			//				window.location.reload();
			//			});
			//			  	Bus.$emit('is_Success',is_isSuccess);
			//  	if (window.sessionStorage.setArr) {
			//  		session.removeItem("setArr");
			//  	}
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
			//  	    window.sessionStorage.delete = '';
			this.getappid();
			Bus.$emit('active', '2');
			//			this.setting = {
			//					
			//				}
		},
		mounted: function() {
			let that = this;
			Bus.$on('fileNumList', function(msg) {
				that.fileListNum = msg;
			})
		},
		components: {
			'core-header': CoreHeader,
			'list-table': ListTable,
			'user-button': UserButton,
			'user-search': UserSearch
		}
	}
</script>
<style lang="less">
	#searchInp {
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
		font-size: inherit;
		height: 36px;
		line-height: 1;
		outline: 0px;
		padding: 3px 10px;
		transition border-color: .2s cubic-bezier(.645, .045, .355, 1);
		width: 100%;
	}
	
	.wrapper {
		padding: 0px 20px;
		height: 100%;
		background-color: #E6E4EA;
		position: relative;
		padding-top: 1px;
		#bucket_tittle {
			line-height: 30px;
		}
		#title_text {
			margin-top: 20px;
			/*margin-left: 160px;*/
		}
		#title_list {
			/*margin-top: 20px;*/
			line-height: 20px;
			margin-left: 115px;
		}
		#title_list1_1{
			line-height: 20px;
			margin-left: 115px;
			margin-bottom: 20px;
		}
		#title_list_1{
			margin-top: 20px;
			line-height: 20px;
		}
		#title_list_2{
			line-height: 20px;
		}
		#title_list1 {
			line-height: 20px;
			/*margin-left: 115px;*/
			margin-bottom: 20px;
		}
		#address_mess {
			margin-top: 20px;
			line-height: 20px;
			/*margin-left: 115px;*/
			margin-bottom: 20px;
		}
		#line {
			width: 100%;
			height: 1px;
			background-color: rgb(238, 238, 238);
			margin-bottom: 20px;
		}
		#line1 {
			width: 100%;
			height: 1px;
			background-color: rgb(238, 238, 238);
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
			.btn_core {
				margin-bottom: 20px;
				width: 100%;
				overflow: hidden;
				.btn_create {
					float: left;
				}
				.btn_search {
					float: right;
				}
			}
		}
		p {
			margin-bottom: 0px;
		}
	}
	
	.dialog_wrap {
		width: 550px;
		.el-dialog__body{
			padding-top: 20px;
		}
		.el-select{
			width: 100%;
		}
		.el-dialog__footer{
			text-align: center;
			padding-top: 10px;
			padding-bottom: 20px;
			.el-button{
				margin-left: 5px;
			}
			.el-button--primary {
			    background-color: #21B8D5;
			    border-color: #CECECE;
			}
			.el-button--primary:hover {
			    background: #4dc6dd;
			    border-color: #4dc6dd;
			}
		}
	}
	
</style>