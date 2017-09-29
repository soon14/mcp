import axios from 'axios';


//获取数据库申请列表
export const getApplyList = params =>{
    return axios.post(`/v1/dbcache/service/get/apply/list`, params).then(res => res.data); 
}

//获取数据库详情
export const getApplyDetail = params =>{
    return axios.get(`/v1/dbcache/service/get/apply/detail`, {params:params}).then(res => res.data);
}

//邮件链接页面提交云主机审核
export const mailLinkSubmit = params =>{
    return axios.post(`/v1/dbcache/service/submit/audit`, params).then(res => res.data);
}






























