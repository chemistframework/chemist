var logger = require('../logger');

function withErrors(handler) {
  return function () {
    var promise = handler.apply(undefined, arguments);
    promise.catch(function (err) {
      logger.error(err.stack);
      process.exit(1);
    });
  };
}

module.exports = withErrors;