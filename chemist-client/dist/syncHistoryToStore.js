'use strict';

var _require = require('./actions/routing'),
    setPage = _require.setPage,
    requestPage = _require.requestPage;

module.exports = function syncHistoryToStore(_ref) {
  var history = _ref.history,
      store = _ref.store;

  history.listen(function (location) {
    var page = location.state && location.state.page;
    var path = location.pathname + location.search;

    if (page) {
      store.dispatch(setPage(page));
    } else {
      store.dispatch(requestPage({ path: path }));
    }
  });
};