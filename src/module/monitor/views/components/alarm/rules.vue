<template>
   <div>

    <Paper  style="min-width:510px">
      <div class="page-title"><span style="color: #21b8d5">报警规则列表</span></div>
        <el-row>
          <a style="color: #20a0ff" >
            <el-button class="button is-info pull-left" @click="create_rule">
              创建报警规则</el-button></a>
          <el-col style="float:right;width:20%;min-width:160px">
            <user-search @search-enter="search" :placeword="placeword_search" v-model="placeholder"></user-search>
          </el-col>
       </el-row>

      <el-dialog title="创建报警规则" v-model="create_show" size="small" :before-close="create_rule_close" :close-on-click-modal="false">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left">
          <h4 class="titleSmall"><i class="mf mf-star"></i>  关联资源 </h4>
          <hr class="hr"/>
          <el-form-item label="产    品" prop="product">
            <el-select v-model="ruleForm.product" placeholder="请选产品" size="small" class="table-with">
              <el-option label="云服务器ECS" value="product"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="资源范围" prop="resource" >
            <el-select v-model="ruleForm.resource" placeholder="请选实例名称" size="small" class="table-with">
              <el-option label="实例" value="resource1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主 机 名" prop="example">
            <el-select v-model="ruleForm.example" placeholder="请选资源" size="small" @change="hostID_change" class="table-with">
              <el-option  :label='item.label' :value='item.label' v-for="item in example_options"></el-option>
            </el-select>
          </el-form-item>
          <h4 class="titleSmall"><i class="mf mf-star" ></i>  设置报警规则 </h4>
          <hr class="hr"/>
          <el-form-item label="规则名称" prop="name">
            <el-input v-model="ruleForm.name" size="small" :maxlength="20" placeholder="请输入1~20位规则名称" class="table-with"></el-input>
          </el-form-item>
          <el-form-item label="规则类型" prop="ruleType">
            <el-select v-model="ruleForm.ruleType" placeholder="请选类型" size="small" class="table-with">
              <el-option :label="item" :value="item" v-for="item in rule_options"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择网卡" v-if="ruleForm.ruleType==='网络流量速率'||ruleForm.ruleType==='网络数据包速率'" prop="network">
            <el-select v-model="ruleForm.network" placeholder="请选类型" size="small" class="table-with">
              <el-option :label="item" :value="item" v-for="item in nicList"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择磁盘" v-if="ruleForm.ruleType==='磁盘速率'||ruleForm.ruleType==='磁盘OPS'" prop="disk">
            <el-select v-model="ruleForm.disk" placeholder="请选类型" size="small" class="table-with">
              <el-option :label="item" :value="item" v-for="item in diskList"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上 下 行" v-if="ruleForm.ruleType==='网络流量速率'||ruleForm.ruleType==='网络数据包速率'" prop="value2">
            <el-select v-model="ruleForm.value2" placeholder="请选类型" size="small">
              <el-option label="上行" value="上行"></el-option>
              <el-option label="下行" value="下行"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="读    写" v-if="ruleForm.ruleType==='磁盘速率'||ruleForm.ruleType==='磁盘OPS'" prop="value3">
            <el-select v-model="ruleForm.value3" placeholder="请选类型" size="small" class="table-with">
              <el-option label="读" value="读"></el-option>
              <el-option label="写" value="写"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="阈    值" required>
            <el-col :span="5">
              <el-select v-model="ruleForm.time_item" filterable placeholder="请选择" size="small" prop="time_item">
                <el-option
                  v-for="item in time"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="1"> &nbsp; </el-col>
            <el-col :span="5">
              <el-select v-model="ruleForm.moreThan_item" filterable placeholder="" size="small" prop="moreThan_item">
                <el-option
                  v-for="item in moreThan"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="1"> &nbsp; </el-col>
            <el-tooltip content="取值：0-100" placement="top" v-if="ruleForm.ruleType==='cpu平均使用率'||ruleForm.ruleType==='cpu瞬时使用率'||ruleForm.ruleType==='内存平均使用率'">
              <el-col :span="5" style="margin-right: 2px;">
                <el-form-item prop="percentnum" style="margin:0;">
                  <el-input v-model="ruleForm.percentnum" placeholder="" size="small"></el-input>
                </el-form-item>
              </el-col>
            </el-tooltip>
            <el-tooltip content="取值：大于0" placement="top" v-if="ruleForm.ruleType==='网络流量速率'||ruleForm.ruleType==='网络数据包速率'||ruleForm.ruleType==='磁盘速率'||ruleForm.ruleType==='磁盘OPS'">
              <el-col :span="5" style="margin-right: 2px;">
                <el-form-item prop="percentnum" style="margin:0;">
                  <el-input v-model="ruleForm.percentnum" placeholder="" size="small"></el-input>
                </el-form-item>
              </el-col>
            </el-tooltip>
            <el-col class="line" :span="5" v-if="ruleForm.ruleType==='cpu平均使用率'||ruleForm.ruleType==='cpu瞬时使用率'||ruleForm.ruleType==='内存平均使用率'"> % </el-col>
            <el-col class="line" :span="5" v-if="ruleForm.ruleType==='网络流量速率'"> KB/S</el-col>
            <el-col class="line" :span="5" v-if="ruleForm.ruleType==='网络数据包速率'"> PPS</el-col>
            <el-col class="line" :span="5" v-if="ruleForm.ruleType==='磁盘速率'"> MB/S</el-col>
            <el-col class="line" :span="5" v-if="ruleForm.ruleType==='磁盘OPS'"> OPS</el-col>
          </el-form-item>
          <el-form-item label="连续几次超过阈值报警：" prop="numb" v-if="this.ruleForm.ruleType ==='cpu瞬时使用率'">
            <el-input-number v-model="ruleForm.numb" size="small" :min="1"></el-input-number>
          </el-form-item>
          <h4 class="titleSmall"><i class="mf mf-star"></i>  通知方式</h4><hr class="hr"/>
          <el-form-item label="通知对象" prop="contact_select">
              <Through :settings="title" :orderData="contact" ref="select" v-model="ruleForm.contact_select" @input="contact_select_val" v-if="create_show"></Through>
         </el-form-item>
          <el-form-item label="通知方式" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="邮件" name="type"></el-checkbox>
              <el-checkbox label="手机" name="type" disabled></el-checkbox>
              <el-checkbox label="美信" name="type" disabled></el-checkbox>
              <el-checkbox label="MIP待办" name="type" disabled></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div class="footer">
          <el-button @click="create_cancel" style="width: 100px;margin-right: 10px">取消 </el-button>
          <a style="color: #fff"><el-button type="primary" @click="create_confirm" :disabled="create_rules_disabled" style="width: 100px">确认</el-button></a>
        </div>
      </el-dialog>



      <el-dialog title="修改报警规则" v-model="change_show" size="small" :before-close="change_rule_close" :close-on-click-modal="false">
        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="left">
          <h4 class="titleSmall"><i class="mf mf-star"></i>  关联资源 </h4>
          <hr class="hr"/>
          <el-form-item label="产    品" prop="product">
            <el-select v-model="ruleForm.product" placeholder="请选产品" size="small" class="table-with">
              <el-option label="云服务器ECS" value="product"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="资源范围" prop="resource" >
            <el-select v-model="ruleForm.resource" placeholder="请选实例名称" size="small" class="table-with">
              <el-option label="实例" value="resource1"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="主 机 名" prop="example">
            <el-select v-model="ruleForm.example" placeholder="请选资源" size="small" @change="hostID_change" class="table-with">
              <el-option  :label='item.label' :value='item.label' v-for="item in example_options"></el-option>
            </el-select>
          </el-form-item>
          <h4 class="titleSmall"><i class="mf mf-star" ></i>  设置报警规则 </h4>
          <hr class="hr"/>
          <el-form-item label="规则名称" prop="name">
            <el-input v-model="ruleForm.name" size="small" :maxlength="20" placeholder="请输入1~20位规则名称" class="table-with"></el-input>
          </el-form-item>
          <el-form-item label="规则类型" prop="ruleType">
            <el-select v-model="ruleForm.ruleType" placeholder="请选类型" size="small" class="table-with">
              <el-option :label="item" :value="item" v-for="item in rule_options"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择网卡" v-if="ruleForm.ruleType==='网络流量速率'||ruleForm.ruleType==='网络数据包速率'" prop="network">
            <el-select v-model="ruleForm.network" placeholder="请选类型" size="small" class="table-with">
              <el-option :label="item" :value="item" v-for="item in nicList"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="选择磁盘" v-if="ruleForm.ruleType==='磁盘速率'||ruleForm.ruleType==='磁盘OPS'" prop="disk">
            <el-select v-model="ruleForm.disk" placeholder="请选类型" size="small" class="table-with">
              <el-option :label="item" :value="item" v-for="item in diskList"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="上 下 行" v-if="ruleForm.ruleType==='网络流量速率'||ruleForm.ruleType==='网络数据包速率'" prop="value2">
            <el-select v-model="ruleForm.value2" placeholder="请选类型" size="small">
              <el-option label="上行" value="上行"></el-option>
              <el-option label="下行" value="下行"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="读    写" v-if="ruleForm.ruleType==='磁盘速率'||ruleForm.ruleType==='磁盘OPS'" prop="value3">
            <el-select v-model="ruleForm.value3" placeholder="请选类型" size="small" class="table-with">
              <el-option label="读" value="读"></el-option>
              <el-option label="写" value="写"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="阈    值" required>
            <el-col :span="5">
              <el-select v-model="ruleForm.time_item" filterable placeholder="请选择" size="small" prop="time_item">
                <el-option
                  v-for="item in time"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="1"> &nbsp; </el-col>
            <el-col :span="5">
              <el-select v-model="ruleForm.moreThan_item" filterable placeholder="" size="small" prop="moreThan_item">
                <el-option
                  v-for="item in moreThan"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value">
                </el-option>
              </el-select>
            </el-col>
            <el-col :span="1"> &nbsp; </el-col>
            <el-tooltip content="取值：0-100" placement="top" v-if="ruleForm.ruleType==='cpu平均使用率'||ruleForm.ruleType==='cpu瞬时使用率'||ruleForm.ruleType==='内存平均使用率'">
              <el-col :span="5" style="margin-right: 2px;">
                <el-form-item prop="percentnum" style="margin:0;">
                  <el-input v-model="ruleForm.percentnum" placeholder="" size="small"></el-input>
                </el-form-item>
              </el-col>
            </el-tooltip>
            <el-tooltip content="取值：大于0" placement="top" v-if="ruleForm.ruleType==='网络流量速率'||ruleForm.ruleType==='网络数据包速率'||ruleForm.ruleType==='磁盘速率'||ruleForm.ruleType==='磁盘OPS'">
              <el-col :span="5" style="margin-right: 2px;">
                <el-form-item prop="percentnum" style="margin:0;">
                  <el-input v-model="ruleForm.percentnum" placeholder="" size="small"></el-input>
                </el-form-item>
              </el-col>
            </el-tooltip>
            <el-col class="line" :span="5" v-if="ruleForm.ruleType==='cpu平均使用率'||ruleForm.ruleType==='cpu瞬时使用率'||ruleForm.ruleType==='内存平均使用率'"> % </el-col>
            <el-col class="line" :span="5" v-if="ruleForm.ruleType==='网络流量速率'"> KB/S</el-col>
            <el-col class="line" :span="5" v-if="ruleForm.ruleType==='网络数据包速率'"> PPS</el-col>
            <el-col class="line" :span="5" v-if="ruleForm.ruleType==='磁盘速率'"> MB/S</el-col>
            <el-col class="line" :span="5" v-if="ruleForm.ruleType==='磁盘OPS'"> OPS</el-col>
          </el-form-item>
          <el-form-item label="连续几次超过阈值报警：" prop="numb" v-if="this.ruleForm.ruleType ==='cpu瞬时使用率'">
            <el-input-number v-model="ruleForm.numb" size="small" :min="1"></el-input-number>
          </el-form-item>
          <h4 class="titleSmall"><i class="mf mf-star"></i>  通知方式</h4><hr class="hr"/>
          <el-form-item label="通知对象" prop="contact_select">
             <Through :settings="title" :orderData="contact" ref="select" v-model="ruleForm.contact_select"  @input="contact_select_val" v-if="change_show"></Through>
          </el-form-item>
          <el-form-item label="通知方式" prop="type">
            <el-checkbox-group v-model="ruleForm.type">
              <el-checkbox label="邮件" name="type"></el-checkbox>
              <el-checkbox label="手机" name="type" disabled></el-checkbox>
              <el-checkbox label="美信" name="type" disabled></el-checkbox>
              <el-checkbox label="MIP待办" name="type" disabled></el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
        <div class="footer">
           <el-button @click="change_cancel" style="width: 100px;margin-right: 10px">取消 </el-button>
          <a style="color: #fff"><el-button type="primary" @click="change_confirm" :disabled="change_rules_disabled" style="width: 100px">确认</el-button></a>
        </div>
      </el-dialog>


      <div style="margin-top: 20px">
        <el-table :data="table_data" v-loading element-loading-text="拼命加载中">
          <el-table-column prop="name" label="规则名称" show-overflow-tooltip>
            <template scope="scope">
		         	<span style="color:#20b8d5;cursor:pointer;" @click="check=true,indexed=scope.$index"> {{scope.row.name}}</span>
            </template>
          </el-table-column>
          <el-table-column prop="state" label="启用状态" show-overflow-tooltip>
            <template scope="scope">
		         	<span :style="scope.row.state==='已禁用'?{'color':'red'}:{'color':'green'}">
		         		{{scope.row.state==='已禁用'?'已禁用':'已启用'}}
		         	</span>
            </template>
          </el-table-column>
          <el-table-column prop="monitor" label="监控项" show-overflow-tooltip></el-table-column>
          <el-table-column prop="example" label="主机名" show-overflow-tooltip></el-table-column>
          <el-table-column prop="rule" label="报警规则" show-overflow-tooltip></el-table-column>
          <el-table-column prop="product_name" label="产品名称" show-overflow-tooltip></el-table-column>
          <el-table-column width="120" label="通知对象" show-overflow-tooltip>
            <template scope="scope">
              <el-dropdown @command="noticto" trigger="click" menu-align="start" style="color:#20b8d5">
                <span class="el-dropdown-link">
                  通知群组<i class="el-icon-caret-bottom el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown" style="font-size:14px;color:#20b8d5">
                  <el-dropdown-item :command="item" v-for="(item,index) in scope.row.contact">{{item.name}}</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="150" >
            <template scope="scope">
              <el-button @click="changeto(scope.$index,scope.row)" type="text" size="small"> 修改 </el-button>
              <el-button @click="del(scope.$index,table_data)" type="text" size="small"> 刪除 </el-button>
              <el-button @click="start(scope.$index)" type="text" size="small" v-if="table_data[scope.$index].state=='已禁用'"> 启用 </el-button>
              <el-button @click="off(scope.$index)" type="text" size="small" v-if="table_data[scope.$index].state=='已启用'"> 禁用 </el-button>
            </template>
          </el-table-column>
        </el-table>
    <pagination :currentPage="current" :pageSize="size" :total="total" @size-change="sizeChange"  @current-change="currentChange" ></pagination>
   </div>



   <el-dialog title="报警联系人" v-model="notic" :close-on-click-modal="false">
      <h5>{{group_name}}</h5>
      <el-table :data="notic_data" style="margin-top:10px">
        <el-table-column prop="name" label="联系人" show-overflow-tooltip></el-table-column>
        <el-table-column prop="mail" label="邮箱通知" show-overflow-tooltip></el-table-column>
        <el-table-column prop="tel" label="手机通知" show-overflow-tooltip></el-table-column>
        <el-table-column prop="mx" label="美信通知" show-overflow-tooltip></el-table-column>
        <el-table-column prop="mip" label="MIP通知" show-overflow-tooltip></el-table-column>
        <el-table-column prop="description" width="160" label="组织架构" show-overflow-tooltip></el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
          <el-button type="primary"  @click="notic=false">返回</el-button>
      </span>
    </el-dialog>

  <el-dialog title="报警规则详情" v-model="check" size="small" v-if="table_data.length>0" :close-on-click-modal="false" custom-class="dialog_box">
        <div class="title-rules-details">规则名称</div>
        <div class="rules-details-name">{{table_data[indexed] ? table_data[indexed].name : ''}}</div>
        <div class="title-rules-details">报警状态</div>
        <div class="rules-details">正常状态</div>
        <div class="title-rules-details">所属产品名称</div>
        <div class="rules-details">{{table_data[indexed] ? table_data[indexed].product_name : ''}}</div>
        <div class="title-rules-details">启用状态</div>
        <div class="rules-details">{{table_data[indexed] ? table_data[indexed].state : ''}}</div>
        <div class="title-rules-details">范围</div>
        <div class="rules-details">{{table_data[indexed] ? table_data[indexed].rangeto : ''}}</div>
        <div class="title-rules-details">阈值</div>
        <div class="rules-details">{{table_data[indexed] ? table_data[indexed].threshold : ''}}</div>
        <div class="title-rules-details">通知对象</div>
        <div class="rules-details-notic">{{table_data[indexed] ? table_data[indexed].notic_name : ''}}</div>
        <div class="title-rules-details">主机名</div>
        <div class="rules-details-example">{{table_data[indexed] ? table_data[indexed].example : ''}}</div>
        <div class="title-rules-details">报警规则详情</div>
        <div class="rules-details-last">{{table_data[indexed] ? table_data[indexed].rule : ''}}</div>
      </el-dialog>

    </Paper>

  </div>
</template>
<script type="text/ecmascript-6">
  import { getHosts, getDisk, getAlarmClass, createNewAlarm, getAllRules, getAllGroups, getGroupMember, delAlarm, putAlarm } from '../../../api/service'
  import UserSearch from 'components/awesome/user_search/UserSearch.vue';
  import userAuthorization from 'components/utils/user_authorization/Authorization.vue';
  import Pagination from 'components/awesome/pagination/Pagination.vue';
  import Through from 'components/utils/user_authorization/Through.vue';
  import Paper from 'components/awesome/paper/Paper.vue';
  export default {
    components: {
      userAuthorization,
      "user-search": UserSearch,
      "pagination": Pagination,
      Through,
       Paper,
    },
    data() {
      return {
        current:1,
        size:10,
        search_result0:false,
        hostName: '',
        measurement: '',
        cpuCount: '',
        dbMetaType: '',
        description: '',
        field: '',
        threshold: '',
        nicList: '',
        diskList: '',
        typeInstance: '',
        groupsInf: [],
        typeName: '',
        hostId: '',
        create_show: false,
        change_show: false,
        create_rules_disabled:false,
        change_rules_disabled:false,
        index: 0,
        indexed: 0,
        placeholder: '',
        placeword_search:'输入规则名称搜索',
        notic: false,
        notic_data: [],
        group_name:'',
        alarm: [],
        table_data_origin: [],
        table_data: [],
        search_num:[],
        example_options: [{
          value: '',
          label: ''
        }],
        rule_options: [],
        moreThan: [{
          value: 'gt',
          label: '>'
        }, {
          value: 'lt',
          label: '<'
        }],
        time: [{
          value: '5m',
          label: '5分钟'
        }, {
          value: '10m',
          label: '10分钟'
        }, {
          value: '15m',
          label: '15分钟'
        }, {
          value: '30m',
          label: '30分钟'
        }, {
          value: '60m',
          label: '60分钟'
        }],
        check: false,
        ruleForm: {
          product: '云服务器ECS',
          resource: '实例',
          example: '',
          name: '',
          ruleType: '',
          network: '',
          disk: '',
          value2: '',
          value3: '',
          time_item: '',
          moreThan_item: '',
          percentnum: '',
          numb: '1',
          contact_select: [],
          type: [],
        },
        value1: '',
        title:{
            ableAuthor: '联系人通知组',
            acceptAuthor: '已选联系组'
          },
        contact: [],
        contact_origrin: [],
        rules: {
          product: [
            { required: true, message: '请选择产品', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择资源', trigger: 'change' }
          ],
          example: [
            { required: true,message: '请选择主机', trigger: 'change' }
          ],
          name: [
            { required: true, message: '请输入规则名称', trigger: 'blur' },
            { min: 1, max: 20, message: '长度在 1 到 20 个字符', trigger: 'blur' }
          ],

          ruleType: [
            { required: true,message: '请选择规则类型', trigger: 'change' }
          ],
          network: [
            { required: true, message: '请选择网卡', trigger: 'change' }
          ],
          disk: [
            { required: true, message: '请选择磁盘', trigger: 'change' }
          ],
          value2: [
            { required: true, message: '请选择上下行', trigger: 'change' }
          ],
          value3: [
            { required: true, message: '请选择读写', trigger: 'change' }
          ],
          time_item: [
            { required: true, message: '请选择时间', trigger: 'change' },
          ],
          moreThan_item: [
            { required: true, message: '请输入范围', trigger: 'change' },
          ],
          percentnum: [
            { required: true, message: '请输入数值', trigger: 'blur' }
          ],
          namb: [
            { required: true, message: '请选择次数', trigger: 'change' }
          ],
          contact_select: [
            { required: true, message: '请选择通知对象', trigger: 'blur' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个通知方式', trigger: 'change' }
          ]
        }
      }
    },
    computed:{
      total(){
        return this.search_result0 ? 0 : this.search_num.length ? this.search_num.length : this.table_data_origin.length;
      }
    },
    created() {
      this.getAllGroups();
    },
    methods: {
      loading() {
        window.location.reload();
      },
      noticto(command) {
        if(command.name===0){
          this.$notify({
            type: 'warning',
            message: '通知群组已被删除你可以通过修改规则功能重新添加！'
          });
          return false ;
        }
        this.notic = true;
        this.group_name = command.name;
        let params = {
          group_id: command.key
        };
        getGroupMember(params).then(res => {
//        console.log(res);
//        console.log('suc获取组成员');
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
          });
          this.notic_data = table;
        }).catch(res => {
//        console.log('err获取组成员');
          this.$notify({
            type: 'error',
            message: '数据获取异常获取组成员失败！'
          });
        });
      },
      getAllRules() {
        getAllRules().then(res => {
//        console.log(res);
//        console.log('suc获取所有报警规则');
          let typeName = '';
          let threshold = "";
          this.table_data_origin = [];
          res.forEach((item,index) => {
            //type_name
            if(item.type_name === 'memory_usage') {
              typeName = '内存平均使用率';
            } else if(item.type_name === 'cpu_usage') {
              typeName = 'cpu平均使用率';
            } else if(item.type_name === 'nic_octets_rate') {
              typeName = '网络流量速率';
            } else if(item.type_name === 'nic_package_rate') {
              typeName = '网络数据包速率';
            } else if(item.type_name === 'disk_octets_rate') {
              typeName = '磁盘速率';
            } else if(item.type_name === 'cpu_top_n') {
              typeName = 'cpu瞬时使用率';
            } else {
              typeName = '磁盘OPS';
            }
            if(item.type_name === 'memory_usage') {
              threshold = item.rule.threshold*100 ;
            } else if(item.type_name === 'nic_octets_rate') {
              threshold = item.rule.threshold / 1024
            } else if(item.type_name === 'disk_octets_rate') {
              threshold = item.rule.threshold / 1048576
            } else {
              threshold = item.rule.threshold;
            }
            let contact_1 = this.contact.filter(function(it) {
              return item.channel_groups.indexOf(it.key) !== -1;
            })
            let contact_2 = [{name:'-',key:0}] ;
            let name = '';
            contact_1.forEach(item => {
              name += item.name + ' ' ;
            });
            this.$set(this.table_data_origin, index, {
              name: item.name,
              state: item.enabled ? '已启用' : '已禁用',
              monitor: typeName,
              example: item.db_meta.hostname,
              rule: item.description,
              product_name: this.ruleForm.product,
              alarm_id: item.alarm_id,
              rangeto: item.rule.compare === "gt" ? "大于" : "小于",
              threshold: threshold,
              rule_origin: item,
              channel_groups:item.channel_groups,
              contact:contact_1.length===0?contact_2:contact_1,
              notic_name:name
            })
          })
          let that = this;
          if(this.search_num.length){
            let new_table_data = this.table_data_origin.filter(function(item) {
              return item.name.indexOf(that.placeholder.replace(/(^\s*)|(\s*$)/g, "")) !== -1;
            });
            this.search_num = new_table_data;
            this.table_data = this.search_num.slice((this.current - 1)*this.size,this.size * this.current);
          }else {
            this.table_data = this.table_data_origin.slice((this.current - 1)*this.size,this.size * this.current);
          }

        }).catch(res => {
//        console.log('err获取所有报警规则');
          this.$notify({
            type: 'error',
            message: '数据获取异常获取报警规则失败!'
          });
        });
      },
      getAllGroups() {
        getAllGroups().then(res => {
//        console.log(res);
//        console.log('suc获取所有报警联系组');
          let data = [];
          res.data.forEach((item, index) => {
            data.push({
              name: item.name,
              key: item.group_id,
              active:''
            });
          });
          this.contact = data;
          this.contact_origrin =data.slice();
          this.getAllRules();
        }).catch(res => {
//        console.log('err获取所有报警联系组');
          this.$notify({
            type: 'error',
            message: '数据获取异常获取报警联系组失败!'
          });
        });
      },
      getTableData() {
        let params = {
          'project_id': JSON.parse(window.localStorage.project).projectId
        };
        getHosts(params).then(res => {
//        console.log(res);
//        console.log('suc获取主机列表');
          let hostName = [];
          for(let i = 0; i < res.length; i++) {
            hostName = hostName.concat({
              label: res[i].name,
              value: res[i].id
            })
          }
          this.example_options = hostName;
        }).catch(res => {
//        console.log('err获取主机列表');
          this.$notify({
            type: 'error',
            message: '数据获取异常获取主机列表失败！'
          });
        });
      },
      getAlarms() {
        getAlarmClass().then(res => {
//        console.log(res);
//        console.log('suc获取报警类型');
          let alarmClasses = [];
          for(let i = 0; i < res.length; i++) {
            alarmClasses = alarmClasses.concat(res[i].description)
          }
          this.rule_options = alarmClasses;
        }).catch(res => {
//        console.log('err获取报警类型');
          this.$notify({
            type: 'error',
            message: '数据获取异常获取报警类型失败！'
          });
        });
      },
      hostID_change(){
        // if(!this.create_show){
        //   return false;
        // }
        let that = this ;
        let new_example_options = this.example_options.filter(function(item){
          return that.ruleForm.example.indexOf(item.label) !== -1 ;
        })
        this.hostId = new_example_options.length>0?new_example_options[0].value:'' ;
//      console.log(this.hostId);
        this.ruleForm.disk = '';
        this.ruleForm.network = '';
        if(this.hostId !== ''){
          this.getNic();
          this.getDisklist();
        }
      },
      //获取type_instance
      getNic() {
        let params = {
          'type': 'network',
          'host_id': this.hostId
        };
//      console.log(this.hostId);
        getDisk(params).then(res => {
//        console.log(res);
//        console.log('suc获取网络类型实例');
          let hdData = res;
          let nicList = [];
          for(let i = 0; i < hdData.length; i++) {
            nicList = nicList.concat(hdData[i][1])
          }
          this.nicList = nicList;
        }).catch(res => {
//        console.log('err获取网络类型实例');
          this.$notify({
            type: 'error',
            message: '数据获取异常获取网络类型实例失败！'
          });
        });
      },
      getDisklist() {
        let params = {
          'type': 'disk',
          'host_id': this.hostId
        };
//      console.log(this.hostId);
        getDisk(params).then(res => {
//        console.log(res);
//        console.log('suc获取磁盘类型实例');
          let hdData = res;
          let disList = [];
          for(let i = 0; i < hdData.length; i++) {
            disList = disList.concat(hdData[i][1])
          }
          this.diskList = disList;
        }).catch(res => {
//        console.log('err获取磁盘类型实例');
          this.$notify({
            type: 'info',
            message: '数据获取异常获取磁盘类型实例失败！'
          });
        });
      },
      create_rule() {
        this.getAlarms();
        this.getTableData();
        this.create_show = true;
        this.create_rules_disabled = false ;
        this.ruleForm.contact_select = [];
        this.contact = this.contact_origrin.slice();
      },
      contact_select_val(val){
        this.ruleForm.contact_select = val;
      },
      transfor() {
        //确定measurement值
        if(this.ruleForm.ruleType === 'cpu平均使用率' || this.ruleForm.ruleType === '内存平均使用率' || this.ruleForm.ruleType === 'cpu瞬时使用率') {
          this.measurement = 'virt_value'
        } else if(this.ruleForm.ruleType === '磁盘OPS' || this.ruleForm.ruleType === '磁盘速率') {
          this.measurement = 'virt_read_write'
        } else {
          this.measurement = 'virt_rx_tx'
        }
        //count
        if(this.ruleForm.ruleType === 'cpu瞬时使用率') {
          this.cpuCount = this.ruleForm.numb;
        } else {
          this.cpuCount = 0
        }
        //field
        if((this.ruleForm.ruleType === '网络流量速率' || this.ruleForm.ruleType === '网络数据包速率') && this.ruleForm.value2 === "上行") {
          this.field = "rx"
        } else if((this.ruleForm.ruleType === '网络流量速率' || this.ruleForm.ruleType === '网络数据包速率') && this.ruleForm.value2 === "下行") {
          this.field = "tx"
        } else if((this.ruleForm.ruleType === '磁盘速率' || this.ruleForm.ruleType === '磁盘OPS') && this.ruleForm.value3 === "读") {
          this.field = "read"
        } else if((this.ruleForm.ruleType === '磁盘速率' || this.ruleForm.ruleType === '磁盘OPS') && this.ruleForm.value3 === "写") {
          this.field = "write"
        } else {
          this.field = ""
        }
        //type
        if(this.ruleForm.ruleType === 'cpu平均使用率' || this.ruleForm.ruleType === 'cpu瞬时使用率') {
          this.dbMetaType = "percent"
        } else if(this.ruleForm.ruleType === '内存平均使用率') {
          this.dbMetaType = "memory"
        } else if(this.ruleForm.ruleType === '网络流量速率') {
          this.dbMetaType = "if_octets"
        } else if(this.ruleForm.ruleType === '网络数据包速率') {
          this.dbMetaType = "if_packets"
        } else if(this.ruleForm.ruleType === '磁盘速率') {
          this.dbMetaType = "disk_octets"
        } else if(this.ruleForm.ruleType === '磁盘OPS') {
          this.dbMetaType = "disk_ops"
        }
        //中文周期
        let rangeChina = "";
        if(this.ruleForm.time_item === "5m") {
          rangeChina = "5分钟"
        } else if(this.ruleForm.time_item === "10m") {
          rangeChina = "10分钟"
        } else if(this.ruleForm.time_item === "15m") {
          rangeChina = "15分钟"
        } else if(this.ruleForm.time_item === "30m") {
          rangeChina = "30分钟"
        } else if(this.ruleForm.time_item === "60m") {
          rangeChina = "60分钟"
        }
        let moreThan = "";
        if(this.ruleForm.moreThan_item === "gt") {
          moreThan = "大于"
        } else {
          moreThan = "小于"
        }
        //单位
        let unit = "";
        if(this.ruleForm.ruleType === '内存平均使用率') {
          unit = "%";
          this.threshold = this.ruleForm.percentnum / 100;
        } else if(this.ruleForm.ruleType === 'cpu平均使用率' || this.ruleForm.ruleType === 'cpu瞬时使用率') {
          unit = "%";
          this.threshold = this.ruleForm.percentnum;
        } else if(this.ruleForm.ruleType === '网络流量速率') {
          unit = "KB/S";
          this.threshold = this.ruleForm.percentnum * 1024
        } else if(this.ruleForm.ruleType === '网络数据包速率') {
          unit = "PPS";
          this.threshold = this.ruleForm.percentnum
        } else if(this.ruleForm.ruleType === '磁盘速率') {
          unit = "MB/S";
          this.threshold = this.ruleForm.percentnum * 1024 * 1024
        } else {
          unit = "OPS";
          this.threshold = this.ruleForm.percentnum
        }
        //type_name
        if(this.ruleForm.ruleType === '内存平均使用率') {
          this.typeName = 'memory_usage';
        } else if(this.ruleForm.ruleType === 'cpu平均使用率') {
          this.typeName = 'cpu_usage';
        } else if(this.ruleForm.ruleType === '网络流量速率') {
          this.typeName = 'nic_octets_rate';
        } else if(this.ruleForm.ruleType === '网络数据包速率') {
          this.typeName = 'nic_package_rate';
        } else if(this.ruleForm.ruleType === '磁盘速率') {
          this.typeName = 'disk_octets_rate';
        } else if(this.ruleForm.ruleType === 'cpu瞬时使用率') {
          this.typeName = 'cpu_top_n';
        } else {
          this.typeName = 'disk_ops';
        }
        //描述
        if(this.ruleForm.ruleType === '内存平均使用率' || this.ruleForm.ruleType === 'cpu平均使用率') {
          this.description = rangeChina + this.ruleForm.ruleType + moreThan + this.ruleForm.percentnum + unit + "则告警";
        } else if(this.ruleForm.ruleType === '网络流量速率' || this.ruleForm.ruleType === '网络数据包速率') {
          this.description = rangeChina + this.ruleForm.network +'网卡的'+ this.ruleForm.ruleType + this.ruleForm.value2 + moreThan + this.ruleForm.percentnum + unit + "则告警";
        } else if(this.ruleForm.ruleType === '磁盘速率' || this.ruleForm.ruleType === '磁盘OPS') {
          this.description = rangeChina + this.ruleForm.disk +'磁盘的'+ this.ruleForm.ruleType + this.ruleForm.value3 + moreThan + this.ruleForm.percentnum + unit + "则告警";
        } else if(this.ruleForm.ruleType === 'cpu瞬时使用率') {
          this.description = rangeChina + this.ruleForm.ruleType + this.ruleForm.value2 + moreThan + this.ruleForm.percentnum + unit + '连续' + this.ruleForm.numb + "次则告警";
        }
        //type_instance
        if(this.ruleForm.ruleType === 'cpu平均使用率' || this.ruleForm.ruleType === 'cpu瞬时使用率') {
          this.typeInstance = "virt_cpu_total";
        } else if(this.ruleForm.ruleType === '内存平均使用率') {
          this.typeInstance = "used";
        } else if(this.ruleForm.ruleType === '网络流量速率' || this.ruleForm.ruleType === '网络数据包速率') {
          this.typeInstance = this.ruleForm.network;
        } else if(this.ruleForm.ruleType === '磁盘速率' || this.ruleForm.ruleType === '磁盘OPS') {
          this.typeInstance = this.ruleForm.disk;
        }
        for(let i = 0; i < this.example_options.length; i++) {
          if(this.ruleForm.example === this.example_options[i].label) {
            this.hostId = this.example_options[i].value
          }
        }
      },
      channel_groups_transform(channel_groups,is_right){
        if(is_right){
          return this.contact_origrin.filter(function(item,index){
            return channel_groups.indexOf(item.key) !== -1;
           })
        }else{
          return this.contact_origrin.filter(function(item,index){
            return channel_groups.indexOf(item.key) === -1;
          })
        }

      },
      contact_select_transfor(){
        let arr = [];
        this.ruleForm.contact_select.forEach((item,index)=>{
          arr.push(item.key)
        })
        return arr;
      },
      create_confirm() {
        if(!this.ruleForm.example){
          this.$notify({
            type: 'warning',
            message: '请选择主机！如果没有主机可供选择请切换项目！'
          });
          return false;
        }
        if(!this.ruleForm.name.replace(/(^\s*)|(\s*$)/g, "")||this.ruleForm.name.replace(/(^\s*)|(\s*$)/g, "").length>20){
          this.$notify({
            type: 'warning',
            message: '请输入1~20位规则名称！'
          });
          return false;
        }
        if(!this.ruleForm.ruleType){
          this.$notify({
            type: 'warning',
            message: '请选择规则类型！'
          });
          return false;
        }
        if(this.ruleForm.ruleType === '网络流量速率' || this.ruleForm.ruleType === '网络数据包速率'){
          if(!this.ruleForm.network){
            this.$notify({
              type: 'warning',
              message: '请选择网卡！'
            });
            return false;
          }
          if(!this.ruleForm.value2){
            this.$notify({
              type: 'warning',
              message: '请选择上下行方式！'
            });
            return false;
          }
        }
        if(this.ruleForm.ruleType === '磁盘速率' || this.ruleForm.ruleType === '磁盘OPS'){
          if(!this.ruleForm.disk){
            this.$notify({
              type: 'warning',
              message: '请选择磁盘！'
            });
            return false;
          }
          if(!this.ruleForm.value3){
            this.$notify({
              type: 'warning',
              message: '请选择读写方式！'
            });
            return false;
          }
        }
        if(!this.ruleForm.time_item){
          this.$notify({
            type: 'warning',
            message: '请选择阈值时间！'
          });
          return false;
        }
        if(!this.ruleForm.moreThan_item){
          this.$notify({
            type: 'warning',
            message: '请选择阈值范围！'
          });
          return false;
        }
        if(!this.ruleForm.percentnum){
          this.$notify({
            type: 'warning',
            message: '请输入阈值数值！'
          });
          return false;
        }
        if(isNaN(this.ruleForm.percentnum)){
          this.$notify({
            type: 'warning',
            message: '阈值必须是数值！'
          });
          return false;
        }
        if(this.ruleForm.percentnum<0){
          this.$notify({
            type: 'warning',
            message: '请输入不小于0的阈值数值！'
          });
          return false;
        }
        if(this.ruleForm.percentnum>=1 && (this.ruleForm.percentnum.match(/^0+/g) || this.ruleForm.percentnum.match(/[.]\d+0+$|[.]0+$/g))){
          this.$notify({
            message: '请检查阈值前后是否有多余的0！',
            type: 'warning'
          });
          return false;
        }else if(this.ruleForm.percentnum.match(/^[.]\d+|[.]$/g)){
          this.$notify({
            message: '请检查阈值前后是否有多余的小数点！',
            type: 'warning'
          });
          return false;
        }else if(this.ruleForm.percentnum<1 && (this.ruleForm.percentnum.match(/^00+[.]/g) || this.ruleForm.percentnum.match(/[.]\d+0+$|[.]0+$/g))){
          this.$notify({
            message: '请检查阈值前后是否有多余的0！',
            type: 'warning'
          });
          return false;
        }else if(this.ruleForm.percentnum.match(/^\+/g)){
          this.$notify({
            message: '请检查阈值前是否有多余的加号(+)！',
            type: 'warning'
          });
          return false;
        }
        if((this.ruleForm.ruleType==='cpu平均使用率'|| this.ruleForm.ruleType==='cpu瞬时使用率'|| this.ruleForm.ruleType==='内存平均使用率') && this.ruleForm.percentnum>100){
          this.$notify({
            type: 'warning',
            message: '请输入不大于100的阈值数值！'
          });
          return false;
        }
        if(this.ruleForm.contact_select.length<1){
          this.$notify({
            type: 'warning',
            message: '请至少选择一个通知对象！若没有通知对象可供选择请先去创建一个报警联系组！'
          });
          return false;
        }
        if(this.ruleForm.type.length<1){
          this.$notify({
            type: 'warning',
            message: '请至少选择一个通知方式！'
          });
          return false;
        }
        this.create_rules_disabled = true;
        this.transfor();
        //提交数据
        let params = {
          "data": {
            "name": this.ruleForm.name,
            "type_name": this.typeName,
            "description": this.description,
            "channel_groups": this.contact_select_transfor(),
            "db_meta": {
              "host": this.hostId,
              "hostname": this.ruleForm.example,
              "field": this.field,
              "range": this.ruleForm.time_item,
              "type": this.dbMetaType,
              "type_instance": this.typeInstance,
              "measurement": this.measurement
            },
            "rule": {
              "compare": this.ruleForm.moreThan_item,
              "threshold": this.threshold.toString(),
              "count": this.cpuCount.toString(),
              "period": this.ruleForm.numb
            }
          }
        };
        createNewAlarm(params).then(res => {
//          console.log(res);
//          console.log('suc创建报警规则');
          this.search_result0 = false;
          this.search_num = [];
          this.current = 1;
          this.getAllGroups();
          this.ruleForm.name = '';
          this.ruleForm.contact_select = [];
          this.ruleForm.example = '';
          this.ruleForm.time_item = '5m';
          this.ruleForm.moreThan_item = 'gt';
          this.ruleForm.percentnum = '';
          this.ruleForm.numb = '1';
          this.ruleForm.ruleType = '';
          this.ruleForm.type = ['邮件'];
          this.ruleForm.disk = '';
          this.ruleForm.network = '';
          this.ruleForm.value2 = "";
          this.ruleForm.value3 = "";
          this.$refs.ruleForm.resetFields();
          this.create_show = false;
          this.$notify({
            type: 'success',
            message: '创建报警规则成功!'
          });
        }).catch(res => {
          this.$notify({
            type: 'error',
            message: '数据获取异常创建报警规则失败!'
          });
        })
      },
      create_cancel() {
        this.ruleForm.name = '';
        this.ruleForm.contact_select = [];
        this.ruleForm.example = '';
        this.ruleForm.time_item = '5m';
        this.ruleForm.moreThan_item = 'gt';
        this.ruleForm.percentnum = '';
        this.ruleForm.numb = '1';
        this.ruleForm.ruleType = '';
        this.ruleForm.type = ['邮件'];
        this.ruleForm.disk = '';
        this.ruleForm.network = '';
        this.ruleForm.value2 = "";
        this.ruleForm.value3 = "";
        this.$refs.ruleForm.resetFields();
        this.create_show = false;
      },
      create_rule_close(done) {
        this.ruleForm.name = '';
        this.ruleForm.contact_select = [];
        this.ruleForm.example = '';
        this.ruleForm.time_item = '5m';
        this.ruleForm.moreThan_item = 'gt';
        this.ruleForm.percentnum = '';
        this.ruleForm.numb = '1';
        this.ruleForm.ruleType = '';
        this.ruleForm.type = ['邮件'];
        this.ruleForm.disk = '';
        this.ruleForm.network = '';
        this.ruleForm.value2 = "";
        this.ruleForm.value3 = "";
        this.$refs.ruleForm.resetFields();
        done();
      },
      search() {
        let that = this;
        if(this.placeholder===''){
          if(this.search_num.length){
            this.table_data = this.table_data_origin.slice(0,this.size);
            this.current = 1;
          }else {
            this.table_data = this.table_data_origin.slice((this.current - 1)*this.size,this.size*this.current);
          }
          this.search_num = [];
          this.search_result0 = false;
        }
        if(this.placeholder.replace(/(^\s*)|(\s*$)/g, "")===''){
          return false;
        }
        let new_table_data = this.table_data_origin.filter(function(item) {
          return item.name.indexOf(that.placeholder.replace(/(^\s*)|(\s*$)/g, "")) !== -1;
        });
        this.search_num = new_table_data;
        this.table_data = this.search_num.slice(0,this.size);
        if(this.search_num.length){
          this.current = 1;
        }else{
          this.search_result0 = true;
        }
      },
      sizeChange(size){
        //每页条目
        this.size = size;
        // console.log('a'+size)
        // console.log('a'+this.current)
        if(this.search_num.length){
          this.table_data = this.search_num.slice((current - 1)*this.size,this.size * current);
        }else {
          this.table_data = this.table_data_origin.slice((this.current - 1)*size,size * this.current);
        }
      },
      currentChange(current){
        //页码
        this.current = current;
        // console.log('b'+current)
        // console.log('b'+this.size)
        if(this.search_num.length){
          this.table_data = this.search_num.slice((current - 1)*this.size,this.size * current);
        }else {
          this.table_data = this.table_data_origin.slice((current - 1)*this.size,this.size * current);
        }

      },
      notic_confirm() {
        this.notic = false;
      },
      changeto(index,row){
//          console.log(row);
        this.getAlarms();
        this.getTableData();
        let that = this ;
        this.change_show = true;
        this.change_rules_disabled = false;
        this.index = index;
        this.ruleForm.name = this.table_data[index].name;
        this.ruleForm.contact_select = this.channel_groups_transform(this.table_data[index].channel_groups,true).slice();
        this.contact = this.channel_groups_transform(this.table_data[index].channel_groups,false).slice();
        this.ruleForm.example = this.table_data[index].rule_origin.db_meta.hostname;
        this.ruleForm.time_item = this.table_data[index].rule_origin.db_meta.range;
        this.ruleForm.moreThan_item = this.table_data[index].rule_origin.rule.compare;
        this.ruleForm.numb = this.table_data[index].rule_origin.rule.period;
        this.ruleForm.ruleType = row.monitor;
        this.ruleForm.type = ['邮件'];
        if(row.rule_origin.db_meta.field==="read"){
          this.ruleForm.value3 = "读"
        }else if(row.rule_origin.db_meta.field==="write"){
          this.ruleForm.value3 = "写"
        }else if(row.rule_origin.db_meta.field==="rx"){
          this.ruleForm.value2 = "上行"
        }else{
          this.ruleForm.value2 = "下行"
        }
        if(row.monitor==='内存平均使用率'){
          this.ruleForm.percentnum = (row.rule_origin.rule.threshold * 100).toString()
        }else if(row.monitor==='网络流量速率'){
          this.ruleForm.percentnum = (row.rule_origin.rule.threshold/1024).toString()
        }else if(row.monitor==='磁盘速率'){
          this.ruleForm.percentnum = (row.rule_origin.rule.threshold/1048576).toString()
        }else{
          this.ruleForm.percentnum = row.rule_origin.rule.threshold.toString()
        }
        Promise.resolve(this.hostID_change()).then(function(res) {
          if(row.monitor==='磁盘速率'||row.monitor==='磁盘OPS'){
            that.ruleForm.disk = row.rule_origin.db_meta.type_instance
          }
          if(row.monitor==='网络流量速率'||row.monitor==='网络数据包速率'){
            that.ruleForm.network = row.rule_origin.db_meta.type_instance
          }
        })
      },
      change_confirm() {
        if(!this.ruleForm.example){
          this.$notify({
            type: 'warning',
            message: '请选择主机！'
          });
          return false;
        }
        if(!this.ruleForm.name.replace(/(^\s*)|(\s*$)/g, "")||this.ruleForm.name.replace(/(^\s*)|(\s*$)/g, "").length>20){
          this.$notify({
            type: 'warning',
            message: '请输入1~20位规则名称！'
          });
          return false;
        }
        if(!this.ruleForm.ruleType){
          this.$notify({
            type: 'warning',
            message: '请选择规则类型！'
          });
          return false;
        }
        if(this.ruleForm.ruleType === '网络流量速率' || this.ruleForm.ruleType === '网络数据包速率'){
          if(!this.ruleForm.network){
            this.$notify({
              type: 'warning',
              message: '请选择网卡！'
            });
            return false;
          }
        }
        if(this.ruleForm.ruleType === '磁盘速率' || this.ruleForm.ruleType === '磁盘OPS'){
          if(!this.ruleForm.disk){
            this.$notify({
              type: 'warning',
              message: '请选择磁盘！'
            });
            return false;
          }
        }
        if(!this.ruleForm.time_item){
          this.$notify({
            type: 'warning',
            message: '请选择阈值时间！'
          });
          return false;
        }
        if(!this.ruleForm.moreThan_item){
          this.$notify({
            type: 'warning',
            message: '请选择阈值范围！'
          });
          return false;
        }
        if(!this.ruleForm.percentnum){
          this.$notify({
            type: 'warning',
            message: '请输入阈值数值！'
          });
          return false;
        }
        if(isNaN(this.ruleForm.percentnum)){
          this.$notify({
            type: 'warning',
            message: '阈值必须是数值！'
          });
          return false;
        }
        if(this.ruleForm.percentnum<0){
          this.$notify({
            type: 'warning',
            message: '请输入不小于0的阈值数值！'
          });
          return false;
        }
        if(this.ruleForm.percentnum>=1 && (this.ruleForm.percentnum.match(/^0+/g) || this.ruleForm.percentnum.match(/[.]\d+0+$|[.]0+$/g))){
          this.$notify({
            message: '请检查阈值前后是否有多余的0！',
            type: 'warning'
          });
          return false;
        }else if(this.ruleForm.percentnum.match(/^[.]\d+|[.]$/g)){
          this.$notify({
            message: '请检查阈值前后是否有多余的小数点！',
            type: 'warning'
          });
          return false;
        }else if(this.ruleForm.percentnum<1 && (this.ruleForm.percentnum.match(/^00+[.]/g) || this.ruleForm.percentnum.match(/[.]\d+0+$|[.]0+$/g))){
          this.$notify({
            message: '请检查阈值前后是否有多余的0！',
            type: 'warning'
          });
          return false;
        }else if(this.ruleForm.percentnum.match(/^\+/g)){
          this.$notify({
            message: '请检查阈值前是否有多余的加号(+)！',
            type: 'warning'
          });
          return false;
        }
        if((this.ruleForm.ruleType==='cpu平均使用率'|| this.ruleForm.ruleType==='cpu瞬时使用率'|| this.ruleForm.ruleType==='内存平均使用率') && this.ruleForm.percentnum>100){
          this.$notify({
            type: 'warning',
            message: '请输入不大于100的阈值数值！'
          });
          return false;
        }
        if(this.ruleForm.contact_select.length<1){
          this.$notify({
            type: 'warning',
            message: '请至少选择一个通知对象！若没有通知对象可供选择请先去创建一个报警联系组！'
          });
          return false;
        }
        if(this.ruleForm.type.length<1){
          this.$notify({
            type: 'warning',
            message: '请至少选择一个通知方式！'
          });
          return false;
        }
        this.change_rules_disabled = true;
        this.transfor();
        //提交数据
        let params = {
          alarm_id: this.table_data[this.index].alarm_id,
          "data": {
            "name": this.ruleForm.name,
            "type_name": this.typeName,
            "description": this.description,
            "enabled": this.table_data[this.index].state === '已启用'?'true':'false',
            "channel_groups": this.contact_select_transfor(),
            "db_meta": {
              "host": this.hostId,
              "hostname": this.ruleForm.example,
              "field": this.field,
              "range": this.ruleForm.time_item,
              "type": this.dbMetaType,
              "type_instance": this.typeInstance,
              "measurement": this.measurement
            },
            "rule": {
              "compare": this.ruleForm.moreThan_item,
              "threshold": this.threshold.toString(),
              "count": this.cpuCount.toString(),
              "period": this.ruleForm.numb
            }
          }
        };
        putAlarm(params).then(res => {
//       console.log(res);
//        console.log('suc更新报警规则');
//       console.log(this.ruleForm.contact_select);
          this.getAllGroups();
          this.ruleForm.name = '';
          this.ruleForm.contact_select = [];
          this.ruleForm.example = '';
          this.ruleForm.time_item = '5m';
          this.ruleForm.moreThan_item = 'gt';
          this.ruleForm.percentnum = '';
          this.ruleForm.numb = 1;
          this.ruleForm.ruleType = '';
          this.ruleForm.type = ['邮件'];
          this.ruleForm.disk = '';
          this.ruleForm.network = '';
          this.ruleForm.value2 = "";
          this.ruleForm.value3 = "";
          this.change_show = false;
          this.$notify({
            type: 'success',
            message: '修改报警规则成功!'
          });
        }).catch(res => {
//      		console.log('err更新报警规则');
          this.$notify({
            type: 'error',
            message: '数据获取异常修改报警规则失败!'
          });
        })
      },
      change_cancel() {
        this.$refs.ruleForm.resetFields();
        this.ruleForm.name = '';
        this.ruleForm.contact_select = [];
        this.ruleForm.example = '';
        this.ruleForm.time_item = '5m';
        this.ruleForm.moreThan_item = 'gt';
        this.ruleForm.percentnum = '';
        this.ruleForm.numb = 1;
        this.ruleForm.ruleType = '';
        this.ruleForm.type = ['邮件'];
        this.ruleForm.disk = '';
        this.ruleForm.network = '';
        this.ruleForm.value2 = "";
        this.ruleForm.value3 = "";
        this.change_show = false;
      },
      change_rule_close(done) {
        this.$refs.ruleForm.resetFields();
        this.ruleForm.name = '';
        this.ruleForm.contact_select = [];
        this.ruleForm.example = '';
        this.ruleForm.time_item = '5m';
        this.ruleForm.moreThan_item = 'gt';
        this.ruleForm.percentnum = '';
        this.ruleForm.numb = '1';
        this.ruleForm.ruleType = '';
        this.ruleForm.type = ['邮件'];
        this.ruleForm.disk = '';
        this.ruleForm.network = '';
        this.ruleForm.value2 = "";
        this.ruleForm.value3 = "";
        done();
      },
      del(index, rows) { //删除
        this.$confirm('确定删除选择的报警规则, 是否继续?', '删除选择的报警规则', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal:false,
          type: 'warning'
        }).then(() => {
          //删除功能
          let params = this.table_data[index].alarm_id;
          delAlarm(params).then(res => {
            /*console.log(res);
             console.log('suc删除报警规则');*/
//          rows.splice(index, 1);
//          this.new_contact.splice(index, 1);
            this.getAllGroups();
            this.$notify({
              type: 'success',
              message: '删除成功!'
            });
          }).catch(res => {
//            console.log('err删除报警规则');
            this.$notify({
              type: 'error',
              message: ' 数据获取异常删除失败!'
            });
          })
        }).catch(() => {})
      },
      start(index) { //启用
        this.$confirm('启用后又可以收到报警通知了', '确定启用选择的报警规则', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal:false,
          type: 'warning'
        }).then(() => {
          this.transfor();
          //提交数据
          let params = {
            alarm_id: this.table_data[index].alarm_id,
            "data": {
              "name": this.table_data[index].rule_origin.name,
              "type_name": this.table_data[index].rule_origin.type_name,
              "description": this.table_data[index].rule_origin.description,
              "enabled": "true",
              "db_meta": this.table_data[index].rule_origin.db_meta,
              "rule": this.table_data[index].rule_origin.rule
            }
          };
          putAlarm(params).then(res => {
//          console.log(res);
//          console.log('suc启用报警规则');
//          this.table_data[index].state = '已启用';
            this.getAllGroups();
            this.$notify({
              type: 'success',
              message: '成功启用!'
            });
          }).catch(res => {
            this.$notify({
              type: 'error',
              message: '数据获取异常启用失败!'
            });
          })
        }).catch(() => { })
      },
      off(index) { //禁用
        this.$confirm('禁用后收不到报警通知了', '确定禁用选择的报警规则', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          closeOnClickModal:false,
          type: 'warning'
        }).then(() => {
          this.transfor();
          //提交数据
          let params = {
            alarm_id: this.table_data[index].alarm_id,
            "data": {
              "name": this.table_data[index].rule_origin.name,
              "type_name": this.table_data[index].rule_origin.type_name,
              "description": this.table_data[index].rule_origin.description,
              "enabled": "false",
              "db_meta": this.table_data[index].rule_origin.db_meta,
              "rule": this.table_data[index].rule_origin.rule
            }
          };
          putAlarm(params).then(res => {
            /*console.log(res);
             console.log('suc禁用报警规则');*/
//          this.table_data[index].state = '已禁用';
            this.getAllGroups();
            this.$notify({
              type: 'success',
              message: '成功禁用!'
            });
          }).catch(res => {
            this.$notify({
              type: 'error',
              message: '数据获取异常禁用失败!'
            });
          })
        }).catch(() => { })
      },
    },
  }
</script>
<style lang="less" rel="stylesheet/less" scoped>
  .page-title{
    margin-bottom: 20px;
    border-bottom: 1px solid #eee;
    padding-top: 8px;
    padding-bottom: 20px;
    span{
      padding-left: 8px;
      font-size: 16px;
      border-left: 2px solid #21B8D5;
    }
  }
  .title-rules-details{
  		float: left;
    width: 17%;
    background-color: rgba(187, 202, 203, 0.19);
    font-weight: 700;
    font-size: 12px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border: 1px solid rgba(187, 202, 203, 0.19);
  }

  .rules-details{
  		float: left;
    width: 32%;
    font-size: 12px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border: 1px solid rgba(187, 202, 203, 0.19);
  }

  .rules-details-example{
  		float: left;
    width: 32%;
    font-size: 12px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border: 1px solid rgba(187, 202, 203, 0.19);
  }

  .rules-details-name{
  		float: left;
    width: 32%;
    font-size: 12px;
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    border: 1px solid rgba(187, 202, 203, 0.19);
  }

  .rules-details-notic{
  		float: left;
    width: 32%;
    font-size: 12px;
    height: 50px;
    line-height: 50px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    text-align: center;
    border: 1px solid rgba(187, 202, 203, 0.19);
  }

  .rules-details-last{
  		float: left;
    width: 81.5%;
    font-size: 12px;
    margin-bottom: 20px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border: 1px solid rgba(187, 202, 203, 0.19);
  }

  .titleSmall{
  		font-weight: 200px;
    font-size: 16px;
    margin-top: 16px;
    margin-bottom: 10px;
  }

  .hr{
  		margin-top: 0;
    border:  none;
    border-top: 1px solid #cecece;
  }
  .el-form-item{
    margin: 20px 0;
  }

  .table-with{
    display: inline;
  }


  .page{
    padding: 20px;
  }

  .pull-right{
  		float: right;
  }
  .footer{
    margin: 20px auto;
    text-align: center;
  }


</style>
