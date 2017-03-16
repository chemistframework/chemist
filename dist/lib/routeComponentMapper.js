'use strict';

var routington = require('routington');

module.exports = function routeComponentMapper(routes) {
  var router = routington();
  var paths = Object.keys(routes);

  paths.forEach(function (path) {
    var node = router.define(path)[0];
    node.Component = routes[path];
  });

  return function (path) {
    var match = router.match(path);
    return match.node.Component;
  };
};