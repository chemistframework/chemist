'use strict';

var request = function () {
  var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(path, options) {
    var url, fetchOptions, response, json;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            url = window.location.protocol + '//' + window.location.host + path;
            fetchOptions = merge(DEFAULT_FETCH_OPTIONS, options);
            _context.next = 4;
            return fetch(url, fetchOptions);

          case 4:
            response = _context.sent;

            if (response.ok) {
              _context.next = 7;
              break;
            }

            throw Error(response.statusText);

          case 7:
            _context.next = 9;
            return response.json();

          case 9:
            json = _context.sent;
            return _context.abrupt('return', { json: json, response: response });

          case 11:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function request(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var merge = require('deepmerge');

var DEFAULT_FETCH_OPTIONS = {
  credentials: 'same-origin',
  headers: { Accept: 'application/json' }
};

module.exports = request;