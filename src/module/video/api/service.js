/**
 * Created by CHENRC2 on 2017-7-25.
 */
import Vue from 'vue';
import axios from 'axios';
import * as api from "./api.js";
import Bus from "./bus";
import * as utils from "utils/utils.js"
import storage from "utils/local_storage_tool.js";
import VueCookie from "vue-cookie";
import { Notification } from 'element-ui';
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
    "mark": "video_operator"
  };
  return axios.post(api.userAuth,params).then(res => res.data);
};
/**
 * 设置应用显示状态
 * @param params
 * @returns {*}
 */
export const videosetstate = params => {
	 return axios.post(api.videosetstate, params).then(res => {
	  	return res.data;
	  });
};
/**
 * 获取视频点播应用列表
 * @param params
 * @returns {*}
 */
export const videoapplist = params => {
	 return axios.post(api.videoapplist, params).then(res => res.data);
};

/**
 * 开通视频点播服务
 * @param params
 * @returns {*}
 */
export const videocreateapp = params => {
  return axios.post(api.videocreateapp, params).then(res => {
  	return res.data;
  });
};

/**
 * 获取视频列表
 * @param params
 * @returns {*}
 */
export const videolist = params => {
  return axios.post(api.videolist, params).then(res => {
  	return res.data;
  });
};

/**
 * 创建视频
 * @param params
 * @returns {*}
 */
export const videocreate = params => {
  return axios.post(api.videocreate, params).then(res => {
  	return res.data;
  });
};

//去掉空格
export const	 delHtmlTag = str => {
	if (str === "") {
		return str;
	}else{
		let result = str.replace(/(^\s+)|(\s+$)/g,"");//去掉前后空格
		return result.replace(/\s/g,"");//去除文章中间空格
	}
//	let res = str.replace(/<\[^>]*>/gim,"");//去掉所有的html标记

};
export const requireNullMsg = (app, str, msg) => {
//	let param = delHtmlTag(str);
	let param = str
	if(param.trim()=="" || param==null || param==undefined) {
  		app.$notify({
          title: '警告',
          message: msg,
          type: 'warning',
          duration: 3000
        });
        return true;
  	}
	return false;
};
export const maxLengthTest = (app, str, maxLen, msg) => {
//	let param = delHtmlTag(str);
	let param = str;
	if(param.trim().length>maxLen) {
  		app.$notify({
          title: '警告',
          message: msg,
          type: 'warning',
          duration: 3000
        });
        return true;
  	}
	return false;
};
export const isLegal = (app, str, maxLen, msg) => {
//	let param = delHtmlTag(str);
	let param = str;
	if(param.trim().length>maxLen) {
  		app.$notify({
          title: '警告',
          message: msg,
          type: 'warning',
          duration: 3000
        });
        return true;
  	}
	return false;
};
/**
 * 获取分类列表
 * @param params
 * @returns {*}
 */
export const videocategorylist = params => {
  return axios.post(api.videocategorylist, params).then(res => {
  	return res.data;
  });
};

/**
 * 添加分类
 * @param params
 * @returns {*}
 */
export const videocategoryadd = params => {
  return axios.post(api.videocategoryadd, params).then(res => {
  	return res.data;
  });
};
/**
 * 修改分类
 * @param params
 * @returns {*}
 */
export const videocategoryupdate = params => {
  return axios.post(api.videocategoryupdate, params).then(res => {
  	return res.data;
  });
};
/**
 * 删除分类
 * @param params
 * @returns {*}
 */
export const videocategorydel = params => {
  return axios.post(api.videocategorydel, params).then(res => {
  	return res.data;
  });
};
/**
 * 提交视频
 * @param params
 * @returns {*}
 */
export const videocommit = params => {
  return axios.post(api.videocommit, params).then(res => {
  	return res.data;
  });
};
/**
 * 获取播放视频URL
 * @param params
 * @returns {*}
 */
export const getVideoUrl = params => {
  return axios.post(api.getVideoUrl, params).then(res => {
  	return res.data;
  });
};
/**
 * 删除视频
 * @param params
 * @returns {*}
 */
export const videodelete = params => {
  return axios.post(api.videodelete, params).then(res => {
  	return res.data;
  });
};
/**
 * 清除上传失败的视频
 * @param params
 * @returns {*}
 */
export const videoclearfailed = params => {
  return axios.post(api.videoclearfailed, params).then(res => {
  	return res.data;
  });
};
/**
 * 获取二维码
 * @param params
 * @returns {*}
 */
export const getQp = params => {
  return axios.post(api.getQp, params).then(res => {
  	return res.data;
  });
};
/**
 * 获取视频信息
 * @param params
 * @returns {*}
 */
export const videoinfo = params => {
  return axios.post(api.videoinfo, params).then(res => {
  	return res.data;
  });
};
/**
 * 修改视频信息
 * @param params
 * @returns {*}
 */
export const videoupdate = params => {
  return axios.post(api.videoupdate, params).then(res => {
  	return res.data;
  });
};
/**
 * 新建bucket
 * @param params
 * @returns {*}
 */
export const videobucketcreate = params => {
  return axios.post(api.videobucketcreate, params).then(res => {
  	return res.data;
  });
};

/**
 * 列出已上传的分片
 * @param params
 * @returns {*}
 */
export const videouploadlist = params => {
  return axios.post(api.videouploadlist, params).then(res => {
  	return res.data;
  });
};

//分片上传
export const BurstUpLoad = (params, certification, appid, bucket, objet, partNumber, uploadId, numlist, size, objetname, time, fileid) => {
	let mydate = new Date();
	let arrlist = {};
	let objname = encodeURIComponent(objet);
	if(objname.indexOf('*')) {
		objname = objname.replace(/\*/g, "%2A");
	}
	if(objname.indexOf('(')) {
		objname = objname.replace(/\(/g, "%28");
	}
	if(objname.indexOf(')')) {
		objname = objname.replace(/\)/g, "%29");
	}
	if(objname.indexOf('!')) {
		objname = objname.replace(/\!/g, "%21");
	}
	if(objname.indexOf("'")) {
		objname = objname.replace(/\'/g, "%27");
	}
	let appId = encodeURIComponent(appid);
	if(appId.indexOf('*')) {
		appId = appId.replace(/\*/g, "%2A");
	}
	if(appId.indexOf('(')) {
		appId = appId.replace(/\(/g, "%28");
	}
	if(appId.indexOf(')')) {
		appId = appId.replace(/\)/g, "%29");
	}
	if(appId.indexOf('!')) {
		appId = appId.replace(/\!/g, "%21");
	}
	if(appId.indexOf("'")) {
		appId = appId.replace(/\'/g, "%27");
	}
	let bucKetname = encodeURIComponent(bucket);
	if(bucKetname.indexOf('*')) {
		bucKetname = bucKetname.replace(/\*/g, "%2A");
	}
	if(bucKetname.indexOf('(')) {
		bucKetname = bucKetname.replace(/\(/g, "%28");
	}
	if(bucKetname.indexOf(')')) {
		bucKetname = bucKetname.replace(/\)/g, "%29");
	}
	if(bucKetname.indexOf('!')) {
		bucKetname = bucKetname.replace(/\!/g, "%21");
	}
	if(bucKetname.indexOf("'")) {
		bucKetname = bucKetname.replace(/\'/g, "%27");
	}

	if(numlist < partNumber) {
		numlist = numlist + 1;
		let xhr = new XMLHttpRequest();
		xhr.open('PUT', api.BurstUpLoad + `${appId}/${bucket}/${objet}?partNumber=${numlist}&uploadId=${uploadId}`, true);
		arrlist.xtthr = xhr;
		Bus.$emit('videoflie',arrlist);
		xhr.onreadystatechange = function(res) {
			let statueData = res.target.status;
			if(res.target.readyState === 4) {
				if(res.target.status === 200) {
					BurstUpLoad(params, certification, appid, bucket, objet, partNumber, uploadId, numlist, size, objetname, time, fileid);
				}
			}
		}
		xhr.onerror = function(res) {
			arrlist.filename_ = objetname;
			arrlist.filesize_ = 200;
			arrlist.xtthr = xhr;
			arrlist.time = time;
			Bus.$emit('video_flie',arrlist);
			app.$notify({
				title: '警告',
				message: '上传失败',
				offset: 100,
				type:'warning'
			});
		}
		xhr.onabort = function(e){
			let isabort = fileid;
			Bus.$emit('isabort',isabort);
		}
		xhr.upload.addEventListener('progress', function(e) {
			let video;
			if (window.sessionStorage.videoFile && window.sessionStorage.videoFile !== '') {
			    video = JSON.parse(window.sessionStorage.videoFile);
			}
			if(e.lengthComputable) {
				arrlist.numlist = e.loaded;
				arrlist.filename_ = objetname;
				arrlist.filesize_ = e.total;
				arrlist.filestatus_ = ((numlist - 1)*params[0].size + e.loaded)/size;
				arrlist.xtthr = xhr;
				arrlist.time = time;
				if (!video) {
					Bus.$emit('videoflie',arrlist);
				}else if (!video[fileid].delecteFileUpload) {
					Bus.$emit('videoflie',arrlist);
				}
			}
		}, false)
		xhr.setRequestHeader("certification", certification);
		xhr.setRequestHeader("x-amz-date", mydate.toGMTString());
		xhr.setRequestHeader("x-amz-acl", "private");
		xhr.send(params[numlist - 1]);
		return xhr;
	} else {
		let msg = {
			"appid":appid,
			"bucket":bucket,
			"certification":certification,
			"object":objet,
			"uploadid":uploadId,
			"fileid":fileid
		}
		Bus.$emit('video_success_',msg);
//		let listBurstUpLoadData = JSON.stringify({
//			'appid': appid,
//			'bucket': bucket,
//			'certification': certification,
//			'object': objetname,
//			'uploadid': uploadId
//		});
//		listBurstUpLoad(listBurstUpLoadData).then(res => {
//			if(res.code === 200) {
//				let suceesBurstUpLoadData = JSON.stringify({
//					'appid': appid,
//					'bucket': bucket,
//					'certification': certification,
//					'object': objetname,
//					'uploadid': uploadId,
//					'parts': res.data.parts
//				});
//				suceesBurstUpLoad(suceesBurstUpLoadData).then(res => {
//
//				});
//			}
//		})
	}
};

//简单上传
export const simpleUpLoda = (params, certification, appid, bucket, objetname, time, fileid) => {
	let formData;
	let xhr;
	formData = params;
	let arrlist = {};
	let data_All;
	let mydata = new Date();
	xhr = new XMLHttpRequest();
	let objname = encodeURIComponent(objetname);
	if(objname.indexOf('*')) {
		objname = objname.replace(/\*/g, "%2A");
	}
	if(objname.indexOf('(')) {
		objname = objname.replace(/\(/g, "%28");
	}
	if(objname.indexOf(')')) {
		objname = objname.replace(/\)/g, "%29");
	}
	if(objname.indexOf('!')) {
		objname = objname.replace(/\!/g, "%21");
	}
	if(objname.indexOf("'")) {
		objname = objname.replace(/\'/g, "%27");
	}
	let appId = encodeURIComponent(appid);
	if(appId.indexOf('*')) {
		appId = appId.replace(/\*/g, "%2A");
	}
	if(appId.indexOf('(')) {
		appId = appId.replace(/\(/g, "%28");
	}
	if(appId.indexOf(')')) {
		appId = appId.replace(/\)/g, "%29");
	}
	if(appId.indexOf('!')) {
		appId = appId.replace(/\!/g, "%21");
	}
	if(appId.indexOf("'")) {
		appId = appId.replace(/\'/g, "%27");
	}
	let bucKetname = encodeURIComponent(bucket);
	if(bucKetname.indexOf('*')) {
		bucKetname = bucKetname.replace(/\*/g, "%2A");
	}
	if(bucKetname.indexOf('(')) {
		bucKetname = bucKetname.replace(/\(/g, "%28");
	}
	if(bucKetname.indexOf(')')) {
		bucKetname = bucKetname.replace(/\)/g, "%29");
	}
	if(bucKetname.indexOf('!')) {
		bucKetname = bucKetname.replace(/\!/g, "%21");
	}
	if(bucKetname.indexOf("'")) {
		bucKetname = bucKetname.replace(/\'/g, "%27");
	}

	xhr.open('PUT', api.simpleUpLoda + `${appId}/${bucKetname}/${objname}`, true);
	xhr.onsuccess = function(data) {
		console.log(data)
	}
	xhr.onerror = function(res) {
//		arrlist.filename_ = formData.name;
//		arrlist.filesize_ = 200;
////		arrlist.filestatus_ = 200;
//		arrlist.xtthr = xhr;
//		arrlist.time = time;
//		Bus.$emit('video_flie',arrlist);
//		app.$notify({
//			title: '警告',
//			message: '上传失败',
//			offset: 100,
//			type:'warning'
//		});
		//			arrlist.filename_ = formData.name;
		//			arrlist.filestatus_ = 200;
		//			arrlist.xtthr = xhr;
		//			Bus.$emit('nameflie',arrlist);
	}

	xhr.onreadystatechange = function(res) {
		//		console.log(res)
		if(res.target.readyState === 4) {
			if(res.target.status === 200) {

			} else {
				//				let statueData = res.target.status
			}
		}
	};
	xhr.onabort = function(e){
		let isabort = fileid;
		Bus.$emit('isabort',isabort);
	}
	xhr.upload.addEventListener('progress', function(e) {
		let video
		if (window.sessionStorage.videoFile && window.sessionStorage.videoFile !== '') {
		   video = JSON.parse(window.sessionStorage.videoFile);
		}
		if(e.lengthComputable) {
			arrlist.filename_ = formData.name;
			arrlist.filesize_ = e.total;
			arrlist.filestatus_ = e.loaded/e.total;
			arrlist.xtthr = xhr;
			arrlist.time = time;
			if (!video) {
				Bus.$emit('videoflie',arrlist);
			}else if (!video[fileid].delecteFileUpload) {
				Bus.$emit('videoflie',arrlist);
			}
		}
	}, false)
	xhr.setRequestHeader("certification", certification);
	xhr.setRequestHeader("x-amz-date", mydata.toGMTString())
	xhr.setRequestHeader("x-amz-acl", "private");
	xhr.send(formData);
	return xhr;
};
