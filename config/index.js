// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path');

module.exports = {
  dev: {
    env: require('./dev.env'),
    port: 9527,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {
      '/v1/oss': {
        target: require('./dev.env').api.login.host,
        changeOrigin: true
      },
      '/socket.io': {
        target: require('./dev.env').api.socket.host,
        logLevel: 'debug',
        changeOrigin: true,
        ws: true
      },
      '/v1/manage': {
        target: require('./dev.env').api.manaement.host,
        changeOrigin: true
      },
      '/v1/oss/object': {
        target: require('./dev.env').api.objectStore.uploadHost,
        changeOrigin: true
      },
      '/v1/appmanager': {
        target: require('./dev.env').api.objectStore.appmanager,
        changeOrigin: true
      },
      '/mcloud': {
        target: require('./dev.env').api.objectStore.mcloud,
        changeOrigin: true
      },
      '/nova': {
        target: require('./dev.env').api.monitor.host,
        changeOrigin: true
      },
      '/alarm/v1/reports': {
        target: require('./dev.env').api.monitor.host,
        changeOrigin: true
      },
      '/alarm/v1/monitors': {
        target: require('./dev.env').api.monitor.host,
        logLevel: 'debug',
        changeOrigin: true
      },
      '/alarm/v1/groups': {
        target: require('./dev.env').api.monitor.host,
        changeOrigin: true
      },
      '/alarm/v1/types': {
        target: require('./dev.env').api.monitor.host,
        changeOrigin: true
      },
      '/alarm/v1/alarms': {
        target: require('./dev.env').api.monitor.host,
        changeOrigin: true
      },
      '/v1/users/addressbook': {
        target: require('./dev.env').api.monitor.host,
        changeOrigin: true
      },
      '/alarm/v1/users': {
        target: require('./dev.env').api.monitor.host,
        changeOrigin: true
      },
      '/v1/auth': {
        target: require('./dev.env').api.video.authen,
        changeOrigin: true
      },
      '/v1/vod': {
        target: require('./dev.env').api.video.videoplay,
        changeOrigin: true
      },
      '/vod_app/v1/appmanager': {
        target: require('./dev.env').api.video.appmanager,
        changeOrigin: true
      },
      '/vod_obj/v1/oss/object': {
        target: require('./dev.env').api.video.uploadHost,
        changeOrigin: true
      },

      '/v2/search': {
        target: require('./dev.env').api.search.host,
        changeOrigin: true
      },
      '/v1/search/push': {
        target: require('./dev.env').api.search.push,
        changeOrigin: true
      },
      '/v1/search/docq': {
        target: require('./dev.env').api.search.search,
        changeOrigin: true
      },
      '/v1/dbcache':{
        target:require('./dev.env').api.database.host,
        changeOrigin: true
      }
    },
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  },
  prod: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '../',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  sit: {
    env: require('./sit.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '../',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  },
  uat: {
    env: require('./uat.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '../',
    productionSourceMap: true,
    productionGzip: false,
    productionGzipExtensions: ['js', 'css']
  }
}
