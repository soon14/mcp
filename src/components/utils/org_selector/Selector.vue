<template>
  <div class="contentBox">
    <div class="bottom_content">
      <div class="l_Contentbox fl">
        <div class="serachbox">
          <!-- <el-input
             placeholder="请输入员工姓名或MIP账号"
             icon="search"
             size="small"
             v-model="val"
             @keyup.native.stop.prevent="search"
             :on-icon-click="handleIconClick" class="elInput">
           </el-input>-->
          <user-search placeholder="请输入员工姓名或MIP账号"
                       icon="search"
                       v-model="val"
                       @keyup.native.stop.prevent="search"
                       @search-enter="handleIconClick" class="elInput">
          </user-search>
        </div>
        <el-tree
          :data="datas"
          node-key="mid"
          v-if = "showMsg"
          ref="tree"
          :load="loadNode"
          accordion
          check-strictly
          lazy
          :default-expanded-keys="defaultKeys"
          :default-checked-keys="def"
          :props="defaultProps"
          @check-change="handleCurrentChange"
          :render-content="renderContent"
          class="tree">
        </el-tree>
        <div v-else v-loading="loading"
             element-loading-text="拼命加载中" ref="ser_msg"  class="ser_msg">
          <ul>
            <li v-for="item in datas" :key="item.uid">
              <el-checkbox :disabled="item.disabled" @change="handCheckedMemberChange(item)" v-model="item.checked" class="check" ></el-checkbox>
              <span class="mf mf-yonghu "></span>
              <span class="uName fl">{{item.uName}}</span>
              <el-tooltip class="item" effect="dark" :content="item.deptName" placement="top-start">
                <span class="deptName fl">{{item.deptName}}</span>
              </el-tooltip>
            </li>
            <div class="empty" v-if="datas.length<=0">暂无数据</div>
          </ul>
        </div>
      </div>
      <div class="r_Contentbox fr">
        <p class="r_title">已选择{{parseInt(this.selectedData.length)}}个</p>
        <ul class="list_content">
          <li :key="item.mid" v-for="item in selectedData"><span class="memberName">{{item.mName}}</span><i @click="deleteMsg(item.mid)" class="mf mf-lg shanchu mf-shanchu fr"></i>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<style lang="less" scoped>
  @import '~styles/vars.less';
  p {
    padding: 0;
    padding-left: 20px;
    margin: 0;
    text-align: left;
  }
  ul, li {
    list-style: none;
    margin: 0;
    padding: 0;
  }
  .contentBox{
    width: 100%;
    height: 400px;
    border-radius: 5px;
    background: #FFFFFF;
    .mf {
      float: right;
      padding-right: 20px;
      line-height: 40px;
    }
    .bottom_content {
      .l_Contentbox {
        width: 50%;
        overflow: hidden;
        border-radius: 5px;
        border: 1px solid #f2f2f2;
        .serachbox {
          height: 38px;
          padding: 4px 10px 4px 10px;
          background: #FAFAFA;
          color: #e8e8e8;
        }
        .tree.el-tree {
          height: 350px;
          text-align: left;
          border-radius: 5px;
          border: none;
          overflow: auto;
          overflow-x: hidden;
          .el-tree-node__label {
            font-size: 14px;
            background: #21B8D5;
          }
        }
        .ser_msg{
          .empty{
            text-align:center;
            line-height:350px;
          }
          ul {
            height: 350px;
            width: 100%;
            overflow: auto;
            overflow-x: hidden;
            li{
              height: 40px;
              font-size:12px;
              padding-left: 10px;
              text-align: left;
              position:relative;
              border-radius:5px;
              .check{
                margin-right:10px;
                position:absolute;
                top:12px;
                left:10px;
              }
              &:nth-child(even){
                background: #fafafa;
              }
              &:hover {
                background: #E5F4FF;
              }
              .mf-yonghu{
                position:absolute;
                top:-5px;
                left:36px;
                padding-right:10px;
              }
              .uName,.deptName{
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              .uName{
                margin-top:6px;
                margin-left:42px;
                width: 200px;
                height:13px;
              }
              .deptName{
                width: 90%;
                margin-left:25px;
                margin-top:3px;
                height:13px;
              }
            }
          }
        }
      }
      .r_Contentbox {
        width: 40%;
        height: 396px;
        border: 1px solid #f2f2f2;
        border-radius: 5px;
        .r_title {
          height: 42px;
          background: #fafafa;
          border-bottom: 1px solid #f2f2f2;
          border-radius: 5px;
          padding: 0;
          font: 400 14px/42px "微软雅黑";
          text-align: center;
        }
        .list_content {
          height: 350px;
          width: 100%;
          overflow: auto;
          overflow-x: hidden;
        }
        .list_content li {
          height: 30px;
          font: 400 14px/30px "微软雅黑";
          padding-left: 10px;
          text-align: left;
          width:100%;
          .memberName{
            width:80%;
            height:30px;
            float:left;
            line-height:30px;
            display:block;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }
          &:nth-child(even) {
            background: #fafafa;
          }
          &:hover {
            background: #E5F4FF;
          }
          .shanchu {
            line-height: 30px;
          }
          .mf-shanchu:before {
            color: #21B8D5;
          }
        }
      }
    }
  }
  .elInput {
    font-size: 12px;
    color: #a5acbe;
  }
</style>
<script>
  import {requestNewMember} from './service.js'
  import {searchUsers} from './service.js'
  import UserSearch from '../../awesome/user_search/UserSearch.vue'
  import {addClass,removeClass} from 'utils/utils.js'
  export default {
    name: "addNewMember",
    components:{
      "user-search":UserSearch
    },
    data() {
      return {
        val: "",          //输入框value
        defaultKeys: [],  //树默认选中
        showMsg:true,     //是否显示树
        loading:false,    //菊花转
        def: [],          //树默认展开
        datas:[],         //主数据集合
        selectedData: this.value, //被选中集合
        totalSels:[],
        showCheck:false,
        defaultProps: {   //树默认展示参数
          label: "mName",
          disabled: "",
          children: "result",
          isLeaf: 'isLeaf'
        }
      }
    },
    props:{               //双向传输值
      value:{
        type:Array,
        default(){
          return []
        }
      },
      projectMemberList:{
        type:Array,
        default(){
          return []
        }
      }
    },
    created(){
     
    },
    computed:{
      
    },
    watch:{
      /**
       *  限制只能删除10个用户
       * */
      selectedData(curValue,oldValue){
        if(curValue.length > 10){
          this.$notify.warning("一次只能添加10个用户");
          this.deleteMsg(curValue[curValue.length-1].mid);
        }
      }
    },
    methods: {
      /**
       * 自定义绑定树
       * @param createElement
       * @param node
       * @param data
       * @param store
       * @returns {*}
       */
      renderContent(createElement, { node, data, store }) {
        let checkbox=createElement('span'),that=this;
        if(data.mTag==="1"){
          let index=that.$_.findIndex(this.selectedData,chr=>{
            return chr.mid==data.mid;
          });
          
          let memberIndex=that.$_.findIndex(this.projectMemberList,chr=>{
            return chr.userAccount==data.mid;
          });
          checkbox= createElement('input',{
            'style':{
              'margin-right':'8px',
              'background-image':!!(memberIndex+1)? 'url("../../../../static/images/triangleImg/A7NJJb.png")':'',
              'background-position': !!(memberIndex+1)? '19px -3px':''
            },
            attrs:{
              'type': 'checkbox',
              'mid': data.mid,
              'checked':!!(memberIndex+1)||!!(index+1),
              'disabled':!!(memberIndex+1)?true:false,
              'class':!!(index+1) ? 'selectbox selected' : 'selectbox'
            },
            on: {
              'click': ()=>that.handleCurrentChange(data,checkbox)
            }
          });
        }
        return createElement('span', [
          createElement('i', {
            'class': {
              'icon-folder': true,
              iconfont: true,
              'tree-icon-folder':true
            },
          }),
          checkbox,
          createElement('span', node.label),
        ]);
      },
      //----------重新回到树
      getNewMember() {
        let data = {"deptId": "100000"};
        requestNewMember(data).then(res => {
          if (res.errorCode === "200" ) {
            this.datas = res.result;
          }
        })
      },
      //----------加载渲染子树
      loadNode(node, resolve) {
        //默认加载
        let data = {"deptId": node.data.mid||"100000"};
        var that = this;
        requestNewMember(data).then(res => {
          if (res.errorCode === "200" ) {
            res.result.map(datas =>{
              if(datas['mTag'] === "1"){
                that.showCheck = true;
                datas.isLeaf = true;
                datas["disabled"] = false ;
              }else{
                that.showCheck = false;
                datas.isLeaf = false;
                datas["disabled"] = true ;
              }
              return datas;
            });
            resolve(res.result);
          }
        })
      },
      //----------回车搜索事件
      search(event){
        const e = event || window.event || arguments.callee.caller.arguments[0];
        if(e && e.keyCode===13){
          //调用执行
          if(this.showMsg===false){ this.datas = []}
          this.handleIconClick()
        }
      },
      //----------点击图标搜索数据
      handleIconClick: function () {
        //判断输入的数据
        if (this.val.trim() === "" || this.val.length <= 0 ){
          //展示树
          this.showMsg = true;
        }else{
          this.datas = [];
          this.loading = true;
          this.showMsg = false;
          this.loadList();
        }
      },
      //----------加载人员列表(搜索)
      loadList(){
        let params = {"keywords": this.val,"index":1,pageSize:20};
        searchUsers(params).then(res => {
          if (res.errorCode === "200") {
            let that = this;
            res.result.info.map(item =>{
                let  resIndex =that.$_.findIndex(that.projectMemberList,chr=>{
                    return chr.userAccount==item.uid;
                });
                item.disabled =!!(resIndex+1)? true :false;
                return item;          
            })
            this.datas = res.result.info;
          }
          this.loading = false;
        })
      },
      //---------根据对应的id值删除
      deleteMsg(id) {
        if(this.showMsg===true&&this.totalSels.length>=0){
          for(var i = this.totalSels.length-1;i>=0;i--){
            if(this.totalSels[i].mid === id){
              this.totalSels.splice(i,1);
            }
          }
          this.$refs.tree.setCheckedNodes(this.totalSels);
          //遍历树 把选择中的剔除
          let inputs = this.$refs.tree.$el.getElementsByTagName("input");
          this.$_.forEach(inputs,item => {
            let mid = item.attributes["mid"].value;
            if(id === mid){
              removeClass(item,"selected");
              item.checked=false;
            }
          });
        }
        for(var k=0;k<this.datas.length;k++){
          //判断数据信息
          if( this.datas[k].uid === id){
            //此时的时候清除
            this.datas[k].checked = false;
          }
        }
        //遍历删除
        for (var i = this.selectedData.length - 1; i >= 0; i--) {
          if (this.selectedData[i].mid === id) {
            //删除数据
            this.selectedData.splice(i, 1);
          }
        }
        this.$emit("input",this.selectedData);
      },

      //---------监控树结构选中时的变化
      handleCurrentChange(data, dom) {
        let isExist=false,checked=dom.elm.checked;
        checked?addClass(dom.elm,"selected"):removeClass(dom.elm,"selected");
        if(checked===true){
          //判断树里面数据是否已经存在---数组的唯一性
          this.selectedData.forEach(item=>{
            //如果已经存在了，直接return
            if(item.mid === data.mid) {
              isExist=true;
            }
          })
        }
        if(isExist) return;

        const mObj = {};
        mObj.dom = dom;
        if (checked === true && data.mTag === "1") {
          mObj.mName = data.mName;
          mObj.mid = data.mid;
          this.selectedData.push(mObj);
          this.totalSels = this.$refs.tree.getCheckedNodes();
        } else {
          for (var i = this.selectedData.length - 1; i >= 0; i--) {
            if (this.selectedData[i].mid === data.mid) {
              //删除数据
              this.selectedData.splice(i, 1);
            }
          }
        }
        //子组件传送父组件，修改父组件
        this.$emit("input",this.selectedData);
      },

      //-----------监控搜索出来的人员列表，选中后的数据处理
      handCheckedMemberChange(data){
        var flag = false;
        if(data.checked ===true){
          this.selectedData.forEach(item=>{
            if(item.mid === data.uid){
              flag = true;
            }
          })
        }
        if(flag)return;

        var membersObj = {};
        if(data.checked === true){
          membersObj.mid = data.uid;
          membersObj.mName = data.uName;
          membersObj.checked = data.checked;
          //选中的时候追加数据
          this.selectedData.push(membersObj)
        }else{
          for (var i = this.selectedData.length - 1; i >= 0; i--) {
            if (this.selectedData[i].mid === data.uid) {
              //删除数据
              this.selectedData.splice(i, 1);
            }
          }
        }
        //使用一个对象数组
        this.$emit("input",this.selectedData);
      },
    },
  }
</script>
