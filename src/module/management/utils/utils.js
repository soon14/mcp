/**
 * Created by CHENRC2 on 2017-7-30.
 */

/**
 * 判断权限
 * @param roles
 * @param route
 * @returns {*}
 */
let hasPermission = (roles, route)=> {
  if (route.meta && route.meta.role) {
    return roles.some(role => route.meta.role.indexOf(role) >= 0);
  } else {
    return true
  }
};

/**
 * 生成路由
 * @param asyncRouterMap
 * @param roles
 * @constructor
 */
let GenerateRoutes = (asyncRouterMap,roles) => {
    const accessedRouters = asyncRouterMap.filter(v => {
      if (hasPermission(roles, v)) {
        if (v.children && v.children.length > 0) {
          v.children = v.children.filter(child => {
            if (hasPermission(roles, child)) {
              return child;
            }
            return false;
          });
          return v;
        } else {
          return v;
        }
      }
      return false;
    });
}
