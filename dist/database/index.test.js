"use strict";var _ = require(".");
var _faker = require("@faker-js/faker");
var _models = require("../models");function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

describe("getSQLiteSequelize", function () {
  it("connects to database", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {var sequelize;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            sequelize = (0, _.getSQLiteSequelize)(":memory:");_context.next = 3;return (
              sequelize.authenticate());case 3:case "end":return _context.stop();}}}, _callee);})));

});

describe("initSequelize", function () {
  it("initialises Sequelize instance and defines models", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {var attributes, result;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
              (0, _.initInMemorySequelize)());case 2:
            attributes = {
              email: _faker.faker.internet.email(),
              password: _faker.faker.random.alphaNumeric(20) };_context2.next = 5;return (

              _models.User.create(attributes));case 5:_context2.next = 7;return (

              _models.User.findOne());case 7:result = _context2.sent;
            expect(result === null || result === void 0 ? void 0 : result.email).toStrictEqual(attributes.email);
            expect(result === null || result === void 0 ? void 0 : result.password).toStrictEqual(attributes.password);case 10:case "end":return _context2.stop();}}}, _callee2);})));

});