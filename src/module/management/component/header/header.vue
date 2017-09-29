<template>
  <div class="header-wrapper" >
    <div class="name">
      {{ rowInfo.userName ? '姓名' : '项目名称' }} : {{rowInfo.userName ? rowInfo.userName : projectDetail.projectName}}
    </div>
    <div class="account">
      {{ rowInfo.userName ? '账号' : '项目ID' }} : {{rowInfo.userAccount ? rowInfo.userAccount : projectDetail.projectId}}<a class="forgetPwd" target="_Blank" href="http://mipnew.midea.com/#ModuleView" v-if="rowInfo.userName">更改密码</a>
    </div>
    <div class="mail">
      {{ rowInfo.userName ? '邮箱' : '项目描述' }} :
      <a class="email-link" href="mailto: this.rowInfo.mail" v-if="rowInfo.mail">{{rowInfo.mail}}</a>
      <span v-else>{{projectDetail.projectDesc}}</span>
    </div>
    <div class="department">
      {{ rowInfo.userName ? '' : '项目成员数量' }} {{rowInfo.userName ? '' : ':'}} {{rowInfo.userName ? '' : memberNum + '人'}}
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      memberNum: {
        type: Number,
        default: 0
      },
      rowInfo: {
        type: Object,
        default() {
          return {};
        }
      },
      projectDetail: {
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
    box-sizing: border-box;
    display:-webkit-box;
    display: -moz-box;
    display: -ms-flexbox;
    display: -webkit-flex;
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    /*flex-flow: column wrap;*/
    -webkit-box-orient:vertical;
    -webkit-box-direction:normal;
    -moz-box-orient:vertical;
    -moz-box-direction:normal;
    flex-direction:column;
    -webkit-flex-direction:column;
    height: 140px;
    border-bottom: 1px solid #cecece;
    box-sizing: border-box;
    text-align: left;
    font-size: 16px;
    background-color: #fafafa;
    margin: -20px -20px 20px -20px;
    padding: 20px;
    div {
      flex: 1;
      -moz-box-flex: 1;
      -ms-flex: 1;
      -webkit-box-flex: 1;
      -webkit-flex: 1;
      margin-bottom: 18px;
      line-height:16px;
      &:nth-of-type(3n) {
        height: 14px;
        line-height: 16px;
        margin-bottom: 18px;
      }
    }
    .mail {
      height: 14px;
      line-height: 16px;
      margin-bottom: 18px;
    }
    .account {
      .forgetPwd {
        margin-left: 20px;
        font-size: 14px;
        text-decoration: none;
        color: #21b8d5;
      }
    }
    .mail {
      .email-link {
        text-decoration: none;
        color: #000;
      }
    }
  }
</style>
