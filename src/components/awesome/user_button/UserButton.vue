/**
* Created by CHENRC2 on 2017-7-23.
*/
<template>
  <section class="container">
    <el-button
      :size="setting.size"
      :type="setting.type"
      @click="$emit(setting.methods.click)">{{setting.label}}</el-button>
  </section>
</template>
<style lang="less" scoped>

</style>
<script>
  export default{
    name: "UserButton",
    data() {
      return {}
    },
    props: {
      setting: {
        type: Object,
        default(){
          return {
            label: "删除",
            size: "small",
            type: "text",
            methods:{
                click:""
            }
          };
        }
      }
    }
  }
</script>
