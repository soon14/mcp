<template>
  <div class="orgSelectorLite-wrap">
    <el-select v-model="searchValue"
               :multiple='single'
               filterable
               remote
               ref="ser"
               :default-first-option="single"
               :clearable="single"
               placeholder="请输入关键字搜索"
               popper-class="orgSelectorLite"
               :remote-method="searchAction"
               @visible-change="visibleChange"
               @change="selectChange"
    >
      <el-option
        v-for="item in options"
        :key="item.uid"
        :label="item.uName"
        :value="item.uName">
        <div class="name ">{{item.uName}}</div>
        <div class="departmentName ">{{item.deptName}}</div>
      </el-option>
    </el-select>
  </div>
</template>
<script>

  import {searchUsers} from './service.js'
  export default{
    data(){
      return{
        options: [],
        searchValue: ''
      }
    },
    props:{
      value:{
      },
      single:{
        type:Boolean,
        default:true
      }
    },
    methods:{
      visibleChange(bool){
        if(!bool){
          this.options = [];
        }
      },
      selectChange(value){
        if(value != ""){
          this.$emit("input",this.searchValue);
        }
      },
      searchAction(query){
        if(query.length<=0||query.trim()==="")return
        if(query !== ""){
          let params = {"keywords": query,"index":1,pageSize:20};
          searchUsers(params).then(res => {
            if (res.msg === "success") {
              this.options = res.result.info;
            }
          })
        }else{
          this.options = [];
        }
      }
    }
  }

</script>
<style lang="less" scoped>
.el-select-dropdown.is-multiple .el-select-dropdown__item.selected::after{
  top:25px;
}
  .orgSelectorLite-wrap{
    .el-select{
      width: 100%;
    }
  }
  .orgSelectorLite{
     
  .el-select-dropdown__item{
      height:60px;
      padding:5px;
    }
    .departmentName{
      width:470px;
      font-size:12px; 
      white-space:pre-wrap;
    }
    .name{
      font-weight:bolder;
    }
  }
</style>
