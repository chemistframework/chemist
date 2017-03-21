'use strict';

var render = require('../../chemist-render');

var requestMode = function requestMode(req) {
  var accepts = req.headers.accept;
  return accepts && accepts.includes('application/json') ? 'JSON' : 'HTML';
};

var respond = function respond(res, mode, body) {
  if (mode === 'HTML') return res.send(body);
  if (mode === 'JSON') return res.json(body);
  return null;
};

module.exports = function middleware() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      components = _ref.components,
      Document = _ref.Document,
      createStore = _ref.createStore;

  return function renderingMiddleware(req, res, next) {
    res.chemist = {};

    res.chemist.render = function (page) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var mode = requestMode(req);
      var options = {
        mode: mode,
        page: page,
        Document: Document,
        createStore: createStore,
        props: Object.assign({ params: req.params }, props),
        pages: components
      };

      render(options).then(function (body) {
        return respond(res, mode, body);
      }).catch(function (err) {
        throw err;
      });
    };

    res.chemist.redirect = function (path) {
      var _ref2 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
          _ref2$status = _ref2.status,
          status = _ref2$status === undefined ? 302 : _ref2$status;

      res.redirect(status, path);
    };

    next();
  };
};