"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _moment = _interopRequireDefault(require("moment"));

var _useTranslation2 = _interopRequireDefault(require("next-translate/useTranslation"));

var _DateCleavedInput = _interopRequireDefault(require("./DateCleavedInput"));

var _TextFieldLayout = _interopRequireDefault(require("./TextFieldLayout"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Date = function Date(_ref) {
  var formik = _ref.formik,
      handleNextButton = _ref.handleNextButton,
      question = _ref.question,
      isConfirmButton = _ref.isConfirmButton;

  var _useTranslation = (0, _useTranslation2["default"])(),
      t = _useTranslation.t;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      presets = _useState2[0],
      setPresets = _useState2[1];

  var _useState3 = (0, _react.useState)(''),
      _useState4 = _slicedToArray(_useState3, 2),
      selected = _useState4[0],
      setSelected = _useState4[1];

  (0, _react.useEffect)(function () {
    if (formik.values[question.code]) {
      setSelected(formik.values[question.code]);
    } else if (formik && Object.keys(formik.values).length > 0 && (formik.values[question.code] === undefined || formik.values[question.code] === '')) {
      setSelected(undefined);
    }
  }, []);
  (0, _react.useEffect)(function () {
    var presets = question.presets || [];
    presets.forEach(function (preset) {
      if (preset.delta_days == null) {
        preset.dateStr = undefined;
      } else {
        preset.dateStr = (0, _moment["default"])().add(parseInt(preset.delta_days), 'days').format('DD/MM/YYYY');
      }
    });
    setPresets(presets);
  }, [question]);
  var textFieldRef = (0, _react.useRef)();

  var handlePresetClick = function handlePresetClick(event) {
    var value = event.target.value;
    setSelected(value || null);
    formik.values[question.code] = value;
    textFieldRef.current.clickNext();
  };

  var handleTextInputFocus = function handleTextInputFocus(event) {
    event.preventDefault();
    setSelected('');
  };

  return /*#__PURE__*/React.createElement(_TextFieldLayout["default"], {
    tip: question.tipText,
    label: t(question.label),
    questionCode: question.code,
    handleNextButton: handleNextButton,
    formik: formik,
    ref: textFieldRef,
    isConfirmButton: isConfirmButton
  }, function (handleKeyDown) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(_DateCleavedInput["default"], {
      id: question.code,
      name: question.code,
      placeholder: t('common:placeholders.date'),
      formik: formik,
      onFocus: handleTextInputFocus,
      handleKeyDown: handleKeyDown
    }), question.button && /*#__PURE__*/React.createElement("div", {
      className: "form-check mt-2"
    }, /*#__PURE__*/React.createElement("input", {
      id: question.button.label,
      className: "form-check-input",
      type: "radio",
      name: question.code,
      onChange: formik.handleChange,
      value: "no",
      checked: formik.values[question.code] === 'no'
    }), /*#__PURE__*/React.createElement("label", {
      className: "form-check-label w-100 rounded text-center font-weight-normal px-2 py-3",
      htmlFor: question.button.label,
      role: "button"
    }, question.button.label)), presets.map(function (presetDate, index) {
      var id = "key_".concat(index);
      return /*#__PURE__*/React.createElement("div", {
        key: id,
        className: "form-check"
      }, /*#__PURE__*/React.createElement("input", {
        id: id,
        className: "form-check-input",
        type: "radio",
        checked: presetDate.dateStr == selected,
        value: presetDate.dateStr,
        onClick: handlePresetClick
      }), /*#__PURE__*/React.createElement("label", {
        className: "form-check-label d-flex flex-fill justify-content-center flex-column align-items-center rounded text-center font-weight-normal px-2 py-3 my-2",
        htmlFor: id,
        role: "button"
      }, t(presetDate.annotations['rf/translation-string'])));
    }));
  });
};

var _default = Date;
exports["default"] = _default;