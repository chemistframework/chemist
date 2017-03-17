const WebpackIsomorphicTools = require('webpack-isomorphic-tools')
const config = require('../../lib/config')

function start () {
  if (process.env.NODE_ENV !== 'development' || require('piping')(config.rootPath)) {
    global.webpackIsomorphic = new WebpackIsomorphicTools(config.webpackIsomorphicTools)
      .server(process.cwd(), () => require(config.serverPath))
  }
}

module.exports = start
