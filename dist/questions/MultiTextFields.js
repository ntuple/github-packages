"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _util = require("lib/util");

var _NextButton = _interopRequireDefault(require("./NextButton"));

var _TextField = _interopRequireDefault(require("./TextField"));

var _ComboRadioSelectBox = _interopRequireDefault(require("./ComboRadioSelectBox"));

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

var MultiTextFields = function MultiTextFields(_ref) {
  var formik = _ref.formik,
      name = _ref.name,
      handleNextButton = _ref.handleNextButton,
      questions = _ref.questions,
      onDynamicQuestionChange = _ref.onDynamicQuestionChange,
      isConfirmButton = _ref.isConfirmButton;
  var isNextButtonDisabled = false;

  var _useState = (0, _react.useState)(formik.values),
      _useState2 = _slicedToArray(_useState, 2),
      values = _useState2[0],
      setValues = _useState2[1];

  var _useState3 = (0, _react.useState)(questions[0]),
      _useState4 = _slicedToArray(_useState3, 2),
      firstItem = _useState4[0],
      setFirstItem = _useState4[1];

  var _useState5 = (0, _react.useState)([]),
      _useState6 = _slicedToArray(_useState5, 2),
      childQuestions = _useState6[0],
      setChildQuestions = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      dependents = _useState8[0],
      setDependents = _useState8[1];

  var getChildQuestions = function getChildQuestions(code, value) {
    return questions.filter(function (q) {
      return q.validation && q.validation.requiredIf && q.validation.requiredIf.field == code && q.validation.requiredIf.value == value;
    });
  }; // Check if button disabled


  questions.forEach(function (question) {
    if (formik.errors[question.code]) {
      isNextButtonDisabled = true;
    }
  });

  var handleDynamic = function handleDynamic(nextQnIndex, field, value) {
    if (nextQnIndex >= questions.length) return; // index out of bound

    if (questions[nextQnIndex].dynamic) {
      var nextQnCode = questions[nextQnIndex].code; // Get dependency questions in the same dynamic group

      var dependencyQuestions = [];

      for (var i = nextQnIndex; i < questions.length; i++) {
        if (!questions[i].dynamic) {
          break;
        }

        dependencyQuestions.push(questions[i].code);
      }

      setDependents(dependencyQuestions);

      if (value > 0) {
        onDynamicQuestionChange(nextQnCode, field, value, dependencyQuestions);
      }
    }
  };

  var answers = questions.map(function (question) {
    return formik.values[question.code];
  });

  var _useState9 = (0, _react.useState)(true),
      _useState10 = _slicedToArray(_useState9, 2),
      showButton = _useState10[0],
      setShowButton = _useState10[1];

  var handleChange = function handleChange(field, e) {
    setValues(_objectSpread(_objectSpread({}, values), {}, _defineProperty({}, field, e.currentTarget.value)));
    formik.handleChange(e);
  };

  var handleButton = function handleButton() {
    handleNextButton(name, answers);
    setShowButton(false);
  };

  var handleKeyDown = function handleKeyDown(event) {
    if (event.key === 'Enter') {
      if (!isNextButtonDisabled) {
        handleButton();
      }
    }
  };

  (0, _react.useEffect)(function () {
    if (!showButton) {
      setShowButton(true);
    }
  }, [values]);
  (0, _react.useEffect)(function () {
    if (firstItem.singleChoices && firstItem.singleChoices.length) {
      var _dependents = getChildQuestions(firstItem.code, formik.values[firstItem.code]);

      setShowButton(_dependents.length);
    }
  }, [childQuestions]);
  (0, _react.useEffect)(function () {
    if (questions && questions.length) {
      setFirstItem(questions[0]);
    }
  }, [questions]);

  var checkChildQuestions = function checkChildQuestions(current, value) {
    var childQuestions = [];

    if (current.singleChoices && current.singleChoices.length) {
      childQuestions = getChildQuestions(current.code, value);
    }

    setChildQuestions(childQuestions);

    if (!childQuestions.length) {
      handleButton();
    }
  };

  return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, null, questions.map(function (question, index) {
    var result = true;

    var handleChangeForSingleChoice = function handleChangeForSingleChoice(e) {
      handleChange(question.code, e);
      handleDynamic(index + 1, question.code, e.target.value);

      if (question.singleChoices.length) {
        checkChildQuestions(question, e.currentTarget.value);
      }
    };

    var validClass = formik.touched[question.code] && (!formik.errors[question.code] ? 'is-valid' : 'is-invalid');

    if (question.displayCondition) {
      result = (0, _util.evaluateCondition)(question, formik);
    }

    {
      switch (question.type) {
        case 'text':
          return /*#__PURE__*/_react["default"].createElement(_TextField["default"], {
            isVisible: result,
            key: question.code,
            formik: formik,
            question: question,
            handleChange: handleChange,
            handleKeyDown: handleKeyDown,
            validClass: validClass
          });

        case 'combo_radio_select':
          return /*#__PURE__*/_react["default"].createElement("div", {
            className: "form-group",
            key: question.code,
            style: {
              display: result ? 'block' : 'none'
            }
          }, /*#__PURE__*/_react["default"].createElement(_ComboRadioSelectBox["default"], {
            key: question.code,
            formik: formik,
            handleChange: handleChangeForSingleChoice,
            fieldName: question.code,
            label: question.label,
            buttonsPerRow: question.buttonsPerRow,
            singleChoices: question.singleChoices,
            selectOptions: question.selectOptions,
            sortOrder: question.sortLabels,
            tip: question.tipText,
            translations: question.translations,
            defaultValue: question.defaultValue,
            dependents: dependents,
            onClick: handleChangeForSingleChoice
          }));

        default:
      }
    }
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-12 text-right col-lg-3 text-right offset-lg-9"
  }, /*#__PURE__*/_react["default"].createElement(_NextButton["default"], {
    isVisible: showButton,
    onClick: handleButton,
    isDisabled: isNextButtonDisabled,
    isConfirmButton: isConfirmButton
  }))));
};

var _default = MultiTextFields;
exports["default"] = _default;