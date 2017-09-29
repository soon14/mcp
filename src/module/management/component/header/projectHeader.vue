<template>
  <div class="header-wrapper" >
    <el-row style="min-width: 480px">
      <el-col :span="12">
        <div class="name">
          {{ projectDetail.projectName ? '项目名称' : '项目名称' }} : {{projectDetail.projectName ? projectDetail.projectName : ''}}
        </div>
      </el-col>
      <el-col :span="12">
        <div class="department">
          {{ !projectDetail.projectName ? '' : '项目成员数量' }} : {{!projectDetail.projectName ? '' : memberNum + '人'}}
        </div>
      </el-col>
    </el-row>
    <el-row style="min-width: 480px">
      <el-col :span="24">
        <div class="account">
          <el-tooltip class="item" effect="dark" :content="projectDetail.projectId?projectDetail.projectId:''" placement="top">
            <span>{{ projectDetail.projectName ? '项目ID' : '项目ID' }} : {{projectDetail.projectId ? projectDetail.projectId : ''}}</span>
          </el-tooltip>
        </div>
      </el-col>
    </el-row>
    <el-row style="min-width: 480px">
      <el-col :span="24">
        <div class="mail">
          <!--<el-tooltip class="item" effect="dark" :content="projectDetail.projectDesc?projectDetail.projectDesc:''" placement="top">-->
            <span>{{ projectDetail.projectName ? '项目描述' : '项目描述' }} : {{projectDetail.projectDesc ? projectDetail.projectDesc : ''}}</span>
          <!--</el-tooltip>-->
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    created() {

    },
    props: {
      memberNum: {
        type: Number,
        default: 0
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
    border-bottom: 1px solid #cecece;
    box-sizing: border-box;
    text-align: left;
    font-size: 16px;
    background-color: #fafafa;
    margin: -20px -20px 20px -20px;
    padding: 20px;
    /*overflow: hidden;*/
    /*overflow-y: auto;*/
    .name, .department, .account {
      line-height: 24px;
      margin-bottom: 18px;
      min-width: 320px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
    .mail {
      min-width: 320px;
      line-height: 24px;
    }
  }
</style>
