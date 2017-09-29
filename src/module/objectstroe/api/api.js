
//退出登录
export const logout= '/v1/oss/auth/logout';
//获取应用列表
export const getAppList = '/v1/appmanager/application/list';
//创建应用
export const createApp = '/v1/appmanager/application/create';
//启用&禁用应用
export const startApp = '/v1/appmanager/application/activity/set';


//获取bucket列表
export const getBucketList = '/v1/appmanager/bucket/list';
//新建bucket
export const newCreateBucket = '/v1/appmanager/bucket/create';
//获取region列表
export const getregionList = '/mcloud/v3/region/list';
//判断bucket是否存在
export const isExist = '/v1/appmanager/bucket/isexist';
//删除bucket
export const deleteBucket = '/v1/appmanager/bucket/delete';
//根据名字模糊查找bucket
export const searchBucket = '/v1/appmanager/bucket/search';
//获取指定bucket信息
export const getBucketMessage = '/v1/appmanager/bucket/get';
//更改bucket权限
export const setBucket = '/v1/appmanager/bucket/acl/set';
//申请临时凭证
export const applyPermission = '/v1/appmanager/certification/create';
//分页获取桶内object列表
export const getObject = '/v1/appmanager/object/list';
//简单上传
export const simpleUpLoda = '/v1/oss/object/upload/';
//删除对象(单个)
export const singleDeleteObject = '/v1/appmanager/object/delete'; 
//删除对象(批量)
export const batchDeleteObject = '/v1/appmanager/object/batchdelete';
//根据名字模糊查找object
export const searchObject = '/v1/appmanager/object/search';
//获取文件下载地址
export const get_presignedurl = '/v1/appmanager/object/get_presignedurl';
//分片上传初始化
export const burstUpLoadInit = '/v1/appmanager/multiupload/init';
//列出已上传的分片
export const listBurstUpLoad = '/v1/appmanager/multiupload/list';
//分片上传
export const BurstUpLoad = '/v1/oss/object/uploadpart/';
//完成分片上传
export const suceesBurstUpLoad = '/v1/appmanager/multiupload/complete';
//放弃分片上传
export const abandonBurstUpLoad = '/v1/appmanager/multiupload/abort';

//判断是否有权限
export const userAuth = '/v1/manage/service/user/auth';