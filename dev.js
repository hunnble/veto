var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var config = require('./webpack.config.js');
var conf = require('./config.js');

var port = conf.port || 8080;
var devServerEntry = 'webpack-dev-server/client?http://127.0.0.1:' + port + '/';
var hotEntry = 'webpack/hot/only-dev-server';

for (var key in config.entry) {
  if (Array.isArray(config.entry[key])) {
    config.entry[key].unshift(devServerEntry, hotEntry);
  } else {
    config.entry[key] = [devServerEntry, hotEntry, config.entry[key]];
  }
  console.log(config.entry[key]);
}

config.plugins.push(new webpack.HotModuleReplacementPlugin());

new WebpackDevServer(webpack(config), {
 	publicPath: config.output.publicPath,
 	hot: true,
 	historyApiFallback: true,
 	stats: { colors: true }
 	}).listen(port, '127.0.0.1', function (err, result) {
 	if (err) {
    console.log(err);
 	}
 	console.log('server start at port ' + port);
});