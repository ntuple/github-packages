"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.standard = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _addonActions = require("@storybook/addon-actions");

var _ = _interopRequireDefault(require("."));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  component: _["default"],
  title: 'components/questions/Checklist'
};
exports["default"] = _default;

var standard = function standard() {
  var formik = {
    values: {
      health_condition: [],
      other: 'hide'
    },
    touched: {},
    errors: {},
    handleBlur: (0, _addonActions.action)('Blur'),
    handleChange: (0, _addonActions.action)('Value Change')
  };
  var question = {
    code: 'customer_health',
    type: 'checklist',
    title: 'health:questions.labels.customer_health',
    checkboxes: [{
      value: 1,
      label: 'health:questions.checkboxes.customer_health.1.label'
    }, {
      value: 2,
      label: 'health:questions.checkboxes.customer_health.2.label'
    }, {
      value: 3,
      label: 'health:questions.checkboxes.customer_health.3.label'
    }, {
      value: 4,
      label: 'health:questions.checkboxes.customer_health.4.label'
    }, {
      value: 5,
      label: 'health:questions.checkboxes.customer_health.5.label'
    }]
  };

  var onSubmit = function onSubmit(fieldName, selectedValues) {
    console.log(fieldName, selectedValues, 'from checkbox');
  };

  return /*#__PURE__*/_react["default"].createElement(_["default"], {
    formik: formik,
    checkboxes: question.checkboxes,
    label: question.title,
    fieldName: question.code,
    onSubmit: onSubmit,
    handleNextButton: (0, _addonActions.action)('Next Button Clicked')
  });
};

exports.standard = standard;