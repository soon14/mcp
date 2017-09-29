<template>
  <div id="app">
    <section class="container">
      <div class="header">
        <core-header></core-header>
      </div>
      <div class="content">
        <div class="content-nav">
          <core-nav-sub></core-nav-sub>
        </div>
        <div class="content-main" :style="'left:' + menuleft">
          <transition name="fade" mode="out-in">
            <router-view></router-view>
          </transition>
        </div>
      </div>
    </section>
  </div>
</template>

<script type="text/ecmascript-6">
  import CoreHeader from 'components/core/core_header/CoreHeader.vue';
  import CoreNavSub from 'components/core/core_nav_sub/CoreNavSub.vue';
  import CoreBreadCrumb from 'components/core/core_bread_crumb/CoreBreadCrumb.vue';
  import Bus from './api/bus';

  export default {
    name: 'objectstroe',
    data(){
    		return {
    			menuleft: '200px'
    		}
    },
    methods: {
    		'isSuccess'(){
    			let urlname = this.$route.name;
	    		if (urlname === "开通oss成功") {
	    			this.menuleft = "0px"
	    		}
    		}
    },
    created(){
    		this.isSuccess();
    },
    mounted:function(){
    		let that = this;
    		Bus.$on('is_Success',function(msg){
//  			debugger;
    			let urlname = this.$route.name;
	    		if (urlname === "开通oss成功") {
	    			that.menuleft = "0px";
	    		}else{
	    			that.menuleft = "200px"
	    		}
    		});
    },
    components:{
      'core-header': CoreHeader,
      'core-nav-sub': CoreNavSub,
      'core-bread-crumb': CoreBreadCrumb
    }
  }
</script>

<style lang="less" scoped>
  @import '~styles/base.less';
  .container{
    .content{
      position: absolute;
      right: 0;
      left: 0;
      top: 60px;
      bottom: 0;
      overflow-y: auto;
      background-color: @color-background;
      .content-nav{
        border-top:2px solid rgba(255,255,255,0.05) !important;
        width: 200px;
      }
      .content-main{
        position: absolute;
        left: 200px;
        top: 0;
        bottom: 0;
        right: 0;
        background-color: #e5e5e5;
        overflow: hidden;
        overflow-y: auto;
        /*text-align: center;*/
      }
    }
  }
</style>
