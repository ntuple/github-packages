"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _HelpTool = _interopRequireDefault(require("../common/HelpTool"));

var _NextButton = _interopRequireDefault(require("./NextButton"));

var _react = _interopRequireDefault(require("react"));

var _useTranslation2 = _interopRequireDefault(require("next-translate/useTranslation"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Voucher = function Voucher(_ref) {
  var code = _ref.code,
      value = _ref.value,
      error = _ref.error,
      tipText = _ref.tipText,
      onChange = _ref.onChange,
      onSubmit = _ref.onSubmit;

  var _useTranslation = (0, _useTranslation2["default"])(),
      t = _useTranslation.t;

  var validClass = '';
  var errorMessage = null;

  if (value) {
    validClass = !error && value ? 'is-valid' : 'is-invalid';
  }

  if (value && error) {
    errorMessage = t('common:validation.invalid_voucher', {
      value: value
    });
    value = '';
  }

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-lg question-label"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: code
  }, t('common:checkout.questions.labels.voucher')), tipText && /*#__PURE__*/_react["default"].createElement(_HelpTool["default"], {
    tip: tipText
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-lg"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    id: code,
    type: "text",
    className: "form-control ".concat(validClass),
    onChange: onChange,
    value: value,
    placeholder: t('common:checkout.questions.placeholders.voucher')
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "invalid-feedback"
  }, errorMessage)))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-12 text-right col-lg-3 offset-lg-9"
  }, /*#__PURE__*/_react["default"].createElement(_NextButton["default"], {
    isVisible: true,
    onClick: function onClick() {
      return onSubmit(value);
    }
  }, value ? t('common:checkout.confirm_coupon') : t('common:buttons.skip')))));
};

var _default = Voucher;
exports["default"] = _default;