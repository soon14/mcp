var path = require('path');
var config = require('../config')
var webpack = require('webpack')
var merge = require('webpack-merge')
var utils = require('./utils')
var baseWebpackConfig = require('./webpack.base.conf')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var glob = require('glob')
var env = process.env.NODE_ENV;
var configPath = config[env];
// add hot-reload related code to entry chunks
Object.keys(baseWebpackConfig.entry).forEach(function (name) {
  baseWebpackConfig.entry[name] = ['./build/dev-client'].concat(baseWebpackConfig.entry[name])
})
module.exports = merge(baseWebpackConfig, {
  module: {
    loaders: utils.styleLoaders({ sourceMap: configPath.cssSourceMap })
  },
  // eval-source-map is faster for development
  devtool: '#eval-source-map',
  plugins: [
    new webpack.DefinePlugin({
      'process.env':  JSON.stringify(configPath.env)
    }),
    // https://github.com/glenjamin/webpack-hot-middleware#installation--usage
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ]
})

var pages = utils.getEntry(['./src/module/*.html','./src/module/**/*.html']);

for (var pathname in pages) {
  const moduleFilter= configPath.env.moduleFilter;
  if(moduleFilter.filter(filter=>!!(filter.indexOf(pathname)+1)).length <= 0) {
    // 配置生成的html文件，定义路径等
    var conf = {
      filename: pathname + '.html',
      template: pages[pathname][0],   // 模板路径
      inject: true,              // js插入位置
      // necessary to consistently work with multiple chunks via CommonsChunkPlugin
      chunksSortMode: 'dependency',
      favicon: path.resolve(__dirname, '../static/images/favicon.ico')
    };

    if (pathname in module.exports.entry) {
      conf.chunks = ['manifest', 'vendor', pathname];
      conf.hash = true;
    }
    module.exports.plugins.push(new HtmlWebpackPlugin(conf));
  }
}
