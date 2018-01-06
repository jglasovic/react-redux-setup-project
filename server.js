/* eslint-disable */

const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const config = require('./webpack.config');
const historyApiFallback = require('connect-history-api-fallback');
const browserSync = require('browser-sync');

const compiler = webpack(config);

const IS_PROD = process.env.NODE_ENV === 'production';

browserSync({
  port: 9000,
  open: false,
  server: {
    baseDir: IS_PROD ? 'dist' : 'src',
    middleware: [
      historyApiFallback(),
      webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: config.output.publicPath,
        stats: {
          colors: true,
          chunks: false,
        },
      }),
      webpackHotMiddleware(compiler),
    ],
  },
});
