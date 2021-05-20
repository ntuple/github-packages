"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("cleave.js/react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var DateCleavedInput = function DateCleavedInput(_ref) {
  var placeholder = _ref.placeholder,
      name = _ref.name,
      formik = _ref.formik,
      handleKeyDown = _ref.handleKeyDown,
      onFocus = _ref.onFocus;

  var isValid = function isValid() {
    return formik.touched[name] && (!formik.errors[name] ? 'is-valid' : 'is-invalid');
  };

  return /*#__PURE__*/React.createElement(_react["default"], {
    placeholder: placeholder,
    inputMode: "numeric",
    name: name,
    className: "form-control ".concat(isValid()),
    options: {
      date: true,
      delimiter: '/',
      datePattern: ['d', 'm', 'Y']
    },
    onChange: formik.handleChange,
    onBlur: formik.handleBlur,
    onFocus: onFocus,
    onKeyDown: handleKeyDown,
    value: formik.values[name]
  });
};

var _default = DateCleavedInput;
exports["default"] = _default;