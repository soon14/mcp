/**
* Created by CHENRC2 on 2017-8-4.
*/
<template>
    <section class="org_selector">
     <el-button class="alert-btn" type="primary" @click="dialogVisible = true">打开"人员筛选"案例</el-button>
         <el-dialog  title="人员筛选" :visible.sync="dialogVisible"
          size="small">
          <OrgSelectorLite  v-model="seldata" :single="single"></OrgSelectorLite>
         </el-dialog>
    </section>
</template>
<style lang="less">
/*
*人员筛选框
*/
.org_selector{
    position:absolute;
  .el-dialog--small{
    min-height:280px;
    // min-width:750px;
    width:524px;
   }
}
</style>

<script>
    import OrgSelectorLite from '../../../../components/utils/org_selector/OrgSelectorLite.vue'
    export default{
        name:"OrgSelectorLiteDemo",
        data() {
            return {
                dialogVisible:false,
                seldata:[],
                single:true
            }
        },
        created(){
        },
        methods:{

        },
        components:{
         OrgSelectorLite   
        }
    }
</script>
