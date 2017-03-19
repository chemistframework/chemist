const WebpackIsomorphicTools = require('webpack-isomorphic-tools')
const config = require('../../lib/config')

function start () {
  global.webpackIsomorphic = new WebpackIsomorphicTools(config.webpackIsomorphicTools)
    .server(process.cwd(), () => require(config.serverPath))
}

module.exports = start
