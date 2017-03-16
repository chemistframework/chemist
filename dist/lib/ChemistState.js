'use strict';

var React = require('react');
var serialize = require('serialize-js');

var ChemistState = function ChemistState(_ref) {
  var initialComponent = _ref.initialComponent,
      initialProps = _ref.initialProps;
  return React.createElement('script', {
    dangerouslySetInnerHTML: { __html: '\nwindow.__chemistState = {\n  initialComponent: \'' + initialComponent + '\',\n  initialProps: ' + serialize(initialProps) + '\n};\n    ' }
  });
};

module.exports = ChemistState;