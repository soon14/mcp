<template>
  <div class="manager-container">
    <section class="container-fluid">
      <router-view> </router-view>
    </section>
  </div>
</template>
<style lang="less" scoped>
  .manager-container{
    height: 100%;
    display: block;
    box-sizing: border-box;
    overflow:auto;
  }
</style>
<script>
  import CoreBreadCrumb from 'components/core/core_bread_crumb/CoreBreadCrumb.vue';
  export default{
    data(){
      return{
      }
    },
    components: {
      'core-bread-crumb': CoreBreadCrumb
    }
  }
</script>
