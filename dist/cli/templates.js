var templates = {};

templates['app/client/reducers/index.js'] = function () {
  return '\nconst { combineReducers } = require(\'redux\')\nconst { createRoutingReducer } = require(\'chemist\')\nconst pages = require(\'../../pages\')\n\nconst { initialPage, initialProps } = window.__chemistState\nconst routing = createRoutingReducer({ pages, initialPage, initialProps })\nconst reducer = combineReducers({ routing })\n\nmodule.exports = reducer\n\n';
};

templates['app/client/index.js'] = function () {
  return '\nrequire(\'babel-polyfill\')\n\nconst React = require(\'react\')\nconst ReactDOM = require(\'react-dom\')\nconst { applyMiddleware, createStore } = require(\'redux\')\nconst thunk = require(\'redux-thunk\').default\nconst { Provider } = require(\'react-redux\')\nconst { ClientRouter, syncHistoryToStore } = require(\'chemist\')\nconst createBrowserHistory = require(\'history/createBrowserHistory\').default\nconst reducer = require(\'./reducers\')\n\nconst middlewares = applyMiddleware(thunk)\nconst devTools = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()\nconst store = createStore(reducer, devTools, middlewares)\nconst history = createBrowserHistory()\n\nsyncHistoryToStore({ history, store })\n\nif (process.env.NODE_ENV === \'development\' && module.hot) {\n  module.hot.accept(\'./reducers\', () => {\n    store.replaceReducer(require(\'./reducers\'))\n  })\n}\n\nconst app = (\n  <Provider store={store}>\n    <ClientRouter history={history} />\n  </Provider>\n)\n\nconst root = document.getElementById(\'root\')\n\nReactDOM.render(app, root)\n\n';
};

templates['app/layouts/Layout/index.js'] = function () {
  return '\nconst React = require(\'react\')\n\nconst Layout = props =>\n  <div id="root">\n    <main dangerouslySetInnerHTML={{ __html: props.content }} />\n  </div>\n\nmodule.exports = Layout\n';
};

templates['app/layouts/Document/index.js'] = function () {
  return '\nconst React = require(\'react\')\nconst { ChemistState } = require(\'chemist\')\nconst Layout = require(\'../Layout\')\n\nconst Document = props =>\n  <html lang="en">\n    <head>\n      <meta charSet="UTF-8" />\n      <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n      <meta httpEquiv="X-UA-Compatible" content="ie=edge" />\n      <title>{props.title}</title>\n    </head>\n    <body>\n      <Layout content={props.content} />\n      <ChemistState\n        initialPage={props.page}\n        initialProps={props.pageProps}\n      />\n      <script type="text/javascript" src={props.assets.javascript.main} />\n    </body>\n  </html>\n\nmodule.exports = Document\n';
};

templates['app/pages/Home/index.js'] = function () {
  return '\nconst React = require(\'react\')\n\nclass Home extends React.Component {\n  render () {\n    return (\n      <h1>Welcome to Chemist!</h1>\n    )\n  }\n}\n\nmodule.exports = Home\n';
};

templates['app/pages/NotFound/index.js'] = function () {
  return '\nconst React = require(\'react\')\n\nclass NotFound extends React.Component {\n  render () {\n    return (\n      <article>\n        <h1>404</h1>\n        <p>Not Found</p>\n      </article>\n    )\n  }\n}\n\nmodule.exports = NotFound\n';
};

templates['app/pages/index.js'] = function () {
  return '\nexports.Home = require(\'./Home\')\nexports.NotFound = require(\'./NotFound\')\n';
};

templates['app/server/controllers/home.js'] = function () {
  return '\nconst { Router } = require(\'express\')\n\nconst router = new Router()\n\nrouter.get(\'/\', function (req, res) {\n  res.chemist.render(\'Home\')\n})\n\nmodule.exports = router\n';
};

templates['app/server/controllers/notFound.js'] = function () {
  return '\nconst { Router } = require(\'express\')\n\nconst router = new Router()\n\nrouter.use(function (req, res) {\n  res.status(404).chemist.render(\'NotFound\')\n})\n\nmodule.exports = router\n';
};

templates['app/server/server.js'] = function () {
  return '\nconst chemist = require(\'chemist/server\')\nconst pages = require(\'../pages\')\nconst Document = require(\'../layouts/Document\')\n\nconst server = chemist({ pages, Document })\n\nserver.use(require(\'./controllers/home\'))\nserver.use(require(\'./controllers/notFound\'))\n\nmodule.exports = server\n\n';
};

templates['app/server/index.js'] = function () {
  return '\nconst { config } = require(\'chemist/server\')\nconst server = require(\'./server\')\n\nserver.listen(config.app.port, function () {\n  console.log(`\u2728  ${config.title} running on ${config.app.host}:${config.app.port}`)\n})\n';
};

templates['config/app.js'] = function (_ref) {
  var name = _ref.name;
  return '\nmodule.exports = function (config) {\n  config.title = \'' + name + '\'\n}\n';
};

templates['test/helpers/chai.js'] = function () {
  return '\nglobal.expect = require(\'chai\').expect\n';
};

templates['test/helpers/jsdom.js'] = function () {
  return '\nconst { jsdom } = require(\'jsdom\')\n\nglobal.document = jsdom(\'\')\nglobal.window = document.defaultView\n\nglobal.navigator = {\n  userAgent: \'node.js\'\n}\n';
};

templates['test/mocha.opts'] = function () {
  return '\n--compilers js:babel-core/register\n--require babel-polyfill\ntest/helpers/*.js\n';
};

templates['.babelrc'] = function () {
  return '\n{\n  "presets": ["react", "latest"]\n}\n\n';
};

templates['.eslintrc'] = function () {
  return '\n{\n  "extends": "eslint-config-airbnb",\n  "env": {\n    "browser": true,\n    "node": true,\n    "mocha": true\n  },\n  "rules": {\n    "react/no-multi-comp": 0,\n    "react/prop-types": 0,\n    "react/forbid-prop-types": 0,\n    "react/jsx-filename-extension": 0,\n    "react/jsx-no-bind": 0,\n    "react/prefer-stateless-function": 0,\n    "import/default": 0,\n    "import/no-duplicates": 0,\n    "import/named": 0,\n    "import/namespace": 0,\n    "import/no-unresolved": 0,\n    "import/no-named-as-default": 2,\n    "import/prefer-default-export": 0,\n    "import/no-extraneous-dependencies": 0,\n    "comma-dangle": 0,\n    "indent": [2, 2, {"SwitchCase": 1}],\n    "no-console": 0,\n    "no-alert": 0,\n    "semi": [2, "never"],\n    "space-before-function-paren": [2, { "anonymous": "always", "named": "always" }],\n    "no-empty": 0,\n    "func-names": 0,\n    "prefer-arrow-callback": 0,\n    "no-underscore-dangle": 0,\n    "global-require": 0,\n    "no-param-reassign": 0,\n    "generator-star-spacing": 0,\n    "no-return-assign": 0,\n    "arrow-parens": ["error", "as-needed"],\n    "jsx-a11y/no-static-element-interactions": 0,\n    "class-methods-use-this": 0\n  },\n  "plugins": [\n    "react"\n  ],\n  "globals": {\n    "expect": true\n  },\n  "parser": "babel-eslint"\n}\n';
};

templates['.gitignore'] = function () {
  return '\nnode_modules\n**/index-compiled.js\nwebpack-assets.json\n';
};

templates['package.json'] = function (_ref2) {
  var name = _ref2.name,
      version = _ref2.version;
  return '\n{\n  "name": "' + name + '",\n  "private": true,\n  "scripts": {\n    "lint": "eslint -c .eslintrc .",\n    "build": "NODE_ENV=production chemist compile",\n    "start": "NODE_ENV=production chemist start",\n    "dev": "NODE_ENV=development concurrently \\"chemist watch\\" \\"chemist start\\"",\n    "test": "mocha test/**/*.test.js"\n  },\n  "devDependencies": {\n    "babel-core": "^6.18.2",\n    "babel-eslint": "^7.1.1",\n    "babel-polyfill": "^6.16.0",\n    "babel-preset-latest": "^6.16.0",\n    "babel-preset-react": "^6.16.0",\n    "chai": "^3.5.0",\n    "concurrently": "^3.1.0",\n    "eslint": "^3.11.0",\n    "eslint-config-airbnb": "^13.0.0",\n    "eslint-plugin-import": "^2.2.0",\n    "eslint-plugin-jsx": "^0.0.2",\n    "eslint-plugin-jsx-a11y": "^2.2.3",\n    "eslint-plugin-react": "^6.7.1",\n    "jsdom": "^9.8.3",\n    "mocha": "^3.2.0",\n    "react-addons-test-utils": "^15.4.1"\n  },\n  "dependencies": {\n    "chemist": "' + version + '",\n    "body-parser": "^1.15.2",\n    "cors": "^2.8.1",\n    "express": "^4.14.0",\n    "history": "^4.4.1",\n    "react": "^15.4.1",\n    "react-dom": "^15.4.1",\n    "react-redux": "^4.4.6",\n    "redux": "^3.6.0",\n    "redux-thunk": "^2.1.0"\n  }\n}\n\n';
};

module.exports = templates;