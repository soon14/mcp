<template>
	<div id="db_app">

		<div>
			<paper>
				<son-title :headTitle="headTitle"></son-title>
				<el-row>
          <el-button class="button is-info pull-left" @click="applyDb()">申请数据库</el-button>
          <el-button class="glyphicon glyphicon-refresh pull-left" style="margin-left: 20px;margin-right: 20px" @click="refreshFun()">刷新</el-button>

          <el-col style="float:right;width: 20%">
            <search-inp @search-enter="getApplyListFun(searchVal,1,data.page.pageSize)" :placeword="'根据应用名称进行模糊搜索'" v-model="searchVal"></search-inp>
          </el-col>
        </el-row>

				<div class="container" style="margin-top: 20px">
					<full-table :data="data.data" :title="data.tableTitle" :columnsOperation="data.columnsOperation" :page="data.page" @size-change="sizeChange" @current-change="currentChange"></full-table>
				</div>
			</paper>
		</div>
		
		<el-dialog :close-on-click-modal="false" id="detailDialog" size="large" title="数据库详情" :visible.sync="detailDbDialog">
			<el-form :inline="true" label-width="80px">
				<el-form-item class="item-title" label="部门领域">
					<el-select :disabled="true" placeholder="请选择活动区域" v-model="detailData.department"></el-select>
				</el-form-item>
				<el-form-item class="item-title" label="产品模块" style="margin-left:12%">
					<el-select :disabled="true" placeholder="请选择产品模块" v-model="detailData.product"></el-select>
				</el-form-item>
				<br>

				<el-form-item class="item-title" label="环境类型" >
					<el-select :disabled="true" placeholder="请选择环境类型" v-model="detailData.environment"></el-select>
				</el-form-item>
				<el-form-item class="item-title" label="应用名称" style="margin-left:12%">
					<el-select :disabled="true" placeholder="请选择应用名称" v-model="detailData.applicationName"></el-select>
				</el-form-item>
				<br>

				<el-form-item class="item-title" label="应用管理员">
					<el-input readonly v-model="detailData.managerName"></el-input>
				</el-form-item>
				<el-form-item class="item-title" label="系统管理员" style="margin-left:12%">
					<el-input readonly v-model="detailData.systemManagerName"></el-input>
				</el-form-item>
			</el-form>
			<div id="applyDialogTitle">资源申请（云主机+数据库）</div>
			<div id="applyList">
				<list-table :data="detailData.detailList" :title="detailTitle"></list-table>
			</div>
		</el-dialog>

	</div>
</template>
<script>
	import UserSearch from 'components/awesome/user_search/UserSearch.vue';
	import ListTable from 'components/awesome/list_table/ListTable.vue';
	import FullTable from 'components/awesome/full_table/FullTable.vue';
	import SonTitle from 'components/awesome/son_title/SonTitle.vue'
	import paper from 'components/awesome/paper/Paper.vue'
  import {getApplyList,getApplyDetail} from '../../api/service';
  export default{
		components: {
			"search-inp": UserSearch,
			"list-table":ListTable,
			"full-table":FullTable,
			"son-title":SonTitle,
			"paper":paper
    },
    data(){
      return {
				headTitle:{
					titleName:'云数据库申请'
				},
				data:{
					data:[],
					page:{
						currentPage:1,
						pageSize:10,
						total:0,
					},
					tableTitle:[
						{prop: 'applicationName',label: '应用名称',},
						{prop: 'productName',label: '产品模块',},
						{prop: 'environment',label: '环境类型',},
						{prop: 'createTime',label: '创建时间',},
						{
							prop: 'status',label: '审批状态',
							type:'slot',
							computed:(scope) => {
								let className = '';
								if(scope.row.status === 4){
									className = 'text-success';
								}else if(scope.row.status===0 || scope.row.status===2){
									className = 'text-info';
								}else if(scope.row.status===1 || scope.row.status===3){
									className = 'text-danger';
								}
								return `<span class="${className}">${scope.row.statusMsg}</span>`;
							}
						},
						{prop: 'clusterDesc',label: '描述',},
					],
					columnsOperation:{
						title: "操作",
						align: "center",
						buttons:[
							{
								label: "查看",
								size: "small",
								type: "text",
								methods:{
									click:(index, row)=>{
										this.getApplyDetail(row.applyId)
									}
								}
							}
						]
					}
				},
				detailTitle:[
					{prop: 'region',label: '所属区域',},
					{prop: 'cluster',label: '集群架构',},
					{prop: 'version',label: '版本',},
					{prop: 'charset',label: '字符集',},
					{prop: 'hostConfig',label: '主机套餐',},
					{prop: 'cpu',label: 'CPU(Cores)',},
					{prop: 'memory',label: '内存(G)',},
					{prop: 'hardware',label: '硬盘(G)',},
					{prop: 'operatSystem',label: '操作系统',},
					{prop: 'clusterDesc',label: '集群描述',},
				],

				searchVal:'',//搜索值
				applyDbDialog:false,//弹出框状态
				detailDbDialog:false,//详情弹出框状态
				dialogData:{
					deptList:[],//部门列表
					selectDept:'',//选中部门

					productList:[],//模块列表
					selectProduct:'',//选中模块

					environmentList:[],//环境列表
					selectEnvironment:'',//选中环境

					appNameList:[],//应用名称列表
					selectAppName:'',//选中应用名称

					adminMsg:{managerName:'',systemManagerName:''},//管理员
					submitDbList:[//提交数据库申请数据
						{addRow:{region:'',cluster:'',version:'',charset:'',hostConfig:'',flavorId:'',cpu:'',memory:'',hardware:'',operatSystem:'',clusterDesc:''}}
					],
					hostConfigList:[],//主机套餐列表
					selfConfig:false,//自定义cup/内存配置
				},
				detailData:{
					department:'',
					product:'',
					environment:'',
					applicationName:'',
					managerName:'',
					systemManagerName:'',
					detailList:[]//详情列表
				},
				groupList:[
					{name:'单节点',id:'mysql_01'},
					{name:'一主一从',id:'mysql_02'},
					{name:'一主两从',id:'mysql_03'},
				],
				submitFlag:false//控制重复提交
      }
    },
    created(){
			this.token = window.localStorage.token;//全局参数（标记值）
			this.proid = window.localStorage.project?JSON.parse(window.localStorage.project).projectId:'';//全局参数（项目id）
			this.userName = window.localStorage.user?JSON.parse(window.localStorage.user).account:'';//全局参数（用户id）
			this.getApplyListFun('',1,this.data.page.pageSize);
		},
		methods:{
			testFun:function(val1,val2){
				console.log('----这。。。');
			},

			//改变每页显示数量
			sizeChange:function(size){
				this.data.page.pageSize = size;
				this.searchVal = '';
				this.getApplyListFun(this.searchVal,1,this.data.page.pageSize);
			},

			//翻页
			currentChange:function(goPage){
				this.getApplyListFun(this.searchVal,goPage,this.data.page.pageSize);
			},

			applyDb:function(){
				this.$router.push('/database/apply');
			},

			//刷新
			refreshFun:function(){
				this.getApplyListFun(this.currentSearchVal,1,this.data.page.pageSize);
			},

			//获取/搜索/数据库申请列表
			getApplyListFun:function(keywords="",current=1,size=10){
				
				//每次搜索后保存临时变量，刷新时不能刷新搜索输入框内的值，只能根据当前搜索值刷新。
				this.currentSearchVal = keywords;
				let params = {
					applicationName:keywords,//应用名称
					type:'1',//类型 1：数据库 2：缓存
					projectId:this.proid,
					index:current,
					pageSize:size
				};

				getApplyList(params).then(data => {
					if(data.errorCode === '0' && data.result){
						this.data.data = data.result;
						this.data.page.total = data.total;
						this.data.data.forEach(value =>{
							switch (value.status) {
								case 0:
									value.statusMsg = '审批中-云主机';
									return;
								case 1:
									value.statusMsg = '审批失败-云主机';
									return;
								case 2:
									value.statusMsg = '审批中-云数据库';
									return;
								case 3:
									value.statusMsg = '审批失败-云数据库';
									return;
								case 4:
									value.statusMsg = '审批通过';
									return;
								default:
									value.statusMsg = '其它';
									return;
							}
						})
					}else{
					}
				})
			},

			/*--------------------------------------------------弹出框操作-----------------------------------------------*/

			//查看数据库详情
			getApplyDetail:function(applyId){
				this.detailDbDialog = true;

				getApplyDetail({token:this.token,applyId:applyId}).then(data => {
					if(data.errorCode === '0' && data.result){
						this.detailData.department = data.result.department;
						this.detailData.product = data.result.productName;
						this.detailData.environment = data.result.environment;
						this.detailData.applicationName = data.result.applicationName;
						this.detailData.managerName = data.result.applicationManager;
						this.detailData.systemManagerName = data.result.systemManager;
						this.detailData.detailList = data.result.resourceList;
						this.detailData.detailList.forEach(data => {
							data.hostConfig = data.cpu+'C '+data.memory+'G';
						})
					}else{

					}
				})
			},

			//关闭数据库详情
			closeDetail:function(){
				this.detailDbDialog = false;
				this.detailData.department = '';
				this.detailData.product = {};
				this.detailData.environment = '';
				this.detailData.applicationName = {};
				this.detailData.managerName = '';
				this.detailData.systemManagerName = '';
				this.detailData.detailList = [];
			}

			/*--------------------------------------------------弹出框操作end-----------------------------------------------*/
		}
  }
</script>
<style lang="less">

	#db_app{
		// padding: 20px;
		#appDialog, #detailDialog{
			#applyDialogTitle{
				font-size: 16px;
				font-weight: 700;
				hr{
					width: 80.5%;
				}
			}
			#applyList{
				margin: 20px 0px;
			}
		}

		.default_input{
			width:100%;
			height:36px;
			background-color: #fff;
			background-image: none;
			border-radius: 4px;
    	border: 1px solid #bfcbd9;
		}

		.item-title{
			.el-form-item__label{
				text-align: left;
				padding: 11px 10px 11px 0
			}
			.el-form-item__content{
				width: 350px;
				.el-select{
					width: 350px;
				}
			}
		}
	}
</style>
