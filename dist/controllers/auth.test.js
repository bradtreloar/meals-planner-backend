"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var auth = _interopRequireWildcard(require("../auth"));

var _database = _interopRequireDefault(require("../database"));

var _User = require("../factories/User");

var _User2 = _interopRequireDefault(require("../models/User"));

var _faker = _interopRequireDefault(require("@faker-js/faker"));

var _assert = _interopRequireDefault(require("assert"));

var _auth2 = require("./auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe("login controller", function () {
  it("responds to valid request with user and access token", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var plainPassword, hashedPassword, user, req, mockResponseJson, mockResponseStatus, res, token;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _database["default"])(":memory:");

          case 2:
            plainPassword = _faker["default"].random.alphaNumeric(20);
            _context.next = 5;
            return (0, auth.hashPassword)(plainPassword);

          case 5:
            hashedPassword = _context.sent;
            _context.next = 8;
            return _User.UserFactory.create({
              password: hashedPassword
            });

          case 8:
            _context.next = 10;
            return _User2["default"].scope("public").findOne();

          case 10:
            user = _context.sent;
            (0, _assert["default"])(user !== null);
            req = {
              body: {
                email: user.email,
                password: plainPassword
              }
            };
            mockResponseJson = jest.fn();
            mockResponseStatus = jest.fn().mockReturnValue({
              json: mockResponseJson
            });
            res = {
              status: mockResponseStatus
            };
            token = _faker["default"].random.alphaNumeric(20); // @ts-expect-error

            auth.generateAccessToken = jest.fn().mockReturnValue(token);
            _context.next = 20;
            return (0, _auth2.login)(req, res);

          case 20:
            expect(mockResponseStatus).toHaveBeenCalledWith(200);
            expect(mockResponseJson).toHaveBeenCalledWith({
              user: user.toJSON(),
              accessToken: token
            });

          case 22:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it("responds to invalid email with an error", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var email, password, req, mockResponseJson, mockResponseStatus, res;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _database["default"])(":memory:");

          case 2:
            email = _faker["default"].internet.email();
            password = _faker["default"].random.alphaNumeric(20);
            req = {
              body: {
                email: email,
                password: password
              }
            };
            mockResponseJson = jest.fn();
            mockResponseStatus = jest.fn().mockReturnValue({
              json: mockResponseJson
            });
            res = {
              status: mockResponseStatus
            };
            _context2.next = 10;
            return (0, _auth2.login)(req, res);

          case 10:
            expect(mockResponseStatus).toHaveBeenCalledWith(401);
            expect(mockResponseJson).toHaveBeenCalledWith({
              error: "Invalid email or password"
            });

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it("responds to invalid password with an error", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var plainPassword, incorreCtPassword, hashedPassword, user, req, mockResponseJson, mockResponseStatus, res;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _database["default"])(":memory:");

          case 2:
            plainPassword = _faker["default"].random.alphaNumeric(20);
            incorreCtPassword = _faker["default"].random.alphaNumeric(20);
            _context3.next = 6;
            return (0, auth.hashPassword)(plainPassword);

          case 6:
            hashedPassword = _context3.sent;
            _context3.next = 9;
            return _User.UserFactory.create({
              password: hashedPassword
            });

          case 9:
            _context3.next = 11;
            return _User2["default"].scope("public").findOne();

          case 11:
            user = _context3.sent;
            (0, _assert["default"])(user !== null);
            req = {
              body: {
                email: user.email,
                password: incorreCtPassword
              }
            };
            mockResponseJson = jest.fn();
            mockResponseStatus = jest.fn().mockReturnValue({
              json: mockResponseJson
            });
            res = {
              status: mockResponseStatus
            };
            _context3.next = 19;
            return (0, _auth2.login)(req, res);

          case 19:
            expect(mockResponseStatus).toHaveBeenCalledWith(401);
            expect(mockResponseJson).toHaveBeenCalledWith({
              error: "Invalid email or password"
            });

          case 21:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
});