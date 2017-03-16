'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var React = require('react');
var ReactDOM = require('react-dom/server');

var MISSING_COMPONENT_ERROR = 'You must pass a component into render';
var missingComponentError = function missingComponentError(name) {
  return 'The component ' + name + ' is not registered';
};

function createRenderer() {
  var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
      _ref$components = _ref.components,
      components = _ref$components === undefined ? {} : _ref$components,
      Layout = _ref.Layout;

  return function renderer() {
    var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        mode = _ref2.mode,
        _ref2$baseProps = _ref2.baseProps,
        baseProps = _ref2$baseProps === undefined ? {} : _ref2$baseProps,
        _ref2$layoutProps = _ref2.layoutProps,
        layoutProps = _ref2$layoutProps === undefined ? {} : _ref2$layoutProps;

    return function render(componentName) {
      var props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      if (!componentName) return Promise.reject(new Error(MISSING_COMPONENT_ERROR));

      var Component = components[componentName];
      if (!Component) return Promise.reject(new Error(missingComponentError(componentName)));

      var allProps = Object.assign({}, baseProps, props);

      switch (mode) {
        case 'JSON':
          {
            return Promise.resolve({
              component: componentName,
              props: allProps
            });
          }
        case 'HTML':
          {
            try {
              var content = ReactDOM.renderToString(React.createElement(Component, allProps));

              if (Layout) {
                content = ReactDOM.renderToStaticMarkup(React.createElement(Layout, _extends({
                  content: content,
                  component: componentName,
                  childProps: allProps
                }, layoutProps)));
              }

              return Promise.resolve(content);
            } catch (e) {
              return Promise.reject(e);
            }
          }
        default:
          {
            return Promise.resolve();
          }
      }
    };
  };
}

module.exports = createRenderer;