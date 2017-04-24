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

var _marked = [setPageChange, requestPageFetch].map(regeneratorRuntime.mark);

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

var _require = require('redux-saga/effects'),
    call = _require.call,
    put = _require.put,
    takeEvery = _require.takeEvery;

var parseUri = require('urijs');

var _require2 = require('history'),
    createLocation = _require2.createLocation;

var merge = require('deepmerge');

var _require3 = require('./types'),
    SET_LOCATION = _require3.SET_LOCATION,
    REQUEST_PAGE = _require3.REQUEST_PAGE;

var _require4 = require('./actions/routing'),
    setLocation = _require4.setLocation,
    setLocationError = _require4.setLocationError,
    requestPageError = _require4.requestPageError;

var DEFAULT_FETCH_OPTIONS = {
  credentials: 'same-origin',
  headers: { Accept: 'application/json' }
};

function replaceHistory(history, resource, page) {
  var responseLocation = createLocation(resource, { page: page, skipFetch: true });
  return history.replace(responseLocation);
}

function setPageChange(history, action) {
  var page;
  return regeneratorRuntime.wrap(function setPageChange$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          page = { page: action.page, props: action.props };
          _context2.next = 4;
          return call(replaceHistory, history, action.resource, page);

        case 4:
          _context2.next = 10;
          break;

        case 6:
          _context2.prev = 6;
          _context2.t0 = _context2['catch'](0);
          _context2.next = 10;
          return put(setLocationError(_context2.t0));

        case 10:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[0], this, [[0, 6]]);
}

function requestPageFetch(action) {
  var _ref2, json, response, page, props, resource;

  return regeneratorRuntime.wrap(function requestPageFetch$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return call(request, action.path, action.options);

        case 3:
          _ref2 = _context3.sent;
          json = _ref2.json;
          response = _ref2.response;
          page = json.page, props = json.props;
          resource = parseUri(response.url).resource();
          _context3.next = 10;
          return put(setLocation({ page: page, props: props, resource: resource }));

        case 10:
          _context3.next = 16;
          break;

        case 12:
          _context3.prev = 12;
          _context3.t0 = _context3['catch'](0);
          _context3.next = 16;
          return put(requestPageError(_context3.t0));

        case 16:
        case 'end':
          return _context3.stop();
      }
    }
  }, _marked[1], this, [[0, 12]]);
}

function createPageSaga() {
  return regeneratorRuntime.mark(function pageSaga() {
    return regeneratorRuntime.wrap(function pageSaga$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return takeEvery(REQUEST_PAGE, requestPageFetch);

          case 2:
          case 'end':
            return _context4.stop();
        }
      }
    }, pageSaga, this);
  });
}

function createHistorySaga(history) {
  return regeneratorRuntime.mark(function historySaga() {
    return regeneratorRuntime.wrap(function historySaga$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            _context5.next = 2;
            return takeEvery(SET_LOCATION, setPageChange, history);

          case 2:
          case 'end':
            return _context5.stop();
        }
      }
    }, historySaga, this);
  });
}

exports.createPageSaga = createPageSaga;
exports.createHistorySaga = createHistorySaga;