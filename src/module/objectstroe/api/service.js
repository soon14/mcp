/**
 * Created by CHENRC2 on 2017-7-25.
 */
import axios from 'axios';
import * as api from "./api.js";
import Bus from "./bus";
import * as utils from "utils/utils.js"
import storage from "utils/local_storage_tool.js";
import VueCookie from "vue-cookie";
import Vue from 'vue';
let app = new Vue({});

/**
 * 退出登录
 * @param params
 * @returns {*}
 */
export const requestLogout = () => {
  return axios.post(api.logout).then(res => {
    let { code, data } = res.data;
    if(code.toString() === "200"){
      storage.removeAll();
    }
    return res.data;
  });
};

/**
 * 获取权限
 * @param params
 * @returns {*}
 */
export const auth = () => {
  let params = {
    // "mark": "oss_operator"
  };
  return axios.post(api.userAuth,params).then(res => res.data);
};

/**
 * 获取权限
 * @param params
 * @returns {*}
 */
/*export const userAuth = () => {
	let params = {
		"mark": "oss_operator"
	}
return axios.post(api.userAuth,params).then(res => {
    let { errorCode, result } = res.data;
    if(errorCode.toString() === "200"){
    		if (JSON.parse(window.localStorage.user).roleFormat.member) {
	        if (result.length === 0) {
	       	   window.sessionStorage.isOssRole = "false";
	       	   window.location.href = '/module/objectstroe.html#/object/create';
	        }else{
	        	  window.sessionStorage.isOssRole = "true";
	        }
        }
    }else{

    }
    return result;
});
};*/
/**
 * 获取应用列表
 * @param params
 * @returns {*}
 */
export const getAppList = params => {
  return axios.post(api.getAppList, params).then(res => res.data);
};

/**
 * 创建应用
 * @param params
 * @returns {*}
 */
export const createApp = params => {
  return axios.post(api.createApp, params).then(res => {
  	return res.data;
  });
};

/**
 * 启用&禁用应用
 * @param params
 * @returns {*}
 */
export const startApp = params => {
  return axios.post(api.startApp, params).then(res => {
  	return res.data;
  });
};

/**
 * 获取bucket列表
 * @param params
 * @returns {*}
 */
export const getBucketList = params => {
  return axios.post(api.getBucketList, params).then(res => {
  	return res.data;
  });
};

/**
 * 新建bucket
 * @param params
 * @returns {*}
 */
export const newCreateBucket = params => {
  return axios.post(api.newCreateBucket, params).then(res => {
  	return res.data;
  });
};

/**
 * 根据名字模糊查找bucket
 * @param params
 * @returns {*}
 */
export const searchBucket = params => {
  return axios.post(api.searchBucket, params).then(res => {
  	return res.data;
  });
};

/**
 * 获取region列表
 * @param params
 * @returns {*}
 */
export const getregionList = params => {
  return axios.post(api.getregionList, params).then(res => {
  	return res.data;
  });
};

/**
 * 判断bucket是否存在
 * @param params
 * @returns {*}
 */
export const isExist = params => {
  return axios.post(api.isExist, params).then(res => {
  	return res.data;
  });
};

/**
 * 删除bucket
 * @param params
 * @returns {*}
 */
export const deleteBucket = params => {
  return axios.post(api.deleteBucket, params).then(res => {
  	return res.data;
  });
};

/**
 * 获取指定bucket信息
 * @param params
 * @returns {*}
 */
export const getBucketMessage = params => {
  return axios.post(api.getBucketMessage, params).then(res => {
  	return res.data;
  });
};

/**
 * 更改bucket权限
 * @param params
 * @returns {*}
 */
export const setBucket = params => {
  return axios.post(api.setBucket, params).then(res => {
  	return res.data;
  });
};

/**
 * 申请临时凭证
 * @param params
 * @returns {*}
 */
export const applyPermission = params => {
  return axios.post(api.applyPermission, params).then(res => {
  	return res.data;
  });
};

/**
 * 分页获取桶内object列表
 * @param params
 * @returns {*}
 */
export const getObject = params => {
  return axios.post(api.getObject, params).then(res => {
  	return res.data;
  });
};
/**
 * 分页获取桶内object列表
 * @param params
 * @returns {*}
 */
export const searchObject = params => {
  return axios.post(api.searchObject, params).then(res => {
  	return res.data;
  });
};
/**
 * 获取文件下载地址
 * @param params
 * @returns {*}
 */
export const get_presignedurl = params => {
  return axios.post(api.get_presignedurl, params).then(res => {
  	return res.data;
  });
};
/**
 * 删除对象(单个)
 * @param params
 * @returns {*}
 */
export const singleDeleteObject = params => {
	let issync = '';
	if(window.sessionStorage.issync === 'true'){
		issync = '?issync=true'
	}
  return axios.post(api.singleDeleteObject + issync, params).then(res => {
  	return res.data;
  });
};
/**
 * 删除对象(批量)
 * @param params
 * @returns {*}
 */
export const batchDeleteObject = params => {
	let issync = '';
	if(window.sessionStorage.issync === 'true'){
		issync = '?issync=true'
	}
  return axios.post(api.batchDeleteObject + issync, params).then(res => {
  	return res.data;
  });
};
/**
 * 分片上传初始化
 * @param params
 * @returns {*}
 */
export const burstUpLoadInit = params => {
  return axios.post(api.burstUpLoadInit, params, {headers:{"x-amz-acl":"public-read"}}).then(res => {
  	return res.data;
  });
};
/**
 * 列出已上传的分片
 * @param params
 * @returns {*}
 */
export const listBurstUpLoad = params => {
  return axios.post(api.listBurstUpLoad, params).then(res => {
  	return res.data;
  });
};
/**
 * 完成分片上传
 * @param params
 * @returns {*}
 */
export const suceesBurstUpLoad = params => {
	let issync = '';
	if(window.sessionStorage.issync === 'true'){
		issync = '?issync=true'
	}
  return axios.post(api.suceesBurstUpLoad + issync, params).then(res => {
  	return res.data;
  });
};
/**
 * 放弃分片上传
 * @param params
 * @returns {*}
 */
export const abandonBurstUpLoad = params => {
  return axios.post(api.abandonBurstUpLoad, params).then(res => {
  	return res.data;
  });
};

//分片上传
export const BurstUpLoad = (params,certification,appid,bucket,objet,partNumber,uploadId,numlist,size,objetname,mynewdate) => {
	let mydate = new Date();
	let headerdata = {'certification':certification,'x-amz-date':mydate.toGMTString(),'x-amz-acl':'public-read'};
	let arrlist = {};
	if (numlist < partNumber){
		numlist = numlist + 1;
		let xhr = new XMLHttpRequest();
		xhr.open('PUT',api.BurstUpLoad + `${appid}/${bucket}/${objet}?partNumber=${numlist}&uploadId=${uploadId}`,true);
		xhr.onreadystatechange = function(res) {
			let statueData = res.target.status;
			if(res.target.readyState === 4){
				if(res.target.status === 200){
					BurstUpLoad(params,certification,appid,bucket,objet,partNumber,uploadId,numlist,size,objetname,mynewdate);
				}
			}
		}
		xhr.onerror = function(res){
			app.$notify({
				title: '警告',
				message: '上传失败',
				offset: 100,
				type:'warning'
			});
			arrlist.filename_ = objetname;
			arrlist.filestatus_ = 200;
			arrlist.time = mynewdate;
			arrlist.xtthr = xhr;
			Bus.$emit('nameflie',arrlist);
		}
		xhr.upload.addEventListener('progress',function(e){
			if(e.lengthComputable){
				arrlist.filename_ = objetname;
				arrlist.filesize_ = size;
				arrlist.time = mynewdate;
				arrlist.filestatus_ = numlist/partNumber;
				arrlist.xtthr = xhr;
				Bus.$emit('nameflie',arrlist);
			}
		},false)
		xhr.setRequestHeader("certification", certification);
		xhr.setRequestHeader("x-amz-date", mydate.toGMTString());
		xhr.setRequestHeader("x-amz-acl", "private");
		xhr.send(params[numlist-1]);
	}else{
		let listBurstUpLoadData = JSON.stringify({'appid':appid,'bucket':bucket,'certification':certification,'object':objetname,'uploadid':uploadId});
		listBurstUpLoad(listBurstUpLoadData).then(res => {
    				if(res.code === 200){
    					let suceesBurstUpLoadData = JSON.stringify({'appid':appid,'bucket':bucket,'certification':certification,'object':objetname,'uploadid':uploadId,'parts':res.data.parts});
    					suceesBurstUpLoad(suceesBurstUpLoadData).then(res => {
    						console.log(res)
    					});
    				}
    			})
	}
};

//简单上传
export const simpleUpLoda = (params,certification,appid,bucket,objetname,mynewdate) => {
	let issync = '';
	if(window.sessionStorage.issync === 'true'){
		issync = '?issync=true'
	}
	let formData;
	let xhr;
	formData = params;
	let arrlist = {};
	let data_All;
	let mydata = new Date();
	xhr = new XMLHttpRequest();
	let objname = encodeURIComponent(objetname);
		if (objname.indexOf('*')) {
			objname = objname.replace(/\*/g,"%2A");
		}
		if(objname.indexOf('(')){
			objname = objname.replace(/\(/g,"%28");
		}
		if(objname.indexOf(')')){
			objname = objname.replace(/\)/g,"%29");
		}
		if(objname.indexOf('!')){
			objname = objname.replace(/\!/g,"%21");
		}
		if(objname.indexOf("'")){
			objname = objname.replace(/\'/g,"%27");
		}
	let appId = encodeURIComponent(appid);
		if (appId.indexOf('*')) {
			appId = appId.replace(/\*/g,"%2A");
		}
		if(appId.indexOf('(')){
			appId = appId.replace(/\(/g,"%28");
		}
		if(appId.indexOf(')')){
			appId = appId.replace(/\)/g,"%29");
		}
		if(appId.indexOf('!')){
			appId = appId.replace(/\!/g,"%21");
		}
		if(appId.indexOf("'")){
			appId = appId.replace(/\'/g,"%27");
		}
	let bucKetname = encodeURIComponent(bucket);
		if (bucKetname.indexOf('*')) {
			bucKetname = bucKetname.replace(/\*/g,"%2A");
		}
		if(bucKetname.indexOf('(')){
			bucKetname = bucKetname.replace(/\(/g,"%28");
		}
		if(bucKetname.indexOf(')')){
			bucKetname = bucKetname.replace(/\)/g,"%29");
		}
		if(bucKetname.indexOf('!')){
			bucKetname = bucKetname.replace(/\!/g,"%21");
		}
		if(bucKetname.indexOf("'")){
			bucKetname = bucKetname.replace(/\'/g,"%27");
		}

	xhr.open('PUT', api.simpleUpLoda + `${appId}/${bucKetname}/${objname}${issync}`, true);
	xhr.onsuccess = function(data) {
	}
	xhr.onerror = function(res){
			app.$notify({
				title: '警告',
				message: '上传失败',
				offset: 100,
				type:'warning'
			});
			arrlist.filename_ = formData.name;
			arrlist.time = mynewdate;
			arrlist.filestatus_ = 200;
			arrlist.xtthr = xhr;
			Bus.$emit('nameflie',arrlist);
		}
	xhr.onreadystatechange = function(res) {
		if(res.target.readyState === 4){
			if(res.target.status === 200){

			}else{
				let statueData = res.target.status
		    }
		}
	};
	xhr.upload.addEventListener('progress',function(e){
		if(e.lengthComputable){
			arrlist.filename_ = formData.name;
			arrlist.filesize_ = e.total;
			arrlist.filestatus_ = e.loaded/e.total;
			arrlist.xtthr = xhr;
			arrlist.time = mynewdate;
			Bus.$emit('nameflie',arrlist);
		}
	},false)
	xhr.setRequestHeader("certification", certification);
	xhr.setRequestHeader("x-amz-date", mydata.toGMTString())
	xhr.setRequestHeader("x-amz-acl", "private");
	xhr.send(formData);
};
