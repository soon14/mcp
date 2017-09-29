<template>
	<section class="manager-container">
		<!--<div class="content-nav">
      <core-nav-sub :menus="menus"></core-nav-sub>
    </div>-->
		<div class="container-fluid">
			<div class="box">
				<h2 class="cloud">对象存储</h2>
				<p class="cloudmsg"> OSS是美的云提供的面对企业级应用和互联网服务推出数据存储服务，提供安全<br/> 稳定的海量数据存储解决方案。 </p>
				<h4 class="des">亮点功能介绍</h4>
				<div class="contentbox">
					<div class="top">
						<a><img src="/static/images/cloudDataImg/objectstore_03.png" alt="" /></a>
					</div>
					<p class="control">分块上传</p>
					<div class="bottom">
						<a><img src="/static/images/cloudDataImg/objectstore_03-02.png" alt="" /></a>
						<a><img src="/static/images/cloudDataImg/objectstore_03-03.png" alt="" /></a>
						<a><img src="/static/images/cloudDataImg/objectstore_03-04.png" alt="" /></a>
					</div>
					<div class="bottom_desc">
						<p>可视化操作</p>
						<p>灵活存储</p>
						<p>数据备份</p>
					</div>
					<p class="tip_text" v-if="!isAuth">项目成员无权开通该服务，请联系项目管理员开通服务。</p>
					<el-button class="pri" v-if="isAuth" type="primary" @click="newCreateApp()">
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
		}
	}

	.box {
		width: 100%;
		height: 100%;
		overflow: hidden;
		overflow-y: auto;
		text-align: center;
		min-width: 500px;
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
			width: 496px;
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
				display: flex;
				width: 470px;
				margin: 0 auto;
				margin-top: 22px;
				justify-content: space-between;
				p {
					font-size: 14px;
					margin: 0;
					padding: 0;
					color: #6a707d;
					&:nth-child(2) {
						margin-left: -5px;
					}
					&:nth-child(3) {
						margin-right: 8px;
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

	import VueRouter from 'vue-router';
	import { getAppList, createApp } from '../../api/service';
	import storage from 'utils/local_storage_tool';
	import session from 'utils/session_storage_tool';
	import Bus from '../../api/bus';

	export default {
		name: "cacheServer",
		data() {
			return {
				projectid: '',
				uid: '',
				newcreate: false,
				isAuth: false
				//				menus: [{
				//					path: '/introduce',
				//					name: '云服务',
				//					children: [{
				//						path: '/cloud_control',
				//						name: "云监控",
				//					}, {
				//						path: '/object_store',
				//						name: "对象存储",
				//					}]
				//				}]
			}
		},
		methods: {
			'open7' (mesa,cb) {
				this.$notify({
					title: '成功',
					message: mesa,
					type: 'success',
					duration: 1000,
          onClose:cb
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
			newCreateApp() {
				this.newcreate = true;
				let postdata = JSON.stringify({
					'projectid': this.projectid,
					'uid': this.uid,
					'isshow': 'false',
					'token': this.token
				});
				createApp(postdata).then(data => {
					this.newcreate = false;
					if(data.code === 200) {
            this.$store.dispatch("changeAuthority",true);
            this.open7("开通对象存储成功！",()=>{
              this.$router.replace('/object/overview');
            });
						Bus.$emit('is_openobject',true);
					} else {
            this.open7("对象存储开通失败！");
					}
				})
			},
			'getAppList_' () {
				let getAppdata = JSON.stringify({
					'projectid': this.projectid,
					'token': this.token
				});
				//如果没有系统级别权限则隐藏按钮，否则按子系统判断是否显示按钮
        if(!this.$store.state.isSystemAuth){
          this.isAuth=false;
        }else{
          getAppList(getAppdata).then(res => {
            if(res.code === 200) {
              this.isAuth = !!!res.data.apps.length;
            }
          });
        }
			}
		},
		created(){
      if(window.localStorage.token && window.localStorage.token !== ""){
        this.uid = storage.getObject("user").account;
        this.token = storage.getItem("token");
        this.projectid = storage.getObject("project").projectId;
      }
      this.$notify.error('该项目下尚未开通对象存储，请开通应用再继续其他操作！');
      this.getAppList_();
		},
		components: {
			'core-bread-crumb': CoreBreadCrumb,
			'core-nav-sub': CoreNavSub
		}
	}
</script>
