var webpack = require('webpack');
var glob = require('glob');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var includePaths = [path.resolve(__dirname, 'src')];
var entries = getEntry('./src/pages/**/index.js');
var chunks = Object.keys(entries);
var prod = process.env.NODE_ENV === 'production';
var mockConf = require('./mock/config.js');
var mockPort = mockConf.port || 3000;

module.exports = {
  entry: entries,

  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'static')
  },

  resolve: {
    extensions: ['.js', '.less', '.vue', '.json'],
    alias: {
      '~assets': path.resolve(__dirname, 'src/assets'),
      '~styles': path.resolve(__dirname, 'src/assets/styles'),
      '~components': path.resolve(__dirname, 'src/components')
    }
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader'],
          publicPath: '../'
        }),
        include: includePaths
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader',
          publicPath: '../'
        }),
        include: includePaths
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            less: 'vue-style-loader!css-loader!less-loader'
          }
        },
        include: includePaths
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        include: includePaths
      },
      {
        test: /\.(eot|svg|ttf|woff2?)$/,
        loader: 'file-loader',
        include: includePaths
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'file-loader',
        options: {
          limit: 8192,
          name: '[name].[ext]?[hash]',
          useRelativePath: prod
        },
        include: includePaths
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      chunks: chunks,
      minChunks: chunks.length
    }),
    new ExtractTextPlugin('[name].css'),
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'static'),
    overlay: true,
    proxy: {
      '/api/*': {
        target: 'http://127.0.0.1:' + mockPort,
        secure: false
      }
    }
  }
};

if (prod) {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ])
} else {
  module.exports.devtool = '#eval-source-map'
}

for (var entry in entries) {
  var conf = {
    filename: entry + '.html',
    inject: true,
    chunks: ['common', entry],
    hash: false,
    template: path.resolve(__dirname, 'template.html'),
    minify: {
      removeComments: true,
      collapseWhitespace: false
    }
  };
  var pageConfig = require('./src/pages/' + entry.split('/')[0] + '/config.js');
  if (pageConfig) {
    if (pageConfig.template) {
      conf.template = pageConfig.template;
    }
    if (pageConfig.title) {
      conf.title = pageConfig.title;
    }
  }

  module.exports.plugins.push(new HtmlWebpackPlugin(conf));
}

function getEntry(globName) {
  var entries = {};

  glob.sync(globName).forEach(function(entry) {
    var basename = path.basename(entry, path.extname(entry));
    var pathname = entry.split('/').splice(-2)[0] + '/' + basename;
    entries[pathname] = entry
  });

  return entries;
}
