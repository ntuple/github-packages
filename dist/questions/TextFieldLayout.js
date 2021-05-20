"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _useTranslation2 = _interopRequireDefault(require("next-translate/useTranslation"));

var _HelpTool = _interopRequireDefault(require("../common/HelpTool"));

var _NextButton = _interopRequireDefault(require("./NextButton"));

var _ErrorMessage = _interopRequireDefault(require("./ErrorMessage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// Use forwardRef and useImperativeHandle because we need to trigger hiding the
// button from parent component. Not happy with it, but best we can do for now
var TextFieldLayout = /*#__PURE__*/(0, _react.forwardRef)(function (_ref, ref) {
  var formik = _ref.formik,
      label = _ref.label,
      tip = _ref.tip,
      children = _ref.children,
      questionCode = _ref.questionCode,
      handleNextButton = _ref.handleNextButton,
      isConfirmButton = _ref.isConfirmButton;

  var _useTranslation = (0, _useTranslation2["default"])(),
      t = _useTranslation.t;

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      showButton = _useState2[0],
      setShowButton = _useState2[1];

  var _useState3 = (0, _react.useState)(null),
      _useState4 = _slicedToArray(_useState3, 2),
      submittedValue = _useState4[0],
      setSubmittedValue = _useState4[1];

  var handleButton = function handleButton() {
    handleNextButton(questionCode, formik.values[questionCode]);
    setSubmittedValue(formik.values[questionCode]);
    setShowButton(false);
  };

  var formikValue = formik.values[questionCode];
  (0, _react.useImperativeHandle)(ref, function () {
    return {
      clickNext: function clickNext() {
        handleButton();
      }
    };
  });

  var handleKeyDown = function handleKeyDown(event) {
    if (event.key === 'Enter') {
      if (!formik.errors[questionCode]) {
        handleButton();
      }
    }
  };

  (0, _react.useEffect)(function () {
    if (!showButton && formikValue !== submittedValue) {
      setShowButton(true);
    }
  }, [formikValue, submittedValue]);
  var errorMessage = formik.errors[questionCode] && formik.touched[questionCode] ? formik.errors[questionCode] : '';
  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-group"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-lg question-label"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: questionCode
  }, label), tip && /*#__PURE__*/_react["default"].createElement(_HelpTool["default"], {
    tip: t(tip)
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-lg"
  }, children(handleKeyDown), /*#__PURE__*/_react["default"].createElement(_ErrorMessage["default"], {
    message: errorMessage
  })))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-12 text-right col-lg-3 offset-lg-9"
  }, /*#__PURE__*/_react["default"].createElement(_NextButton["default"], {
    isConfirmButton: isConfirmButton,
    isVisible: showButton,
    onClick: function onClick() {
      return handleButton();
    },
    isDisabled: formik.errors[questionCode]
  }))));
});
var _default = TextFieldLayout;
exports["default"] = _default;