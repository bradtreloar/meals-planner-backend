"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.initSQLiteSequelize = exports.initInMemorySequelize = exports.getSQLiteSequelize = void 0;var _models = require("../models");
var _sequelize = require("sequelize");function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var getSQLiteSequelize = function getSQLiteSequelize(storage) {return (
    new _sequelize.Sequelize({
      dialect: "sqlite",
      storage: storage,
      logging: false }));};exports.getSQLiteSequelize = getSQLiteSequelize;


var initInMemorySequelize = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {var sequelize;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            sequelize = getSQLiteSequelize(":memory:");_context.next = 3;return (
              (0, _models.initModels)(sequelize));case 3:return _context.abrupt("return",
            sequelize);case 4:case "end":return _context.stop();}}}, _callee);}));return function initInMemorySequelize() {return _ref.apply(this, arguments);};}();exports.initInMemorySequelize = initInMemorySequelize;


var initSQLiteSequelize = /*#__PURE__*/function () {var _ref2 = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2(storage) {var sequelize;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
            sequelize = getSQLiteSequelize(storage);_context2.next = 3;return (
              (0, _models.initModels)(sequelize));case 3:return _context2.abrupt("return",
            sequelize);case 4:case "end":return _context2.stop();}}}, _callee2);}));return function initSQLiteSequelize(_x) {return _ref2.apply(this, arguments);};}();exports.initSQLiteSequelize = initSQLiteSequelize;