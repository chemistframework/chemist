'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var render = require('../../chemist-render');

var requestMode = function requestMode(req) {
  var accepts = req.headers.accept;
  return accepts && accepts.includes('application/json') ? 'JSON' : 'HTML';
};

var respond = function respond(res, mode, body) {
  if (mode === 'HTML') return res.send(body);
  if (mode === 'JSON') return res.json(body);
  return null;
};

module.exports = function middleware() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      components = _ref.components,
      Document = _ref.Document;

  return function renderingMiddleware(req, res, next) {
    res.chemist = {};

    res.chemist.render = function () {
      var _ref2 = _asyncToGenerator(regeneratorRuntime.mark(function _callee(page) {
        var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
        var mode, body;
        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.prev = 0;
                mode = requestMode(req);
                _context.next = 4;
                return render({
                  mode: mode,
                  page: page,
                  Document: Document,
                  props: Object.assign({ params: req.params }, props),
                  pages: components
                });

              case 4:
                body = _context.sent;
                return _context.abrupt('return', respond(res, mode, body));

              case 8:
                _context.prev = 8;
                _context.t0 = _context['catch'](0);
                return _context.abrupt('return', next(_context.t0));

              case 11:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this, [[0, 8]]);
      }));

      return function (_x2, _x3) {
        return _ref2.apply(this, arguments);
      };
    }();

    res.chemist.redirect = function (path) {
      var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref3$status = _ref3.status,
          status = _ref3$status === undefined ? 302 : _ref3$status;

      res.redirect(status, path);
    };

    next();
  };
};