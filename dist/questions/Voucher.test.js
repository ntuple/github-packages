"use strict";

var _react = require("@testing-library/react");

var _globals = require("@jest/globals");

require("@testing-library/jest-dom/extend-expect");

var _Voucher = _interopRequireDefault(require("./Voucher"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var defaultProps = {
  code: 'voucher',
  tipText: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit.',
  placeholder: 'Voucher',
  onSubmit: _globals.jest.fn(),
  onChange: _globals.jest.fn()
};
(0, _globals.test)('renders Voucher component', function () {
  var testLabel = 'common:checkout.questions.labels.voucher';
  (0, _react.render)( /*#__PURE__*/React.createElement(_Voucher["default"], _extends({}, defaultProps, {
    value: "",
    error: false
  })));
  (0, _globals.expect)(_react.screen.getByText(testLabel)).toBeInTheDocument();
});
(0, _globals.test)('shows skip button, when the input is empty', function () {
  (0, _react.render)( /*#__PURE__*/React.createElement(_Voucher["default"], _extends({}, defaultProps, {
    value: "",
    error: false
  })));
  (0, _globals.expect)(_react.screen.getByText('common:buttons.skip')).toBeEnabled();
});
(0, _globals.test)('shows skip button, when there is an error', function () {
  (0, _react.render)( /*#__PURE__*/React.createElement(_Voucher["default"], _extends({}, defaultProps, {
    value: "invalid code",
    error: true
  })));
  (0, _globals.expect)(_react.screen.getByText('common:buttons.skip')).toBeEnabled();
});
(0, _globals.test)('shows confirm CTA button', function () {
  (0, _react.render)( /*#__PURE__*/React.createElement(_Voucher["default"], _extends({}, defaultProps, {
    value: "coupon code",
    error: false
  })));
  (0, _globals.expect)(_react.screen.getByText('common:checkout.confirm_coupon')).toBeEnabled();
});