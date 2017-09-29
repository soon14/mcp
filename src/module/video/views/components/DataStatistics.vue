<template>
	<div id="video_data">
		<div id="video_open_tittle">
			<p>数据统计</p>
		</div>
		<div id="video_text">
			<i class="mf mf-smile"></i>
			<p>&nbsp;&nbsp;&nbsp;下期上线，敬请期待！！！</p>
		</div>
	</div>
</template>
<script type="text/ecmascript-6">
	import Bus from '../../api/bus';
//import Vue from 'vue'
//import VueRouter from 'vue-router';
//import routes from 'src/router';
//import Bus from 'common/api/bus';
//	const router = new VueRouter({
//	  // mode: 'history',
//	  routes
//	})
  export default{
    data(){
      return {
        
      }
    },
    methods:{
    },
    created(){
//	    	if (window.sessionStorage.videoappid === '' || !window.sessionStorage.videoappid || window.sessionStorage.videoappkey === '' || !window.sessionStorage.videoappkey) {
//	    		router.push({
//				path: '/home/video/app/appmanage'
//			});
//	    	}
    },
    components:{
      
    },
    mounted() {
    		let that = this;
    		window.sessionStorage.video_File = window.sessionStorage.videoFile;
    		Bus.$on('videoFlieAll',function(msg){
			Bus.$emit('videoFileSelect',msg);
		})
    		Bus.$on('fileTime',function(msg){
	    		Bus.$emit('getfileTime',msg);
	    	})
    }
  }
</script>
<style lang="less" scoped>
	#video_data{
		width: 98%;
		height: 100%;
		margin: 0 auto;
		/*padding: 0 15px;*/
		#video_open_tittle{
			width: 100%;
			padding-top: 1px;
			height: 60px;
			border-bottom: 1px solid #D3DCE6;
			text-align: left;
			p {
				margin-top: 16px;
				font-size: 16px;
				font-weight: bold;
				padding-left: 15px;
				height: 16px;
				border-left: 3px solid #09c;
				line-height: 16px;
			}
		}
		#video_text{
			text-align: center;
			width: 400px;
			margin: 100px auto;
			i{
				font-size: 80px;
			}
			p{
				margin-top: 20px;
				font-size: 20px;
				margin-bottom: 20px;
			}
		}
	}
</style>