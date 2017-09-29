<template>
  <div id="app">
    <transition name="fade" mode="out-in">
        <router-view style="box-sizing: border-box;"></router-view>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'app',
    data() {
      return {

      }
    }
  }
</script>

<style lang="less">
 #app{
   height: 100%;
   overflow:hidden;
   overflow-y: auto;
 }
  .container {
    // overflow: hidden;
    // overflow-y: auto;
  }
</style>
