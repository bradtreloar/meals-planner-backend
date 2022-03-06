"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

var _ = _interopRequireWildcard(require("."));

var _faker = require("@faker-js/faker");

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

describe("getSQLiteSequelize", function () {
  it("connects to database", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {
    var sequelize;
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            sequelize = (0, _.getSQLiteSequelize)(":memory:");
            _context.next = 3;
            return sequelize.authenticate();

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  })));
});
describe("initModels", function () {
  it("defines models for sequelize instance", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {
    var sequelize, attributes, result;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            sequelize = (0, _.getSQLiteSequelize)(":memory:");
            _context2.next = 3;
            return (0, _.initModels)(sequelize);

          case 3:
            attributes = {
              email: _faker.faker.internet.email(),
              password: _faker.faker.random.alphaNumeric(20)
            };
            _context2.next = 6;
            return _User["default"].create(attributes);

          case 6:
            _context2.next = 8;
            return _User["default"].findOne();

          case 8:
            result = _context2.sent;
            expect(result === null || result === void 0 ? void 0 : result.email).toStrictEqual(attributes.email);
            expect(result === null || result === void 0 ? void 0 : result.password).toStrictEqual(attributes.password);

          case 11:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  })));
});
describe("initSequelize", function () {
  it("initialises Sequelize instance and defines models", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {
    var attributes, result;
    return regeneratorRuntime.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return (0, _["default"])(":memory:");

          case 2:
            attributes = {
              email: _faker.faker.internet.email(),
              password: _faker.faker.random.alphaNumeric(20)
            };
            _context3.next = 5;
            return _User["default"].create(attributes);

          case 5:
            _context3.next = 7;
            return _User["default"].findOne();

          case 7:
            result = _context3.sent;
            expect(result === null || result === void 0 ? void 0 : result.email).toStrictEqual(attributes.email);
            expect(result === null || result === void 0 ? void 0 : result.password).toStrictEqual(attributes.password);

          case 10:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  })));
});