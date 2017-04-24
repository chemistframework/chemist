'use strict';

var _require = require('../types'),
    SET_LOCATION = _require.SET_LOCATION,
    SET_LOCATION_ERROR = _require.SET_LOCATION_ERROR,
    SET_PAGE = _require.SET_PAGE,
    REQUEST_PAGE = _require.REQUEST_PAGE,
    REQUEST_PAGE_ERROR = _require.REQUEST_PAGE_ERROR,
    PUSH_HISTORY = _require.PUSH_HISTORY,
    PUSH_HISTORY_ERROR = _require.PUSH_HISTORY_ERROR;

var setLocation = function setLocation(_ref) {
  var resource = _ref.resource,
      page = _ref.page,
      props = _ref.props;
  return { type: SET_LOCATION, resource: resource, page: page, props: props };
};

var setLocationError = function setLocationError(error) {
  return { type: SET_LOCATION_ERROR, error: error };
};

var setPage = function setPage(_ref2) {
  var page = _ref2.page,
      props = _ref2.props;
  return { type: SET_PAGE, page: page, props: props };
};

var requestPage = function requestPage(_ref3) {
  var path = _ref3.path,
      _ref3$options = _ref3.options,
      options = _ref3$options === undefined ? {} : _ref3$options;
  return { type: REQUEST_PAGE, path: path, options: options };
};

var requestPageError = function requestPageError(e) {
  return { type: REQUEST_PAGE_ERROR, error: e };
};

var pushHistory = function pushHistory(resource) {
  return { type: PUSH_HISTORY, resource: resource };
};

var pushHistoryError = function pushHistoryError(e) {
  return { type: PUSH_HISTORY_ERROR, error: e };
};

exports.setLocation = setLocation;
exports.setLocationError = setLocationError;
exports.setPage = setPage;
exports.requestPage = requestPage;
exports.requestPageError = requestPageError;
exports.pushHistory = pushHistory;
exports.pushHistoryError = pushHistoryError;