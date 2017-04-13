var webpack = require('webpack');
var glob = require('glob');
var path = require('path');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var entries = getEntry('./src/pages/**/*.js');
var chunks = Object.keys(entries);
var prod = process.env.NODE_ENV === 'production';

module.exports = {
  entry: entries,

  output: {
    filename: '[name].[hash].js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/build/'
  },

  resolve: {
    extensions: ['.js', '.less', '.vue', '.json'],
    alias: {
      'src': path.resolve(__dirname, '/src'),
      'assets': path.resolve(__dirname, '/src/assets'),
      'components': path.resolve(__dirname, '/src/components')
    }
  },

  module: {
    rules: [
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'less-loader']
        })
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader'
        }),
        exclude: /node_modules/
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
        test: /\.(eot|svg|ttf|woff2?)$/,
        loader: 'file-loader'
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
      name: 'common',
      chunks: chunks,
      minChunks: chunks.length
    }),
    new ExtractTextPlugin('[name].css'),
    new ExtractTextPlugin('[name].less')
  ],

  // devServer: {
  //   hot: true,
  //   contentBase: path.resolve(__dirname, 'dist'),
  //   publicPath: '/'
  // }
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
    filename: prod ? path.resolve(__dianame, 'build') : page + '.html',
    template: pages[page],
    inject: true,
    minify: {
      removeComments: true,
      collapseWhitespace: false
    }
  };

  console.log(page, module.exports.entry);

  if (page in module.exports.entry) {
    conf.chunks = ['common', page],
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
