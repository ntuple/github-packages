"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withBanner = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _addonKnobs = require("@storybook/addon-knobs");

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  component: _["default"],
  title: 'QuestionContainer',
  decorators: [_addonKnobs.withKnobs]
};
exports["default"] = _default;

var Container = function Container(_ref) {
  var children = _ref.children;
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "container"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "row justify-content-center"
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "col-12 col-lg-9 py-5"
  }, children)));
};

var withBanner = function withBanner() {
  var question = {
    bannerPosition: (0, _addonKnobs.radios)('BannerPosition', {
      'outside top': 'outside-top',
      'outside bottom': 'outside-bottom',
      'inside top': 'inside-top',
      'inside bottom': 'inside-bottom'
    }, 'outside-top'),
    bannerSrcset: (0, _addonKnobs.text)('Banner Image Url', 'http://placeimg.com/900/180/arch'),
    bannerMobileSrcset: (0, _addonKnobs.text)('Mobile Banner Image Url', 'http://placeimg.com/767/180/arch')
  };
  return /*#__PURE__*/_react["default"].createElement(Container, null, /*#__PURE__*/_react["default"].createElement(_["default"], {
    question: question
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "alert alert-success",
    role: "alert"
  }, "Question Block")));
};

exports.withBanner = withBanner;