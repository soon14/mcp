/**
* Created by CHENRC2 on 2017-7-21.
* 二次封装element table 组件
*/
<template>
  <div class="container">
    <el-table :data="data" v-loading="loading" element-loading-text="拼命加载中" @row-click='rowClick' @select="select"
              @select-all="select">

      <!--选择框-->
      <el-table-column
        v-if="normalizedSetting.selection"
        type="selection">
      </el-table-column>

      <!--索引-->
      <el-table-column
        v-if="normalizedSetting.index"
        label="序号"
        align="center"
        header-align="center"
        width="70px"
        type="index"
        show-overflow-tooltip>
      </el-table-column>
      <!--内容列-->

      <el-table-column v-for="t in normalizedTitle"
                       :prop="t.prop"
                       :class-name="t.className"
                       :label="t.label"
                       :width="t.width"
                       :min-width="t.minWidth"
                       :sortable="t.sortable"
                       :align="t.align"
                       show-overflow-tooltip>
        <template scope="scope">
          <span v-if="t.type === 'text'">{{ scope.row[scope.column.property] }}</span>
          <span v-else-if="t.type ==='slot'" v-html="t.computed(scope)"></span>
          <span v-else-if="t.type ==='operate'">
            <el-button type="text"
                       size="small"
                       @click="columnsButtonClick(t.methods.click,scope.$index,scope.row)">
              {{scope.row[t.prop]}}</el-button>
          </span>
        </template>
      </el-table-column>

      <el-table-column v-for="t in normalizedTitle"
                       v-else-if="t.type ==='hidden'"
                       v-if="t.type ==='hidden'">
      </el-table-column>
      <!--内容列-->

      <!--操作列-->
      <el-table-column v-if='normalizedColumnsButton.hasOwnProperty("title")' :label="normalizedColumnsButton.title" :align="normalizedColumnsButton.align" :width="normalizedColumnsButton.width" :min-width="normalizedColumnsButton.minWidth">
        <template scope="scope">
          <el-button v-for="button in normalizedColumnsButton.buttons"
                     :size="button.size"
                     :type="button.type"
                     @click="columnsButtonClick(button.methods.click,scope.$index,scope.row)">
          {{button.label}}</el-button>
        </template>
      </el-table-column>
      <!--操作列-->
    </el-table>
  </div>
</template>
<style lang="less" scoped>

</style>
<script>
  import Vue from "vue";
  import UserButton from "../user_button/UserButton.vue";
  import { tableSetting } from "../awesome_config.js";

  export default {
    name: "ListTable",
    computed: {
      /**
       * 格式化标题
       * @returns {Array}
       */
      normalizedTitle(){
        let title=[];
        this.title.forEach(item=>{
          title.push(Object.assign({},tableSetting.title,item));
        });
        return title;
      },
      /**
       * 格式化配置
       */
      normalizedSetting(){
        return Object.assign({},tableSetting.base,tableSetting.column,this.setting);
      },
      /**
       * 格式化列按钮
       */
      normalizedColumnsButton(){
        if(this.columnsOperation.buttons&&this.columnsOperation.buttons.length>0){
          this.columnsOperation.buttons=this.columnsOperation.buttons.map((item)=>{
            return Object.assign({},tableSetting.columnButtonOperation,item);
          });
        }
        return this.columnsOperation;
      }
    },
    props:{
      data: {
        type: Array,
        default() {
          return [];
        }
      },
      loading: {
        type: Boolean,
        default: false
      },
      title: {
        type: Array,
        default() {
          return [];
        }
      },
      setting: {
        type: Object,
        default(){
          return Object.assign({},tableSetting.base,tableSetting.column);
        }
      },
      columnsOperation: {
        type: Object,
        default(){
          return {}
        }
      }
    },
    methods:{
      columnsButtonClick(method,index,row){
        method(index,row);
      },
      select(val){
        this.$emit('select',val);
      },
      rowClick(row, event, column){
        this.$emit('rowClick',row,event,column);
      }
    },
    components:{
      "user-button": UserButton
    }
  }
</script>
