/**
 * Created by CHENRC2 on 2017-7-22.
 */

/**
 * 表格默认配置信息
 * @type {{title: {sortable: boolean, align: string}, column: {selection: boolean}, base: {}}}
 */
export const tableSetting= {
  title:{
    type:'text',//可选项：text,operate,hidden
    sortable: false,
    className:"",
    width:'',
    minWidth:'',
    align: "center"
  },
  column:{
    selection:false
  },
  columnButtonOperation:{
    label: "亲，给按钮一个label",
    size: "small",
    type: "text",
    width:'',
    minWidth:'',
    methods:{
      click:(index, row)=>{

      }
    }
  },
  base:{
    height: '',
    width:'',
    minWidth:''
  }
};
