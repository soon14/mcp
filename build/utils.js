var path = require('path');
var _ = require("lodash");
var glob = require('glob');
var config = require('../config')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var env = process.env.NODE_ENV;
var configPath = config[env];

exports.assetsPath = function (_path) {
  var assetsSubDirectory = process.env.NODE_ENV !== 'dev'
    ? configPath.assetsSubDirectory
    : configPath.assetsSubDirectory
  return path.posix.join(assetsSubDirectory, _path)
}

exports.cssLoaders = function (options) {
  options = options || {}
  // generate loader string to be used with extract text plugin
  function generateLoaders (loaders) {
    var sourceLoader = loaders.map(function (loader) {
      var extraParamChar
      if (/\?/.test(loader)) {
        loader = loader.replace(/\?/, '-loader?')
        extraParamChar = '&'
      } else {
        loader = loader + '-loader'
        extraParamChar = '?'
      }
      return loader + (options.sourceMap ? extraParamChar + 'sourceMap' : '')
    }).join('!')

    // Extract CSS when that option is specified
    // (which is the case during production build)
    if (options.extract) {
      return ExtractTextPlugin.extract('vue-style-loader', sourceLoader)
    } else {
      return ['vue-style-loader', sourceLoader].join('!')
    }
  }

  // http://vuejs.github.io/vue-loader/configurations/extract-css.html
  return {
    css: generateLoaders(['css']),
    postcss: generateLoaders(['css']),
    less: generateLoaders(['css', 'less']),
    sass: generateLoaders(['css', 'sass?indentedSyntax']),
    scss: generateLoaders(['css', 'sass']),
    stylus: generateLoaders(['css', 'stylus']),
    styl: generateLoaders(['css', 'stylus'])
  }
}

// Generate loaders for standalone style files (outside of .vue)
exports.styleLoaders = function (options) {
  var output = []
  var loaders = exports.cssLoaders(options)
  for (var extension in loaders) {
    var loader = loaders[extension]
    output.push({
      test: new RegExp('\\.' + extension + '$'),
      loader: loader
    })
  }
  return output
}

/*
 * 入口页
 */
exports.getEntry = function (globPath) {
  var entries = {},basename;
  if (typeof (globPath) != "object") {
    globPath = [globPath]
  }
  globPath.forEach((itemPath) => {
    glob.sync(itemPath).forEach(function (entry) {
      basename = path.basename(entry, path.extname(entry));
      const moduleFilter= configPath.env.moduleFilter;
      const moduleContainer= configPath.env.moduleContainer;
      //加载必须的模块
      if(moduleContainer&&moduleContainer.length>0){
        if(moduleContainer.filter(filter=>!!(entry.indexOf(filter)+1)).length > 0){
          entries=unitEntry(entries,entry,basename);
        }
      }
      //过滤不需要加载的模块
      else if(moduleFilter.filter(filter=>!!(entry.indexOf(filter)+1)).length <= 0){
        entries=unitEntry(entries,entry,basename);
      }
    });
  });
  return entries;
}
/**
 * 生成js 和 html 路径
 * @param entry
 * @returns {{}}
 */
var unitEntry = function (entries,entry,basename){
  var tmp, pathname;
  if (entry.split('/').length > 4) {
    tmp = entry.split('/').splice(-3);
    pathname = tmp.splice(0, 1) + '/' + basename; // 正确输出js和html的路径
    entries[pathname] = [entry];
  } else {
    entries[basename] = [entry];
  }
  return entries;
}
