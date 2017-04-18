var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var React = require('react');

var _require = require('serializable-form-react'),
    Form = _require.Form,
    FormInput = _require.FormInput,
    FormSubmit = _require.FormSubmit;

var ActionForm = function (_React$Component) {
  _inherits(ActionForm, _React$Component);

  function ActionForm() {
    _classCallCheck(this, ActionForm);

    return _possibleConstructorReturn(this, (ActionForm.__proto__ || Object.getPrototypeOf(ActionForm)).apply(this, arguments));
  }

  _createClass(ActionForm, [{
    key: 'handleSubmit',
    value: function handleSubmit(e, form) {
      if (this.props.action) {
        var serverHttp = this.context.router.serverHttp;


        serverHttp(this.props.action, {
          method: this.props.method,
          body: JSON.stringify(form)
        });
      }

      if (this.props.onSubmit) {
        this.props.onSubmit(e, form);
      }
    }
  }, {
    key: 'render',
    value: function render() {
      return React.createElement(
        Form,
        _extends({}, this.props, { onSubmit: this.handleSubmit.bind(this) }),
        this.props.children
      );
    }
  }]);

  return ActionForm;
}(React.Component);

ActionForm.propTypes = Object.assign({}, Form.propTypes, {
  action: React.PropTypes.string,
  method: React.PropTypes.string
});

ActionForm.defaultProps = Object.assign({}, Form.propTypes, {
  method: 'POST'
});

ActionForm.contextTypes = {
  router: React.PropTypes.object
};

exports.Form = ActionForm;
exports.FormInput = FormInput;
exports.FormSubmit = FormSubmit;