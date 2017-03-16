'use strict';

var _require = require('../types'),
    SET_LOCATION = _require.SET_LOCATION;

function setLocation(_ref) {
  var location = _ref.location,
      page = _ref.page,
      props = _ref.props;

  return { type: SET_LOCATION, location: location, page: page, props: props };
}

function fetchLocation(_ref2) {
  var host = _ref2.host,
      location = _ref2.location;

  return function (dispatch) {
    var path = host + location.pathname + location.search;
    fetch(path, { headers: { Accept: 'application/json' } }).then(function (res) {
      return res.json();
    }).then(function (_ref3) {
      var page = _ref3.page,
          props = _ref3.props;
      return dispatch(setLocation({ location: location, page: page, props: props }));
    })
    // TODO: handle this error properly
    .catch(function (err) {
      return console.error(err);
    });
  };
}

exports.setLocation = setLocation;
exports.fetchLocation = fetchLocation;