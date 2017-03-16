'use strict';

var pipe = require('piping');
var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
var config = require('../../lib/config');

function start() {
  if (process.env.NODE_ENV !== 'development' || pipe()) {
    global.webpackIsomorphic = new WebpackIsomorphicTools(config.webpackIsomorphicTools).server(process.cwd(), function () {
      return require(config.serverPath);
    });
  }
}

module.exports = start;