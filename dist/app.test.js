"use strict";var _app = _interopRequireDefault(require("./app"));
var _supertest = _interopRequireDefault(require("supertest"));
var _database = require("./database");
var _User = require("./factories/User");
var _faker = _interopRequireDefault(require("@faker-js/faker"));
var _auth = require("./auth");
var _helpers = require("./models/helpers");
var _models = require("./models");
var _Token = require("./factories/Token");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

beforeEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
            (0, _database.initInMemorySequelize)());case 2:case "end":return _context.stop();}}}, _callee);})));


describe("example endpoint", function () {
  it("/ returns Hello World", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {var app, res;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
            app = (0, _app["default"])();_context2.next = 3;return (
              (0, _supertest["default"])(app).get("/"));case 3:res = _context2.sent;
            expect(res.status).toBe(200);
            expect(res.text).toBe("Hello World!");case 6:case "end":return _context2.stop();}}}, _callee2);})));

});

describe("/auth endpoints", function () {
  it("/auth/login calls auth.login controller", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {var plainPassword, _yield$UserFactory$cr, id, user, app, res;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
            plainPassword = _faker["default"].random.alphaNumeric(20);_context3.t0 =
            _User.UserFactory;_context3.next = 4;return (
              (0, _auth.hashPassword)(plainPassword));case 4:_context3.t1 = _context3.sent;_context3.t2 = { password: _context3.t1 };_context3.next = 8;return _context3.t0.create.call(_context3.t0, _context3.t2);case 8:_yield$UserFactory$cr = _context3.sent;id = _yield$UserFactory$cr.id;_context3.next = 12;return (

              _models.User.scope("public").findByPk(id));case 12:user = _context3.sent;
            app = (0, _app["default"])();_context3.next = 16;return (
              (0, _supertest["default"])(app).post("/auth/login").send({
                email: user.email,
                password: plainPassword }));case 16:res = _context3.sent;

            expect(res.body.user).toStrictEqual((0, _helpers.modelToJSON)(user));
            expect(res.body.accessToken).not.toBeUndefined();
            expect(res.body.refreshToken).not.toBeUndefined();case 20:case "end":return _context3.stop();}}}, _callee3);})));


  it("/auth/refresh calls auth.refresh controller", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {var user, token, app, res;return regeneratorRuntime.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.next = 2;return (
              _User.UserFactory.create());case 2:user = _context4.sent;_context4.next = 5;return (
              _Token.TokenFactory.create(user));case 5:token = _context4.sent;
            app = (0, _app["default"])();_context4.next = 9;return (
              (0, _supertest["default"])(app).post("/auth/refresh").send({
                refreshToken: token.id }));case 9:res = _context4.sent;

            expect(res.body.accessToken).not.toBeUndefined();
            expect(res.body.refreshToken).not.toBeUndefined();case 12:case "end":return _context4.stop();}}}, _callee4);})));

});