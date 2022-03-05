"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.initModels = exports.getSQLiteSequelize = exports["default"] = void 0;

var _sequelize = require("sequelize");

var _User = require("../models/User");

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

var getSQLiteSequelize = function getSQLiteSequelize(storage) {
  return new _sequelize.Sequelize({
    dialect: "sqlite",
    storage: storage,
    logging: false
  });
};

exports.getSQLiteSequelize = getSQLiteSequelize;

var initModels = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(sequelize) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            (0, _User.initUser)(sequelize);
            _context.next = 3;
            return sequelize.sync();

          case 3:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function initModels(_x) {
    return _ref.apply(this, arguments);
  };
}();

exports.initModels = initModels;

var initSequelize = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(storage) {
    var sequelize;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            sequelize = getSQLiteSequelize(storage);
            _context2.next = 3;
            return initModels(sequelize);

          case 3:
            return _context2.abrupt("return", sequelize);

          case 4:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function initSequelize(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var _default = initSequelize;
exports["default"] = _default;