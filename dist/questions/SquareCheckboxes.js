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

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var SquareCheckboxes = function SquareCheckboxes(_ref) {
  var formik = _ref.formik,
      checkboxes = _ref.checkboxes,
      fieldName = _ref.fieldName,
      onSubmit = _ref.onSubmit,
      handleNextButton = _ref.handleNextButton,
      label = _ref.label,
      tip = _ref.tip,
      isConfirmButton = _ref.isConfirmButton;

  var _useTranslation = (0, _useTranslation2["default"])(),
      t = _useTranslation.t;

  var _useState = (0, _react.useState)(true),
      _useState2 = _slicedToArray(_useState, 2),
      showButton = _useState2[0],
      setShowButton = _useState2[1];

  var _useState3 = (0, _react.useState)({}),
      _useState4 = _slicedToArray(_useState3, 2),
      values = _useState4[0],
      setValues = _useState4[1]; // Object representing Checkbox name and their state [true / false]


  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      selectedValues = _useState6[0],
      setSelectedValues = _useState6[1]; // List of selected Checkbox value


  (0, _react.useEffect)(function () {
    var initialValues = checkboxes.reduce(function (currentValues, checkbox) {
      return _objectSpread(_objectSpread({}, currentValues), {}, _defineProperty({}, checkbox.value, formik.values[fieldName] ? formik.values[fieldName].includes(checkbox.value) : false));
    }, {});
    setValues(initialValues); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkboxes]);

  var handleNextClick = function handleNextClick() {
    handleNextButton(fieldName, selectedValues);
    setShowButton(false);
  };
  /**
   * @param {*} cbValue // checkbox value
   */


  var handleCbValueChange = function handleCbValueChange(cbValue) {
    // toggle cbValue
    values[cbValue] = !values[cbValue];
    var selected = [];
    Object.entries(values).forEach(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          key = _ref3[0],
          value = _ref3[1];

      value && selected.push(key);
    });
    onSubmit(fieldName, selected);
    setSelectedValues(selected);
    setValues(values);
    setShowButton(true);
  };

  var errorMessage = formik.errors[fieldName] && formik.touched[fieldName] ? formik.errors[fieldName] : '';
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-lg-12 question-label mb-2"
  }, /*#__PURE__*/_react["default"].createElement("label", null, t(label)), tip && /*#__PURE__*/_react["default"].createElement(_HelpTool["default"], {
    tip: t(tip)
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "row"
  }, checkboxes.map(function (checkbox, index) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      className: "col-lg-6 d-flex",
      key: index
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "form-check mt-2 mb-3 d-flex"
    }, /*#__PURE__*/_react["default"].createElement("input", _extends({
      id: checkbox.value,
      type: "checkbox"
    }, formik.getFieldProps(fieldName), {
      onChange: function onChange() {
        return handleCbValueChange(checkbox.value);
      },
      checked: values[checkbox.value]
    })), /*#__PURE__*/_react["default"].createElement("label", {
      className: "form-check-label rounded p-3 font-weight-normal",
      htmlFor: checkbox.value,
      role: "button"
    }, /*#__PURE__*/_react["default"].createElement("span", {
      className: "icon-check p-1"
    }), /*#__PURE__*/_react["default"].createElement("h5", null, t(checkbox.label), checkbox.iconTitle && /*#__PURE__*/_react["default"].createElement("span", {
      className: "".concat(checkbox.iconTitle, " ml-2 text-success")
    })), t(checkbox.title), /*#__PURE__*/_react["default"].createElement("p", {
      className: "text-muted mt-2"
    }, t(checkbox.desc)))));
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/_react["default"].createElement(_ErrorMessage["default"], {
    message: errorMessage
  }))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-12 text-right col-lg-3 text-right offset-lg-9"
  }, /*#__PURE__*/_react["default"].createElement(_NextButton["default"], {
    isVisible: showButton,
    isConfirmButton: isConfirmButton,
    onClick: handleNextClick,
    isDisabled: formik.errors[fieldName]
  })))));
};

var _default = SquareCheckboxes;
exports["default"] = _default;