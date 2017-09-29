<template>
	<section class="manager-container" ref='gethight'>
		<!--<div class="content-nav">
      <core-nav-sub :menus="menus"></core-nav-sub>
    </div>-->
		<!--<div class="container-fluid" :style="'max-height:'+maxheight+'px'">-->
			<div class="container-fluid">
			<div class="box">
				<h2 class="cloud">视频点播</h2>
				<p class="cloudmsg"> 结合美的内部需求研发的视频点播服务，集视频上传，媒体资源管理，视频播放<br/> 于一体的音视频点播解决方案。提供功能完善的后台管理系统，丰富的API&amp;SD..<br/> K,可快速使用，灵活集成自有服务。 </p>
				<h4 class="des">亮点功能介绍</h4>
				<div class="contentbox">
					<div class="top">
						<a><img src="/static/images/cloudDataImg/videoorder1_03.png" alt="" /></a>
					</div>
					<p class="control">完善的后台管理</p>
					<div class="bottom">
						<a><img src="/static/images/cloudDataImg/videoorder1_07.png" alt="" /></a>
						<a><img src="/static/images/cloudDataImg/videoorder1_09.png" alt="" /></a>
						<a><img src="/static/images/cloudDataImg/videoorder1_11.png" alt="" /></a>
					</div>
					<div class="bottom_desc">
						<p>自主研发可定制</p>
						<p>快速使用灵活集成</p>
						<p>急速播放体验</p>
					</div>
					<p class="tip_text" v-if="!isAuth">项目成员无权开通该服务，请联系项目管理员开通服务。</p>
					<el-button class="pri" v-if="isAuth" type="primary" @click="createvideo()">
						点击开通
					</el-button>
				</div>
			</div>
		</div>
	</section>
</template>
<style lang="less" scoped>
	@import '~styles/vars.less';
	.manager-container {
		position: relative;
		background-color: @color-background;
		.content-nav {
			width: 200px;
		}
		.content-crumb {
			position: absolute;
			background-color: #eee;
			top: 0;
			right: 0;
			left: 0px;
		}
		.container-fluid {
			position: absolute;
			background-color: #eee;
			left: 0px;
			right: 0;
			top: 0;
			bottom: 0;
			overflow: hidden;
			overflow-y: auto;
		}
	}

	.box {
		width: 100%;
		min-width: 500px;
		text-align: center;
		.cloud {
			margin: 75px 0px 40px 0px;
			font: 400 18px/18px "微软雅黑";
			color: #211e2e;
		}
		.cloudmsg {
			font-size: 14px;
			color: #6a707d;
			margin: 0;
			padding: 0;
			line-height: 24px;
			width: 500px;
			margin: 0 auto;
			text-align: left;
		}
		.des {
			margin: 45px 0 40px 0;
			font: 400 18px/18px "微软雅黑";
			color: #211e2e;
		}
		.contentbox {
			.top {
				margin: 0 auto;
				width: 71px;
				height: 71px;
				a {
					display: block;
					width: 71px;
					height: 71px;
					img {
						width: 100%;
					}
				}
			}
			.control {
				margin: 22px 0 66px 0;
				font: 400 14px/14px "微软雅黑";
				color: #6a707d;
			}
			.bottom {
				margin: 0 auto;
				width: 100%;
				height: 71px;
				display: flex;
				justify-content: center;
				a {
					display: block;
					width: 71px;
					height: 71px;
					&:nth-child(2) {
						margin-left: 128px;
						margin-right: 128px;
					}
					img {
						width: 100%;
						display: block;
					}
				}
			}
			.bottom_desc {
				margin: 0 auto;
				margin-top: 22px;
				width: 485px;
				display: flex;
				justify-content: space-between;
				p {
					font-size: 14px;
					margin: 0;
					padding: 0;
					color: #6a707d;
					&:nth-child(1) {
						margin-left: -5px;
					}
					&:nth-child(2) {
						margin-left: -3px;
					}
					&:nth-child(3) {
						margin-right: 2px;
					}
				}
			}
			.tip_text{
				color: red;
				margin-top: 40px;
				font-size: 15px;
				margin-bottom: 40px;
			}
			.pri {
				margin-top: 40px;
				margin-bottom: 40px;
				width: 84px;
				height: 32px;
				font-size: 14px;
				line-height: 12px;
			}
		}
	}
</style>
<script>
	import CoreBreadCrumb from 'components/core/core_bread_crumb/CoreBreadCrumb.vue';
	import CoreNavSub from 'components/core/core_nav_sub/CoreNavSub.vue';
	import { videoapplist, videocreateapp } from '../../api/service';
	import storage from 'utils/local_storage_tool';
	import session from 'utils/session_storage_tool';
	import { hex_md5 } from '../../utils/md5';
	import Bus from '../../api/bus';
	export default {
		name: "cacheServer",
		data() {
			return {
				maxheight: '450',
				uid: '',
				token: '',
				projectid: '',
				isAuth: false,
				menus: [{
					path: '/introduce',
					name: '云应用',
					children: [{
						path: '/video_order_play',
						name: "视频点播",
					}]
				}]
			}
		},
		methods: {
			createvideo() {
				let postData = JSON.stringify({
					'uid': this.uid,
					"token": this.token,
					'projectId': this.projectid,
					"isShow": 'false'
				});
				videocreateapp(postData).then(data => {
					if (data.code === 200) {
						this.$notify({
				          title: '',
				          message: '开通视频点播成功！',
				          type: 'success'
				        });
						this.$store.dispatch("changeAuthority",true);
            this.$router.replace('/video/overview');
					}
				})
			},
			videoapplist() {
				let postData = JSON.stringify({
					"token": this.token,
					'projectid': this.projectid
				});
        //如果没有系统级别权限则隐藏按钮，否则按子系统判断是否显示按钮
        if(!this.$store.state.isSystemAuth){
          this.isAuth=false;
        }else{
          videoapplist(postData).then(data => {
            if (data.code === 200) {
              this.isAuth = !!!data.data.apps.length;
            }
          });
        }
			}
		},
		mounted() {

		},
		components: {
			'core-bread-crumb': CoreBreadCrumb,
			'core-nav-sub': CoreNavSub
		},mounted(){
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
      this.$notify.error('该项目下尚未开通视频点播，请开通应用再继续其他操作！');
			this.videoapplist();
			// this.maxheight = this.$refs.gethight.clientHeight - 45;
		}
	}
</script>
