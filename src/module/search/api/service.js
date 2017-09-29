import axios from 'utils/http.js';
import * as api from "./api.js";
import * as utils from "utils/utils.js";
import storage from 'utils/local_storage_tool';


/**
 * 创建索引
 * @param params
 * @returns {*}
 */
export const requestCreateIndex = params => {
	// getUser();
	return axios.post(api.createIndex, params).then(res => res.data);
};

/**
 * 创建租户
 * @param params
 * @returns {*}
 */
export const requestCreateTenant = params => {
	// getUser();
	return axios.post(api.createTenant, params).then(res => res.data);
};

/**
 * 重建索引
 * @param params
 * @returns {*}
 */
export const requestRebuildIndex = params => {
	// getUser();
	return axios.post(api.rebuildIndex, params).then(res => res.data);
};

/**
 * 获取租户下索引列表
 * @param params
 * @returns {*}
 */
export const requestGetIndexList = params => {
	// getUser();
	return axios.post(api.getIndexList, params).then(res => res.data);
};

/**
 * 输入索引名进行搜索
 * @param params
 * @returns {*}
 */
export const requestSearchIndex = params => {
	// getUser();
	return axios.post(api.searchIndex, params).then(res => res.data);
};

/**
 * 简单搜索
 * @param params
 * @returns {*}
 */
export const requestSimpleSearch = params => {
	// getUser();
	return axios.post(api.simpleSearch, params).then(res => res.data);
};

/**
 * 获取索引下的数据详情
 * @param params
 * @returns {*}
 */
export const requestIndexDetail = params => {
	// getUser();
	return axios.post(api.indexDetail, params).then(res => res.data);
};

/**
 * 模拟应用推送接口
 * @param params
 * @returns {*}
 */
export const requestSimulationPush = params => {
	// getUser();
	return axios.post(api.simulationPush, params).then(res => res.data);
};

/**
 * 模拟应用搜索接口
 * @param params
 * @returns {*}
 */
export const requestSimulationSearch = params => {
	// getUser();
	return axios.post(api.simulationSearch, params).then(res => res.data);
};

/**
 * 获取租户信息接口
 * @param params
 * @returns {*}
 */
export const requestTenantInfo = params => {
	// getUser();
	return axios.post(api.tenantInfo, params).then(res => res.data);
};


/**
 * 获取权限
 * @param params
 * @returns {*}
 */
export const auth = () => {
  let params = {
	// "mark": "search_admin"
  };
  return axios.post(api.userAuth,params).then(res => res.data);
};
