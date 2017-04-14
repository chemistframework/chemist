const path = require('path')
const webpack = require('webpack')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')

module.exports = function (config) {
  const assetsPath = path.resolve(process.cwd(), config.staticPath, 'dist')
  const extractCSS = new ExtractTextPlugin({ filename: '[name]-[chunkhash].css', allChunks: true })

  config.webpackIsomorphicTools = {
    assets: {
      images: {
        extensions: ['jpeg', 'jpg', 'png', 'gif'],
        parser: WebpackIsomorphicToolsPlugin.urlLoaderParser
      },
      fonts: {
        extensions: ['woff', 'woff2', 'ttf', 'eot'],
        regular_expression: /\.(woff|woff2|ttf|eot)(\?.*)?$/,
        parser: WebpackIsomorphicToolsPlugin.urlLoaderParser
      },
      svg: {
        extension: 'svg',
        regular_expression: /\.(svg)(\?.*)?$/,
        parser: WebpackIsomorphicToolsPlugin.urlLoaderParser
      },
      style_modules: {
        extensions: ['scss'],
        filter (module, regex, options, log) {
          if (!options.development) return null
          return WebpackIsomorphicToolsPlugin.styleLoaderFilter(module, regex, options, log)
        },
        path (module, options, log) {
          if (!options.development) return module.name
          return WebpackIsomorphicToolsPlugin.styleLoaderPathExtractor(module, options, log)
        },
        parser (module, options, log) {
          if (!options.development) return module.source
          return WebpackIsomorphicToolsPlugin.cssLoaderParser(module, options, log)
        }
      }
    }
  }

  const webpackIsomorphicPlugin = new WebpackIsomorphicToolsPlugin(config.webpackIsomorphicTools)

  config.webpack = config.webpack || {}
  config.webpack.devtool = 'source-map'
  config.webpack.context = process.cwd()
  config.webpack.entry = {
    main: [config.clientPath]
  }

  config.webpack.output = config.webpack.output || {}
  config.webpack.output.path = assetsPath
  config.webpack.output.filename = '[name]-[chunkhash].js'
  config.webpack.output.chunkFilename = '[name]-[chunkhash].js'
  config.webpack.output.publicPath = `${config.assetHost}/dist/`

  config.webpack.module = {
    rules: [
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
        loader: extractCSS.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader', options: { sourceMap: true } },
            { loader: 'autoprefixer-loader', options: { browsers: 'last 2 version' } },
            { loader: 'sass-loader', options: { outputStyle: 'expanded', sourceMap: true, sourceMapContents: true } }
          ]
        })
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
  }

  config.webpack.resolve = {
    modules: ['node_modules'],
    extensions: ['.json', '.js', '.jsx']
  }

  config.webpack.plugins = [
    new CleanPlugin([assetsPath], { root: process.cwd() }),
    extractCSS,
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.IgnorePlugin(/\.\/development/, /\/config$/),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { warnings: false }
    }),
    webpackIsomorphicPlugin
  ]
}
