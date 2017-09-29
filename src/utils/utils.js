/**
 * Created by CHENRC2 on 2017-7-20.
 */

import _ from 'lodash';
import moment from 'moment';
import aes from './aes.js';
import ls from './local_storage_tool.js'

/**
 * 检测是否已经处理登录状态
 * @param router
 */
export const checkLogin = (router) => {
  if(router){
    router.beforeEach((to, from, next) => {
      const pathName=window.location.pathname,
        url = pathName + window.location.hash,
        user = ls.getObject("user"),
        filterUrl=process.env.urlNoAuthority,
        isFilterUrl =!!(_.findIndex(filterUrl,u=>u===to.path )+1);// 过滤不需要鉴权的页面
      if (!user && !isFilterUrl && to.path != "/login") {
        ls.addItem('historyUrl',JSON.stringify({ historyUrl: window.location.href,account:"" }));//记录访问的地址
        window.location.href = '/#/login';
        if(pathName=="/"){
          router.push('login');
        }
      } else if (user && user.role && (url === "/#/login"|| to.path == "/login")){
        window.location.href = '/module/management.html#/home';
      } else {
        next();
      }
    });
  }else{
    const user = ls.getObject("user");
    if(!user){
      ls.addItem('historyUrl',JSON.stringify({ historyUrl: window.location.href,account:"" }));//记录访问的地址
      window.location.href = '/#/login';
    }
  }
};


/**
 * 密码加密
 * @param data 需加密的串
 * @param keyStr
 * @param ivStr
 * @returns {string}
 */
export const aesEncrypt = (data, keyStr, ivStr) => {
  var sendData = aes.enc.Utf8.parse(data);
  var key = aes.enc.Utf8.parse(aes.MD5(''+keyStr).toString().substr(8, 16));
  var iv  = aes.enc.Utf8.parse(ivStr);
  var encrypted = aes.AES.encrypt(sendData, key,{ iv: iv,mode: aes.mode.CBC,padding: aes.pad.Pkcs7  });
  return encrypted.ciphertext.toString();
};

/**
 * 根据角色过滤路由
 * @param router 路由
 * @param roles 角色数据
 */
export const authorityRouterFilter=(router,roles)=>{
  let auth_router=[];
  _.forEach(router,item=>{
    let existRouter=auth_router.filter(item=>item.path==item.path);
    if(item.meta&&item.meta.role&&existRouter.length<=0){
      const auth_role=item.meta.role;
      if(auth_role.length=== 1 &&auth_role[0]=== "*"){
        auth_router.push(item);
      }else{
        _.forEach(roles,role=>{
          if(filterArrValue(auth_role,role)){
            auth_router.push(item);
            return;
          }
        });
      }
    }else{
      auth_router.push(item);
    }
  });
  return auth_router;
};
/**
 * value 是否包涵在数组arr中
 * @param arr
 * @param value
 */
export const filterArrValue=(arr,value)=>{
  return _.filter(arr,item=> {
      return item === value;
    }).length>0;
};

/**
 * 关闭当前窗口
 */
export const closeWindow = (url)=> {
  if (navigator.userAgent.indexOf("Firefox") != -1 || navigator.userAgent.indexOf("Chrome") !=-1){
    window.location.href=url;
    window.close();
  } else {
    window.opener = null;
    window.open("", "_self");
    window.close();
  }
};

/**
 * 数组合并
 * @param origin 原始数组
 * @param target 需要合并的object
 */
export const arrayAssign = (origin,object)=>{
  origin.map((item)=>{
    return _.assign(item,object);
  });
  return origin;
};

/**
 * JS原生判断是否存在类
 * @param elem
 * @param cls
 * @returns {boolean}
 */
export const hasClass = (elem, cls) => {
  cls = cls || '';
  if (cls.replace(/\s/g, '').length == 0) return false; //当cls没有参数时，返回false
  return new RegExp(' ' + cls + ' ').test(' ' + elem.className + ' ');
}

/**
 * JS原生判断添加类
 * @param ele
 * @param cls
 */
export const addClass = (ele, cls) => {
  if (!hasClass(ele, cls)) {
    ele.className = ele.className == '' ? cls : ele.className + ' ' + cls;
  }
}

/**
 * JS原生判断删除类
 * @param ele
 * @param cls
 */
export const removeClass = (ele, cls) => {
  if (hasClass(ele, cls)) {
    var newClass = ' ' + ele.className.replace(/[\t\r\n]/g, '') + ' ';
    while (newClass.indexOf(' ' + cls + ' ') >= 0) {
      newClass = newClass.replace(' ' + cls + ' ', ' ');
    }
    ele.className = newClass.replace(/^\s+|\s+$/g, '');
  }
}
