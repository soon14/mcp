<template>
  <div class="wrapper">
    <div id="ossCreateSucces">
			<div id="succesText">
				<span id="icon" class="mf mf-ok-circled2"></span>
				<p id="text">恭喜您，您已开通OSS服务</p>
			</div>
			<div id="openOssBtn" @click='openoss'>
				进入OSS控制台
			</div>
		</div>
  </div>
</template>

<script type="text/ecmascript-6">
	import VueRouter from 'vue-router';
	import { getAppList } from '../../api/service';
	import storage from 'utils/local_storage_tool';
	import session from 'utils/session_storage_tool';
	import Bus from '../../api/bus';
//	import Vue from 'vue'
//	import VueRouter from 'vue-router';
//	import routes from 'src/router'
//	import Bus from 'common/api/bus';
//	import {getAppList,log} from 'common/api/api';
//	const router = new VueRouter({
//	  // mode: 'history',
//	  routes
//	})
	export default {
    data() {
      return {
      	projectid:'',
      	token:''
      }
    },
    methods: {
    	'open6'(mesa){
	        this.$notify({
	          title: '警告',
	          message: mesa,
	          offset: 200,
	          type: 'warning',
	          duration: 4000
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
      openoss() {
      	let params = JSON.stringify({'projectid':this.projectid,'token':this.token});
      	getAppList(params).then(data => {
		   if(data.code === 200){
//		   		let params_log = {'token':this.token,'level':'3','uid':this.uid,'msg':data.msg,'app':'获取应用'};
//				log(params_log).then(data => {
//								    			
//				})
		        if(data.data.apps.length > 0){
		            window.sessionStorage.issync = data.data.apps[0].issync;
//		            this.$router.push('/object/overview');
					this.$router.replace('/object/overview');
					Bus.$emit('is_openobject',true);
		      	}else{
		      		//this.open6('请您在24小时内进入邮箱点击验证信息才能通过验证！');
		      	}
		   }else {
//	      		let params_log = {'token':this.token,'level':'3','uid':this.uid,'msg':data.msg,'app':'获取应用'};
//				log(params_log).then(data => {
//								    			
//				})
//				if(data.code === 618){
//					this.open4('您的登录信息已过期，请重新登录！');
//	      			router.push({path: '/login'})
//				}
	      	}
		})
      }
    },
    created(){
    		Bus.$emit('isSuccess','isSuccess');
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
//  		if(window.localStorage.token && window.localStorage.token !== ""){
//  			this.uid = window.localStorage.name;
//  			this.token = window.localStorage.token;
//  			if(window.localStorage.proid && window.localStorage.proid !== ""){
//  				this.projectid = window.localStorage.proid;
//  			}else{
//  				this.open4('您尚未创建项目');
//  				router.push({path: '/home/oss/newproject'});
//  			}
//  		}else{
//  			router.push({path: '/login'});
//  		}
//   	Bus.$emit('active','2');
    }
  }
</script>
<style scoped>
 .wrapper{
    padding: 0px 20px;
  }
#ossCreateSucces{
	width: 100%;
	height: 100%;
	text-align: center;
	margin: 0 auto;
	padding-top: 0.1px;
}
#succesText{
	overflow: hidden;
	margin-top: 10%;
	width: 330px;
	height: 60px;
	margin-left: auto;
	margin-right: auto;
	/*background-color: #faf6f6;*/
	text-align: left;
}
#icon{
	float: left;
	line-height: 60px;
	font-size: 50px;
	margin-left: 15px;
	margin-right: 10px;
	font-weight: 100;
	color: #1cd171;
}
#text{
	float: left;
	line-height: 60px;
	font-weight: bold;
	font-size: 20px;
}
#openOssBtn{
	width: 150px;
	height: 40px;
	background-color: #21b8d5;
	border-radius: 8px;
	margin: 40px auto;
	cursor: pointer;
	line-height: 40px;
	color: #FFFFFF;
}
</style>
