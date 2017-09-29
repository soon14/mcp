/**
 * Created by CHENRC2 on 2017-7-26.
 */
import axios from 'utils/http.js';
import * as api from "./api.js";
import * as utils from "utils/utils.js";
import storage from 'utils/local_storage_tool';


/**
 * 用户列表
 * @param params
 * @returns {*}
 */
export const requestUserList = params => {
  return axios.post(api.userList, params).then(res => res.data);
};

/**
 * 用户信息
 * @param params
 * @returns {*}
 */
export const requestUserInfo = params => {
  return axios.post(api.userInfo, params).then(res => res.data);
};


/**
 * 个人项目列表
 * */
export const requestUserProject = params => {
  let user=storage.getObject("user");
  return axios.post(api.userProjectList,Object.assign({},{ account:user.account,index:1,pageSize:1000 },params)).then(res => res.data);
}


/**
 * 项目列表
 * @param params
 * @returns {*}
 */
export const requestProjectList = params => {
  return axios.post(api.projectList, params).then(res => res.data);
};


/**
 * 项目信息
 * @param params
 * @returns {*}
 */
export const requestProjectInfo = params => {
  return axios.post(api.projectInfo, params).then(res => res.data);
};


/**
 * 项目成员列表
 * @param params
 * @returns {*}
 */
export const requestProjectMemberList = params => {
  return axios.post(api.projectMemberList, params).then(res => res.data);
};


/**
 * 删除项目成员
 * @param params
 * @returns {*}
 * */
export const requestDeleteProjectMember = params => {
  return axios.post(api.deleteProjectMember, params).then(res => res.data);
}


/**
 * 新增项目
 * @param params
 * @returns {*}
 */
export const requestAddProject = params => {
  return axios.post(api.addProject, params).then(res => res.data);
};


/**
 * 修改项目
 * @param params
 * @returns {*}
 */
export const requestUpdateProject = params => {
  return axios.post(api.updateProject, params).then(res => res.data);
};


/**
 * 删除项目
 * @param params
 * @returns {*}
 */
export const requestDeleteProject = params => {
  return axios.post(api.deleteProject, params).then(res => res.data);
};


/**
 * 获取服务授权列表
 * */
export const requestServiceList = params => {
  return axios.post(api.serviceList, params).then(res => res.data);
};


/**
 * 开通二级菜单服务
 * @param params  二级菜单ID
 * @returns {*}
 */
export const openService = params => {
  return axios.post(api.openService, params).then(res => res.data);
};
