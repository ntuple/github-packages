"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _useTranslation2 = _interopRequireDefault(require("next-translate/useTranslation"));

var _TextFieldLayout = _interopRequireDefault(require("./TextFieldLayout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var Email = function Email(_ref) {
  var formik = _ref.formik,
      handleNextButton = _ref.handleNextButton,
      question = _ref.question,
      isConfirmButton = _ref.isConfirmButton;

  var _useTranslation = (0, _useTranslation2["default"])(),
      t = _useTranslation.t;

  return /*#__PURE__*/React.createElement(_TextFieldLayout["default"], {
    tip: question.tipText,
    label: t(question.label),
    questionCode: question.code,
    handleNextButton: handleNextButton,
    formik: formik,
    isConfirmButton: isConfirmButton
  }, function (handleKeyDown) {
    return /*#__PURE__*/React.createElement("input", _extends({
      id: "email",
      type: "email",
      className: "\n                 form-control\n                 ".concat(formik.touched[question.code] && (!formik.errors[question.code] ? 'is-valid' : 'is-invalid'), "\n               "),
      "aria-describedby": "emailHelp",
      placeholder: t('common:placeholders.email'),
      onKeyDown: handleKeyDown
    }, formik.getFieldProps(question.code)));
  });
};

var _default = Email;
exports["default"] = _default;