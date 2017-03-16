'use strict';

var compile = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            webpack(config.webpack, function (err, stats) {
              if (err) throw err;

              var _stats$toJson = stats.toJson(),
                  errors = _stats$toJson.errors,
                  warnings = _stats$toJson.warnings,
                  assetsByChunkName = _stats$toJson.assetsByChunkName;

              errors.forEach(logger.error);
              warnings.forEach(logger.warn);

              var assets = Object.keys(assetsByChunkName).reduce(function (acc, key) {
                var value = assetsByChunkName[key];
                var entries = Array.isArray(value) ? value : [value];
                return acc.concat(entries);
              }, []);

              assets.forEach(function (asset) {
                return logger.success(asset, 'created');
              });
              logger.done('Compiled assets.');
            });

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function compile() {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var webpack = require('webpack');
var logger = require('../logger');
var config = require('../../lib/config');

module.exports = compile;