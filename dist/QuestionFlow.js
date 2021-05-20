"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _formik = require("formik");

var _immer = require("immer");

var _useTranslation2 = _interopRequireDefault(require("next-translate/useTranslation"));

var _questions = require("lib/questions");

var _MarketingConsent = _interopRequireDefault(require("./questions/MarketingConsent"));

var _Question = _interopRequireDefault(require("./questions/Question"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _createForOfIteratorHelper(o, allowArrayLike) { var it = typeof Symbol !== "undefined" && o[Symbol.iterator] || o["@@iterator"]; if (!it) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e2) { throw _e2; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = it.call(o); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e3) { didErr = true; err = _e3; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var QuestionFlow = function QuestionFlow(_ref) {
  var initialValues = _ref.initialValues,
      initialConfig = _ref.initialConfig,
      initialQuestionsVisibility = _ref.initialQuestionsVisibility,
      initialSectionsVisibility = _ref.initialSectionsVisibility,
      initialFurthestQuestion = _ref.initialFurthestQuestion,
      onAnswer = _ref.onAnswer,
      onSubmit = _ref.onSubmit,
      onConfigUpdate = _ref.onConfigUpdate,
      validationSchema = _ref.validationSchema,
      getDynamicChoiceQuestionPatch = _ref.getDynamicChoiceQuestionPatch,
      i18nNamespace = _ref.i18nNamespace,
      _ref$onShowQuestion = _ref.onShowQuestion,
      onShowQuestion = _ref$onShowQuestion === void 0 ? null : _ref$onShowQuestion,
      _ref$scrollToMarketin = _ref.scrollToMarketingConsent,
      scrollToMarketingConsent = _ref$scrollToMarketin === void 0 ? false : _ref$scrollToMarketin,
      _ref$showConfirm = _ref.showConfirm,
      showConfirm = _ref$showConfirm === void 0 ? false : _ref$showConfirm,
      _ref$showSectionHeade = _ref.showSectionHeader,
      showSectionHeader = _ref$showSectionHeade === void 0 ? false : _ref$showSectionHeade,
      _ref$lastStage = _ref.lastStage,
      lastStage = _ref$lastStage === void 0 ? null : _ref$lastStage,
      _ref$privacyPolicyUrl = _ref.privacyPolicyUrl,
      privacyPolicyUrl = _ref$privacyPolicyUrl === void 0 ? null : _ref$privacyPolicyUrl,
      _ref$termsAndConditio = _ref.termsAndConditionsUrl,
      termsAndConditionsUrl = _ref$termsAndConditio === void 0 ? null : _ref$termsAndConditio,
      _ref$eventQuestionDis = _ref.eventQuestionDisplay,
      eventQuestionDisplay = _ref$eventQuestionDis === void 0 ? function () {} : _ref$eventQuestionDis;

  var _useTranslation = (0, _useTranslation2["default"])(),
      t = _useTranslation.t;

  var _useState = (0, _react.useState)(initialFurthestQuestion),
      _useState2 = _slicedToArray(_useState, 2),
      furthestQuestion = _useState2[0],
      setFurthestQuestion = _useState2[1];

  var _useState3 = (0, _react.useState)(initialQuestionsVisibility),
      _useState4 = _slicedToArray(_useState3, 2),
      questionsVisibility = _useState4[0],
      setQuestionsVisibility = _useState4[1];

  var _useState5 = (0, _react.useState)(initialSectionsVisibility),
      _useState6 = _slicedToArray(_useState5, 2),
      sectionsVisibility = _useState6[0],
      setSectionsVisibility = _useState6[1];

  var _useState7 = (0, _react.useState)(initialConfig),
      _useState8 = _slicedToArray(_useState7, 2),
      config = _useState8[0],
      setConfig = _useState8[1];

  var progressBarSize = 65;
  (0, _react.useEffect)(function () {
    onConfigUpdate(config);
  }, [config, onConfigUpdate]);

  var offset = function offset(el) {
    var rect = el.getBoundingClientRect();
    var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return {
      top: rect.top + scrollTop,
      left: rect.left + scrollLeft
    };
  };

  (0, _react.useEffect)(function () {
    var $marketConsent = document.getElementById('tc');

    if (scrollToMarketingConsent) {
      setTimeout(function () {
        window.scrollTo({
          top: offset($marketConsent).top - progressBarSize,
          behavior: 'smooth'
        });
      }, 100);
    }
  }, [scrollToMarketingConsent]);
  var formik = (0, _formik.useFormik)({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: validationSchema
  });
  /**
   * @param {string} field - field name.
   * @param value
   */

  var setFieldValue = function setFieldValue(field, value) {
    // For some reason we can't put setFieldValue() before setFieldTouched(),validate on change won't working properly.
    formik.setFieldTouched(field);
    formik.setFieldValue(field, value);
  };
  /**
   * Reset field value
   *
   * @param {array} fields
   */


  var resetFieldsValue = function resetFieldsValue(fields) {
    fields.forEach(function (field) {
      formik.setFieldValue(field, '');
    });
  };

  var handleDependencies = function handleDependencies(question, furthestQuestion, config) {
    var hideQuestions = [];

    if (!question) {
      return hideQuestions;
    }

    if ((0, _questions.getQuestionPosition)(furthestQuestion, config) > (0, _questions.getQuestionPosition)(question.code, config)) {
      if (question.dynamic) {
        hideQuestions = (0, _questions.getFollowingQuestions)(question, config.sections);
        resetFieldsValue(hideQuestions);
      }
    }

    if ((0, _questions.isEndOfSection)(question, config.sections)) {
      var nextSectionsVisibility = (0, _immer.produce)(sectionsVisibility, function (draftState) {
        draftState[(0, _questions.getNextSection)(question.section, config.sections)] = true;
      });
      setSectionsVisibility(nextSectionsVisibility);
    }

    return hideQuestions;
  };
  /**
   * Show next question and scrolling user to next question.
   *
   * @param {array} showFields
   * @param {array} hideFields
   */


  var handleQuestionsVisibility = function handleQuestionsVisibility() {
    var showFields = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    var hideFields = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    var updateQuestionsVisibility = _objectSpread({}, questionsVisibility);

    hideFields.forEach(function (field) {
      updateQuestionsVisibility[field] = false;
    });
    showFields.forEach(function (field) {
      updateQuestionsVisibility[field] = true;
    });
    setQuestionsVisibility(updateQuestionsVisibility);
  };

  var handleNextQuestion = /*#__PURE__*/function () {
    var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(questionConfig, prevQuestion, questionCode, furthestQuestion, values) {
      var skipQuestions,
          _yield$getDynamicChoi,
          shouldSkipNextQuestion,
          newQuestionConfig,
          nQuestion,
          hideQuestions,
          $nextQuestionBlock,
          _args = arguments;

      return regeneratorRuntime.wrap(function _callee$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              skipQuestions = _args.length > 5 && _args[5] !== undefined ? _args[5] : {};

              if ((0, _questions.getQuestionPosition)(furthestQuestion, config) < (0, _questions.getQuestionPosition)(questionCode, config)) {
                furthestQuestion = questionCode;
              }

              if (!questionConfig.questions[questionCode].dynamic) {
                _context.next = 15;
                break;
              }

              _context.next = 5;
              return getDynamicChoiceQuestionPatch(questionCode, values);

            case 5:
              _yield$getDynamicChoi = _context.sent;
              shouldSkipNextQuestion = _yield$getDynamicChoi.shouldSkipNextQuestion;
              newQuestionConfig = _yield$getDynamicChoi.questionConfig;
              questionConfig = newQuestionConfig;

              if (!shouldSkipNextQuestion) {
                _context.next = 15;
                break;
              }

              values[questionCode] = (0, _questions.getDefaultAnswer)(questionCode, questionConfig.questions);
              skipQuestions[questionCode] = values[questionCode];
              nQuestion = (0, _questions.getNextQuestion)(questionCode, questionConfig.questionOrder, questionConfig.questions);

              if (!nQuestion) {
                _context.next = 15;
                break;
              }

              return _context.abrupt("return", handleNextQuestion(questionConfig, questionCode, nQuestion, furthestQuestion, values, skipQuestions));

            case 15:
              setConfig(questionConfig);
              setFurthestQuestion(furthestQuestion);
              hideQuestions = handleDependencies(questionConfig.questions[prevQuestion], furthestQuestion, questionConfig); // Set formik values and hide skip questions.

              Object.keys(skipQuestions).forEach(function (skipQuestion) {
                setFieldValue(skipQuestion, skipQuestions[skipQuestion]);
                hideQuestions.push(skipQuestion);
              });
              handleQuestionsVisibility([questionCode], hideQuestions);

              if (onShowQuestion !== null && questionCode !== null) {
                onShowQuestion(config.questions[questionCode]);
              }

              $nextQuestionBlock = document.getElementById(questionCode); // Navigate user to next question

              if ($nextQuestionBlock) {
                setTimeout(function () {
                  window.scrollTo({
                    top: offset($nextQuestionBlock).top - progressBarSize,
                    behavior: 'smooth'
                  });
                }, 100);
              }

            case 23:
            case "end":
              return _context.stop();
          }
        }
      }, _callee);
    }));

    return function handleNextQuestion(_x, _x2, _x3, _x4, _x5) {
      return _ref2.apply(this, arguments);
    };
  }();

  var handleNewAnswer = /*#__PURE__*/function () {
    var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(questionCode, answer) {
      var nextQuestion, values;
      return regeneratorRuntime.wrap(function _callee2$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              nextQuestion = (0, _questions.getNextQuestion)(questionCode, config.questionOrder, config.questions);
              values = _objectSpread({}, formik.values);

              if (config.questions[questionCode].type === 'multi_question') {
                config.questions[questionCode].questions.forEach(function (question, index) {
                  values[question.code] = answer[index];
                });
              } else {
                values[questionCode] = answer;
              }

              onAnswer(questionCode, values);

              if (nextQuestion) {
                handleNextQuestion(config, questionCode, nextQuestion, furthestQuestion, values);
              }

            case 5:
            case "end":
              return _context2.stop();
          }
        }
      }, _callee2);
    }));

    return function handleNewAnswer(_x6, _x7) {
      return _ref3.apply(this, arguments);
    };
  }();

  var dynamicChoicesFetch = function dynamicChoicesFetch(nextQnCode, field, value, dependencyQuestions) {
    var formikValues = _objectSpread(_objectSpread({}, formik.values), {}, _defineProperty({}, field, value));

    getDynamicChoiceQuestionPatch(nextQnCode, formikValues).then(function (_ref4) {
      var newQuestionConfig = _ref4.questionConfig;
      setConfig(newQuestionConfig);
    });
    resetFieldsValue(dependencyQuestions);
  };

  (0, _react.useEffect)(function () {
    formik.validateForm(); // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [validationSchema]);

  var handleChange = function handleChange(field, value) {
    var question = config.questions[field];
    setFieldValue(field, value);

    if (!['email', 'phone', 'text', 'square_checkboxes'].includes(question.type)) {
      handleNewAnswer(field, value);
    }
  };

  var handleSubmit = function handleSubmit() {
    // Send user back to answer missing question.
    // Tc question value is not stored in formik value and submit button activation depends on its value,
    // so it's safely ignored from formik validation.
    formik.validateForm().then(function (errors) {
      var _iterator = _createForOfIteratorHelper(config.questionOrder),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var questionCode = _step.value;

          if (errors[questionCode] && questionCode !== 'tc') {
            var $errorQuestionBlock = document.getElementById(questionCode);
            formik.setFieldTouched(questionCode);
            window.scrollTo({
              top: offset($errorQuestionBlock).top - progressBarSize
            });
            break;
          }
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      if (!Object.keys(errors).length) {
        onSubmit(formik.values);
      }
    });
  };

  return /*#__PURE__*/_react["default"].createElement("form", null, Object.keys(config.sections).map(function (sectionName, index) {
    // @todo remove this hack, we need to make sure 'tc' field does not appear in Quotes section
    if (sectionName === 'quotes') {
      return '';
    }

    var section = config.sections[sectionName];
    return /*#__PURE__*/_react["default"].createElement("div", {
      key: sectionName,
      className: "form-section rounded mb-md-5 position-relative",
      style: {
        display: sectionsVisibility[sectionName] ? 'block' : 'none'
      }
    }, /*#__PURE__*/_react["default"].createElement("h2", {
      className: "text-primary h3 form-section-header d-none d-lg-block"
    }, t("".concat(i18nNamespace, ":sections.labels.").concat(sectionName))), showSectionHeader && index === 0 && /*#__PURE__*/_react["default"].createElement("h3", {
      className: "px-2 mobile-form-section-header d-md-none d-lg-none"
    }, t("".concat(i18nNamespace, ":sections.labels.").concat(sectionName))), lastStage === 'confirm' && index === 0 && showConfirm && /*#__PURE__*/_react["default"].createElement("p", {
      className: "pt-0 px-2 pt-lg-4 px-lg-5 mb-0",
      style: {
        color: '#768dac'
      }
    }, t("".concat(i18nNamespace, ":sections.labelDetail.").concat(sectionName))), section.questions.map(function (questionName, questionIndex) {
      var question = config.questions[questionName];
      var bgColor = questionIndex % 2 ? 'bg-question' : ''; // make first question visible

      var active = questionsVisibility[questionName];
      return /*#__PURE__*/_react["default"].createElement(_Question["default"], {
        key: question.code,
        active: active,
        bgColor: bgColor,
        isConfirmButton: showConfirm,
        handleChange: handleChange,
        handleNewAnswer: handleNewAnswer,
        onDynamicQuestionChange: dynamicChoicesFetch,
        question: question,
        formik: formik,
        eventQuestionDisplay: eventQuestionDisplay
      });
    }));
  }), config.questions.tc ? /*#__PURE__*/_react["default"].createElement(_MarketingConsent["default"], {
    active: questionsVisibility.tc,
    key: "tc",
    value: formik.values.tc || null,
    question: config.questions.tc,
    onChange: setFieldValue,
    onSubmit: handleSubmit,
    eventQuestionDisplay: eventQuestionDisplay,
    i18nNamespace: i18nNamespace,
    privacyPolicyLinks: privacyPolicyUrl,
    termsAndConditionsLinks: termsAndConditionsUrl
  }) : '');
};

var _default = QuestionFlow;
exports["default"] = _default;