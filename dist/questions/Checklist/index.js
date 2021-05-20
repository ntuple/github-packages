"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _useTranslation2 = _interopRequireDefault(require("next-translate/useTranslation"));

var _util = require("lib/util");

var _NextButton = _interopRequireDefault(require("../NextButton"));

var _Item = _interopRequireDefault(require("./Item"));

var _ChecklistModule = _interopRequireDefault(require("./Checklist.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Checklist = function Checklist(_ref) {
  var formik = _ref.formik,
      checkboxes = _ref.checkboxes,
      fieldName = _ref.fieldName,
      _ref$onSubmit = _ref.onSubmit,
      onSubmit = _ref$onSubmit === void 0 ? null : _ref$onSubmit,
      handleNextButton = _ref.handleNextButton,
      label = _ref.label;

  var _useTranslation = (0, _useTranslation2["default"])(),
      t = _useTranslation.t;

  var _useState = (0, _react.useState)({}),
      _useState2 = _slicedToArray(_useState, 2),
      values = _useState2[0],
      setValues = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedValues = _useState4[0],
      setSelectedValues = _useState4[1];

  var _useState5 = (0, _react.useState)(true),
      _useState6 = _slicedToArray(_useState5, 2),
      showButton = _useState6[0],
      setShowButton = _useState6[1];

  var filteredCheckboxes = checkboxes.filter(function (item) {
    if (!item.displayCondition) {
      return true;
    }

    return (0, _util.evaluateCondition)(item, formik);
  });
  (0, _react.useEffect)(function () {
    var initialValues = filteredCheckboxes.reduce(function (currentValues, checkbox) {
      return _objectSpread(_objectSpread({}, currentValues), {}, _defineProperty({}, checkbox.value, formik.values[fieldName] ? formik.values[fieldName].includes(checkbox.value) : checkbox.isPreSelected));
    }, {});
    var checkboxValues = [];

    var _loop = function _loop() {
      var _Object$entries$_i = _slicedToArray(_Object$entries[_i2], 2),
          ivKey = _Object$entries$_i[0],
          ivValue = _Object$entries$_i[1];

      if (ivValue && filteredCheckboxes.some(function (CBKey) {
        return (CBKey === null || CBKey === void 0 ? void 0 : CBKey.value) === ivKey;
      })) {
        checkboxValues.push(ivKey);
      }
    };

    for (var _i2 = 0, _Object$entries = Object.entries(initialValues); _i2 < _Object$entries.length; _i2++) {
      _loop();
    }

    setSelectedValues(checkboxValues);
    setValues(initialValues);
  }, []);

  var handleValueChange = function handleValueChange(value) {
    values[value] = !values[value];
    var selected = [];
    Object.entries(values).forEach(function (_ref2) {
      var _ref3 = _slicedToArray(_ref2, 2),
          key = _ref3[0],
          value = _ref3[1];

      value && selected.push(key);
    });

    if (onSubmit) {
      onSubmit(fieldName, selected);
    }

    setSelectedValues(selected);
    setShowButton(true);
  };

  var handleNextOnClick = function handleNextOnClick() {
    setShowButton(false);
    handleNextButton(fieldName, selectedValues);
  };

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(_ChecklistModule["default"].checklist)
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(_ChecklistModule["default"].checklist__section, " mx-auto row")
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(_ChecklistModule["default"]['checklist__section__question-label'], " question-label text-left mx-2 col-lg-12")
  }, /*#__PURE__*/_react["default"].createElement("label", null, t(label))), checkboxes.map(function (item, index) {
    if (item.displayCondition && !(0, _util.evaluateCondition)(item, formik)) {
      return '';
    }

    return /*#__PURE__*/_react["default"].createElement(_Item["default"], {
      item: item,
      key: index,
      isChecked: values[index + 1],
      onChange: function onChange() {
        return handleValueChange(item.value);
      }
    });
  })), /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-lg-4 offset-lg-4"
  }, /*#__PURE__*/_react["default"].createElement(_NextButton["default"], {
    isDisabled: false,
    isVisible: showButton,
    onClick: handleNextOnClick
  }, t('health:questions.labels.confirm'))));
};

var _default = Checklist;
exports["default"] = _default;