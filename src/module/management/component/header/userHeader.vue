<template>
  <div class="header-wrapper">
    <el-row>
      <el-col :span="12">
        <div class="name">
          {{ rowInfo.userName ? '姓名' : '姓名' }} : {{rowInfo.userName ? rowInfo.userName : ''}}
        </div>
      </el-col>
      <el-col :span="12">
        <div class="department">
          <span>{{ rowInfo.userName ? '部门信息' : '部门信息' }} : {{ rowInfo.userName ? rowInfo.deptName : '' }}</span>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="account">
          {{ rowInfo.userName ? '账号' : '账号' }} : {{rowInfo.userAccount ? rowInfo.userAccount : ''}}<a class="forgetPwd" target="_Blank" href="http://mipnew.midea.com/#ModuleView" v-if="rowInfo.userName&&isMine">更改密码</a>
        </div>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <div class="mail">
          {{ rowInfo.mail ? '邮箱' : '邮箱' }} : {{rowInfo.mail ? rowInfo.mail : ''}}
          <!--<a href="javascript:;" class="email-link"  v-if="rowInfo.mail">{{rowInfo.mail}}</a>-->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    props: {
      isMine: {
        type: Boolean,
        default: false
      },
      rowInfo: {
        type: Object,
        default() {
          return {};
        }
      }
    }
  };
</script>

<style lang="less" scoped>
  .header-wrapper {
    height: 140px;
    border-bottom: 1px solid #cecece;
    box-sizing: border-box;
    text-align: left;
    font-size: 16px;
    background-color: #fafafa;
    margin: -20px -20px 20px -20px;
    padding: 20px;

   .forgetPwd{
     margin-left:20px;
     color:#20B8D5 !important;
   }
    .name, .department, .account, .mail {
      line-height: 24px;
      margin-bottom: 18px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .mail {
      a {
        color: #000;
      }
    }
  }
</style>
