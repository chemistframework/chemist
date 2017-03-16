'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var path = require('path');

var _require = require('fs'),
    writeFile = _require.writeFile;

var mkdirp = require('mkdirp-promise');

function createFile(_ref) {
  var _this = this;

  var absolutePath = _ref.absolutePath,
      content = _ref.content;

  return new Promise(function () {
    var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(accept, reject) {
      var directory;
      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              directory = path.dirname(absolutePath);
              _context.next = 3;
              return mkdirp(directory);

            case 3:

              writeFile(absolutePath, content, function (fileErr) {
                if (fileErr) {
                  reject(fileErr);
                } else {
                  accept();
                }
              });

            case 4:
            case 'end':
              return _context.stop();
          }
        }
      }, _callee, _this);
    }));

    return function (_x, _x2) {
      return _ref2.apply(this, arguments);
    };
  }());
}

function filegen(_ref3) {
  var root = _ref3.root,
      files = _ref3.files,
      _ref3$context = _ref3.context,
      context = _ref3$context === undefined ? {} : _ref3$context,
      _ref3$onFileCreate = _ref3.onFileCreate,
      onFileCreate = _ref3$onFileCreate === undefined ? function () {} : _ref3$onFileCreate;

  var creators = Object.keys(files).map(function (filePath) {
    var content = files[filePath](context);
    var stripped = content.replace(/^\s*\n/, '');

    var create = createFile({
      absolutePath: path.join(root, filePath),
      content: stripped
    });

    return create.then(function () {
      return onFileCreate(filePath);
    });
  });

  return Promise.all(creators);
}

module.exports = filegen;