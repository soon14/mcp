/**
* Created by CHENRC2 on 2017-9-23.
*/
<template>
  <div class="paper" v-bind:style="{ height: (screenHeight-140)+'px' }">
    <slot></slot>
  </div>
</template>
<style lang="less" scoped>
  .paper{
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 1px 4px #a5abbc;
    display: block;
    margin: 20px;
    padding: 20px;
    overflow-y: auto;
  }
</style>
<script>
  export default{
    data(){
      return {
        screenHeight: document.body.clientHeight
      }
    },
    mounted () {
      const that = this;
      window.onresize = () => {
        return (() => {
          window.screenHeight = document.body.clientHeight;
          that.screenHeight = window.screenHeight;
        })();
      }
    },
    watch: {
      screenHeight (val) {
        if (!this.timer) {
          this.screenHeight = val;
          this.timer = true;
          let that = this;
          setTimeout(function () {
            that.timer = false;
          }, 400);
        }
      }
    },
  }
</script>
