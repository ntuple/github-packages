"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withError = exports.withValidCouponCode = exports.defaultView = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _addonActions = require("@storybook/addon-actions");

var _Voucher = _interopRequireDefault(require("./Voucher"));

var _addonKnobs = require("@storybook/addon-knobs");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var _default = {
  component: _Voucher["default"],
  title: 'components/questions/Voucher',
  decorators: [function (Story) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-left"
    }, /*#__PURE__*/_react["default"].createElement(Story, null));
  }, _addonKnobs.withKnobs]
};
exports["default"] = _default;
var defaultProps = {
  code: 'voucher',
  onSubmit: (0, _addonActions.action)('On Submit'),
  onChange: (0, _addonActions.action)('On Change')
};

var defaultView = function defaultView() {
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement(_Voucher["default"], _extends({}, defaultProps, {
    tipText: (0, _addonKnobs.text)('Tooltip', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. yeah'),
    value: "",
    error: false
  })));
};

exports.defaultView = defaultView;

var withValidCouponCode = function withValidCouponCode() {
  return /*#__PURE__*/_react["default"].createElement(_Voucher["default"], _extends({}, defaultProps, {
    tipText: (0, _addonKnobs.text)('Tooltip', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. yeah'),
    value: "VALID COUPON",
    error: false
  }));
};

exports.withValidCouponCode = withValidCouponCode;

var withError = function withError() {
  return /*#__PURE__*/_react["default"].createElement(_Voucher["default"], _extends({}, defaultProps, {
    tipText: (0, _addonKnobs.text)('Tooltip', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. yeah'),
    value: (0, _addonKnobs.text)('Invalid Code', 'TESTCODE'),
    error: true
  }));
};

exports.withError = withError;