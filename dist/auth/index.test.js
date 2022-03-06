"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _database = _interopRequireDefault(require("../database"));

var _User = _interopRequireDefault(require("../models/User"));

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _jsonwebtoken = _interopRequireWildcard(require("jsonwebtoken"));

var _faker = require("@faker-js/faker");

var _lodash = require("lodash");

var _ = require(".");

var _User2 = require("../factories/User");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe("authenticatePassword", function () {
  it("returns user when password is correct", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var email, password, user, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return (0, _database["default"])(":memory:");

          case 2:
            email = _faker.faker.internet.email();
            password = _faker.faker.random.alphaNumeric(20);
            _context.t0 = _User2.UserFactory;
            _context.t1 = email;
            _context.next = 8;
            return _bcrypt["default"].hash(password, _.PASSWORD_SALT_ROUNDS);

          case 8:
            _context.t2 = _context.sent;
            _context.t3 = {
              email: _context.t1,
              password: _context.t2
            };
            _context.next = 12;
            return _context.t0.create.call(_context.t0, _context.t3);

          case 12:
            _context.next = 14;
            return _User["default"].findOne({
              where: {
                email: email
              }
            });

          case 14:
            user = _context.sent;
            _context.next = 17;
            return (0, _.authenticatePassword)(email, password);

          case 17:
            result = _context.sent;
            expect(result).toStrictEqual(user);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it("throws error when password is incorrect", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var email, password, incorrectPassword;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return (0, _database["default"])(":memory:");

          case 2:
            email = _faker.faker.internet.email();
            password = _faker.faker.random.alphaNumeric(20);
            incorrectPassword = password + _faker.faker.random.alphaNumeric(1);
            _context2.t0 = _User2.UserFactory;
            _context2.t1 = email;
            _context2.next = 9;
            return _bcrypt["default"].hash(password, _.PASSWORD_SALT_ROUNDS);

          case 9:
            _context2.t2 = _context2.sent;
            _context2.t3 = {
              email: _context2.t1,
              password: _context2.t2
            };
            _context2.next = 13;
            return _context2.t0.create.call(_context2.t0, _context2.t3);

          case 13:
            _context2.next = 15;
            return expect((0, _.authenticatePassword)(email, incorrectPassword)).rejects.toThrow(new _.InvalidPasswordException());

          case 15:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
  it("throws error when email doesn't match any user", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var email, password;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _database["default"])(":memory:");

          case 2:
            email = _faker.faker.internet.email();
            password = _faker.faker.random.alphaNumeric(20);
            _context3.next = 6;
            return expect((0, _.authenticatePassword)(email, password)).rejects.toThrow(new _.UserNotFoundException());

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
});
describe("generateAccessToken", function () {
  it("generates an access token from a user", function () {
    var secret = _faker.faker.random.alphaNumeric(20);

    var user = _User2.UserFactory.build({
      id: Math.floor((0, _lodash.random)(1, 100)),
      email: _faker.faker.internet.email()
    });

    var token = (0, _.generateAccessToken)(user, secret);

    var payload = _jsonwebtoken["default"].verify(token, secret);

    expect(payload.user).toStrictEqual({
      id: user.id,
      email: user.email
    });
  });
});
describe("verifyAccessToken", function () {
  it("return payload from a valid access token", function () {
    var secret = _faker.faker.random.alphaNumeric(20);

    var user = _User2.UserFactory.build({
      id: Math.floor((0, _lodash.random)(1, 100)),
      email: _faker.faker.internet.email()
    });

    var token = (0, _.generateAccessToken)(user, secret);
    var payload = (0, _.verifyAccessToken)(token, secret);
    expect(payload.user).toStrictEqual({
      id: user.id,
      email: user.email
    });
  });
  it("throws an error when access token is invalid", function () {
    var secret = _faker.faker.random.alphaNumeric(20);

    var differentSecret = _faker.faker.random.alphaNumeric(20);

    var user = _User2.UserFactory.build();

    var token = (0, _.generateAccessToken)(user, differentSecret);
    expect(function () {
      return (0, _.verifyAccessToken)(token, secret);
    }).toThrow(_jsonwebtoken.JsonWebTokenError);
  });
});