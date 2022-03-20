"use strict";function _typeof(obj) {"@babel/helpers - typeof";return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {return typeof obj;} : function (obj) {return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;}, _typeof(obj);}var _database = require("../database");
var _models = require("../models");
var _jsonwebtoken = _interopRequireWildcard(require("jsonwebtoken"));

var _faker = require("@faker-js/faker");
var _lodash = require("lodash");
var _ = require(".");













var _User = require("../factories/User");
var _Token = require("../factories/Token");
var _setupTestsAfterEnv = require("../setupTestsAfterEnv");function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {return { "default": obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj["default"] = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];if (_i == null) return;var _arr = [];var _n = true;var _d = false;var _s, _e;try {for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

describe("authenticatePassword", function () {
  beforeEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
              (0, _database.initInMemorySequelize)());case 2:case "end":return _context.stop();}}}, _callee);})));


  it("returns user when password is correct", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {var email, password, _yield$UserFactory$cr, id, user, result;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
            email = _faker.faker.internet.email();
            password = _faker.faker.random.alphaNumeric(20);_context2.t0 =
            _User.UserFactory;_context2.t1 =
            email;_context2.next = 6;return (
              (0, _.hashPassword)(password));case 6:_context2.t2 = _context2.sent;_context2.t3 = { email: _context2.t1, password: _context2.t2 };_context2.next = 10;return _context2.t0.create.call(_context2.t0, _context2.t3);case 10:_yield$UserFactory$cr = _context2.sent;id = _yield$UserFactory$cr.id;_context2.next = 14;return (

              _models.User.scope("public").findByPk(id));case 14:user = _context2.sent;_context2.next = 17;return (

              (0, _.authenticatePassword)(email, password));case 17:result = _context2.sent;

            expect(result.toJSON()).toStrictEqual(user === null || user === void 0 ? void 0 : user.toJSON());case 19:case "end":return _context2.stop();}}}, _callee2);})));


  it("throws error when password is incorrect", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {var email, password, incorrectPassword;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
            email = _faker.faker.internet.email();
            password = _faker.faker.random.alphaNumeric(20);
            incorrectPassword = password + _faker.faker.random.alphaNumeric(1);_context3.t0 =
            _User.UserFactory;_context3.t1 =
            email;_context3.next = 7;return (
              (0, _.hashPassword)(password));case 7:_context3.t2 = _context3.sent;_context3.t3 = { email: _context3.t1, password: _context3.t2 };_context3.next = 11;return _context3.t0.create.call(_context3.t0, _context3.t3);case 11:_context3.next = 13;return (


              expect(
              (0, _.authenticatePassword)(email, incorrectPassword)).
              rejects.toThrow(_.InvalidPasswordException));case 13:case "end":return _context3.stop();}}}, _callee3);})));


  it("throws error when email doesn't match any user", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {var email, password;return regeneratorRuntime.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
            email = _faker.faker.internet.email();
            password = _faker.faker.random.alphaNumeric(20);_context4.next = 4;return (

              expect((0, _.authenticatePassword)(email, password)).rejects.toThrow(
              _.UserNotFoundException));case 4:case "end":return _context4.stop();}}}, _callee4);})));


});

describe("generateAccessToken", function () {
  it("generates an access token from a user", function () {
    var secret = process.env.SECRET;
    var user = _User.UserFactory.build({
      id: Math.floor((0, _lodash.random)(1, 100)),
      email: _faker.faker.internet.email() });


    var token = (0, _.generateAccessToken)(user);
    var payload = _jsonwebtoken["default"].verify(token, secret);

    expect(payload.user).toStrictEqual({
      id: user.id,
      email: user.email });

  });
});

describe("verifyAccessToken", function () {
  it("return payload from a valid access token", function () {
    var user = _User.UserFactory.build({
      id: Math.floor((0, _lodash.random)(1, 100)),
      email: _faker.faker.internet.email() });

    var token = (0, _.generateAccessToken)(user);

    var payload = (0, _.verifyAccessToken)(token);

    expect(payload.user).toStrictEqual({
      id: user.id,
      email: user.email });

  });

  it("throws an error when access token is invalid", function () {
    expect(function () {return (0, _.verifyAccessToken)(_faker.faker.random.alphaNumeric(20));}).toThrow(
    _jsonwebtoken.JsonWebTokenError);

  });
});

describe("generateRefreshToken", function () {
  beforeEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {return regeneratorRuntime.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.next = 2;return (
              (0, _database.initInMemorySequelize)());case 2:case "end":return _context5.stop();}}}, _callee5);})));


  it("generates a refresh token for a user", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {var user, token;return regeneratorRuntime.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.next = 2;return (
              _User.UserFactory.create());case 2:user = _context6.sent;_context6.next = 5;return (

              (0, _.generateRefreshToken)(user));case 5:token = _context6.sent;

            expect(token.userID).toBe(user.id);case 7:case "end":return _context6.stop();}}}, _callee6);})));

});

describe("generatePasswordResetToken", function () {
  beforeEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {return regeneratorRuntime.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:_context7.next = 2;return (
              (0, _database.initInMemorySequelize)());case 2:case "end":return _context7.stop();}}}, _callee7);})));


  it("creates password reset token", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {var user, returnedToken, token;return regeneratorRuntime.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:_context8.next = 2;return (
              _User.UserFactory.create());case 2:user = _context8.sent;_context8.next = 5;return (

              (0, _.generatePasswordResetToken)(user));case 5:returnedToken = _context8.sent;_context8.next = 8;return (

              _models.Token.findOne());case 8:token = _context8.sent;
            expect(returnedToken.toJSON()).toStrictEqual(token.toJSON());case 10:case "end":return _context8.stop();}}}, _callee8);})));

});

describe("authenticateToken", function () {
  beforeEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {return regeneratorRuntime.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:_context9.next = 2;return (
              (0, _database.initInMemorySequelize)());case 2:case "end":return _context9.stop();}}}, _callee9);})));


  it("returns token and user when token exists", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee10() {var user, token, _yield$authenticateTo, _yield$authenticateTo2, retrievedToken, owner;return regeneratorRuntime.wrap(function _callee10$(_context10) {while (1) {switch (_context10.prev = _context10.next) {case 0:_context10.next = 2;return (
              _User.UserFactory.create());case 2:user = _context10.sent;_context10.next = 5;return (
              _Token.TokenFactory.create(user));case 5:token = _context10.sent;_context10.next = 8;return (

              (0, _.authenticateToken)(token.id));case 8:_yield$authenticateTo = _context10.sent;_yield$authenticateTo2 = _slicedToArray(_yield$authenticateTo, 2);retrievedToken = _yield$authenticateTo2[0];owner = _yield$authenticateTo2[1];

            expect(retrievedToken === null || retrievedToken === void 0 ? void 0 : retrievedToken.toJSON()).toStrictEqual(token.toJSON());
            expect(owner === null || owner === void 0 ? void 0 : owner.toJSON()).toStrictEqual(user === null || user === void 0 ? void 0 : user.toJSON());case 14:case "end":return _context10.stop();}}}, _callee10);})));


  it("throws error when token does not exist", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee11() {var tokenID;return regeneratorRuntime.wrap(function _callee11$(_context11) {while (1) {switch (_context11.prev = _context11.next) {case 0:
            tokenID = _faker.faker.random.alphaNumeric(64);_context11.next = 3;return (

              expect((0, _.authenticateToken)(tokenID)).rejects.toThrow(
              _.InvalidTokenException));case 3:case "end":return _context11.stop();}}}, _callee11);})));



  it("returns user when token at maximum age", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee12() {var user, token, _yield$authenticateTo3, _yield$authenticateTo4, retrievedToken, owner;return regeneratorRuntime.wrap(function _callee12$(_context12) {while (1) {switch (_context12.prev = _context12.next) {case 0:_context12.next = 2;return (
              _User.UserFactory.create());case 2:user = _context12.sent;_context12.next = 5;return (
              _Token.TokenFactory.create(user, {
                createdAt: _setupTestsAfterEnv.mockNow.minus({ minutes: 15 }).toJSDate(),
                updatedAt: _setupTestsAfterEnv.mockNow.minus({ minutes: 15 }).toJSDate(),
                expiresAt: _setupTestsAfterEnv.mockNow.toJSDate() }));case 5:token = _context12.sent;_context12.next = 8;return (


              (0, _.authenticateToken)(token.id));case 8:_yield$authenticateTo3 = _context12.sent;_yield$authenticateTo4 = _slicedToArray(_yield$authenticateTo3, 2);retrievedToken = _yield$authenticateTo4[0];owner = _yield$authenticateTo4[1];

            expect(retrievedToken === null || retrievedToken === void 0 ? void 0 : retrievedToken.toJSON()).toStrictEqual(token === null || token === void 0 ? void 0 : token.toJSON());
            expect(owner === null || owner === void 0 ? void 0 : owner.toJSON()).toStrictEqual(user === null || user === void 0 ? void 0 : user.toJSON());case 14:case "end":return _context12.stop();}}}, _callee12);})));


  it("throws error when token has expired", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee13() {var user, token;return regeneratorRuntime.wrap(function _callee13$(_context13) {while (1) {switch (_context13.prev = _context13.next) {case 0:_context13.next = 2;return (
              _User.UserFactory.create());case 2:user = _context13.sent;_context13.next = 5;return (
              _Token.TokenFactory.create(user, {
                createdAt: _setupTestsAfterEnv.mockNow.minus({ minutes: 15 }).toJSDate(),
                updatedAt: _setupTestsAfterEnv.mockNow.minus({ minutes: 15 }).toJSDate(),
                expiresAt: _setupTestsAfterEnv.mockNow.minus({ milliseconds: 1 }).toJSDate() }));case 5:token = _context13.sent;_context13.next = 8;return (


              expect((0, _.authenticateToken)(token.id)).rejects.toThrow(
              _.ExpiredTokenException));case 8:case "end":return _context13.stop();}}}, _callee13);})));



  it("deletes expired token", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee14() {var user, token, tokens;return regeneratorRuntime.wrap(function _callee14$(_context14) {while (1) {switch (_context14.prev = _context14.next) {case 0:_context14.next = 2;return (
              _User.UserFactory.create());case 2:user = _context14.sent;_context14.next = 5;return (
              _Token.TokenFactory.create(user, {
                createdAt: _setupTestsAfterEnv.mockNow.minus({ minutes: 15 }).toJSDate(),
                updatedAt: _setupTestsAfterEnv.mockNow.minus({ minutes: 15 }).toJSDate(),
                expiresAt: _setupTestsAfterEnv.mockNow.minus({ milliseconds: 1 }).toJSDate() }));case 5:token = _context14.sent;_context14.next = 8;return (


              expect((0, _.authenticateToken)(token.id)).rejects.toThrow(
              _.ExpiredTokenException));case 8:_context14.next = 10;return (


              _models.Token.findAll());case 10:tokens = _context14.sent;
            expect(tokens).toHaveLength(0);case 12:case "end":return _context14.stop();}}}, _callee14);})));

});

describe("revokeToken", function () {
  beforeEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee15() {return regeneratorRuntime.wrap(function _callee15$(_context15) {while (1) {switch (_context15.prev = _context15.next) {case 0:_context15.next = 2;return (
              (0, _database.initInMemorySequelize)());case 2:case "end":return _context15.stop();}}}, _callee15);})));


  it("deletes token", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee16() {var user, token, result;return regeneratorRuntime.wrap(function _callee16$(_context16) {while (1) {switch (_context16.prev = _context16.next) {case 0:_context16.next = 2;return (
              _User.UserFactory.create());case 2:user = _context16.sent;_context16.next = 5;return (
              _Token.TokenFactory.create(user));case 5:token = _context16.sent;

            (0, _.revokeToken)(token);_context16.next = 9;return (

              _models.Token.findAll());case 9:result = _context16.sent;
            expect(result).toHaveLength(0);case 11:case "end":return _context16.stop();}}}, _callee16);})));

});