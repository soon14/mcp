<template>
  <section class="manager-container">
    <div class="content-nav">
      <core-nav-sub></core-nav-sub>
    </div>
    <div class="container-fluid">
      <router-view></router-view>
    </div>
  </section>
</template>
<style lang="less">
  @import '~styles/vars.less';
   .set-group{
    margin-top:28px !important;
  }
  .manager-container{
    .content-nav{
        position: fixed;
        top: 60px;
        bottom: 0;
        background: #211e2e;
        border-top:2px solid rgba(255,255,255,0.05) !important;
        width: 200px;
    }
    .container-fluid{
      position: absolute;
      background-color: @color-background-gray;
      left: 200px;
      right: 0;
      overflow:hidden;
      bottom: 0;
    }
  }
</style>
<script>
  import CoreNavSub from 'components/core/core_nav_sub/CoreNavSub.vue';
  export default{
    data(){
      return{

      }
    },
    components: {
    'core-nav-sub': CoreNavSub
    }
  }
</script>
