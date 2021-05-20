"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _nextTranslate = require("next-translate");

var _ChecklistModule = _interopRequireDefault(require("../Checklist.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var ChecklistItem = function ChecklistItem(_ref) {
  var item = _ref.item,
      onChange = _ref.onChange,
      _ref$isChecked = _ref.isChecked,
      isChecked = _ref$isChecked === void 0 ? false : _ref$isChecked;

  var _useTranslation = (0, _nextTranslate.useTranslation)(),
      t = _useTranslation.t;

  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(_ChecklistModule["default"]['checklist__form-check'], " row"),
    style: {
      width: '100%'
    }
  }, /*#__PURE__*/_react["default"].createElement("div", {
    className: "".concat(_ChecklistModule["default"]['checklist__custom-control'], " col-12 custom-control custom-checkbox")
  }, /*#__PURE__*/_react["default"].createElement("input", {
    type: "checkbox",
    id: item.value,
    onClick: onChange,
    checked: isChecked,
    className: "".concat(_ChecklistModule["default"]['checklist__form-check-input'], " custom-control-input")
  }), /*#__PURE__*/_react["default"].createElement("label", {
    className: "".concat(_ChecklistModule["default"]['checklist__form-check-label'], " custom-control-label"),
    htmlFor: item.value
  }, t(item.label))));
};

var _default = ChecklistItem;
exports["default"] = _default;