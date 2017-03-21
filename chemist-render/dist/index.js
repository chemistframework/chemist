'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var ReactDOM = require('react-dom/server');

var _require = require('react-redux'),
    Provider = _require.Provider;

var MISSING_CREATE_STORE_ERROR = 'You must pass a `createStore` function into render';
var MISSING_COMPONENT_ERROR = 'You must pass a `page` option into render';
var missingPageError = function missingPageError(name) {
  return 'The page "' + name + '" is not registered';
};
var invalidModeError = function invalidModeError(mode) {
  return 'The mode "' + mode + '" is invalid. Use "HTML" or "JSON"';
};

function renderJson(_ref) {
  var page = _ref.page,
      props = _ref.props;

  return Promise.resolve({ page: page, props: props });
}

function renderHtml(_ref2) {
  var Document = _ref2.Document,
      PageComponent = _ref2.PageComponent,
      page = _ref2.page,
      props = _ref2.props,
      createStore = _ref2.createStore;

  try {
    var layoutProps = { assets: global.webpackIsomorphic.assets() };
    var store = createStore({ initialPage: page, initialProps: props });

    var content = ReactDOM.renderToString(React.createElement(
      Provider,
      { store: store },
      React.createElement(PageComponent, props)
    ));

    content = ReactDOM.renderToStaticMarkup(React.createElement(Document, _extends({
      content: content,
      page: page,
      pageProps: props
    }, layoutProps)));

    return Promise.resolve(content);
  } catch (e) {
    return Promise.reject(e);
  }
}

function render(_ref3) {
  var mode = _ref3.mode,
      pages = _ref3.pages,
      page = _ref3.page,
      props = _ref3.props,
      Document = _ref3.Document,
      createStore = _ref3.createStore;

  if (!createStore) return Promise.reject(new Error(MISSING_CREATE_STORE_ERROR));

  if (process.env.NODE_ENV === 'development') {
    global.webpackIsomorphic.refresh();
  }

  if (!page) return Promise.reject(new Error(MISSING_COMPONENT_ERROR));

  var PageComponent = pages[page];
  if (!PageComponent) return Promise.reject(new Error(missingPageError(page)));

  switch (mode) {
    case 'JSON':
      return renderJson({ page: page, props: props });
    case 'HTML':
      return renderHtml({ Document: Document, PageComponent: PageComponent, page: page, props: props, createStore: createStore });
    default:
      return Promise.reject(new Error(invalidModeError(mode)));
  }
}

module.exports = render;