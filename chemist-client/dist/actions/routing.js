'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('history'),
    createLocation = _require.createLocation;

var parseUri = require('urijs');

var _require2 = require('../types'),
    SET_LOCATION = _require2.SET_LOCATION;

function setLocation(_ref) {
  var location = _ref.location,
      page = _ref.page,
      props = _ref.props;

  return { type: SET_LOCATION, location: location, page: page, props: props };
}

function fetchAndReplaceLocation(_ref2) {
  var host = _ref2.host,
      location = _ref2.location,
      history = _ref2.history;

  return _asyncToGenerator(regeneratorRuntime.mark(function _callee() {
    var path, response, page, responseResource, responseLocation;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.prev = 0;
            path = host + location.pathname + location.search;
            _context.next = 4;
            return fetch(path, { headers: { Accept: 'application/json' } });

          case 4:
            response = _context.sent;
            _context.next = 7;
            return response.json();

          case 7:
            page = _context.sent;
            responseResource = parseUri(response.url).resource();
            responseLocation = createLocation(responseResource, { page: page });


            history.replace(responseLocation);
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t0 = _context['catch'](0);

            // TODO: handle this error properly
            console.error(_context.t0);

          case 16:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this, [[0, 13]]);
  }));
}

exports.setLocation = setLocation;
exports.fetchAndReplaceLocation = fetchAndReplaceLocation;