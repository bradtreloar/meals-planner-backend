"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.getSQLiteSequelize = exports["default"] = void 0;var _models = require("../models");
var _sequelize = require("sequelize");function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

var getSQLiteSequelize = function getSQLiteSequelize(storage) {return (
    new _sequelize.Sequelize({
      dialect: "sqlite",
      storage: storage,
      logging: false }));};exports.getSQLiteSequelize = getSQLiteSequelize;


var initSequelize = /*#__PURE__*/function () {var _ref = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee(storage) {var sequelize;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            sequelize = getSQLiteSequelize(storage);_context.next = 3;return (
              (0, _models.initModels)(sequelize));case 3:return _context.abrupt("return",
            sequelize);case 4:case "end":return _context.stop();}}}, _callee);}));return function initSequelize(_x) {return _ref.apply(this, arguments);};}();var _default =


initSequelize;exports["default"] = _default;