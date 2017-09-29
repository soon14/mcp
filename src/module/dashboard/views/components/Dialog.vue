/**
* Created by CHENRC2 on 2017-7-29.
*/
<template>
    <section class="container">
    <el-button class="alert-btn" type="primary" @click="dialogVisible = true">打开Dialog弹出框案例</el-button>
       <el-dialog
          title="提示"
          :visible.sync="dialogVisible"
          size="tiny"
          :before-close="handleClose">
          <span>这是一段信息</span>
          <div class="dialog-footer">
           <el-button @click="dialogVisible = false">取 消</el-button>
           <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
          </div>
  </span>
</el-dialog>
    </section>
</template>
<style lang="less" scoped>
.alert-btn{
  margin-top:50px;
  margin-left:50px;
}
</style>
<script>

   export default {
    data() {
      return {
        dialogVisible: false
      };
    },
    methods: {
      handleClose(done) {
          done()
      }
    }
  };
</script>
