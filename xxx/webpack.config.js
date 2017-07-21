/**
 * Created by lilei on 2017/3/16.
 */
const HtmlWebpackPlugin = require('html-webpack-plugin'); //installed via npm
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const webpack = require('webpack'); //to access built-in plugins
const path = require('path')
const ip = require('ip')

const pkg = require('./package.json')
var env = process.env.NODE_ENV || 'development'
var __DEV__ = env === 'development'

/** 根据环境来设置不同的配置 **/
// var host = __DEV__ ? ip.address() : process.env.IP
// var publicPath = __DEV__ ? `http://${host}:${process.env.PORT}/` : `http://${host}:${process.env.PORT}/${pkg.name}/`
var publicPath = __DEV__ ? `/` : `/${pkg.name}/`

/** 不同环境相同的配置 **/
var plugins = [
  new webpack.ProvidePlugin({
    "axios": path.resolve(__dirname, "util/axios.js"),
    "Ewell": path.resolve(__dirname, "util/base.js")
  }),
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify(env)
    },
    '__DEV__': __DEV__
  }),
  new ExtractTextPlugin('[name].[contenthash].css'),
  new HtmlWebpackPlugin({
    template: './src/index.html',
    DataConfig: publicPath + 'config.js'
  })
]

if (__DEV__) {
  plugins = plugins.concat([
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin()
  ])
} else {
  plugins = plugins.concat([
    new webpack.LoaderOptionsPlugin({
      minimize: true,
      debug: false
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        dead_code: true,
        warnings: false
      },
      mangle: false
    }),
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest']
    })
  ])
}
const config = {
  name: 'client',
  target: 'web',
  devtool: 'inline-source-map',
  resolve: {
    extensions: [".js", ".json"]
  },
  entry: {
    app: __DEV__ ? [
      'webpack/hot/dev-server',
      `webpack-hot-middleware/client?path=${publicPath}__webpack_hmr&timeout=3000&?reload=true`,
      './src/main.js'

    ] : [
      './src/main.js'
    ]
  },

  output: {
    publicPath: publicPath,
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].[hash].js'
  },

  externals: {
    pkgconfig: 'DataConfig'
  },
  module: {
    rules: [
      {test: /\.(js|jsx)$/, use: 'babel-loader', exclude: /(node_modules|src\/static)/},
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: [
            {loader: 'css-loader'},
            {
              loader: 'postcss-loader', options: {
              plugins: function () {
                return [
                  require('precss'),
                  require('autoprefixer')
                ];
              }
            }
            }, {
              loader: 'less-loader',
              options: {
                sourceMap: __DEV__,
                modifyVars: {
                  "primary-color": "#6190E8",
                  "font-family": '"Microsoft Yahei", "Hiragino Sans GB", "Helvetica Neue", Helvetica, tahoma, arial, Verdana, sans-serif, "WenQuanYi Micro Hei", "\5B8B\4F53";',
                  "text-color": "#333333",
                  'icon-url': '"' + publicPath + 'iconfont/iconfont"'
                }
              }
            }]
        })
      },
      {
        test: /\.(ico|jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        query: {
          name: __DEV__ ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
        }
      },
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          name: __DEV__ ? '[path][name].[ext]?[hash:8]' : '[hash:8].[ext]',
          limit: 10000
        }
      }
    ]
  },
  plugins: plugins
};
module.exports = config;
