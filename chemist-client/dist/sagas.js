'use strict';

var _marked = [setPageChange, requestPageFetch].map(regeneratorRuntime.mark);

var _require = require('redux-saga/effects'),
    call = _require.call,
    put = _require.put,
    takeEvery = _require.takeEvery;

var parseUri = require('urijs');

var _require2 = require('history'),
    createLocation = _require2.createLocation;

var _require3 = require('./types'),
    SET_LOCATION = _require3.SET_LOCATION,
    REQUEST_PAGE = _require3.REQUEST_PAGE;

var _require4 = require('./actions/routing'),
    setLocation = _require4.setLocation,
    setLocationError = _require4.setLocationError,
    requestPageError = _require4.requestPageError;

var request = require('./request');

function replaceHistory(history, resource, page) {
  var responseLocation = createLocation(resource, { page: page, skipFetch: true });
  return history.replace(responseLocation);
}

function setPageChange(history, action) {
  var page;
  return regeneratorRuntime.wrap(function setPageChange$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          page = { page: action.page, props: action.props };
          _context.next = 4;
          return call(replaceHistory, history, action.resource, page);

        case 4:
          _context.next = 10;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context['catch'](0);
          _context.next = 10;
          return put(setLocationError(_context.t0));

        case 10:
        case 'end':
          return _context.stop();
      }
    }
  }, _marked[0], this, [[0, 6]]);
}

function requestPageFetch(action) {
  var _ref, json, response, page, props, resource;

  return regeneratorRuntime.wrap(function requestPageFetch$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return call(request, action.path, action.options);

        case 3:
          _ref = _context2.sent;
          json = _ref.json;
          response = _ref.response;
          page = json.page, props = json.props;
          resource = parseUri(response.url).resource();
          _context2.next = 10;
          return put(setLocation({ page: page, props: props, resource: resource }));

        case 10:
          _context2.next = 16;
          break;

        case 12:
          _context2.prev = 12;
          _context2.t0 = _context2['catch'](0);
          _context2.next = 16;
          return put(requestPageError(_context2.t0));

        case 16:
        case 'end':
          return _context2.stop();
      }
    }
  }, _marked[1], this, [[0, 12]]);
}

function createPageSaga() {
  return regeneratorRuntime.mark(function pageSaga() {
    return regeneratorRuntime.wrap(function pageSaga$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return takeEvery(REQUEST_PAGE, requestPageFetch);

          case 2:
          case 'end':
            return _context3.stop();
        }
      }
    }, pageSaga, this);
  });
}

function createHistorySaga(history) {
  return regeneratorRuntime.mark(function historySaga() {
    return regeneratorRuntime.wrap(function historySaga$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            _context4.next = 2;
            return takeEvery(SET_LOCATION, setPageChange, history);

          case 2:
          case 'end':
            return _context4.stop();
        }
      }
    }, historySaga, this);
  });
}

exports.createPageSaga = createPageSaga;
exports.createHistorySaga = createHistorySaga;