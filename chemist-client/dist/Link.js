var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');

var _require = require('./helpers'),
    warn = _require.warn;

var MISSING_CONTEXT_WARNING = '`Link` is being used outside of the `router` context. ' + 'You must nest `Link` within `ClientRouter`.';

function Link(props, context) {
  if (typeof window !== 'undefined' && !context.router) {
    warn(MISSING_CONTEXT_WARNING);
  }

  var handleClick = function handleClick(e) {
    e.preventDefault();

    if (context.router) {
      context.router.pushLocation(props.href);
    }

    props.onClick(e);
  };

  return React.createElement(
    'a',
    _extends({}, props, { onClick: handleClick }),
    props.children
  );
}

Link.propTypes = {
  onClick: React.PropTypes.func
};

Link.defaultProps = {
  onClick: function onClick() {}
};

Link.contextTypes = {
  router: React.PropTypes.object
};

module.exports = Link;