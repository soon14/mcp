/**
 * Created by CHENRC2 on 2017-7-25.
 */
import axios from 'axios';
import * as api from "./api.js";
import Bus from "./bus";
import * as utils from "utils/utils.js"
import storage from "utils/session_storage_tool.js";
import VueCookie from "vue-cookie";
import Vue from 'vue';
let app = new Vue({});

//用户认证
export const auth = () => {
  let params = {
    "mark": "alarm_operator"
  };
  return axios.post(`/v1/manage/service/user/auth`,params).then(res => res.data);
};


//list hosts 获取主机数据列表
export const getHosts = params => {
  return axios.get(`/nova/`+params.project_id+`/servers/detail`).then(res => res.data.servers);
};
//导出报表
export const getReports = params => {
  return axios.get(`/alarm/v1/reports?start_time=${params.start}&end_time=${params.end}`).then(res => res);
};
// 获取cpu数据
export const getCpu = params => {
  return axios.get(`/alarm/v1/monitors/${params.host_id}/metric/${params.type}/measure?range=${params.range}`).then(res => res.data);
};
// 获取内存数据
export const getMemory = params => {
  return axios.get(`/alarm/v1/monitors/${params.host_id}/metric/${params.type}/measure?range=${params.range}`).then(res => res.data);
};
// 获取磁盘列表
export const getDisk = params => {
  return axios.get(`/alarm/v1/monitors/${params.host_id}/type_instance?type=${params.type}`).then(res => res.data);
};
// 获取磁盘读取数据
export const getDiskRead = params => {
  return axios.get(`/alarm/v1/monitors/${params.host_id}/metric/${params.type}/measure?range=${params.range}&type_instance=${params.instance}`).then(res => res.data);
};
//获取组
export const getAllGroups = () => {
  return axios.get(`/alarm/v1/groups`);
};
// 取两位整数
export const getInt = params => {
  if (params < 10){
    return "0"+params;
  }else {
    return params;
  }
};
//获取所有报警类型
export const getAlarmClass = () => {
  return axios.get(`/alarm/v1/types`).then(res => res.data);
};
//创建规则并提交
export const createNewAlarm = params => {
  return axios.post(`/alarm/v1/alarms`,params.data).then(res => res.data);
};


//获取通讯录
export const getContact = params => {
  return axios.get(`/alarm/v1/users/addressbook?depid=${params}`);
};
//获取用户信息
export const getUserInfo = params => {
  return axios.get(`/alarm/v1/users?uid=${params}`);
};
//搜索用户
export const searchUser = params => {
  return axios.get(`/alarm/v1/users/search?name=${params}`);
};
//创建分组
export const createGroups = params => {
  return axios.post(`/alarm/v1/groups`,params).then(res => res.data);
};
//删除分组
export const delGroups = params => {
  return axios.delete(`/alarm/v1/groups/${params}`).then(res => res.data);
};
//修改分组
export const changeGroups = params => {
  return axios.put(`/alarm/v1/groups/${params.group_id}`,params.param).then(res => res.data);
};
//添加组成员
export const addGroupMember = params => {
  return axios.post(`/alarm/v1/groups/${params.group_id}/endpoints`, params.param).then(res => res.data);
};
//获取组成员
export const getGroupMember = params => {
  return axios.get(`/alarm/v1/groups/${params.group_id}/endpoints`).then(res => res.data);
};
//移除组成员
export const delGroupMember = params => {
  return axios.delete(`/alarm/v1/groups/${params.group_id}/endpoints/${params.endpoint_id}`).then(res => res.data);
};


//获取所有的规则
export const getAllRules = () => {
  return axios.get(`/alarm/v1/alarms`).then(res => res.data);
};
//删除报警
export const delAlarm = params => {
  return axios.delete(`/alarm/v1/alarms/${params}`).then(res => res.data);
};
//更新报警
export const putAlarm = params => {
  return axios.put(`/alarm/v1/alarms/${params.alarm_id}`,params.data).then(res => res.data);
};











/**
 * 获取所有分组
 * @param params
 * @returns {*}
 */
export const getGroupsList = params => {
  return axios.post(api.getGroupsList, params).then(res => {
    return res.data;
  });
};

