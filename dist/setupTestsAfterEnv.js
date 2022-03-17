"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.mockNow = void 0;var _faker = _interopRequireDefault(require("@faker-js/faker"));
var _luxon = require("luxon");
var _mockdate = _interopRequireDefault(require("mockdate"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);enumerableOnly && (symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;})), keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = null != arguments[i] ? arguments[i] : {};i % 2 ? ownKeys(Object(source), !0).forEach(function (key) {_defineProperty(target, key, source[key]);}) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}

var ENV = process.env;

var mockNow = _luxon.DateTime.fromObject({
  year: 2020,
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0 });exports.mockNow = mockNow;


beforeAll(function () {
  _mockdate["default"].set(mockNow.toJSDate());
});

beforeEach(function () {
  jest.resetModules();

  process.env = _objectSpread({
    SECRET: _faker["default"].random.alphaNumeric(20) },
  ENV);

});

afterAll(function () {
  // Restore environment.
  process.env = ENV;

  // Restore date.
  _mockdate["default"].reset();
});