<template>
  <!--<div class="manager-container">
    <section class="container-fluid">
      &lt;!&ndash;<core-bread-crumb></core-bread-crumb>&ndash;&gt;
      <router-view> </router-view>
    </section>
  </div>-->
  <section>
    <router-view> </router-view>
  </section>
</template>
<style lang="less" >
   .set-group{
    margin-top:28px !important;
  }
  .manager-container{
    /*height: 100%;*/
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
