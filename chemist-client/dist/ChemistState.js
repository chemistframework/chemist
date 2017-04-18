var React = require('react');
var serialize = require('serialize-js');

var ChemistState = function ChemistState(_ref) {
  var initialPage = _ref.initialPage,
      initialProps = _ref.initialProps;
  return React.createElement('script', {
    dangerouslySetInnerHTML: { __html: '\nwindow.__chemistState = {\n  initialPage: \'' + initialPage + '\',\n  initialProps: ' + serialize(initialProps) + '\n};\n    ' }
  });
};

module.exports = ChemistState;