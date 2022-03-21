"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.resetPassword = exports.refresh = exports.login = void 0;var _auth = require("../auth");











var _mail = require("../mail");
var _models = require("../models");function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];if (_i == null) return;var _arr = [];var _n = true;var _d = false;var _s, _e;try {for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}







var login = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(req, res) {var _req$body, email, password, user, refreshToken;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_req$body =
            req.body, email = _req$body.email, password = _req$body.password;_context.prev = 1;_context.next = 4;return (

              (0, _auth.authenticatePassword)(email, password));case 4:user = _context.sent;_context.next = 7;return (
              (0, _auth.generateRefreshToken)(user));case 7:refreshToken = _context.sent;
            res.status(200).json({
              user: user.toJSON(),
              accessToken: (0, _auth.generateAccessToken)(user),
              refreshToken: refreshToken.id });_context.next = 14;break;case 11:_context.prev = 11;_context.t0 = _context["catch"](1);


            if (
            _context.t0 instanceof _auth.UserNotFoundException ||
            _context.t0 instanceof _auth.InvalidPasswordException)
            {
              res.status(401).json({
                error: "Invalid email or password" });

            }case 14:case "end":return _context.stop();}}}, _callee, null, [[1, 11]]);}));return function login(_x, _x2) {return _ref.apply(this, arguments);};}();exports.login = login;



var refresh = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(req, res) {var refreshTokenID, _yield$authenticateTo, _yield$authenticateTo2, refreshToken, user, newRefreshToken;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
            refreshTokenID = req.body.refreshToken;_context2.prev = 1;_context2.next = 4;return (

              (0, _auth.authenticateToken)(refreshTokenID));case 4:_yield$authenticateTo = _context2.sent;_yield$authenticateTo2 = _slicedToArray(_yield$authenticateTo, 2);refreshToken = _yield$authenticateTo2[0];user = _yield$authenticateTo2[1];
            (0, _auth.revokeToken)(refreshToken);_context2.next = 11;return (
              (0, _auth.generateRefreshToken)(user));case 11:newRefreshToken = _context2.sent;
            res.status(200).json({
              accessToken: (0, _auth.generateAccessToken)(user),
              refreshToken: newRefreshToken.id });_context2.next = 18;break;case 15:_context2.prev = 15;_context2.t0 = _context2["catch"](1);


            if (
            _context2.t0 instanceof _auth.ExpiredTokenException ||
            _context2.t0 instanceof _auth.InvalidTokenException)
            {
              res.status(401).json({
                error: "Invalid token" });

            }case 18:case "end":return _context2.stop();}}}, _callee2, null, [[1, 15]]);}));return function refresh(_x3, _x4) {return _ref2.apply(this, arguments);};}();exports.refresh = refresh;



var resetPassword = /*#__PURE__*/function () {var _ref3 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3(
  req,
  res) {var email, user, token, url;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:

            email = req.body.email;_context3.next = 3;return (
              _models.User.findOne({
                where: {
                  email: email } }));case 3:user = _context3.sent;if (!(


            user !== null)) {_context3.next = 14;break;}_context3.next = 7;return (
              (0, _auth.generatePasswordResetToken)(user));case 7:token = _context3.sent;
            url = "mealsplanner://reset-password/".concat(token);_context3.next = 11;return (
              (0, _mail.sendMail)(
              user,
              "Reset your password",
              (0, _mail.renderPasswordResetMessage)({
                url: url })));case 11:


            res.status(204);_context3.next = 15;break;case 14:

            res.status(422).json({
              error: "No user with this email address" });case 15:case "end":return _context3.stop();}}}, _callee3);}));return function resetPassword(_x5, _x6) {return _ref3.apply(this, arguments);};}();exports.resetPassword = resetPassword;