"use strict";function _typeof(obj) {"@babel/helpers - typeof";return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {return typeof obj;} : function (obj) {return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;}, _typeof(obj);}Object.defineProperty(exports, "__esModule", { value: true });exports.verifyAccessToken = exports.revokeRefreshToken = exports.hashPassword = exports.getSecret = exports.generateRefreshToken = exports.generateAccessToken = exports.authenticateRefreshToken = exports.authenticatePassword = exports.UserNotFoundException = exports.REFRESH_TOKEN_EXPIRES_IN = exports.PASSWORD_SALT_ROUNDS = exports.InvalidRefreshTokenException = exports.InvalidPasswordException = exports.ExpiredRefreshTokenException = exports.ACCESS_TOKEN_EXPIRES_IN = void 0;var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _models = require("../models");
var _luxon = require("luxon");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });Object.defineProperty(subClass, "prototype", { writable: false });if (superClass) _setPrototypeOf(subClass, superClass);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (_typeof(call) === "object" || typeof call === "function")) {return call;} else if (call !== void 0) {throw new TypeError("Derived constructors may only return object or undefined");}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _wrapNativeSuper(Class) {var _cache = typeof Map === "function" ? new Map() : undefined;_wrapNativeSuper = function _wrapNativeSuper(Class) {if (Class === null || !_isNativeFunction(Class)) return Class;if (typeof Class !== "function") {throw new TypeError("Super expression must either be null or a function");}if (typeof _cache !== "undefined") {if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);}function Wrapper() {return _construct(Class, arguments, _getPrototypeOf(this).constructor);}Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });return _setPrototypeOf(Wrapper, Class);};return _wrapNativeSuper(Class);}function _construct(Parent, args, Class) {if (_isNativeReflectConstruct()) {_construct = Reflect.construct;} else {_construct = function _construct(Parent, args, Class) {var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;};}return _construct.apply(null, arguments);}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));return true;} catch (e) {return false;}}function _isNativeFunction(fn) {return Function.toString.call(fn).indexOf("[native code]") !== -1;}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}

var PASSWORD_SALT_ROUNDS = 10;exports.PASSWORD_SALT_ROUNDS = PASSWORD_SALT_ROUNDS;
var ACCESS_TOKEN_EXPIRES_IN = 1800; // 15 minutes, in seconds
exports.ACCESS_TOKEN_EXPIRES_IN = ACCESS_TOKEN_EXPIRES_IN;var REFRESH_TOKEN_EXPIRES_IN = 2592000; // 30 days, in seconds
exports.REFRESH_TOKEN_EXPIRES_IN = REFRESH_TOKEN_EXPIRES_IN;var
UserNotFoundException = /*#__PURE__*/function (_Error) {_inherits(UserNotFoundException, _Error);var _super = _createSuper(UserNotFoundException);
  function UserNotFoundException() {_classCallCheck(this, UserNotFoundException);return _super.call(this,
    "User not found");
  }return _createClass(UserNotFoundException);}( /*#__PURE__*/_wrapNativeSuper(Error));exports.UserNotFoundException = UserNotFoundException;var


InvalidPasswordException = /*#__PURE__*/function (_Error2) {_inherits(InvalidPasswordException, _Error2);var _super2 = _createSuper(InvalidPasswordException);
  function InvalidPasswordException() {_classCallCheck(this, InvalidPasswordException);return _super2.call(this,
    "Invalid password");
  }return _createClass(InvalidPasswordException);}( /*#__PURE__*/_wrapNativeSuper(Error));exports.InvalidPasswordException = InvalidPasswordException;var


InvalidRefreshTokenException = /*#__PURE__*/function (_Error3) {_inherits(InvalidRefreshTokenException, _Error3);var _super3 = _createSuper(InvalidRefreshTokenException);
  function InvalidRefreshTokenException() {_classCallCheck(this, InvalidRefreshTokenException);return _super3.call(this,
    "Invalid refresh token");
  }return _createClass(InvalidRefreshTokenException);}( /*#__PURE__*/_wrapNativeSuper(Error));exports.InvalidRefreshTokenException = InvalidRefreshTokenException;var


ExpiredRefreshTokenException = /*#__PURE__*/function (_Error4) {_inherits(ExpiredRefreshTokenException, _Error4);var _super4 = _createSuper(ExpiredRefreshTokenException);
  function ExpiredRefreshTokenException() {_classCallCheck(this, ExpiredRefreshTokenException);return _super4.call(this,
    "Expired refresh token");
  }return _createClass(ExpiredRefreshTokenException);}( /*#__PURE__*/_wrapNativeSuper(Error));exports.ExpiredRefreshTokenException = ExpiredRefreshTokenException;


var authenticatePassword = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(email, password) {var user, isCorrectPassword;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
              _models.User.findOne({
                where: {
                  email: email } }));case 2:user = _context.sent;if (!(


            user === null)) {_context.next = 5;break;}throw (
              new UserNotFoundException());case 5:_context.next = 7;return (

              _bcrypt["default"].compare(password, user.password));case 7:isCorrectPassword = _context.sent;if (
            isCorrectPassword) {_context.next = 10;break;}throw (
              new InvalidPasswordException());case 10:_context.next = 12;return (

              _models.User.scope("public").findByPk(user.id));case 12:return _context.abrupt("return", _context.sent);case 13:case "end":return _context.stop();}}}, _callee);}));return function authenticatePassword(_x, _x2) {return _ref.apply(this, arguments);};}();exports.authenticatePassword = authenticatePassword;


var generateAccessToken = function generateAccessToken(user) {
  return _jsonwebtoken["default"].sign(
  {
    user: {
      id: user.id,
      email: user.email } },


  getSecret(),
  { expiresIn: "".concat(ACCESS_TOKEN_EXPIRES_IN, "s") });

};exports.generateAccessToken = generateAccessToken;

var verifyAccessToken = function verifyAccessToken(token) {return (
    _jsonwebtoken["default"].verify(token, getSecret()));};exports.verifyAccessToken = verifyAccessToken;

var generateRefreshToken = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(user) {var _yield$user$createRef, id;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
              user.createRefreshToken());case 2:_yield$user$createRef = _context2.sent;id = _yield$user$createRef.id;_context2.next = 6;return (
              _models.RefreshToken.findByPk(id));case 6:return _context2.abrupt("return", _context2.sent);case 7:case "end":return _context2.stop();}}}, _callee2);}));return function generateRefreshToken(_x3) {return _ref2.apply(this, arguments);};}();exports.generateRefreshToken = generateRefreshToken;


var authenticateRefreshToken = /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(
  tokenID) {var token, tokenDate, tokenAge, owner;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (

              _models.RefreshToken.findByPk(tokenID));case 2:token = _context3.sent;if (!(
            token === null)) {_context3.next = 5;break;}throw (
              new InvalidRefreshTokenException());case 5:

            tokenDate = _luxon.DateTime.fromJSDate(token.createdAt);
            tokenAge = Math.abs(tokenDate.diffNow().as("seconds"));if (!(
            tokenAge > REFRESH_TOKEN_EXPIRES_IN)) {_context3.next = 11;break;}_context3.next = 10;return (
              revokeRefreshToken(token));case 10:throw (
              new ExpiredRefreshTokenException());case 11:_context3.next = 13;return (

              token.getUser());case 13:owner = _context3.sent;return _context3.abrupt("return",
            [token, owner]);case 15:case "end":return _context3.stop();}}}, _callee3);}));return function authenticateRefreshToken(_x4) {return _ref3.apply(this, arguments);};}();exports.authenticateRefreshToken = authenticateRefreshToken;


var revokeRefreshToken = /*#__PURE__*/function () {var _ref4 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4(token) {return regeneratorRuntime.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.next = 2;return (
              token.destroy());case 2:case "end":return _context4.stop();}}}, _callee4);}));return function revokeRefreshToken(_x5) {return _ref4.apply(this, arguments);};}();exports.revokeRefreshToken = revokeRefreshToken;


var hashPassword = function hashPassword(password) {return (
    _bcrypt["default"].hash(password, PASSWORD_SALT_ROUNDS));};exports.hashPassword = hashPassword;

var getSecret = function getSecret() {
  var secret = process.env.SECRET;
  if (secret === undefined) {
    throw new Error("SECRET not set in environment");
  }
  return secret;
};exports.getSecret = getSecret;