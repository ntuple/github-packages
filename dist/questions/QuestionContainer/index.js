"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireWildcard(require("react"));

var _nextTranslate = require("next-translate");

var _screenSize = _interopRequireDefault(require("../../../lib/constants/screenSize"));

var _translation = require("../../../lib/translation");

var _ResponsiveImage = _interopRequireDefault(require("../../common/ResponsiveImage"));

var _QuestionContainerModule = _interopRequireDefault(require("./QuestionContainer.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var QuestionContainer = function QuestionContainer(_ref) {
  var _ref$bgColor = _ref.bgColor,
      bgColor = _ref$bgColor === void 0 ? '' : _ref$bgColor,
      _ref$active = _ref.active,
      active = _ref$active === void 0 ? true : _ref$active,
      _ref$hasBorderBottom = _ref.hasBorderBottom,
      hasBorderBottom = _ref$hasBorderBottom === void 0 ? true : _ref$hasBorderBottom,
      _ref$id = _ref.id,
      id = _ref$id === void 0 ? null : _ref$id,
      _ref$question = _ref.question,
      question = _ref$question === void 0 ? {} : _ref$question,
      isError = _ref.isError,
      children = _ref.children;

  var _useTranslation = (0, _nextTranslate.useTranslation)(),
      lang = _useTranslation.lang;

  var bannerPosition = question.bannerPosition,
      bannerSrcset = question.bannerSrcset,
      _question$bannerMobil = question.bannerMobileSrcset,
      bannerMobileSrcset = _question$bannerMobil === void 0 ? '' : _question$bannerMobil;

  var banner = function banner(className, srcSet) {
    var mobileSrcSet = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';

    if (!srcSet) {
      return '';
    }

    return /*#__PURE__*/_react["default"].createElement(_ResponsiveImage["default"], {
      className: className,
      alt: "Banner",
      srcSet: (0, _translation.localizedString)(srcSet, lang),
      mobileSrcSet: mobileSrcSet ? (0, _translation.localizedString)(mobileSrcSet, lang) : null
    });
  };

  (0, _react.useEffect)(function () {
    // run after .from-block appears in dom"
    if (window.innerWidth <= _screenSize["default"].SMALL) {
      var formBlocks = document.getElementsByClassName('form-block');

      _toConsumableArray(formBlocks).forEach(function (formBlock) {
        // eslint-disable-next-line prettier/prettier
        formBlock.style.minHeight = window.innerHeight - 65 + 'px';
      });
    }
  }, []);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: isError ? "".concat(_QuestionContainerModule["default"]['error']) : '',
    style: active ? {} : {
      display: 'none'
    }
  }, bannerPosition === 'outside-top' && banner('img-fluid w-100', bannerSrcset, bannerMobileSrcset), /*#__PURE__*/_react["default"].createElement("div", {
    id: id,
    className: "form-block py-5 px-2 py-lg-4 px-lg-5 ".concat(bgColor, " ").concat(!hasBorderBottom ? 'border-bottom-0' : '')
  }, bannerPosition === 'inside-top' && banner('img-fluid w-m-100 mb-3', bannerSrcset, bannerMobileSrcset), children, bannerPosition === 'inside-bottom' && banner('img-fluid w-m-100 mt-3', bannerSrcset, bannerMobileSrcset)), bannerPosition === 'outside-bottom' && banner('img-fluid w-100', bannerSrcset, bannerMobileSrcset));
};

var _default = QuestionContainer;
exports["default"] = _default;