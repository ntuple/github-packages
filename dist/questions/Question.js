"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _ComboRadioSelectBox = _interopRequireDefault(require("./ComboRadioSelectBox"));

var _Phone = _interopRequireDefault(require("./Phone"));

var _Email = _interopRequireDefault(require("./Email"));

var _MultiTextFields = _interopRequireDefault(require("./MultiTextFields"));

var _SquareCheckboxes = _interopRequireDefault(require("./SquareCheckboxes"));

var _QuestionContainer = _interopRequireDefault(require("./QuestionContainer"));

var _Date = _interopRequireDefault(require("./Date"));

var _SimpleText = _interopRequireDefault(require("./SimpleText"));

var _Checklist = _interopRequireDefault(require("./Checklist"));

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

var Question = function Question(_ref) {
  var _ref$bgColor = _ref.bgColor,
      bgColor = _ref$bgColor === void 0 ? '' : _ref$bgColor,
      _ref$active = _ref.active,
      active = _ref$active === void 0 ? false : _ref$active,
      _ref$hasBorderBottom = _ref.hasBorderBottom,
      hasBorderBottom = _ref$hasBorderBottom === void 0 ? true : _ref$hasBorderBottom,
      question = _ref.question,
      isConfirmButton = _ref.isConfirmButton,
      _handleChange = _ref.handleChange,
      handleNewAnswer = _ref.handleNewAnswer,
      formik = _ref.formik,
      onDynamicQuestionChange = _ref.onDynamicQuestionChange,
      eventQuestionDisplay = _ref.eventQuestionDisplay;
  var baseProps = {
    fieldName: question.code,
    handleChange: function handleChange(e) {
      return _handleChange(question.code, e.currentTarget.value);
    },
    handleNextButton: function handleNextButton(field, value) {
      return handleNewAnswer(field, value);
    },
    formik: formik,
    isConfirmButton: isConfirmButton
  };

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      eventFired = _useState2[0],
      setEventFired = _useState2[1];

  var isError = formik.errors[question.code] && formik.touched[question.code];
  (0, _react.useEffect)(function () {
    if (!eventFired && active) {
      eventQuestionDisplay(question.section, question.code);
      setEventFired(true);
    }
  }, [eventFired, active]);

  var questionComponent = function (question) {
    switch (question.type) {
      case 'combo_radio_select':
        return /*#__PURE__*/_react["default"].createElement(_ComboRadioSelectBox["default"], _extends({}, baseProps, {
          label: question.label,
          buttonsPerRow: question.buttonsPerRow,
          singleChoices: question.singleChoices,
          selectOptions: question.selectOptions,
          sortOrder: question.sortLabels ? question.sortLabels : null,
          choiceTranslation: question.choiceTranslation,
          tip: question.tipText,
          translations: question.translations
        }));

      case 'phone':
        return /*#__PURE__*/_react["default"].createElement(_Phone["default"], _extends({}, baseProps, {
          question: question
        }));

      case 'email':
        return /*#__PURE__*/_react["default"].createElement(_Email["default"], _extends({}, baseProps, {
          question: question
        }));

      case 'text':
        return /*#__PURE__*/_react["default"].createElement(_SimpleText["default"], _extends({}, baseProps, {
          question: question
        }));

      case 'multi_question':
        return /*#__PURE__*/_react["default"].createElement(_MultiTextFields["default"], _extends({}, baseProps, {
          name: question.code,
          questions: question.questions,
          onDynamicQuestionChange: onDynamicQuestionChange
        }));

      case 'date':
        return /*#__PURE__*/_react["default"].createElement(_Date["default"], _extends({}, baseProps, {
          question: question
        }));

      case 'square_checkboxes':
        return /*#__PURE__*/_react["default"].createElement(_SquareCheckboxes["default"], _extends({}, baseProps, {
          label: question.label,
          checkboxes: question.checkboxes,
          tip: question.tipText,
          onSubmit: function onSubmit(field, value) {
            return _handleChange(field, value);
          }
        }));

      case 'checklist':
        return /*#__PURE__*/_react["default"].createElement(_Checklist["default"], _extends({}, baseProps, {
          label: question.label,
          checkboxes: question.checkboxes
        }));

      default:
    }
  }(question);

  return /*#__PURE__*/_react["default"].createElement(_QuestionContainer["default"], {
    key: question.code,
    id: question.code,
    isError: isError,
    bgColor: bgColor,
    active: active,
    question: question,
    hasBorderBottom: hasBorderBottom
  }, questionComponent);
};

var _default = Question;
exports["default"] = _default;