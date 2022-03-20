"use strict";var _database = require("../database");
var _User = require("../factories/User");
var _setupTestsAfterEnv = require("../setupTestsAfterEnv");
var _faker = require("@faker-js/faker");
var _ = require(".");function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

describe("initModels", function () {
  it("defines models for sequelize instance", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {var sequelize, attributes, result;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            sequelize = (0, _database.getSQLiteSequelize)(":memory:");_context.next = 3;return (
              (0, _.initModels)(sequelize));case 3:
            attributes = {
              email: _faker.faker.internet.email(),
              password: _faker.faker.random.alphaNumeric(20) };_context.next = 6;return (

              _.User.create(attributes));case 6:_context.next = 8;return (

              _.User.findOne());case 8:result = _context.sent;
            expect(result === null || result === void 0 ? void 0 : result.email).toStrictEqual(attributes.email);
            expect(result === null || result === void 0 ? void 0 : result.password).toStrictEqual(attributes.password);case 11:case "end":return _context.stop();}}}, _callee);})));

});

describe("User", function () {
  beforeEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
              (0, _database.initInMemorySequelize)());case 2:case "end":return _context2.stop();}}}, _callee2);})));


  it("creates instance of User", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {var attributes, result;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
            attributes = {
              email: _faker.faker.internet.email(),
              password: _faker.faker.random.alphaNumeric(20) };_context3.next = 3;return (


              _.User.create(attributes));case 3:_context3.next = 5;return (
              _.User.findOne());case 5:result = _context3.sent;

            expect(result === null || result === void 0 ? void 0 : result.email).toStrictEqual(attributes.email);
            expect(result === null || result === void 0 ? void 0 : result.password).toStrictEqual(attributes.password);case 8:case "end":return _context3.stop();}}}, _callee3);})));


  it("omits password from public scope", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {var attributes, result;return regeneratorRuntime.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
            attributes = {
              email: _faker.faker.internet.email(),
              password: _faker.faker.random.alphaNumeric(20) };_context4.next = 3;return (


              _.User.create(attributes));case 3:_context4.next = 5;return (
              _.User.scope("public").findOne());case 5:result = _context4.sent;

            expect(result === null || result === void 0 ? void 0 : result.email).toStrictEqual(attributes.email);
            expect(result === null || result === void 0 ? void 0 : result.password).toBeUndefined();case 8:case "end":return _context4.stop();}}}, _callee4);})));

});

describe("Token", function () {
  beforeEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {return regeneratorRuntime.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.next = 2;return (
              (0, _database.initInMemorySequelize)());case 2:case "end":return _context5.stop();}}}, _callee5);})));


  it("creates instance of Token owned by User", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {var user, result;return regeneratorRuntime.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:_context6.next = 2;return (
              _User.UserFactory.create());case 2:user = _context6.sent;_context6.next = 5;return (

              _.Token.create({
                userID: user.id,
                expiresAt: _setupTestsAfterEnv.mockNow.toJSDate() }));case 5:_context6.next = 7;return (

              _.Token.findOne());case 7:result = _context6.sent;

            expect(result === null || result === void 0 ? void 0 : result.userID).toStrictEqual(user.id);_context6.t0 =
            expect;_context6.next = 12;return result === null || result === void 0 ? void 0 : result.getUser();case 12:_context6.t1 = _context6.sent;(0, _context6.t0)(_context6.t1).toStrictEqual(user);case 14:case "end":return _context6.stop();}}}, _callee6);})));

});