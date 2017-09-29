<template>
  <div id="app">
    <section class="container">
      <div class="header">
        <core-header></core-header>
      </div>
      <div class="content">
        <router-view></router-view>
      </div>
    </section>
  </div>
</template>

<script>
  import CoreHeader from 'components/core/core_header/CoreHeader.vue';
  import { requestLogout } from '../login/api/service';

  export default {
    name: 'faq',
    components:{
      'core-header': CoreHeader
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
      background-color: @color-background-gray;
    }
  }
</style>
