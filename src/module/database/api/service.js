import axios from 'axios';


//获取数据库申请列表
export const getApplyList = params =>{
    return axios.post(`/v1/dbcache/service/get/apply/list`, params).then(res => res.data);
}

//获取套餐数据
export const getPackageMsg = params =>{
    return axios.post(`/v1/dbcache/service/get/package`, params).then(res => res.data);
}

//获取部门领域列表
export const getDeptList = params =>{
    return axios.post(`/v1/dbcache/service/get/department/list`, params).then(res => res.data);
}

//获取产品模块列表
export const getProductList = params =>{
    return axios.post(`/v1/dbcache/service/get/product/list`,params).then(res => res.data);
}

//获取环境类型列表
export const getEnvironmentList = params =>{
    return axios.post(`/v1/dbcache/service/get/environment/list`, params).then(res => res.data);
}

//获取应用名称列表
export const getApplicationList = params =>{
    return axios.post(`/v1/dbcache/service/get/application/list`, params).then(res => res.data);
}

//获取管理员信息
export const getAdminMsg = params =>{
    return axios.post(`/v1/dbcache/service/get/manager/info`, params).then(res => res.data);
}

//获取数据库详情
export const getApplyDetail = params =>{
    return axios.get(`/v1/dbcache/service/get/apply/detail`, {params:params}).then(res => res.data);
}

//提交数据库申请
export const submitDbApply = params => {
    return axios.post(`/v1/dbcache/service/apply`, params).then(res => res.data);
}

//用户认证
export const auth = () => {
  let params = {
    "mark": "database_operator"
  };
  return axios.post(`/v1/manage/service/user/auth`,params).then(res => res.data);
};


























