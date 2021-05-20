"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _useTranslation2 = _interopRequireDefault(require("next-translate/useTranslation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var NextButton = function NextButton(_ref) {
  var isDisabled = _ref.isDisabled,
      isVisible = _ref.isVisible,
      onClick = _ref.onClick,
      isConfirmButton = _ref.isConfirmButton,
      children = _ref.children;

  var _useTranslation = (0, _useTranslation2["default"])(),
      t = _useTranslation.t;

  return /*#__PURE__*/_react["default"].createElement("button", {
    style: {
      display: isVisible ? 'block' : 'none'
    },
    type: "button",
    className: "btn btn-primary text-uppercase btn-lg btn-block",
    onClick: onClick,
    disabled: isDisabled
  }, children || (isConfirmButton ? t('common:buttons.confirm') : t('common:buttons.next')));
};

var _default = NextButton;
exports["default"] = _default;