'use strict';

var watch = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var compiler, host, port, app, serverOptions;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            compiler = webpack(config.webpack);
            host = config.app.host;
            port = config.assetServer.port;
            app = express();
            serverOptions = {
              contentBase: host + ':' + port,
              quiet: false,
              noInfo: false,
              hot: true,
              inline: true,
              lazy: false,
              publicPath: config.webpack.output.publicPath,
              headers: { 'Access-Control-Allow-Origin': '*' },
              stats: { colors: true }
            };


            app.use(webpackDevMiddleware(compiler, serverOptions));
            app.use(webpackHotMiddleware(compiler));

            app.listen(port, function (err) {
              if (err) {
                logger.error(err);
                process.exit(1);
              } else {
                logger.done('Asset server listening on ' + host + ':' + port + '. Prepare for webpack logs...');
              }
            });

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function watch() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var express = require('express');
var webpack = require('webpack');
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpackHotMiddleware = require('webpack-hot-middleware');
var logger = require('../logger');
var config = require('../../lib/config');

module.exports = watch;