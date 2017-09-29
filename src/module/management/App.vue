<template>
  <div id="app">
    <section class="container">
      <div class="header">
        <core-header></core-header>
      </div>
      <div class="content">
        <transition name="fade" mode="out-in">
          <router-view class="routes"></router-view>
        </transition>
      </div>
    </section>
  </div>
</template>

<script>
  import CoreHeader from 'components/core/core_header/CoreHeader.vue';

  export default {
    name: 'management',
    components:{
      'core-header': CoreHeader
    }
  }
</script>

<style lang="less" scoped>
  @import '~styles/vars.less';
  .container{
    height: 100%;
    // overflow: hidden;
      .container-card{
        margin: 20px;
      //  margin-top:20px !important;
      }
    .header{
      position: fixed;
      width: 100%;
      z-index:1;
    }
    .content{
      position: absolute;
      right: 0;
      left: 0;
      top: 60px;
      bottom: 0;
      .fade-enter-active,
      .fade-leave-active {
        transition: all .2s ease;
      }
      .fade-enter,
      .fade-leave-active {
        opacity: 0;
      }
    }
  }
</style>
