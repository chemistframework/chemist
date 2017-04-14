'use strict';

var path = require('path');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var config = require('../lib/config');

var _require = require('./middleware'),
    rendering = _require.rendering;

function chemist() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$pages = _ref.pages,
      pages = _ref$pages === undefined ? {} : _ref$pages,
      Document = _ref.Document,
      createStore = _ref.createStore;

  var app = express();

  app.use(express.static(path.join(process.cwd(), config.staticPath)));
  app.use(bodyParser.json());
  app.use(cors());
  app.use(rendering({ components: pages, Document: Document, createStore: createStore }));

  return app;
}

module.exports = chemist;