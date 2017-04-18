function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var URL = require('url-parse');
var merge = require('deepmerge');

function createServerHttp(pushLocationWithPage) {
  return function server(url) {
    var _this = this;

    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var defaults = {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json'
      }
    };

    var mergedOptions = merge(defaults, options);

    return fetch(url, mergedOptions).then(function () {
      var _ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(response) {
        var page, pageUrl, pagePath;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return response.json();

              case 2:
                page = _context.sent;
                pageUrl = new URL(response.url);
                pagePath = pageUrl.pathname + pageUrl.query;


                pushLocationWithPage(pagePath, page);

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, _this);
      }));

      return function (_x2) {
        return _ref.apply(this, arguments);
      };
    }());
  };
}

module.exports = createServerHttp;