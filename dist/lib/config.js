'use strict';

var path = require('path');
var glob = require('glob');
var flatten = require('flatten');
var createConfig = require('./createConfig');

var files = flatten([glob.sync(path.join(__dirname, '..', '..', 'config', 'index.js')), glob.sync(path.join(__dirname, '..', '..', 'config', 'webpack.js')), glob.sync(path.join(__dirname, '..', '..', 'config', 'environments', process.env.NODE_ENV + '.js')), glob.sync(path.join(process.cwd(), 'config', '*.js')), glob.sync(path.join(process.cwd(), 'config', 'environments', process.env.NODE_ENV + '.js')), glob.sync(path.join(__dirname, '..', '..', 'config', 'webpack.js')), glob.sync(path.join(__dirname, '..', '..', 'config', 'environments', process.env.NODE_ENV + '.js'))]);

module.exports = createConfig(files);