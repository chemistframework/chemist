'use strict';

var _require = require('./types'),
    SET_LOCATION = _require.SET_LOCATION;

module.exports = function createRoutingReducer(_ref) {
  var components = _ref.components,
      initialComponent = _ref.initialComponent,
      initialProps = _ref.initialProps;

  var initialState = { Component: components[initialComponent], props: initialProps };

  return function routingReducer() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
    var action = arguments[1];

    if (action.type === SET_LOCATION && action.component !== undefined) {
      return { Component: components[action.component], props: action.props };
    }

    return state;
  };
};