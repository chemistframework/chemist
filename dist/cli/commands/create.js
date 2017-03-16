'use strict';

var create = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(name) {
    var dir = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : name;
    var root, context, onFileCreate;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            root = path.relative(process.cwd(), dir);
            context = { name: name, version: pkg.version };

            onFileCreate = function onFileCreate(file) {
              return logger.success(file, 'created');
            };

            _context.next = 5;
            return mkdirp(root);

          case 5:
            _context.next = 7;
            return mktemplate({ root: root, files: files, context: context, onFileCreate: onFileCreate });

          case 7:

            logger.done(name + ' is ready!');

          case 8:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function create(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var path = require('path');
var mkdirp = require('mkdirp-promise');
var mktemplate = require('../../../mktemplate');
var logger = require('../logger');
var files = require('../templates');
var pkg = require('../../../package.json');

module.exports = create;