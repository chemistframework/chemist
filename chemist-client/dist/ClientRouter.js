'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var _require = require('react-redux'),
    connect = _require.connect;

var _require2 = require('history'),
    createLocation = _require2.createLocation;

var _require3 = require('./actions/routing'),
    requestPage = _require3.requestPage;

var HISTORY_NOT_PRESENT_ERROR = '<ClientRouter> will not work without a history prop';

var ClientRouter = function (_React$Component) {
  _inherits(ClientRouter, _React$Component);

  function ClientRouter() {
    _classCallCheck(this, ClientRouter);

    return _possibleConstructorReturn(this, (ClientRouter.__proto__ || Object.getPrototypeOf(ClientRouter)).apply(this, arguments));
  }

  _createClass(ClientRouter, [{
    key: 'getChildContext',
    value: function getChildContext() {
      var _this2 = this;

      var request = function request(path) {
        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        _this2.props.dispatch(requestPage({ path: path, options: options }));
      };

      var pushLocation = function pushLocation(resource) {
        _this2.props.history.replace(createLocation(resource));
      };

      return { router: { request: request, pushLocation: pushLocation } };
    }
  }, {
    key: 'componentWillMount',
    value: function componentWillMount() {
      if (!this.props.history) {
        throw new Error(HISTORY_NOT_PRESENT_ERROR);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      var _props$routing = this.props.routing,
          Page = _props$routing.Page,
          props = _props$routing.props;

      return React.createElement(Page, props);
    }
  }]);

  return ClientRouter;
}(React.Component);

ClientRouter.childContextTypes = {
  router: React.PropTypes.object
};

var connector = connect(function (state) {
  return { routing: state.routing };
});
module.exports = connector(ClientRouter);