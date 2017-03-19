const webpack = require('webpack')
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')

module.exports = function (config) {
  const host = `${config.assetServer.host}:${config.assetServer.port}`
  config.webpack.entry.main.unshift(`webpack-hot-middleware/client?path=${host}/__webpack_hmr`)
  config.webpack.devtool = 'inline-source-map'
  config.webpack.output.filename = '[name]-[hash].js'
  config.webpack.output.publicPath = `${host}/dist/`

  const webpackIsomorphicPlugin = new WebpackIsomorphicToolsPlugin(config.webpackIsomorphicTools)

  config.webpack.module.loaders = [
    {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: ['babel-loader']
    },
    {
      test: /\.json$/,
      loader: 'json-loader'
    },
    {
      test: /\.scss$/,
      loaders: [
        'style?sourceMap',
        'css?sourceMap',
        'autoprefixer?browsers=last 2 version',
        'sass?outputStyle=expanded&sourceMap'
      ]
    },
    {
      test: /\.(woff|woff2|ttf|eot|svg)(\?.*)?$/,
      loader: 'file-loader',
      options: {
        name: 'fonts/[name].[hash].[ext]',
      }
    },
    {
      test: webpackIsomorphicPlugin.regexp('images'),
      loader: 'file-loader',
      options: {
        name: 'images/[name].[hash].[ext]',
      }
    }
  ]

  config.webpack.plugins = [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.IgnorePlugin(/webpack-stats\.json$/),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: `"${process.env.NODE_ENV}"`
      }
    }),
    webpackIsomorphicPlugin.development()
  ]
}
