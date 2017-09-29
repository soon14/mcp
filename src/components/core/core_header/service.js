/**
 * Created by CHENRC2 on 2017-7-30.
 */
import axios from 'utils/http.js';
import {menusLists, menusSubLists, switchProjects} from "common/api.js";
import storage from "utils/local_storage_tool";

/**
 * 获取一级菜单
 * @returns {*}
 */
export const menusList = () => {
  return axios.post(menusLists, {}).then(res => res.data);
};

/**
 * 获取根据一级菜单ID获取二级菜单
 * @param params 一级菜单ID
 * @returns {*}
 */
export const menusSubList = params => {
  return axios.post(menusSubLists, params).then(res => res.data);
};

/**
 * 切换项目
 * @param params
 * @returns {*}
 */
export const switchProject = params => {
  return axios.post(switchProjects, params).then(res => res.data);
};
