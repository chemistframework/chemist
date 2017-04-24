'use strict';

var _require = require('./types'),
    SET_PAGE = _require.SET_PAGE;

module.exports = function createRoutingReducer(_ref) {
  var pages = _ref.pages,
      initialPage = _ref.initialPage,
      initialProps = _ref.initialProps;

  var initialState = { Page: pages[initialPage], props: initialProps };

  return function routingReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    if (action.type === SET_PAGE) {
      return { Page: pages[action.page], props: action.props };
    }

    return state;
  };
};