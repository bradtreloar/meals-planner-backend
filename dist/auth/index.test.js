"use strict";

var _database = _interopRequireDefault(require("../database"));

var _User = _interopRequireDefault(require("../models/User"));

var _faker = require("@faker-js/faker");

var _bcrypt = _interopRequireDefault(require("bcrypt"));

var _ = require(".");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe("authenticateUser", function () {
  it("verifies user with given email and password exists", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
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
            _context.t0 = _User["default"];
            _context.t1 = email;
            _context.next = 8;
            return _bcrypt["default"].hash(password, _.SALT_ROUNDS);

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
            return (0, _.authenticateUser)(email, password);

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
  it("throws error when password doesn't match", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
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
            _context2.t0 = _User["default"];
            _context2.t1 = email;
            _context2.next = 9;
            return _bcrypt["default"].hash(password, _.SALT_ROUNDS);

          case 9:
            _context2.t2 = _context2.sent;
            _context2.t3 = {
              email: _context2.t1,
              password: _context2.t2
            };

            _context2.t0.create.call(_context2.t0, _context2.t3);

            _context2.next = 14;
            return expect((0, _.authenticateUser)(email, incorrectPassword)).rejects.toThrow(new _.InvalidPasswordException());

          case 14:
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
            return expect((0, _.authenticateUser)(email, password)).rejects.toThrow(new _.UserNotFoundException());

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
});