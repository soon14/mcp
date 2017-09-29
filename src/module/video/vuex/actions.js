import * as types from './mutation-types';
import { videoapplist,auth } from '../api/service';

/**
 * 判断是否有进入页面权限
 * auth判断是否有进入子系统权限
 * videoapplist子系统的权限校验
 * @param commit
 */
export const searchAuthority = ({ commit ,state }) => {
  if(state.project&&state.user) {
    return Promise.all([
      new Promise((resolve, reject) => {
        let postData = JSON.stringify({'projectid': state.project.projectId, 'token': state.token});
        videoapplist(postData).then(data => {
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
      if (res[0].code === 200) {
        commit(types.VIDEO_AUTHORITY, !!res[0].data.apps.length && res[1]);
      }
      return !!res[0].data.apps.length && res[1];
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
  commit(types.VIDEO_AUTHORITY,authority);
};

