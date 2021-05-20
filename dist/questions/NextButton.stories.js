"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onClick = exports.customText = exports.disabled = exports.enabled = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _addonActions = require("@storybook/addon-actions");

var _NextButton = _interopRequireDefault(require("./NextButton"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  component: _NextButton["default"],
  title: 'NextButton'
};
exports["default"] = _default;

var enabled = function enabled() {
  return /*#__PURE__*/_react["default"].createElement(_NextButton["default"], {
    isVisible: true
  });
};

exports.enabled = enabled;

var disabled = function disabled() {
  return /*#__PURE__*/_react["default"].createElement(_NextButton["default"], {
    isDisabled: true,
    isVisible: true
  });
};

exports.disabled = disabled;

var customText = function customText() {
  return /*#__PURE__*/_react["default"].createElement(_NextButton["default"], {
    isVisible: true
  }, "This is Custom");
};

exports.customText = customText;

var onClick = function onClick() {
  return /*#__PURE__*/_react["default"].createElement(_NextButton["default"], {
    isVisible: true,
    onClick: (0, _addonActions.action)('Clicked!')
  }, "Click for Action");
};

exports.onClick = onClick;