/**
* Created by CHENRC2 on 2017-7-23.
*/
<template>
  <section class="search-wrapper">
    <el-input ref="inputs" :placeholder="placewords" icon="search" :on-icon-click="iconClick" @change="isFocus=true&&!!data" v-model="data" @keyup.native.stop.prevent="search($event)"></el-input><i v-show="isFocus" @click="clearData" class="mf mf-cancel"></i>
  </section>
</template>
<style lang="less" scoped>
  .search-wrapper {
    position: relative;
    .el-input {
      width: 100%;
    }
    .mf-cancel {
      position: absolute;
      z-index: 1;
      right: 32px;
      top: 12px;
      font-size: 14px;
      font-weight: bold;
      color: #bfd2d9;
      &:hover {
        color: #839aa5;
      }
    }
  }
</style>
<script>
  export default{
    data() {
      return {
        data: this.value,
        isFocus: false,
        placewords: this.placeword
      }
    },
    methods: {
      search(event,force) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        // 如果我按的是回车才触发以下的逻辑
        if (force || (e && e.keyCode == 13)) {
          this.$emit("input",this.data);
          this.$emit('search-enter',this.data);
        }
      },
      iconClick() {
        this.search(true,true);
      },
      clearData() {
        this.data = '';
        this.isFocus = false;
        this.search(true,true);
      }
    },
    props: {
      value:{
        type:String,
        default(){
          return ""
        }
      },
      placeword: {
        type: String,
        default: '请输入搜索的信息'
      }
    }
  }
</script>
