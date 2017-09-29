<template>
	<div class="wrapper">
		<div class="left_wrapper" :style="op_iconbg_css">
			<div>
				<div>
					<div class="nav_header">
						<router-link to="/video/overview"><i class="mf mf-houtui"></i></router-link>
					</div>
					<div class="nav_menu">
						<li>
							<span id="">
								视频详情
							</span>
						</li>
					</div>
					<!--<div class="nav_menu" v-for="(item,index) in menu_data">
						<li @click="activeMenu($event)">
							<router-link :to="{name:item.name}" :id="item.id">{{item.title}}<span id="renwu" style="float: right;margin-right: 20px;color: red;">{{item.num}}</span></router-link>
						</li>
					</div>-->
				</div>
			</div>
		</div>
		<div class="right_wrapper" :style="naleft">
			<video-detail></video-detail>
			<!--<router-view></router-view>-->
		</div>
		<div id="op_iconbg" :style="op_iconbg_" @click="menu_toggle">
			<i class="mf mf-formatindentincrease"></i>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	//import {mapGetters, mapActions,log} from 'vuex'
	import storage from 'utils/local_storage_tool';
	import session from 'utils/session_storage_tool';
	import Bus from '../../api/bus';
	import VideoDetail from '../utils/view.vue';
	export default {
		//  computed:{
		//    ...mapGetters([
		//      'sm_l_m_w'
		//    ]),
		//    op_iconbg_css(){
		//      return !this.menu_is_hidden?this.op_iconbg_op:this.op_iconbg_cl;
		//    },
		//    is_top_menu(){
		//      return !(this.$route.name.substr(0,3)==='s1_')
		//    }
		//  },
		data() {
			return({
				'naleft':{
					'left': '180px'
				},
				'op_iconbg_css':{
					'width': '180px'
				},
				'op_iconbg_':{
					'background-color': '#ffffff',
					'left': '160px'
				},
				'menu_is_hidden': false,
				'op_iconbg_op': {
					'width': '180px'
				},
				'op_iconbg_cl': {
					'width': '0px'
				},
				'op_iconbg_oc': {
					'background-color': 'rgb(255, 255, 255)',
					'left': '160px'
				},
				'op_iconbg_pl': {
					'background-color': 'rgb(234, 237, 241)',
					'left': '0px'
				},
				'menu_data': [
					{
						'name': '视频详情',
						'title': '视频详情',
						'num': '',
						'id': 'overview'
					}
				]
			})
		},
		methods: {
			    'menu_toggle'(){
			    		if (this.menu_is_hidden) {
			    			this.naleft.left = '180px';
			    			this.op_iconbg_css = this.op_iconbg_op;
			    			this.op_iconbg_ = this.op_iconbg_oc;
			    		}else{
			    			this.naleft.left = '0px';
			    			this.op_iconbg_css = this.op_iconbg_cl;
			    			this.op_iconbg_ = this.op_iconbg_pl;
			    		}
			        this.menu_is_hidden=!this.menu_is_hidden;
			    },
			    'onload'(){
//			       window.location.href = '#/home/oss/overview';
//			       window.location.reload();
			    },
			    'activeMenu'(event){
					event.currentTarget.querySelector('a').className = 'activeMenu';
			    },
			    'getclassDom'(id,classname){
			    		let getdom = document.getElementById(id);
			    		if (classname) {
			    			getdom.className = classname;
			    		}else{
			    			getdom.className = '';
			    		}
			    		return getdom;
			    }
		},
		mounted: function() {
			let that = this;
//			session.removeItem('setArr')
			if (window.sessionStorage.setArr) {
		    		that.menu_data[3].num = session.getObject("setArr").length;
		    	}
			   	 Bus.$on('fileupnum',function(msg){
			    	 that.menu_data[3].num = msg;
			    })
			let classname = this.$route.name;
			switch (classname){
				case 'Bucket概览':
					this.getclassDom('overview','activeMenu');
					this.getclassDom('attribute');
					this.getclassDom('object');
					this.getclassDom('task');
					break;
				case 'Bucket属性':
					this.getclassDom('attribute','activeMenu');
					this.getclassDom('overview');
					this.getclassDom('object');
					this.getclassDom('task');
					break;
				case 'Object管理':
					this.getclassDom('attribute');
					this.getclassDom('overview');
					this.getclassDom('object','activeMenu');
					this.getclassDom('task');
					break;
				case '任务管理':
					this.getclassDom('attribute');
					this.getclassDom('overview');
					this.getclassDom('object');
					this.getclassDom('task','activeMenu');
					break;
				default:
					break;
			}
		},
		created() {
			if (window.sessionStorage.setArr) {
		    		session.removeItem('setArr')
		    	}
			   	Bus.$emit('active','2');
		},
		components:{
	      'video-detail': VideoDetail
	    }
	}
</script>
<style lang="less" rel="stylesheet/stylus" scoped>
	.left_wrapper {
		transition: all 0.3s;
	}
	
	.right_wrapper {
		transition: all 0.3s;
	}
	
	#op_iconbg {
		transition: all 0.3s;
	}
	
	i.icon-houtui {
		color: #0f0f0f;
		&:hover {
			opacity: 0.5;
		}
	}
	
	#op_iconbg {
		position: absolute;
		top: 50%;
		width: 20px;
		height: 60px;
		margin-top: -30px;
		line-height: 60px;
		cursor: pointer;
		font-size: 20px;
		i {
			opacity: 1;
			font-size: 20px;
			&:hover {
				opacity: 0.5;
			}
		}
	}
	
	.wrapper {
		width: 100%;
		height: 100%;
		.left_wrapper {
			background: #eaedf1;
			width: 180px;
			height: 100%;
			.nav_header {
				width: 100%;
				height: 70px;
				line-height: 70px;
				overflow: hidden;
				text-overflow: ellipsis;
				font-size: 15px;
				white-space: nowrap;
				font-weight: bold;
				text-align: center;
				background-color: #d3dce6;
			}
			.nav_menu {
				height: 40px;
				line-height: 40px;
				font-size: 14px;
				width: 100%;
				overflow: hidden;
				background-color: #FFFFFF;
				li {
					text-indent: 30px;
					a{
						display: block;
						width: 100%;
						color: #000;
					}
					/*a:hover{
						background-color: #ffffff;
					}*/
				}
				
			}
		}
		.right_wrapper {
			position: absolute;
			left: 180px;
			right: 0px;
			top: 0px;
			/*max-height: 300px;*/
			overflow: hidden;
			overflow-y: auto;
			bottom: 0px;
		}
		.activeMenu{
			background-color: #FFFFFF;
		}
	}
</style>