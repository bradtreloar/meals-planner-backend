"use strict";

var _auth = require("../auth");

var _database = _interopRequireDefault(require("../database"));

var _User = require("../factories/User");

var _User2 = _interopRequireDefault(require("../models/User"));

var _faker = _interopRequireDefault(require("@faker-js/faker"));

var _assert = _interopRequireDefault(require("assert"));

var _auth2 = require("./auth");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe("login controller", function () {
  it("responds to valid request with user and access token", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var plainPassword, hashedPassword, user, req, mockResponseJson, mockResponseStatus, res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _database["default"])(":memory:");
            plainPassword = _faker["default"].random.alphaNumeric(20);
            _context.next = 4;
            return (0, _auth.hashPassword)(plainPassword);

          case 4:
            hashedPassword = _context.sent;
            _context.next = 7;
            return _User.UserFactory.create({
              password: hashedPassword
            });

          case 7:
            _context.next = 9;
            return _User2["default"].scope("public").findOne();

          case 9:
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
            _context.next = 17;
            return (0, _auth2.login)(req, res);

          case 17:
            expect(mockResponseStatus).toHaveBeenCalledWith(200);
            expect(mockResponseJson).toHaveBeenCalledWith({
              user: user.toJSON(),
              accessToken: /[a-z]/
            });

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});