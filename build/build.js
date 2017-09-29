// https://github.com/shelljs/shelljs
require('shelljs/global')
//env.NODE_ENV = 'production'

var path = require('path')
var config = require('../config')
var ora = require('ora')
var webpack = require('webpack')
var env = process.env.NODE_ENV
var webpackConfig = require('./webpack.prod.conf')
var configPath = config[env];

console.log(
  '  Tip:\n' +
  '  Built files are meant to be served over an HTTP server.\n' +
  '  Opening index.html over file:// won\'t work.\n'
)

var spinner = ora('building for production...');
spinner.start();


var assetsPath = path.join(configPath.assetsRoot, configPath.assetsSubDirectory);

rm('-rf', configPath.assetsRoot);
mkdir('-p', configPath.assetsRoot);
//cp('-R', 'static/*', assetsPath);

webpack(webpackConfig, function (err, stats) {
  spinner.stop()
  if (err) throw err
  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n')
})
