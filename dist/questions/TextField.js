"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _useTranslation2 = _interopRequireDefault(require("next-translate/useTranslation"));

var _HelpTool = _interopRequireDefault(require("../common/HelpTool"));

var _ErrorMessage = _interopRequireDefault(require("./ErrorMessage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var TextField = function TextField(_ref) {
  var isVisible = _ref.isVisible,
      formik = _ref.formik,
      handleChange = _ref.handleChange,
      handleKeyDown = _ref.handleKeyDown,
      question = _ref.question,
      validClass = _ref.validClass;

  var _useTranslation = (0, _useTranslation2["default"])(),
      t = _useTranslation.t;

  var errorMessage = formik.errors[question.code] && formik.touched[question.code] ? formik.errors[question.code] : '';
  return /*#__PURE__*/React.createElement("div", {
    key: question.code,
    id: question.code,
    style: {
      display: isVisible ? 'block' : 'none'
    },
    className: "form-group"
  }, /*#__PURE__*/React.createElement("div", {
    className: "row"
  }, /*#__PURE__*/React.createElement("div", {
    className: "col-lg question-label"
  }, /*#__PURE__*/React.createElement("label", {
    htmlFor: question.code
  }, t(question.label)), question.tipText && /*#__PURE__*/React.createElement(_HelpTool["default"], {
    tip: t(question.tipText)
  })), /*#__PURE__*/React.createElement("div", {
    className: "col-lg"
  }, /*#__PURE__*/React.createElement("input", _extends({
    type: "text",
    className: "form-control ".concat(validClass),
    placeholder: t(question.placeholder)
  }, formik.getFieldProps(question.code), {
    onChange: function onChange(e) {
      return handleChange(question.code, e);
    },
    onKeyDown: handleKeyDown
  })), /*#__PURE__*/React.createElement(_ErrorMessage["default"], {
    message: errorMessage
  }))));
};

var _default = TextField;
exports["default"] = _default;