/* eslint-disable */

const webpack = require('webpack');
const HtmlPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const resolve = require('path').resolve;

const IS_DEV = !process.env.NODE_ENV;
const IS_PROD = process.env.NODE_ENV === 'production';

const LOCAL_IDENT_NAME = '[name]__[local]___[hash:base64:5]';

// ### PLUGINS
var HtmlWebpackPlugin = new HtmlPlugin({
  template: './src/index.html',
  filename: 'index.html',
});

var GlobalsPlugin = new webpack.DefinePlugin({
  'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  __DEV__: JSON.stringify(IS_DEV),
  __API_URL__: JSON.stringify(''), // define --------URL--------
});

// https://github.com/webpack/webpack/issues/59#issuecomment-12923514
var MomentFixPlugin = new webpack.ContextReplacementPlugin(/moment[\/\\]locale$/, /hr$/);

var HotModuleReplacementPlugin = new webpack.HotModuleReplacementPlugin();

var NoErrorsPlugin = new webpack.NoEmitOnErrorsPlugin();

var ExtractSassPlugin = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  allChunks: true,
  disable: IS_DEV,
});

var UglifyJsPlugin = new webpack.optimize.UglifyJsPlugin({
  compressor: { warnings: false },
});

var CommonsChunkPlugin = new webpack.optimize.CommonsChunkPlugin({
  name: 'commons',
  filename: 'commons.js',
});

var PLUGINS = [HtmlWebpackPlugin, GlobalsPlugin, MomentFixPlugin, ExtractSassPlugin];

if (IS_DEV) {
  PLUGINS = PLUGINS.concat([HotModuleReplacementPlugin, NoErrorsPlugin]);
} else {
  PLUGINS = PLUGINS.concat([UglifyJsPlugin, CommonsChunkPlugin]);
}

// ################
// #### CONFIG ####
// ################
module.exports = {
  entry: [].concat('babel-polyfill', IS_DEV ? 'webpack-hot-middleware/client' : [], './src'),
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.js', '.json', '.scss'],
  },
  devtool: IS_DEV ? 'cheap-module-eval-source-map' : 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.s?css$/,
        use: ExtractSassPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                modules: true,
                importLoaders: 1,
                localIdentName: IS_DEV ? `${LOCAL_IDENT_NAME}` : '',
              },
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
          // use style-loader in development
          fallback: 'style-loader',
        }),
        include: [resolve('./src/styles')],
        exclude: [resolve('./src/styles/global')],
      },
      {
        test: /\.s?css$/,
        use: ExtractSassPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1,
                localIdentName: '[local]',
              },
            },
            {
              loader: 'postcss-loader',
            },
            {
              loader: 'sass-loader',
            },
          ],
          // use style-loader in development
          fallback: 'style-loader',
        }),
        include: [resolve('./src/styles/global'), resolve('./node_modules')],
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: [
          'file-loader?hash=sha512&digest=hex&name=[hash].[ext]',
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                quality: 65,
              },
              pngquant: {
                quality: '10-20',
                speed: 4,
              },
              svgo: {
                plugins: [
                  {
                    removeViewBox: false,
                  },
                  {
                    removeEmptyAttrs: false,
                  },
                ],
              },
              gifsicle: {
                optimizationLevel: 7,
                interlaced: false,
              },
              optipng: {
                optimizationLevel: 7,
                interlaced: false,
              },
            },
          },
        ],
      },
      {
        include: resolve('./public/static'),
        use: 'file-loader?name=[name].[ext]',
      },
    ],
  },
  output: {
    path: resolve('./dist'),
    filename: '[name].js',
    chunkFilename: '[name]-[id].js',
    publicPath: '/',
  },

  plugins: PLUGINS,
};

/* eslint no-var:0 */
