"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _nextTranslate = require("next-translate");

var _TextFieldLayout = _interopRequireDefault(require("./TextFieldLayout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

var SimpleText = function SimpleText(_ref) {
  var question = _ref.question,
      handleNextButton = _ref.handleNextButton,
      isConfirmButton = _ref.isConfirmButton,
      formik = _ref.formik;

  var _useTranslation = (0, _nextTranslate.useTranslation)(),
      t = _useTranslation.t;

  return /*#__PURE__*/React.createElement(_TextFieldLayout["default"], {
    tip: question.tipText,
    label: t(question.label),
    questionCode: question.code,
    handleNextButton: handleNextButton,
    isConfirmButton: isConfirmButton,
    formik: formik
  }, function (handleKeyDown) {
    return /*#__PURE__*/React.createElement("input", _extends({
      id: "".concat(question.code),
      type: "text",
      className: "\n                 form-control\n                 ".concat(formik.touched[question.code] && (!formik.errors[question.code] ? 'is-valid' : 'is-invalid'), "\n               "),
      "aria-describedby": "",
      placeholder: t("".concat(question.translations.placeholder)),
      onKeyDown: handleKeyDown
    }, formik.getFieldProps(question.code)));
  });
};

var _default = SimpleText;
exports["default"] = _default;