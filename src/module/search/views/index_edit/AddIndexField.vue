<template>
  <section class="container single_box">
    <!-- 新增项目 -->
      <el-dialog :visible.sync="isShow" :show-close="showClose"  size="small" top="30%" :close-on-click-modal="false">
      <div slot="title" class="tl">
        <h3 >新增索引字段</h3>
        <span class="mf mf-close" @click="backAndClearData"></span>
      </div>
      <el-form :model="ruleForm" :rules="addRules" ref="ruleForm" label-width="90px" label-position="left">
        <el-form-item prop="field_name" label="字段名称">
          <el-input v-model="ruleForm.field_name" auto-complete="off" :maxlength="128" placeholder="请输入字段名称，长度不超过128个字符"></el-input>
        </el-form-item>
				<el-form-item prop="field_type" label="字段类型">
          <el-select @change="selectChange" v-model="ruleForm.field_type" placeholder="请选择字段类型">
						<el-option value="index" v-for="(item,index) in types" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
        </el-form-item>
        <el-form-item prop="format" label="字段格式">
          <el-input v-model="ruleForm.format" auto-complete="off" :maxlength="100" :disabled="ruleForm.field_type==='string'"></el-input>
        </el-form-item>
				<el-form-item prop="analyzer" label="是否分词">
          <el-select v-model="ruleForm.analyzer" placeholder="是否分词" :disabled="ruleForm.field_type ==='date'">
						<el-option v-for="item in participle" :key="item.value" :label="item.label" :value="item.value"></el-option>
					</el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="backAndClearData">取 消</el-button>
        <el-button type="primary" @click="submitForm()">确 定</el-button>
      </div>
    </el-dialog>
  </section>
</template>
<style lang="less" >
.container{
    width: 100%;
    height: 100%;
    margin: 0 auto;
  }
.single_box{
  .el-dialog--small{
    // min-width:524px;
    width:524px;
  }
}
.single{
  margin-bottom:20px;
}
.singleStyle{
  margin-bottom:20px;
  .el-form-item__content{
    margin-left: 100px !important;
  }
}
.tl{
  height: 40px;
  position: relative;
  h3{
    display: inline-block;
    margin: 0;
    width: 94%;
  }
  span{
    font-size: 18px;
    display: inline-block;
    position: absolute;
    right: 0;
    top: 10px;
    font-size: 20px;
  }
}
.el-form-item{
  position: relative;
  margin-bottom: 20px;
  .el-form-item__label{
    padding-right: 0 !important;
  }
}
.el-form-item:last-child{
  margin-bottom: 0;
}
.el-dialog__footer{
  padding-top: 0 !important;
  .dialog-footer{
    padding-bottom: 5px;
    .el-button{
      width: 100px;
    }
  }
}
</style>
<script>
    import utils from '../../common/js/utils.js';
    export default{
      data() {
        return {
					showClose:false,
					ruleForm: {
            field_name: '',
            field_type: '',
            format: '',
            analyzer: '',
            create_time: ''
					},
          types:[{
            value: 'date',
            label: 'date'
          }, {
            value: 'string',
            label: 'string'
          }],
          participle:[{
            value: 'true',
            label: '是'
          },{
            value: 'false',
            label: '否'
          }],
					addRules: {
            field_name: [
							{ required: true, message: '请填写字段名称', trigger: 'blur' },
              { required: true, validator:(rule,value,callback)=>{
                if(/^\w+$/.test(value) == false){
                    callback(new Error("只能输入英文、数字、下划线 (不超过128个字符)"));
                }else{
                    callback();
                }
            }, trigger: 'blur' }
						],
            field_type: [
							{ required: true, message: '请选择字段类型', trigger: 'change' }
						]
          },
        }
      },
      methods:{
        // 提交表单的函数
        submitForm() {
         this.$refs["ruleForm"].validate((valid) => {
           if (valid) {
             // 传出去之前需要先拿表格里面的数据进行比对
             for(var i = 0; i < this.tableData.length; i++) {
               if (this.tableData[i].field_name === this.ruleForm.field_name) {
                 this.$notify({
                   type: 'warning',
                   message:'字段名称已经存在'
                 });
                 return false;
               }
             }
             // 时间格式化之后传出去-------------------------坑-----------------
             this.ruleForm.create_time = utils.formatDate(new Date().getTime());
             this.$emit('get-form-data', this.ruleForm); // 把表单数据传出去
             this.ruleForm = {field_name: '',field_type: '',format: '',analyzer: ''};  // 初始化表单
             this.$emit('close-state', false);   // 把关闭窗口的特征值传出去
           } else {
             this.$notify({
                type: 'warning',
                message:'请填写必要选项'
              });
             return false;
           }
         });
        },
        // 下拉菜单的值的回掉函数
        selectChange(val) {
          if (val == 'date') {
            this.ruleForm.format = 'yyyy-MM-dd HH:mm:ss / epoch_millis';
            this.ruleForm.analyzer = '';
          } else {
              this.ruleForm.format = '';
              this.ruleForm.analyzer = 'true';
          }
        },
        refreshFormStatus() {
          this.$refs["ruleForm"].resetFields();
        },
        // XX和取消按钮的逻辑
        backAndClearData() {
          this.$refs["ruleForm"].resetFields();
          this.$emit('close-state', false);
        }
      },
      props: {
        isShow: {
          type: Boolean
        },
        tableData: {
          type: Array,
          default() {
            return [];
          }
        }
      }
    }
</script>
