var webpack = require('webpack');
var glob = require('glob');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin');

var entries = getEntry('./src/pages/**/*.js');
var chunks = Object.keys(entries);
var prod = process.env.NODE_ENV === 'production';

module.exports = {
  entry: entries,

  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, '/build'),
    publicPath: '/build/'
  },

  resolve: {
    extensions: ['.js', '.less', '.vue']
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader!less-loader'
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        })
      },
      {
        test: /\.vue$/,
        use: 'vue-loader',
        // options: {
        //   loaders: {
        //     less: 'vue-style-loader!css-loader!less-loader'
        //   }
        // }
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/,
        loader: 'file-loader',
        options: {
          limit: 8192,
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendors',
      chunks: chunks,
      minChunks: chunks.length
    }),
    new ExtractTextPlugin('[name].css')
  ],

  devServer: {
    hot: true,
    contentBase: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  }
};

if (prod) {
  module.exports.devtool = '#source-map';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: 'production'
      }
    }),

    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),

    new webpack.LoaderOptionsPlugin({
      minimize: tru
    })
  ])
} else {
  module.exports.devtool = '#eval-source-map'
}

var pages = getEntry('./src/pages/**/*.html');
for (var page in pages) {
  var conf = {
    filename: prod ? path.resolve(__dianame, 'dist') : page + '.html',
    template: pages[page],
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: false
    }
  };

  if (page in module.exports.entry) {
    conf.chunks = ['vendors', page],
    conf.hash = false
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
