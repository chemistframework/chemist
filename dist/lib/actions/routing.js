'use strict';

var _require = require('../types'),
    SET_LOCATION = _require.SET_LOCATION;

function setLocation(_ref) {
  var location = _ref.location,
      component = _ref.component,
      props = _ref.props;

  return { type: SET_LOCATION, location: location, component: component, props: props };
}

function fetchLocation(_ref2) {
  var host = _ref2.host,
      location = _ref2.location;

  return function (dispatch) {
    var path = host + location.pathname;
    fetch(path, { headers: { Accept: 'application/json' } }).then(function (res) {
      return res.json();
    }).then(function (_ref3) {
      var component = _ref3.component,
          props = _ref3.props;
      return dispatch(setLocation({ location: location, component: component, props: props }));
    })
    // TODO: handle this error properly
    .catch(function (err) {
      throw err;
    });
  };
}

exports.setLocation = setLocation;
exports.fetchLocation = fetchLocation;