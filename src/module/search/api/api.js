// 创建索引接口
export const createIndex =  '/v2/search/create/index';

// 重建索引接口
export const rebuildIndex =  '/v2/search/rebuild/index';

// 获取租户下的索引列表接口
export const getIndexList =  '/v2/search/get/tenant_index_list';

// 输入索引名进行搜索接口
export const searchIndex =  '/v2/search/indexq';

// 简单搜索接口
export const simpleSearch =  '/v2/search/simpleq';

// 获取索引下的数据详情接口
export const indexDetail =  '/v2/search/get/index_data_detail';

// 模拟应用推送接口
export const simulationPush =  '/v1/search/push';

// 模拟应用搜索接口
export const simulationSearch =  '/v1/search/docq';

// 获取租户信息接口
export let tenantInfo =  '/v2/search/get/tenant_info';

// 创建租户接口
export const createTenant =  '/v2/search/create/tenant';

//判断是否有权限
export const userAuth = '/v1/manage/service/user/auth';

