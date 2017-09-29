/**
 * Created by wenZerrrrrr on 2017/8/1.
 */
import axios from 'utils/http.js';
import {serviceList,serverauthor,roleList,addauthor} from 'common/api.js';

export const requestServiceList = params => {
  return axios.post(serviceList, params).then(res => res.data);
};

//	修改项目成员操作权限
export const serverAuthor = params =>{
  return  axios.post(serverauthor, params).then(res => res.data);
};

//	新增项目成员操作权限
export const addAuthor = params =>{
  return  axios.post(addauthor, params).then(res => res.data);
};

//获取用户角色的操作
export const rolesList = params =>{
  return axios.post(roleList, params).then(res => res.data);
}

