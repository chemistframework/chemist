var WebpackIsomorphicTools = require('webpack-isomorphic-tools');
var config = require('../../lib/config');

function start() {
  global.webpackIsomorphic = new WebpackIsomorphicTools(config.webpackIsomorphicTools).server(process.cwd(), function () {
    return require(config.serverPath);
  });
}

module.exports = start;