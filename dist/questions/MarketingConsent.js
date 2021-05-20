"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _useTranslation2 = _interopRequireDefault(require("next-translate/useTranslation"));

var _nextTranslate = require("next-translate");

var _QuestionContainer = _interopRequireDefault(require("./QuestionContainer"));

var _LoadingSpinner = _interopRequireDefault(require("../common/LoadingSpinner"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]); if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var MarketingConsent = function MarketingConsent(_ref) {
  var question = _ref.question,
      active = _ref.active,
      onSubmit = _ref.onSubmit,
      value = _ref.value,
      onChange = _ref.onChange,
      eventQuestionDisplay = _ref.eventQuestionDisplay,
      i18nNamespace = _ref.i18nNamespace,
      privacyPolicyLinks = _ref.privacyPolicyLinks,
      termsAndConditionsLinks = _ref.termsAndConditionsLinks;

  var _useTranslation = (0, _useTranslation2["default"])(),
      t = _useTranslation.t,
      lang = _useTranslation.lang;

  var progressBarSize = 65;

  var _useState = (0, _react.useState)(false),
      _useState2 = _slicedToArray(_useState, 2),
      eventFired = _useState2[0],
      setEventFired = _useState2[1];

  var _useState3 = (0, _react.useState)(false),
      _useState4 = _slicedToArray(_useState3, 2),
      isSubmitting = _useState4[0],
      setIsSubmitting = _useState4[1];

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
    if (!eventFired && active) {
      eventQuestionDisplay('terms', 'marketing_consent');
      setEventFired(true);
    }
  }, [eventFired, active]);

  var handleConsentClick = function handleConsentClick(value) {
    var $btnMarketingConsent = document.getElementById('btn-marketing-consent');
    window.scrollTo({
      top: offset($btnMarketingConsent).top - progressBarSize,
      behavior: 'smooth'
    });
    onChange(question.code, value);
  };

  var handleShowQuoteClick = function handleShowQuoteClick() {
    setIsSubmitting(true);
    onSubmit();
  };

  return /*#__PURE__*/_react["default"].createElement(_QuestionContainer["default"], {
    id: question.code,
    hasBorderBottom: false,
    active: active
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "row"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-12"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "mx-auto text-justify",
    style: {
      maxWidth: '760px'
    }
  }, /*#__PURE__*/_react["default"].createElement(_nextTranslate.Trans, {
    i18nKey: "".concat(i18nNamespace, ":terms_conditions.html_top")
    /* eslint-disable-next-line react/jsx-key */
    ,
    components: [/*#__PURE__*/_react["default"].createElement("p", null), /*#__PURE__*/_react["default"].createElement("p", {
      style: {
        textIndent: '2rem'
      }
    }), /*#__PURE__*/_react["default"].createElement("strong", null), /*#__PURE__*/_react["default"].createElement("a", {
      style: {
        textDecoration: 'underline'
      },
      href: privacyPolicyLinks[lang],
      target: "_blank",
      rel: "noreferrer"
    })]
  }), /*#__PURE__*/_react["default"].createElement("div", {
    className: "row justify-content-md-center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-6 col-md-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-check mb-4 mt-2"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    id: "".concat(question.code, "-1"),
    className: "form-check-input",
    type: "radio",
    name: question.code,
    onChange: function onChange() {
      return handleConsentClick('1');
    },
    value: "1",
    checked: value === '1'
  }), /*#__PURE__*/_react["default"].createElement("label", {
    className: "form-check-label w-100 rounded d-flex align-items-center justify-content-center",
    htmlFor: "".concat(question.code, "-1"),
    role: "button"
  }, t("".concat(i18nNamespace, ":terms_conditions.choices.accept"))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-6 col-md-4"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "form-check mb-4 mt-2"
  }, /*#__PURE__*/_react["default"].createElement("input", {
    id: "".concat(question.code, "-0"),
    className: "form-check-input",
    type: "radio",
    name: question.code,
    onChange: function onChange() {
      return handleConsentClick('0');
    },
    value: "0",
    checked: value === '0'
  }), /*#__PURE__*/_react["default"].createElement("label", {
    className: "form-check-label w-100 rounded d-flex align-items-center justify-content-center",
    htmlFor: "".concat(question.code, "-0"),
    role: "button"
  }, t("".concat(i18nNamespace, ":terms_conditions.choices.decline")))))), /*#__PURE__*/_react["default"].createElement("div", null, /*#__PURE__*/_react["default"].createElement(_nextTranslate.Trans, {
    i18nKey: "".concat(i18nNamespace, ":terms_conditions.html_bottom")
    /* eslint-disable-next-line react/jsx-key */
    ,
    components: [/*#__PURE__*/_react["default"].createElement("p", null), /*#__PURE__*/_react["default"].createElement("a", {
      style: {
        textDecoration: 'underline'
      },
      href: privacyPolicyLinks[lang],
      target: "_blank",
      rel: "noreferrer"
    }), /*#__PURE__*/_react["default"].createElement("a", {
      style: {
        textDecoration: 'underline'
      },
      href: termsAndConditionsLinks[lang],
      target: "_blank",
      rel: "noreferrer"
    })]
  }))))), /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-lg-4 offset-lg-4"
  }, isSubmitting ? /*#__PURE__*/_react["default"].createElement(_LoadingSpinner["default"], {
    small: true
  }) : /*#__PURE__*/_react["default"].createElement("button", {
    type: "button",
    className: "btn btn-lg btn-primary text-uppercase btn-block mt-2",
    onClick: handleShowQuoteClick,
    disabled: value === null,
    id: "btn-marketing-consent"
  }, t('common:buttons.show_quotes'))));
};

var _default = MarketingConsent;
exports["default"] = _default;