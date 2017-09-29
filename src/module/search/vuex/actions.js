import * as types from './mutation-types';
import { noAuthErrorCode } from '../utils/utils'
import { requestTenantInfo,auth } from '../api/service';

/**
 * 判断是否有进入页面权限
 * auth判断是否有进入子系统权限
 * requestTenantInfo子系统的权限校验
 * @param commit
 */
export const searchAuthority = ({ commit ,state }) => {
  if(state.user) {
    return Promise.all([
      new Promise((resolve, reject) => {
        let parmas = {appid: "10001", last_seqid: "1", num: "10"};
        requestTenantInfo(parmas).then(data => {
          resolve(data);
        });
      }), new Promise((resolve, reject) => {
        if (state.user.roleFormat.member || state.user.role.length <= 0) {
          auth().then(data => {
            if (data.errorCode === "200" && data.result.length == 0) {
              resolve(false);
            } else {
              commit(types.SYS_AUTHORITY, true);
              resolve(true);
            }
          });
        } else {
          commit(types.SYS_AUTHORITY, true);
          resolve(true);
        }
      })]).then((res) => {
      commit(types.SEARCH_AUTHORITY, res[0].errorCode !== noAuthErrorCode && res[1]);
      return  res[0].errorCode !== noAuthErrorCode && res[1];
    });
  }else{
    return new Promise((resolve,reject)=>{resolve(false);});
  }
};

/**
 * 修改权限
 * @param commit
 * @param state
 */
export const changeAuthority =({ commit ,state } , authority )=>{
  commit(types.SEARCH_AUTHORITY,authority);
};

