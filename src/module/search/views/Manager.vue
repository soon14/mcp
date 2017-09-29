<template>
  <div class="manager-container">
    <section class="container-fluid">
      <router-view> </router-view>
    </section>
  </div>
</template>
<style lang="less" scoped>
  .manager-container{
    /*height: 100%;*/
    display: block;
    box-sizing: border-box;
    overflow:hidden;
    .container-fluid{
      height: 98%;
      // padding-top: 20px;
    }

  }
</style>
<script>
  export default{}
</script>
