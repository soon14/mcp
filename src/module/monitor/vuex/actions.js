import * as types from './mutation-types';
import { auth } from '../api/service';

/**
 * 判断是否有进入页面权限
 * @param commit
 */
export const searchAuthority = ({ commit ,state }) => {
  if(state.user){
    return new Promise((resolve,reject) => {
      if(state.user.roleFormat.member||state.user.role.length <= 0){
        auth().then(data => {
          if(data.errorCode === "200" &&data.result.length == 0){
            commit(types.ALARM_AUTHORITY,false);
          }else{
            commit(types.ALARM_AUTHORITY,true);
          }
          resolve();
        });
      }else{
        commit(types.ALARM_AUTHORITY,true);
        resolve();
      }
    });
  }else{
    return new Promise((resolve,reject)=>{resolve(false);});
  }

};

