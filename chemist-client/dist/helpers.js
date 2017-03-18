'use strict';

exports._warnings = [];

exports.warn = function warn(message) {
  if (process.env.NODE_ENV === 'test') {
    exports._warnings.push(message);
  } else {
    console.warn('[chemist] ' + message);
  }
};