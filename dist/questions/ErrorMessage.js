"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _exclamationTriangle = _interopRequireDefault(require("../../public/icons/common/exclamation-triangle.svg"));

var _object = require("../../lib/object");

var _useTranslation2 = _interopRequireDefault(require("next-translate/useTranslation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ErrorMessage = function ErrorMessage(_ref) {
  var message = _ref.message;

  var _useTranslation = (0, _useTranslation2["default"])(),
      t = _useTranslation.t;

  if (!message) {
    return '';
  }

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "invalid-feedback",
    style: {
      display: 'block'
    }
  }, /*#__PURE__*/_react["default"].createElement(_exclamationTriangle["default"], {
    className: "mr-1"
  }), (0, _object.isObject)(message) ? t(message.key, message.values) : t(message));
};

var _default = ErrorMessage;
exports["default"] = _default;