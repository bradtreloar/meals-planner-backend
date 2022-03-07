"use strict";

var _app = _interopRequireDefault(require("./app"));

var _supertest = _interopRequireDefault(require("supertest"));

var _database = _interopRequireDefault(require("./database"));

var _User = require("./factories/User");

var _faker = _interopRequireDefault(require("@faker-js/faker"));

var _auth = require("./auth");

var _User2 = _interopRequireDefault(require("./models/User"));

var _helpers = require("./models/helpers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

beforeEach(function () {
  (0, _database["default"])(":memory:");
});
describe("example endpoint", function () {
  it("/ returns Hello World", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var app, res;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            app = (0, _app["default"])();
            _context.next = 3;
            return (0, _supertest["default"])(app).get("/");

          case 3:
            res = _context.sent;
            expect(res.status).toBe(200);
            expect(res.text).toBe("Hello World!");

          case 6:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});
describe("/auth endpoints", function () {
  it("/auth/login calls auth.login controller", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var plainPassword, _yield$UserFactory$cr, id, user, app, res;

    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            plainPassword = _faker["default"].random.alphaNumeric(20);
            _context2.t0 = _User.UserFactory;
            _context2.next = 4;
            return (0, _auth.hashPassword)(plainPassword);

          case 4:
            _context2.t1 = _context2.sent;
            _context2.t2 = {
              password: _context2.t1
            };
            _context2.next = 8;
            return _context2.t0.create.call(_context2.t0, _context2.t2);

          case 8:
            _yield$UserFactory$cr = _context2.sent;
            id = _yield$UserFactory$cr.id;
            _context2.next = 12;
            return _User2["default"].scope("public").findByPk(id);

          case 12:
            user = _context2.sent;
            app = (0, _app["default"])();
            _context2.next = 16;
            return (0, _supertest["default"])(app).post("/auth/login").send({
              email: user.email,
              password: plainPassword
            });

          case 16:
            res = _context2.sent;
            expect(res.body.user).toStrictEqual((0, _helpers.modelToJSON)(user));

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
});