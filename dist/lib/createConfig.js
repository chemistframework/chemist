'use strict';

var path = require('path');

function mergeConfigFile(filePath, config) {
  try {
    return require(filePath)(config);
  } catch (e) {
    var isModuleError = e.message === 'Cannot find module \'' + filePath + '\'';

    if (isModuleError) {
      var relativePath = path.relative(process.cwd(), filePath);
      throw new Error('The config file ' + relativePath + ' does not exist');
    } else {
      throw e;
    }
  }
}

function createConfig(files) {
  var config = {};
  files.forEach(function (filePath) {
    return mergeConfigFile(filePath, config);
  });
  return config;
}

module.exports = createConfig;