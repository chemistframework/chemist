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
            _context.next = 7;
            return response.json();

          case 7:
            json = _context.sent;

            if (response.ok) {
              _context.next = 10;
              break;
            }

            throw new JsonResponseError('The server responded with ' + response.status, response, json);

          case 10:
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

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var merge = require('deepmerge');

var JsonResponseError = function (_Error) {
  _inherits(JsonResponseError, _Error);

  function JsonResponseError(message, response, json) {
    _classCallCheck(this, JsonResponseError);

    var _this = _possibleConstructorReturn(this, (JsonResponseError.__proto__ || Object.getPrototypeOf(JsonResponseError)).call(this, message));

    _this.name = 'JsonResponseError';
    _this.message = message;
    _this.response = response;
    _this.json = json;
    return _this;
  }

  return JsonResponseError;
}(Error);

var DEFAULT_FETCH_OPTIONS = {
  credentials: 'same-origin',
  headers: { Accept: 'application/json' }
};

module.exports = request;