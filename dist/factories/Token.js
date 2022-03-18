"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.TokenFactory = void 0;var _models = require("../models");
var _helpers = require("../models/helpers");
var _setupTestsAfterEnv = require("../setupTestsAfterEnv");
var _lodash = require("lodash");function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);Object.defineProperty(Constructor, "prototype", { writable: false });return Constructor;}var


TokenFactory = /*#__PURE__*/function () {function TokenFactory() {_classCallCheck(this, TokenFactory);}_createClass(TokenFactory, null, [{ key: "build", value:
    function build(user, attributes) {
      var idLength = 64;

      return _models.Token.build(
      (0, _lodash.defaults)(attributes, {
        id: (0, _helpers.randomTokenValue)(idLength),
        userID: user.id,
        expiresAt: _setupTestsAfterEnv.mockNow.plus({ minutes: 15 }).toJSDate() }));


    } }, { key: "create", value: function () {var _create = _asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(

      function _callee(
      user,
      attributes) {var _yield$Token$create, id;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (

                  _models.Token.create(
                  (0, _lodash.defaults)(attributes, {
                    userID: user.id,
                    expiresAt: _setupTestsAfterEnv.mockNow.plus({ minutes: 15 }).toJSDate() })));case 2:_yield$Token$create = _context.sent;id = _yield$Token$create.id;_context.next = 6;return (


                  _models.Token.findByPk(id));case 6:return _context.abrupt("return", _context.sent);case 7:case "end":return _context.stop();}}}, _callee);}));function create(_x, _x2) {return _create.apply(this, arguments);}return create;}() }]);return TokenFactory;}();exports.TokenFactory = TokenFactory;