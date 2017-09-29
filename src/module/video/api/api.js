//退出登录
export const logout= '/v1/oss/auth/logout';
//4.1.6	设置应用显示状态
export const videosetstate = '/v1/auth/vod/internal/video/application/set';
//获取视频点播应用列表
export const videoapplist = '/v1/auth/vod/internal/video/application/list';
//5.2.3	开通视频点播服务
export const videocreateapp = '/v1/auth/vod/internal/video/application/create';
//5.2.17	获取视频列表（对外开放）
export const videolist = '/v1/vod/video/list';
//5.2.4	创建视频
export const videocreate = '/v1/auth/vod/internal/video/create';
//5.2.16	获取分类列表（对外开放）
export const videocategorylist = '/v1/vod/category/list';
//5.2.6	添加分类
export const videocategoryadd = '/v1/auth/vod/internal/category/add';
//5.2.7	修改分类
export const videocategoryupdate = '/v1/auth/vod/internal/category/update';
//4.1.11 删除分类
export const videocategorydel = '/v1/auth/vod/internal/category/delete';
//5.2.5	提交视频
export const videocommit = '/v1/auth/vod/internal/video/commit';
//4.2.15	获取播放视频URL（对外开放）
export const getVideoUrl = '/v1/vod/video/get_url';
//列出已上传的分片
export const videouploadlist = '/v1/appmanager/multiupload/list';
////列出已上传的分片
//export const videouploadlist = '/vod_app/v1/appmanager/multiupload/list';
//分片上传
export const BurstUpLoad = '/v1/oss/object/uploadpart/';
//简单上传
export const simpleUpLoda = '/v1/oss/object/upload/';
////分片上传
//export const BurstUpLoad = '/vod_obj/v1/oss/object/uploadpart/';
////简单上传
//export const simpleUpLoda = '/vod_obj/v1/oss/object/upload/';
//5.3.1.2	新建bucket
export const videobucketcreate = '/v1/appmanager/bucket/create';
////5.3.1.2	新建bucket
//export const videobucketcreate = '/vod_app/v1/appmanager/bucket/create';
//5.2.20	删除视频（对外开放）
export const videodelete = '/v1/vod/video/delete';
//5.2.8	清除上传失败的视频
export const videoclearfailed = '/v1/auth/vod/internal/video/clear_upload_failed';
//获取二维码
export const getQp = '/v1/auth/qrcode/internal/get';
//5.2.18	获取视频信息（对外开放）
export const videoinfo = '/v1/vod/video/info';
//5.2.19	修改视频信息（对外开放）
export const videoupdate = '/v1/vod/video/update';

//判断是否有权限
export const userAuth = '/v1/manage/service/user/auth';
//////放弃分片上传
//export const abandonBurstUpLoad = '/vod_app/v1/appmanager/multiupload/abort';
////放弃分片上传
export const abandonBurstUpLoad = '/v1/appmanager/multiupload/abort';





////获取bucket列表
//export const getBucketList = '/v1/appmanager/bucket/list';
////新建bucket
//export const newCreateBucket = '/v1/appmanager/bucket/create';
////获取region列表
//export const getregionList = '/mcloud/v3/region/list';
////判断bucket是否存在
//export const isExist = '/v1/appmanager/bucket/isexist';
////删除bucket
//export const deleteBucket = '/v1/appmanager/bucket/delete';
////根据名字模糊查找bucket
//export const searchBucket = '/v1/appmanager/bucket/search';
////获取指定bucket信息
//export const getBucketMessage = '/v1/appmanager/bucket/get';
////更改bucket权限
//export const setBucket = '/v1/appmanager/bucket/acl/set';
////申请临时凭证
//export const videocertification = '/v1/appmanager/certification/create';
////分页获取桶内object列表
//export const getObject = '/v1/appmanager/object/list';
////删除对象(单个)
//export const singleDeleteObject = '/v1/appmanager/object/delete'; 
////删除对象(批量)
//export const batchDeleteObject = '/v1/appmanager/object/batchdelete';
////根据名字模糊查找object
//export const searchObject = '/v1/appmanager/object/search';
////获取文件下载地址
//export const get_presignedurl = '/v1/appmanager/object/get_presignedurl';
////分片上传初始化
//export const burstUpLoadInit = '/v1/appmanager/multiupload/init';
////完成分片上传
//export const suceesBurstUpLoad = '/v1/appmanager/multiupload/complete';
