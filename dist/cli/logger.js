'use strict';

var chalk = require('chalk');
var ora = require('ora');

var _require = require('node-emoji'),
    emojify = _require.emojify;

var levelColours = { success: 'green', warn: 'yellow', error: 'red' };
var levelMethods = { success: 'log', warn: 'warn', error: 'error' };

var log = function log(level, tag, message) {
  var colour = levelColours[level];
  var method = levelMethods[level];
  var logger = console[method];
  var formattedMessage = emojify(message);

  if (tag) {
    var formattedTag = chalk[colour](tag);
    formattedMessage = formattedTag + ' ' + formattedMessage;
  }

  logger(formattedMessage);
};

var success = function success(message) {
  var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'success';
  return log('success', tag, message);
};

var warn = function warn(message) {
  var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'warning';
  return log('warn', tag, message);
};

var error = function error(message) {
  var tag = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'error';
  return log('error', tag, message);
};

var done = function done(message) {
  return log('success', null, ':sparkles:  ' + message);
};

var spinner = function spinner(message) {
  return ora(message).start();
};

module.exports = { success: success, warn: warn, error: error, done: done, spinner: spinner };