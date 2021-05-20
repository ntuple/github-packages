"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.standard = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _addonActions = require("@storybook/addon-actions");

var _SimpleText = _interopRequireDefault(require("./SimpleText"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  component: _SimpleText["default"],
  title: 'components/questions/SimpleText'
};
exports["default"] = _default;

var standard = function standard() {
  var question = {
    code: 'coupon_code',
    order: 1,
    section: 'driver',
    label: 'motor:questions.labels.coupon_code',
    validation: {
      rule: 'text',
      min: 0,
      max: 255
    },
    tipText: 'motor:questions.tooltips.coupon_code',
    translations: {
      translatePlaceholders: true,
      label: 'motor:questions.labels.coupon_code',
      placeholder: 'motor:questions.placeholders.coupon_code',
      tooltip: 'motor:questions.tooltips.coupon_code'
    },
    type: 'text',
    placeholder: 'motor:questions.placeholders.coupon_code'
  };
  var formik = {
    getFieldProps: function getFieldProps() {},
    values: {},
    touched: {},
    errors: {},
    handleBlur: (0, _addonActions.action)('Blured'),
    handleChange: (0, _addonActions.action)('Value Change')
  };
  return /*#__PURE__*/_react["default"].createElement(_SimpleText["default"], {
    formik: formik,
    question: question,
    handleNextButton: (0, _addonActions.action)('Next Button Clicked')
  });
};

exports.standard = standard;