const path = require('path')
const webpack = require('webpack')
const CleanPlugin = require('clean-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const WebpackIsomorphicToolsPlugin = require('webpack-isomorphic-tools/plugin')

module.exports = function (config) {
  const assetsPath = path.resolve(process.cwd(), config.staticPath, 'dist')

  config.webpackIsomorphicTools = {
    assets: {
      images: {
        extensions: ['jpeg', 'jpg', 'png', 'gif'],
        parser: WebpackIsomorphicToolsPlugin.url_loader_parser
      },
      fonts: {
        extensions: ['woff', 'woff2', 'ttf', 'eot'],
        parser: WebpackIsomorphicToolsPlugin.url_loader_parser
      },
      svg: {
        extension: 'svg',
        parser: WebpackIsomorphicToolsPlugin.url_loader_parser
      },
      style_modules: {
        extensions: ['scss'],
        filter (module, regex, options, log) {
          if (!options.development) return regex.test(module.name)
          return WebpackIsomorphicToolsPlugin.style_loader_filter(module, regex, options, log)
        },
        path (module, options, log) {
          if (!options.development) return module.name
          return WebpackIsomorphicToolsPlugin.style_loader_path_extractor(module, options, log)
        },
        parser (module, options, log) {
          if (!options.development) return module.source
          return WebpackIsomorphicToolsPlugin.css_modules_loader_parser(module, options, log)
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
  config.webpack.output.publicPath = '/dist/'

  config.webpack.module = config.webpack.module || {}
  config.webpack.module.loaders = config.webpack.module.loaders || []

  config.webpack.module.loaders.push({
    test: /\.jsx?$/,
    exclude: /node_modules/,
    loaders: ['babel-loader']
  })

  config.webpack.module.loaders.push({
    test: /\.json$/,
    loader: 'json-loader'
  })

  config.webpack.module.loaders.push({
    test: /\.scss$/,
    loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=2&sourceMap!autoprefixer?browsers=last 2 version!sass?outputStyle=expanded&sourceMap=true&sourceMapContents=true')
  })

  config.webpack.module.loaders.push({
    test: /\.(woff|woff2|ttf|eot|svg)(\?.*)?$/,
    loader: 'file-loader',
    options: {
      name: '[path][name].[hash].[ext]',
    }
  })

  config.webpack.module.loaders.push({
    test: webpackIsomorphicPlugin.regexp('images'),
    loader: 'file-loader',
    options: {
      name: '[path][name].[hash].[ext]',
    }
  })

  config.webpack.module.progress = true
  config.webpack.module.resolve = {
    modulesDirectories: ['node_modules'],
    extensions: ['', '.json', '.js', '.jsx']
  }

  config.webpack.plugins = config.webpack.plugins || []
  config.webpack.plugins.push(new CleanPlugin([assetsPath], { root: process.cwd() }))
  config.webpack.plugins.push(new ExtractTextPlugin('[name]-[chunkhash].css', { allChunks: true }))
  config.webpack.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      NODE_ENV: '"production"'
    }
  }))
  config.webpack.plugins.push(new webpack.IgnorePlugin(/\.\/development/, /\/config$/))
  config.webpack.plugins.push(new webpack.optimize.DedupePlugin())
  config.webpack.plugins.push(new webpack.optimize.OccurenceOrderPlugin())
  config.webpack.plugins.push(new webpack.optimize.UglifyJsPlugin({
    compress: { warnings: false }
  }))
  config.webpack.plugins.push(webpackIsomorphicPlugin)
}
