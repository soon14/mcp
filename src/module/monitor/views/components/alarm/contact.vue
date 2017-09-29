<template>
  <div>

  <Paper style="min-width:450px">
    <div class="page-title"><span style="color: #21B8D5">报警联系人管理</span></div>
    <div class="action">
     <el-row>
          <a style="color: #20a0ff" >
            <el-button class="button is-info pull-left" @click="create_contact_group=true;create_contact_group_confirm_bottom_disabled=false;">
              新建联系组</el-button></a>
      </el-row>
    </div>
    <el-row :gutter="20" style="margin-top: 20px">
      <el-col :span="24">
        <div  style="height:43px;line-height:43px;padding-left:15px;background-color:#fff;font-size:15px;border:1px solid rgb(223, 233, 236);border-radius:0;margin-bottom:-1px;color:rgb(31, 53, 61)">
              群组名称
             <span style="position:relative;top:2px;right:10px;" class="pull-right">
               群组操作
              </span>
         </div>
        <div  v-for="(alarm,index) in alarm_group">
            <div class="el-alarm-item" @click.stop="show_hide(index)" :class="{'is-active':table_show[index].show}" :style="index===0 ? 'border-top:1px solid rgb(223, 233, 236);' : ''">
              <i class="el-alarm-item__header__arrow el-icon-arrow-right"></i>
              {{alarm.name}}
             <el-button-group style="position:relative;top:5px;right:10px;" class="pull-right">
              <el-button type="text" @click.stop="edit_group(index)"> 修改</el-button>
              <el-button type="text" @click.stop="del_group(index)" style="margin-left: 10px;">删除</el-button>
              </el-button-group>
            </div>
            <div style="border-left:1px solid rgb(223, 233, 236);border-radius:0;border-right:1px solid rgb(223, 233, 236);border-radius:0;"></div>
                  <el-table v-show="table_show[index].show" :data="table_data[index]" style="margin-bottom:-1px" v-loading element-loading-text="拼命加载中">
                    <el-table-column prop="name" label="联系人"  show-overflow-tooltip></el-table-column>
                    <el-table-column prop="mail" label="邮箱通知"  show-overflow-tooltip></el-table-column>
                    <el-table-column prop="tel" label="手机通知"  show-overflow-tooltip></el-table-column>
                    <el-table-column prop="mx" label="美信通知"  show-overflow-tooltip></el-table-column>
                    <el-table-column prop="mip" label="MIP通知"  show-overflow-tooltip></el-table-column>
                    <el-table-column prop="description" label="组织架构"  show-overflow-tooltip></el-table-column>
                    <el-table-column label="操作"  show-overflow-tooltip>
                      <template scope="scope">
                        <el-button @click="del_contact(scope.$index,table_data[index],index)" type="text" size="small">刪除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
        </div>
      </el-col>
    </el-row>

    <el-dialog title="新建联系组" v-model="create_contact_group" size="small" :before-close="create_contact_group_close" :close-on-click-modal="false" style="min-width:600px">
      <el-form :model="form" ref="form" label-width="50px" label="组名">
        <el-form-item label="组名:" style="margin-top: 30px;font-size:14px;color:#999999">
          <el-tooltip effect="dark" content="1-20位中英文,数字,下划线,@或'.'或'-''" placement="top">
            <el-input v-model="form.name"></el-input>
          </el-tooltip>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
      <el-button @click="create_contact_group_cancel">取消</el-button>
      <el-button type="primary" @click="create_contact_group_confirm" :disabled="create_contact_group_confirm_bottom_disabled">创建组</el-button>
    </span>
    </el-dialog>

    <el-dialog title="为组添加联系人" v-model="addcontact" size="small" :before-close="addcontact_close" :close-on-click-modal="false" custom-class="dialog_box">
      <selector v-model="selectedInUsers" ref="select" v-if="addcontact"></selector>
      <span slot="footer" class="dialog-footer">
			    <el-button @click="addcontact_cancel">取消</el-button>
			    <el-button type="primary"  @click="addcontact_confirm">添加联系人</el-button>
		  		</span>
    </el-dialog>

    <el-dialog title="修改联系组" v-model="editGroup" size="small" :before-close="edit_contact_group_close" :close-on-click-modal="false" custom-class="dialog_box">
      <el-tooltip effect="dark" content="1-20位中英文,数字,下划线,'@'或'.'或'-'" placement="top">
         <el-input v-model="form.name" size="small"  placeholder="输入修改后的组名称 不填默认为原来的名字" style="margin:10px 0"></el-input>
       </el-tooltip>
      <selector v-model="selectedInUsers" ref="select"  v-if="editGroup"></selector>
      <span slot="footer" class="dialog-footer">
			    <el-button @click="edit_contact_group_cancel">取消</el-button>
			    <el-button type="primary"  @click="edit_contact_group">确定</el-button>
		  		</span>
    </el-dialog>

  </Paper>
  </div>
</template>

<script>
  import { getContact, getUserInfo, searchUser, getAllGroups, createGroups, delGroups, changeGroups, addGroupMember, getGroupMember, delGroupMember } from '../../../api/service';
  import selector from 'components/utils/org_selector/Selector.vue';
  import Paper from 'components/awesome/paper/Paper.vue'
  export default {
    components:{
       selector,
        Paper
    },
    data() {
      return {
        count: false,
        selectedInUsers: [], //选择的内部员工
        alarm_group: [],
        indexx: 0,
        create_contact_group: false,
        create_contact_group_confirm_bottom_disabled:false,
        addcontact: false,
        table_show: [],
        table_data: [],
        editGroup: false,
        form: {
          name: '',
          desc: ''
        },
        personName: []
      }
    },
    created() {
      this.get_allgroup();
    },
    methods: {
      get_allgroup() {
        getAllGroups().then(res => {
//       console.log(res);
//        console.log('suc获取所有分组');
          this.alarm_group = res.data;
          this.alarm_group.forEach((item, index) => {
            this.$set(this.table_show,index,{show:false})
          });
          this.form.name = '';
          this.form.desc = '';
        }).catch(res => {
          // console.log('err获取所有分组')
           this.$notify({
            type: 'error',
            message: '获取数据异常获取联系组失败！'
          });
          });
      },
      create_contact_group_confirm() {
        if(!this.form.name.replace(/(^\s*)|(\s*$)/g, "")) {
          this.$message({
            type: 'warning',
            message: '组名不能为空！'
          });
          return false;
        }
        if(!this.form.name.replace(/(^\s*)|(\s*$)/g, "").match(/^[\w\u4E00-\u9FA5|@|.|-]{1,20}$/)) {
          this.$message({
            type: 'warning',
            message: '组名称由1-20位中英文、数字、下划线、"@"或"."或"-"组成！'
          });
          return false;
        }
        for(let i=0,ii=this.alarm_group.length;i<ii;i++){
          if(this.form.name.replace(/(^\s*)|(\s*$)/g, "") === this.alarm_group[i].name) {
            this.$message({
              type: 'warning',
              message: '你创建的组名称已存在请检查后再输入！'
            });
            return false;
          }
        }
        if(this.form.desc) {
          if(!this.form.desc.replace(/(^\s*)|(\s*$)/g, "").match(/^[\w\u4E00-\u9FA5|@|.|-]{1,50}$/)){
            this.$message({
              type: 'info',
              message: '备注由1-50位中英文、数字、下划线、"@"或"."或"-"组成！可不填！'
            });
            return false;
          }
        }
        this.create_contact_group_confirm_bottom_disabled = true;
        let params = {
          "name": this.form.name.replace(/(^\s*)|(\s*$)/g, ""),
          "description": "This is a test group //描述，选填"
        };
        createGroups(params).then(res => {
          /* console.log(res);
           console.log('suc创建分组');*/
          this.create_contact_group = false;
           this.$notify({
            type: 'success',
            message: '成功创建联系组！'
          });
          this.get_allgroup();
          this.addcontact = true;
        }).catch(res => {
          this.create_contact_group = false;
//          console.log('err创建分组');
          this.create_contact_group = false;
          this.$notify({
            type: 'error',
            message: '获取数据异常创建失败！'
          });

        });
      },
      create_contact_group_cancel() {
        this.form.name = '';
        this.form.desc = '';
        this.create_contact_group = false;
      },
      create_contact_group_close(done) {
        this.form.name = '';
        this.form.desc = '';
        done();
      },
      addcontact_confirm() {
        if(this.selectedInUsers.length === 0) {
          this.$confirm('你还没有添加联系人, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.addcontact = false;
          }).catch(() => {});
          return false;
        }
        let new_personName = [];
        let userID = [];
        this.selectedInUsers.forEach((item, index) => {
          userID.push(item.mid);
        })
        let params = userID.join(',');
//        console.log(params);
        getUserInfo(params).then(res => {
          console.log(res);
           console.log('suc获取用户信息');
          new_personName = res.data;
          let param = [];
          for(let i = 0; i < new_personName.length; i++) {
            param.push({
              "name": new_personName[i].uName,
              "uid": new_personName[i].uid,
              "endpoints": [{
                "protocol": "email",
                "endpoint": new_personName[i].mail ? new_personName[i].mail : '-'
              },
                {
                  "protocol": 'sms',
                  "endpoint": new_personName[i].mobile ? new_personName[i].mobile : '-',
                }
              ],
              "description": new_personName[i].deptName
            })
          }
          let params2 = {
            group_id: this.alarm_group[0].group_id,
            param: param
          };
          addGroupMember(params2).then(res => {
            /* console.log(res);
             console.log('suc添加联系人');*/
            this.selectedInUsers.splice(0);
            this.addcontact = false;
            this.$notify({
              type: 'success',
              message: '成功添加！'
            });
          }).catch(res => {
//            console.log('err添加联系人');
            this.selectedInUsers.splice(0);
            this.addcontact = false;
            this.$notify({
              type: 'error',
              message: '数据获取异常添加失败！'
            });
          });
        }).catch(res => {
         console.log('err获取用户信息');
          this.selectedInUsers.splice(0);
          this.addcontact = false;
          this.$message({
            type: 'info',
            message: '数据获取异常添加失败！'
          })
        });
      },
      addcontact_cancel() {
        this.selectedInUsers.splice(0);
        this.addcontact = false;
      },
      addcontact_close(done) {
        this.selectedInUsers.splice(0);
        done();
      },
      show_hide(index) {
        if(this.table_show[index].show === false) {
          let params = {
            group_id: this.alarm_group[index].group_id
          };
          getGroupMember(params).then(res => {
            /*console.log(res);
             console.log('suc获取组成员');*/
            let table = [];
            res.forEach((item, index) => {
              table.push({
                name: item.name,
                mail: item.endpoints[0].endpoint,
                tel: item.endpoints[1].endpoint,
                mx: '-',
                mip: '-',
                description: item.description,
                uid: item.uid,
              })
            })
            this.table_data[index] = table;
            this.table_show[index].show = !this.table_show[index].show;
          }).catch(res => {
//            console.log('err获取组成员');
            this.$message({
              type: 'info',
              message: '数据获取异常操作失败！'
            });
          });
        } else {
          this.table_show[index].show = !this.table_show[index].show;
        }
      },
      edit_group(index) {
        this.editGroup = true;
        this.indexx = index;
      },
      edit_contact_group() {
        if(this.form.name.replace(/(^\s*)|(\s*$)/g, "")){
          if(!this.form.name.replace(/(^\s*)|(\s*$)/g, "").match(/^[\w\u4E00-\u9FA5|@|.|-]{1,20}$/)) {
            this.$message({
              type: 'warning',
              message: '组名称由1-20位中英文、数字、下划线、"@"或"."或"-"组成！'
            });
            return false;
          }
          for(let i=0,ii=this.alarm_group.length;i<ii;i++){
            if(this.form.name.replace(/(^\s*)|(\s*$)/g, "") === this.alarm_group[i].name) {
              this.$message({
                type: 'warning',
                message: '你修改的组名称已存在请检查后再输入！'
              });
              return false;
            }
          }
        }

        let params = {
          group_id: this.alarm_group[this.indexx].group_id,
          param: {
            "name": this.form.name.replace(/(^\s*)|(\s*$)/g, "") ? this.form.name.replace(/(^\s*)|(\s*$)/g, "") : this.alarm_group[this.indexx].name,
            "description": "This is a test group //描述，选填"
          }
        };
        if(this.form.name.replace(/(^\s*)|(\s*$)/g, "")){
          changeGroups(params).then(res => {
            /*console.log(res);
             console.log('suc修改分组');*/
            this.get_allgroup();
            this.$message({
              type: 'info',
              message: '成功修改分组名称！'
            });
          }).catch(res => {
            //          console.log('err修改分组');
            this.$message({
              type: 'info',
              message: '数据获取异常修改分组名称失败！'
            });
          });
        }

        let params1 = {
          group_id: this.alarm_group[this.indexx].group_id
        };
        getGroupMember(params1).then(res => {
          /*console.log(res);
           console.log('suc获取组成员');*/
          let addData = [];
          res.forEach((item, index) => {
            addData.push(item.uid)
          });
          let new_personName = [];
          let userID = [];
          this.selectedInUsers.forEach((item, index) => {
            userID.push(item.mid);
          })
          let addID = userID.filter(function(item) {
            return addData.indexOf(item) === -1;
          })
          if(addID.length > 0) {
            let params = addID.join(',');
//            console.log(params);
            getUserInfo(params).then(res => {
//            console.log(res);
//            console.log('suc获取用户信息');
              new_personName = res.data;
              let param = [];
              for(let i = 0; i < new_personName.length; i++) {
                param.push({
                  "name": new_personName[i].uName,
                  "uid": new_personName[i].uid,
                  "endpoints": [{
                    "protocol": "email",
                    "endpoint": new_personName[i].mail ? new_personName[i].mail : '-'
                  },
                    {
                      "protocol": "sms",
                      "endpoint": new_personName[i].mobile ? new_personName[i].mobile : '-'
                    }
                  ],
                  "description": new_personName[i].deptName
                })
              }
//              console.log(param);
              let params2 = {
                group_id: this.alarm_group[this.indexx].group_id,
                param: param
              };
              addGroupMember(params2).then(res => {
//              console.log(res);
//              console.log('suc添加联系人');
                this.form.name = '';
                this.selectedInUsers.splice(0);
                if(this.table_show[this.indexx].show === true) {
                  for(let i = 0; i < 2; i++) {
                    this.show_hide(this.indexx);
                  }
                };
                this.$message({
                  type: 'info',
                  message: '成功添加联系人！'
                });
              }).catch(res => {
//              console.log('err添加联系人');
                this.form.name = '';
                this.selectedInUsers.splice(0);
                this.$notify({
                  type: 'error',
                  message: '数据获取异常添加联系人失败！'
                });
              });
            }).catch(res => {
//            console.log('err获取用户信息');
              this.form.name = '';
              this.selectedInUsers.splice(0);
              this.$notify({
                type: 'error',
                message: '获取数据异常添加联系人失败！'
              })
            });
          }else{
            this.form.name = '';
            this.selectedInUsers.splice(0);
          }
        }).catch(res => {
//        console.log('err获取组成员');
          this.form.name = '';
          this.selectedInUsers.splice(0);
          this.$notify({
            type: 'error',
            message: '数据获取异常添加加联系人失败！'
          });
        });
        this.editGroup = false;
      },
      edit_contact_group_cancel() {
        this.form.name = '';
        this.selectedInUsers.splice(0);
        this.editGroup = false;
      },
      edit_contact_group_close(done) {
        this.form.name = '';
        this.selectedInUsers.splice(0);
        done();
      },
      del_group(index) {
        this.$confirm('是否删除该联系组？', '删除联系组', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal:false,
          type: 'warning'
        }).then(() => {
          let params = this.alarm_group[index].group_id;
          delGroups(params).then(res => {
            /*console.log(res);
             console.log('suc删除联系组');*/
            this.get_allgroup();
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(res => {
//            console.log('err删除联系组');
            this.$message({
              type: 'success',
              message: '数据获取异常删除失败!'
            });
          });
        }).catch(() => {});
      },
      del_contact(index, rows, index2) {
        this.$confirm('是否删除该联系人?', '删除联系人', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          //删除功能
          let params = {
            group_id: this.alarm_group[index2].group_id
          };
          getGroupMember(params).then(res => {
            /*console.log(res);
             console.log('suc获取组成员');*/
            let params2 = {
              group_id: this.alarm_group[index2].group_id,
              endpoint_id: res[index].channel_id
            };
            delGroupMember(params2).then(res => {
              /*console.log(res);
               console.log('suc删除联系人');*/
              rows.splice(index, 1);
              this.$message({
                type: 'success',
                message: '删除成功!'
              });
            }).catch(res => {
//            console.log('err删除联系人');
              this.$message({
                type: 'info',
                message: '数据获取异常删除失败!'
              });
            });
          }).catch(res => {
//          console.log('err获取组成员');
            this.$message({
              type: 'info',
              message: '数据获取异常删除失败!'
            });
          });
        }).catch(() => {});
      }
    }
  }
</script>
<style lang="less">
  .dialog_box{
    min-width: 530px !important;
  }
  .cell {
    text-align: center !important;
  }
  .is-active .el-alarm-item__header__arrow{
    -ms-transform:rotate(90deg);transform:rotate(90deg)
    }
  .el-alarm-item__header__arrow{margin-right:8px;transition:transform .3s}
  .el-alarm-item{height:43px;line-height:43px;padding-left:15px;background-color:#fff;color:rgb(72, 96, 106);cursor:pointer;font-size:13px;border:1px solid rgb(223, 233, 236);border-radius:0;border-top: none;}
  .space-page{
    padding:20px ;
  }
  .page-title{
    margin-bottom: 20px;
    border-bottom: 1px solid #C1C1C1;
    padding-top: 8px;
    padding-bottom: 20px;
    span{
      padding-left: 8px;
      font-size: 16px;
      border-left: 2px solid #21B8D5;
    }
  }
  .pull-right{
    float: right;
  }
</style>
