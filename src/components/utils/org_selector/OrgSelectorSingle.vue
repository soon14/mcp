<template>
  <div class="container single_select">
  <el-form :model="dynamicValidateForm" ref="dynamicValidateForm" label-width="90px" class="demo-dynamic">
   <el-form-item
    prop="member"
    :label="labelTitle"
    :rules="requireSel"
   >
    <div>
    <el-autocomplete
    popper-class="my-autocomplete"
    custom-item="my-item-zh"
    ref ="autoSel"
    @focus="loadAll"
    :fetch-suggestions="querySearchAsync"
    @select="handleSelect"
    placeholder="请输入关键字搜索"
    v-model="dynamicValidateForm.member"
    >
    </el-autocomplete>
    </div>
  </el-form-item>
  </el-form>
  </div>
</template>
<style lang="less">
   .container{
     /*.el-autocomplete {*/
       /*margin-left: 10px;*/
       /*input {*/
         /*width: 98%;*/
       /*}*/
     /*}*/
     .el-autocomplete, .el-dropdown{
       display:inline;
     }
     .el-form-item__error {
       margin-left: 10px;
     }
   }
  .my-autocomplete {

  li {
    line-height: normal;
    padding: 7px;
    height:45px;
    .uName {
      text-overflow: ellipsis;
      overflow: hidden;
      font-weight:600;
    }
    .deptName {
      font-size: 12px;
      color: #b4b4b4;
      white-space:pre-wrap;
    }
    .highlighted .deptName {
      color: #ddd;
    }
  }
}
</style>
<script>
    import {searchUsers} from './service.js'
    import  Vue from 'vue'
    Vue.component('my-item-zh', {
    functional: true,
    render: function (h, ctx) {
      var item = ctx.props.item;
      return h('li', ctx.data, [
        h('div', { attrs: { class: 'uName' } }, [item.uName]),
        h('div', { attrs: { class: 'deptName' } }, [item.deptName]),
      ]);
    },
    props: {
      item: { type: Object, required: true }
    }
  });
    export default{
      name:"OrgSelectorSingle",
      data(){
        return{
        sel:'',
        resData:[],
        dynamicValidateForm: {
          member: ''
           }
         }
        },
        props:{
         memberList:{      //---选中的人员
           type:String,
           default:""
         },
         requireSel:{     //----require必填字段
           type:Object,
           default(){
             return {}
           }
         },
         labelTitle:{    //-----lebel提示
           type:String,
           default:""
         }
        },
      methods:{
        handleSelect(item){
           this.dynamicValidateForm.member = item.uName;
           //传值 item.uName
           this.$emit("sendList",item);
        },
        loadAll(){
         let params = {"keywords": "a","index":1,pageSize:20};
          searchUsers(params).then(res => {
            if (res.msg === "success") {
                this.resData = res.result.info
            }
          })
        },
       querySearchAsync(queryString, cb) {
        if(queryString.trim() === ""||queryString.length<=0){
          // cb(this.resData);
          cb([])
          return;
        }
        this.resData=[];
        if(queryString !== ""){
          let params = {"keywords": queryString,"index":1,pageSize:20};
          searchUsers(params).then(res => {
            if (res.msg === "success") {
                 cb(res.result.info);
            }
          })
        }
       }
      },
       mounted(){
      // this.loadAll()
      }
    }
</script>
