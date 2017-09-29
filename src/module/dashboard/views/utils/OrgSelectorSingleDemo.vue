/**
* Created by CHENRC2 on 2017-8-4.
*/
<template>
    <section class="org_selector">
          <el-button class="alert-btn" type="primary" @click="dialogVisible = true">打开"单人筛选"案例</el-button>
         <el-dialog  title="人员筛选" :visible.sync="dialogVisible"
          size="small">
          <OrgSelectorSingle :memberList="memberList" @sendList="getMemberList" :requireSel="requireSel"></OrgSelectorSingle>
         </el-dialog>
    </section>
</template>
<style lang="less">
/*
*人员筛选框
*/
.org_selector{
  .el-dialog--small{
    min-height:280px;
    // min-width:750px;
   }
}
</style>

<script>
    import OrgSelectorSingle from '../../../../components/utils/org_selector/OrgSelectorSingle.vue'
    export default{
        name:"OrgSelectorSingleDemo",
        data() {
            return {
                dialogVisible:false,
                memberList:"",
                requireSel:{ required: true, message: '人员框不能为空', trigger: 'blur' },
            }
        },
        created(){
        },
        methods:{
         getMemberList(val){
            //  console.log(val);
          //  console.log(val);
          },
        },
        components:{
         OrgSelectorSingle
        }
    }
</script>
