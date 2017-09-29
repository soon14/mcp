<template>
  <div class="wrapper">
    <div id="proNav">
			<div id="proText">
				<div id="proIcon">
					<div id="icon" class="glyphicon glyphicon-cloud"></div>
				</div>
				<div id="proShowText">
					<p id="tittle">对象存储</p>
					<p id="tittleText">抱歉，您尚未开通对象存储服务OSS。请您：</p>
					 <el-button
				    type="primary"
				    @click="newCreateApp"
				    v-loading.fullscreen.lock="newcreate">
				    	立即申请
				  </el-button>
				</div>
			</div>
<!--			
			<div id="proLink">
				<a>产品详情</a>
				<a id="user">使用指南</a>
			</div>-->
		</div>
  </div>
</template>

<script type="text/ecmascript-6">
	import VueRouter from 'vue-router';
	import { getAppList,createApp } from '../../api/service';
	import storage from 'utils/local_storage_tool';
	import session from 'utils/session_storage_tool';
	import Bus from '../../api/bus';
//	import Bus from 'common/api/bus';
//	import Vue from 'vue'
//	import VueRouter from 'vue-router';
//	import routes from 'src/router'
//	import {getAppList,createApp,startApp,relationOfApp,log} from 'common/api/api';
//	const router = new VueRouter({
//	  // mode: 'history',
//	  routes
//	})
	export default {
    data() {
      return {
      	projectid: '',
      	uid: '',
        newcreate: false
      }
    },
    methods: {
    	'open7'(mesa){
	        this.$notify({
	          title: '成功',
	          message: mesa,
	          offset: 100,
	          type: 'success',
	          duration: 2000
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
        let postdata = JSON.stringify({'projectid':this.projectid,'uid':this.uid,'isshow':'false','token':this.token})
        createApp(postdata).then(data => {
        	this.newcreate = false;
      		if(data.code === 200){
//    			let params_log = {'token':this.token,'level':'1','uid':this.uid,'msg':data.msg,'app':'创建应用'};
//			    	log(params_log).then(data => {
//				    			
//				})
				this.$router.replace('/object/create/success');
      		}else {
//    			let params_log = {'token':this.token,'level':'3','uid':this.uid,'msg':data.msg,'app':'创建应用'};
//			    	log(params_log).then(data => {
//				    			
//				})
//				if(data.code === 601){
//					router.push({path: '/home/oss/overview'})
//				}
      		}
      	})
      },
      'getAppList_'(){
      	let getAppdata = JSON.stringify({'projectid':this.projectid,'token':this.token});
      	getAppList(getAppdata).then(res => {
      		if(res.code === 200){
//    			let params_log = {'token':this.token,'level':'1','uid':this.uid,'msg':res.msg,'app':'获取应用列表'};
//			    	log(params_log).then(data => {
//				    			
//				})
      			if(res.data.apps.length > 0){
      				window.sessionStorage.issync = res.data.apps[0].issync;
      				if(res.data.apps[0].isshow === 'true'){
      					this.$router.push('/object/overview');
      				}
      			}
      		}else{
//    			let params_log = {'token':this.token,'level':'3','uid':this.uid,'msg':res.msg,'app':'获取应用列表'};
//			    	log(params_log).then(data => {
//				    			
//				})
      		}
      	})
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
    		this.getAppList_();
//  		Bus.$emit('active','2');
    }
  }
</script>
<style scoped>
 .wrapper{
    padding: 0px 20px;
  }
#proNav{
	margin-left: 80px;
	margin-top: 60px;
}
#proText{
	height: 180px;
	width: 80%;;
	border-bottom: 1px solid #000000;
}
#proIcon{
	width: 50px;
	float: left;
	color: #09c;
}
#icon{
	font-size: 25px;
	margin-left: 2.5px;
}
#proShowText{
	float: left;
	/*margin-top: 10px;*/
}
#tittle{
	font-weight: bold;
}
#tittleText{
	margin-top: 20px;
	margin-left: 10px;
	margin-bottom: 40px;
}
#applyBtn{
	margin-top: 30px;
	width: 120px;
	height: 40px;
	background-color: #09c;
	border-radius: 8px;
	text-align: center;
	line-height: 40px;
	color: #FFFFFF;
	cursor: pointer;
}
#attText{
	color: red;
	margin-top: 15px;
}
#proLink{
	margin-top: 40px;
	overflow: hidden;
	margin-left: 30px;
}
a{
	float: left;
}
#user{
	margin-left: 40px;
}

</style>
