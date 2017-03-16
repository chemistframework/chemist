'use strict';

var React = require('react');

var _require = require('redux'),
    applyMiddleware = _require.applyMiddleware,
    createStore = _require.createStore,
    combineReducers = _require.combineReducers;

var thunk = require('redux-thunk').default;

var _require2 = require('react-redux'),
    Provider = _require2.Provider;

var createBrowserHistory = require('history/createBrowserHistory').default;
var createRoutingReducer = require('./createRoutingReducer');
var syncHistoryToStore = require('./syncHistoryToStore');
var ClientRouter = require('./ClientRouter');

function createClientApp(_ref) {
  var _ref$history = _ref.history,
      history = _ref$history === undefined ? createBrowserHistory() : _ref$history,
      _ref$pages = _ref.pages,
      pages = _ref$pages === undefined ? {} : _ref$pages;
  var _window$__chemistStat = window.__chemistState,
      initialComponent = _window$__chemistStat.initialComponent,
      initialProps = _window$__chemistStat.initialProps,
      host = _window$__chemistStat.host;


  var reducer = combineReducers({
    routing: createRoutingReducer({
      components: pages,
      initialComponent: initialComponent,
      initialProps: initialProps
    })
  });

  var middlewares = applyMiddleware(thunk);
  var devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
  var store = createStore(reducer, devTools, middlewares);

  syncHistoryToStore({ history: history, store: store, host: host });

  var app = React.createElement(
    Provider,
    { store: store },
    React.createElement(ClientRouter, { history: history })
  );

  return { app: app, history: history, store: store };
}

module.exports = createClientApp;