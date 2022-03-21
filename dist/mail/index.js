"use strict";function _typeof(obj) {"@babel/helpers - typeof";return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {return typeof obj;} : function (obj) {return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;}, _typeof(obj);}Object.defineProperty(exports, "__esModule", { value: true });exports.sendMail = exports.renderPasswordResetMessage = exports.getSMTPSettings = exports.EnvironmentVariableNotSetException = void 0;var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _lodash = require("lodash");
var _pug = require("pug");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _inherits(subClass, superClass) {if (typeof superClass !== "function" && superClass !== null) {throw new TypeError("Super expression must either be null or a function");}subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } });Object.defineProperty(subClass, "prototype", { writable: false });if (superClass) _setPrototypeOf(subClass, superClass);}function _createSuper(Derived) {var hasNativeReflectConstruct = _isNativeReflectConstruct();return function _createSuperInternal() {var Super = _getPrototypeOf(Derived),result;if (hasNativeReflectConstruct) {var NewTarget = _getPrototypeOf(this).constructor;result = Reflect.construct(Super, arguments, NewTarget);} else {result = Super.apply(this, arguments);}return _possibleConstructorReturn(this, result);};}function _possibleConstructorReturn(self, call) {if (call && (_typeof(call) === "object" || typeof call === "function")) {return call;} else if (call !== void 0) {throw new TypeError("Derived constructors may only return object or undefined");}return _assertThisInitialized(self);}function _assertThisInitialized(self) {if (self === void 0) {throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return self;}function _wrapNativeSuper(Class) {var _cache = typeof Map === "function" ? new Map() : undefined;_wrapNativeSuper = function _wrapNativeSuper(Class) {if (Class === null || !_isNativeFunction(Class)) return Class;if (typeof Class !== "function") {throw new TypeError("Super expression must either be null or a function");}if (typeof _cache !== "undefined") {if (_cache.has(Class)) return _cache.get(Class);_cache.set(Class, Wrapper);}function Wrapper() {return _construct(Class, arguments, _getPrototypeOf(this).constructor);}Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } });return _setPrototypeOf(Wrapper, Class);};return _wrapNativeSuper(Class);}function _construct(Parent, args, Class) {if (_isNativeReflectConstruct()) {_construct = Reflect.construct;} else {_construct = function _construct(Parent, args, Class) {var a = [null];a.push.apply(a, args);var Constructor = Function.bind.apply(Parent, a);var instance = new Constructor();if (Class) _setPrototypeOf(instance, Class.prototype);return instance;};}return _construct.apply(null, arguments);}function _isNativeReflectConstruct() {if (typeof Reflect === "undefined" || !Reflect.construct) return false;if (Reflect.construct.sham) return false;if (typeof Proxy === "function") return true;try {Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));return true;} catch (e) {return false;}}function _isNativeFunction(fn) {return Function.toString.call(fn).indexOf("[native code]") !== -1;}function _setPrototypeOf(o, p) {_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {o.__proto__ = p;return o;};return _setPrototypeOf(o, p);}function _getPrototypeOf(o) {_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {return o.__proto__ || Object.getPrototypeOf(o);};return _getPrototypeOf(o);}var


EnvironmentVariableNotSetException = /*#__PURE__*/function (_Error) {_inherits(EnvironmentVariableNotSetException, _Error);var _super = _createSuper(EnvironmentVariableNotSetException);
  function EnvironmentVariableNotSetException(variableName) {_classCallCheck(this, EnvironmentVariableNotSetException);return _super.call(this, "".concat(
    variableName, " not set in environment"));
  }return _createClass(EnvironmentVariableNotSetException);}( /*#__PURE__*/_wrapNativeSuper(Error));exports.EnvironmentVariableNotSetException = EnvironmentVariableNotSetException;


var compileTemplate = function compileTemplate(name) {return (
    (0, _pug.compileFile)("".concat(__dirname, "/templates/").concat(name, ".pug")));};

var renderPasswordResetMessage = compileTemplate("passwordReset");exports.renderPasswordResetMessage = renderPasswordResetMessage;

var getSMTPSettings = function getSMTPSettings() {
  var variableMappings = {
    fromAddress: "SMTP_FROM_ADDRESS",
    fromName: "SMTP_FROM_NAME",
    host: "SMTP_HOST",
    port: "SMTP_PORT",
    username: "SMTP_USERNAME",
    password: "SMTP_PASSWORD" };


  (0, _lodash.values)(variableMappings).forEach(function (variableName) {
    if (process.env[variableName] === undefined) {
      throw new EnvironmentVariableNotSetException(variableName);
    }
  });

  var settings = {
    fromAddress: process.env[variableMappings.fromAddress],
    fromName: process.env[variableMappings.fromName],
    host: process.env[variableMappings.host],
    port: parseInt(process.env[variableMappings.port]),
    username: process.env[variableMappings.username],
    password: process.env[variableMappings.password] };


  return settings;
};exports.getSMTPSettings = getSMTPSettings;

var sendMail = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(
  user,
  subject,
  message) {var _getSMTPSettings, fromAddress, fromName, host, password, port, username, transporter;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_getSMTPSettings =


            getSMTPSettings(), fromAddress = _getSMTPSettings.fromAddress, fromName = _getSMTPSettings.fromName, host = _getSMTPSettings.host, password = _getSMTPSettings.password, port = _getSMTPSettings.port, username = _getSMTPSettings.username;

            transporter = _nodemailer["default"].createTransport({
              host: host,
              port: port,
              secure: true,
              auth: {
                user: username,
                pass: password } });_context.next = 4;return (



              transporter.sendMail({
                from: "\"".concat(fromName, "\" <").concat(fromAddress, ">"), // sender address
                to: user.email,
                subject: subject,
                html: message }));case 4:return _context.abrupt("return", _context.sent);case 5:case "end":return _context.stop();}}}, _callee);}));return function sendMail(_x, _x2, _x3) {return _ref.apply(this, arguments);};}();exports.sendMail = sendMail;