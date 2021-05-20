"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _nextTranslate = require("next-translate");

var _useTranslation2 = _interopRequireDefault(require("next-translate/useTranslation"));

var _Image = _interopRequireDefault(require("../Image"));

var _HelpTool = _interopRequireDefault(require("../common/HelpTool"));

var _useSingleChoiceSorter = _interopRequireDefault(require("../hooks/useSingleChoiceSorter"));

var _ErrorMessage = _interopRequireDefault(require("./ErrorMessage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var ComboRadioSelectBox = function ComboRadioSelectBox(_ref) {
  var label = _ref.label,
      fieldName = _ref.fieldName,
      buttonsPerRow = _ref.buttonsPerRow,
      singleChoices = _ref.singleChoices,
      selectOptions = _ref.selectOptions,
      formik = _ref.formik,
      handleChange = _ref.handleChange,
      sortOrder = _ref.sortOrder,
      translations = _ref.translations,
      tip = _ref.tip,
      defaultValue = _ref.defaultValue,
      _ref$dependents = _ref.dependents,
      dependents = _ref$dependents === void 0 ? [] : _ref$dependents,
      _ref$onClick = _ref.onClick,
      onClick = _ref$onClick === void 0 ? null : _ref$onClick;

  var _useTranslation = (0, _useTranslation2["default"])(),
      t = _useTranslation.t;

  var _useSingleChoiceSorte = (0, _useSingleChoiceSorter["default"])(),
      sortChoices = _useSingleChoiceSorte.sortChoices;

  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      isDisabled = _useState2[0],
      setIsDisabled = _useState2[1]; // Pair required column layout with Bootstrap’s grid system


  var gridColumns = {
    4: 'col-3',
    3: 'col-4',
    2: 'col-6',
    1: 'col-12'
  };
  var transLabel = label;

  if (translations.label) {
    transLabel = translations.label;
  }

  var errorMessage = formik.errors[fieldName] && formik.touched[fieldName] ? formik.errors[fieldName] : '';

  var translatePlaceholders = function translatePlaceholders(choiceLabel) {
    return choiceLabel.replace(/__\S+__/g, function (match) {
      return t(match.replace(/__/g, ''));
    });
  };

  (0, _react.useEffect)(function () {
    if (!singleChoices.length && selectOptions && selectOptions.length && (typeof formik.values[fieldName] == 'undefined' || formik.values[fieldName] == 0 || formik.values[fieldName] == null) && (selectOptions[1].value == 0 || selectOptions[1].value == '0')) {
      setIsDisabled(true);
    }
  }, [singleChoices, selectOptions, formik, fieldName]);
  (0, _react.useEffect)(function () {
    if (defaultValue && formik !== null && formik !== void 0 && formik.values && !formik.values[fieldName]) {
      formik.values[fieldName] = defaultValue;
    } // eslint-disable-next-line react-hooks/exhaustive-deps

  }, [defaultValue]);
  (0, _react.useEffect)(function () {
    if (dependents && dependents.length && dependents.includes(fieldName)) {
      setIsDisabled(true);
    }
  }, [dependents, fieldName]);
  (0, _react.useEffect)(function () {
    if (dependents && dependents.length && dependents[0] === fieldName) {
      setIsDisabled(false);
    }
  }, [selectOptions, dependents, fieldName]);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "row",
    id: fieldName
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-lg question-label"
  }, /*#__PURE__*/_react["default"].createElement("label", {
    htmlFor: fieldName
  }, t(transLabel)), tip && /*#__PURE__*/_react["default"].createElement(_HelpTool["default"], {
    tip: t(tip)
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-lg"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "row"
  }, singleChoices.map(function (option) {
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: "".concat(fieldName, "-").concat(option.value),
      className: "d-flex ".concat(gridColumns[buttonsPerRow])
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "form-check mb-2 d-flex flex-fill mb-lg-3"
    }, option.jumpTo ? /*#__PURE__*/_react["default"].createElement("a", {
      className: "jump-to form-check-label w-100 rounded text-center font-weight-normal px-2 py-3 d-block text-decoration-none",
      href: "#".concat(option.jumpTo)
    }, t(option.label)) : /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, /*#__PURE__*/_react["default"].createElement("input", _extends({
      id: "".concat(fieldName, "-").concat(option.value),
      className: "form-check-input",
      type: "radio"
    }, formik.getFieldProps(fieldName), {
      onChange: handleChange,
      onBlur: handleChange,
      value: option.value,
      onClick: onClick,
      checked: formik.values[fieldName] == option.value
    })), /*#__PURE__*/_react["default"].createElement("label", {
      className: "form-check-label d-flex flex-fill justify-content-center flex-column align-items-center rounded text-center font-weight-normal px-2 py-3",
      htmlFor: "".concat(fieldName, "-").concat(option.value),
      role: "button"
    }, option.image && /*#__PURE__*/_react["default"].createElement("div", {
      className: "radio-image mb-2 d-flex align-items-center text-center"
    }, /*#__PURE__*/_react["default"].createElement(_Image["default"], _extends({
      className: "mx-auto img-fluid"
    }, option.image, {
      style: {
        height: '40px'
      }
    }))), option.icon && /*#__PURE__*/_react["default"].createElement("div", {
      className: "radio-image mb-1 d-flex align-items-center text-center"
    }, /*#__PURE__*/_react["default"].createElement(_Image["default"], _extends({
      className: "mx-auto image-icon img-fluid"
    }, option.icon))), option.iconText && /*#__PURE__*/_react["default"].createElement("div", {
      className: "text-icon mb-1"
    }, option.iconText), translations.choiceTemplate ? /*#__PURE__*/_react["default"].createElement(_nextTranslate.Trans, {
      i18nKey: translations.choiceTemplate,
      components: [/*#__PURE__*/_react["default"].createElement("span", {
        key: option.value,
        style: {
          color: '#97AAC3',
          fontSize: '18px',
          fontWeight: 700
        }
      })],
      values: {
        value: option.label
      }
    }) : translations.translatePlaceholders ? translatePlaceholders(option.label) : t(option.label)))));
  })), selectOptions && selectOptions.length > 0 && /*#__PURE__*/_react["default"].createElement("select", _extends({
    disabled: isDisabled,
    className: "form-control"
  }, formik.getFieldProps(fieldName), {
    onChange: handleChange
  }), sortChoices(selectOptions, sortOrder).map(function (option) {
    return /*#__PURE__*/_react["default"].createElement("option", {
      key: "".concat(fieldName, "-").concat(option.value, "}"),
      value: option.value,
      style: {
        display: option.isPlaceHolder && 'none'
      }
    }, t(option.label));
  })), /*#__PURE__*/_react["default"].createElement(_ErrorMessage["default"], {
    message: errorMessage
  })));
};

var _default = ComboRadioSelectBox;
exports["default"] = _default;