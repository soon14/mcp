/**
 * Created by CHENRC2 on 2017-8-2.
 */
import Vue from 'vue';
import storage from "utils/local_storage_tool.js";
import _ from "lodash";
import { filterArrValue } from "utils/utils";

/**
 * 用户鉴权 指令
 *  [*]不需要鉴权
 */
Vue.directive('role-authority',{
  bind(el, binding, vnode){
    const user = storage.getObject("user"),userRoles=binding.value,styleDisplay=el.style.display;
    if(!_.includes(userRoles,"*")){
      el.style.display="none";
      if(user&&userRoles){
        const roles=_.map(user.role,"name");
        roles.forEach((item)=>{
          if(filterArrValue(userRoles,item)){
            el.style.display=styleDisplay;
            return ;
          }
        });
      }
    }
  }
});
