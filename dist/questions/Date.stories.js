"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enabled = exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _addonActions = require("@storybook/addon-actions");

var _Date = _interopRequireDefault(require("./Date"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var _default = {
  component: _Date["default"],
  title: 'components/questions/Date'
};
exports["default"] = _default;

var enabled = function enabled() {
  var question = {
    code: 'policy_start',
    order: 19,
    section: 'insurance',
    label: 'motor:questions.labels.policy_start',
    validation: {
      rule: 'date',
      from_days: 0,
      to_days: 183
    },
    tipText: 'motor:questions.tooltips.policy_start',
    translations: {
      label: 'motor:questions.labels.policy_start',
      tooltip: 'motor:questions.tooltips.policy_start'
    },
    type: 'date',
    placeholder: 'DD / MM / YYYY',
    presets: [{
      label: 'Today',
      delta_days: 0,
      annotations: {
        'rf/translation-string': 'motor:questions.date.presets.today'
      },
      dateStr: '23/07/2020'
    }, {
      label: 'This week',
      delta_days: 4,
      annotations: {
        'rf/translation-string': 'motor:questions.date.presets.next_week'
      },
      dateStr: '27/07/2020'
    }, {
      label: "I don't know yet",
      delta_days: null,
      annotations: {
        'rf/translation-string': 'motor:questions.date.presets.i_dont_know'
      }
    }]
  };
  var formik = {
    values: {},
    touched: {},
    errors: {},
    handleBlur: (0, _addonActions.action)('Blur'),
    handleChange: (0, _addonActions.action)('Value Change')
  };
  return /*#__PURE__*/_react["default"].createElement(_Date["default"], {
    formik: formik,
    question: question,
    handleNextButton: (0, _addonActions.action)('Next Button Clicked')
  });
};

exports.enabled = enabled;