"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _useTranslation2 = _interopRequireDefault(require("next-translate/useTranslation"));

var _TextFieldLayout = _interopRequireDefault(require("./TextFieldLayout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var Phone = function Phone(_ref) {
  var formik = _ref.formik,
      handleChange = _ref.handleChange,
      question = _ref.question,
      handleNextButton = _ref.handleNextButton,
      isConfirmButton = _ref.isConfirmButton;

  var onChange = function onChange(event) {
    var value = event.target.value;
    event.target.value = value.replace(/[^\d]/g, '');
    handleChange(event);
  };

  var _useTranslation = (0, _useTranslation2["default"])(),
      t = _useTranslation.t;

  return /*#__PURE__*/React.createElement(_TextFieldLayout["default"], {
    tip: question.tipText,
    label: t(question.label),
    questionCode: question.code,
    handleNextButton: handleNextButton,
    isConfirmButton: isConfirmButton,
    formik: formik
  }, function (handleKeyDown) {
    return /*#__PURE__*/React.createElement("input", {
      type: "tel",
      maxLength: "10",
      className: "\n            form-control\n            ".concat(formik.touched[question.code] ? !formik.errors[question.code] ? 'is-valid' : 'is-invalid' : '', "\n          "),
      name: question.code,
      onChange: onChange,
      onBlur: onChange,
      onKeyDown: handleKeyDown,
      value: formik.values[question.code],
      placeholder: t('common:placeholders.phone')
    });
  });
};

var _default = Phone;
exports["default"] = _default;