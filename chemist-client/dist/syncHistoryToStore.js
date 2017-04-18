var _require = require('./actions/routing'),
    setLocation = _require.setLocation,
    fetchAndReplaceLocation = _require.fetchAndReplaceLocation;

module.exports = function syncHistoryToStore(_ref) {
  var history = _ref.history,
      store = _ref.store;

  var host = window.location.protocol + '//' + window.location.host;

  history.listen(function (location) {
    var page = location.state && location.state.page;

    if (page) {
      var payload = Object.assign({}, page, { location: location });
      store.dispatch(setLocation(payload));
    } else {
      store.dispatch(fetchAndReplaceLocation({ host: host, location: location, history: history }));
    }
  });
};