"use strict";

var _database = require("../database");

var _faker = require("@faker-js/faker");

var _User = require("./User");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe("initUser", function () {
  it("returns model", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var sequelize, User, attributes, result;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sequelize = (0, _database.getSQLiteSequelize)(":memory:");
            User = (0, _User.initUser)(sequelize);
            _context.next = 4;
            return sequelize.sync();

          case 4:
            attributes = {
              email: _faker.faker.internet.email(),
              password: _faker.faker.random.alphaNumeric(20)
            };
            _context.next = 7;
            return User.create(attributes);

          case 7:
            _context.next = 9;
            return User.findOne();

          case 9:
            result = _context.sent;
            expect(result === null || result === void 0 ? void 0 : result.email).toStrictEqual(attributes.email);
            expect(result === null || result === void 0 ? void 0 : result.password).toStrictEqual(attributes.password);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
  it("omits password from public scope", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var sequelize, User, attributes, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            sequelize = (0, _database.getSQLiteSequelize)(":memory:");
            User = (0, _User.initUser)(sequelize);
            _context2.next = 4;
            return sequelize.sync();

          case 4:
            attributes = {
              email: _faker.faker.internet.email(),
              password: _faker.faker.random.alphaNumeric(20)
            };
            _context2.next = 7;
            return User.create(attributes);

          case 7:
            _context2.next = 9;
            return User.scope("public").findOne();

          case 9:
            result = _context2.sent;
            expect(result === null || result === void 0 ? void 0 : result.email).toStrictEqual(attributes.email);
            expect(result === null || result === void 0 ? void 0 : result.password).toBeUndefined();

          case 12:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
});