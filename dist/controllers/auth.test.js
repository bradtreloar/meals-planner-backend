"use strict";function _typeof(obj) {"@babel/helpers - typeof";return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {return typeof obj;} : function (obj) {return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;}, _typeof(obj);}var auth = _interopRequireWildcard(require("../auth"));
var _database = require("../database");
var _User = require("../factories/User");
var _models = require("../models");
var _faker = _interopRequireDefault(require("@faker-js/faker"));
var _assert = _interopRequireDefault(require("assert"));

var _auth2 = require("./auth");


var _Token = require("../factories/Token");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {return { "default": obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj["default"] = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

describe("login controller", function () {
  it("responds to valid request with user and access/refresh tokens", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {var plainPassword, hashedPassword, user, req, mockResponseJson, mockResponseStatus, res, accessToken, refreshToken;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
              (0, _database.initInMemorySequelize)());case 2:
            plainPassword = _faker["default"].random.alphaNumeric(20);_context.next = 5;return (
              (0, auth.hashPassword)(plainPassword));case 5:hashedPassword = _context.sent;_context.next = 8;return (
              _User.UserFactory.create({
                password: hashedPassword }));case 8:_context.next = 10;return (

              _models.User.scope("public").findOne());case 10:user = _context.sent;
            (0, _assert["default"])(user !== null);
            req = {
              body: {
                email: user.email,
                password: plainPassword } };


            mockResponseJson = jest.fn();
            mockResponseStatus = jest.fn().mockReturnValue({
              json: mockResponseJson });

            res = {
              status: mockResponseStatus };

            accessToken = _faker["default"].random.alphaNumeric(20);
            // @ts-expect-error Mock has incorrect type.
            auth.generateAccessToken = jest.fn().mockReturnValue(accessToken);_context.next = 20;return (

              (0, _auth2.login)(req, res));case 20:_context.next = 22;return (

              _models.Token.findOne());case 22:refreshToken = _context.sent;
            expect(mockResponseStatus).toHaveBeenCalledWith(200);
            expect(mockResponseJson).toHaveBeenCalledWith({
              user: user.toJSON(),
              accessToken: accessToken,
              refreshToken: refreshToken.id });case 25:case "end":return _context.stop();}}}, _callee);})));



  it("responds to invalid email with an error", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {var email, password, req, mockResponseJson, mockResponseStatus, res;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
              (0, _database.initInMemorySequelize)());case 2:
            email = _faker["default"].internet.email();
            password = _faker["default"].random.alphaNumeric(20);
            req = {
              body: {
                email: email,
                password: password } };


            mockResponseJson = jest.fn();
            mockResponseStatus = jest.fn().mockReturnValue({
              json: mockResponseJson });

            res = {
              status: mockResponseStatus };_context2.next = 10;return (


              (0, _auth2.login)(req, res));case 10:

            expect(mockResponseStatus).toHaveBeenCalledWith(401);
            expect(mockResponseJson).toHaveBeenCalledWith({
              error: "Invalid email or password" });case 12:case "end":return _context2.stop();}}}, _callee2);})));



  it("responds to invalid password with an error", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {var plainPassword, incorreCtPassword, hashedPassword, user, req, mockResponseJson, mockResponseStatus, res;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:_context3.next = 2;return (
              (0, _database.initInMemorySequelize)());case 2:
            plainPassword = _faker["default"].random.alphaNumeric(20);
            incorreCtPassword = _faker["default"].random.alphaNumeric(20);_context3.next = 6;return (
              (0, auth.hashPassword)(plainPassword));case 6:hashedPassword = _context3.sent;_context3.next = 9;return (
              _User.UserFactory.create({
                password: hashedPassword }));case 9:_context3.next = 11;return (

              _models.User.scope("public").findOne());case 11:user = _context3.sent;
            (0, _assert["default"])(user !== null);
            req = {
              body: {
                email: user.email,
                password: incorreCtPassword } };


            mockResponseJson = jest.fn();
            mockResponseStatus = jest.fn().mockReturnValue({
              json: mockResponseJson });

            res = {
              status: mockResponseStatus };_context3.next = 19;return (


              (0, _auth2.login)(req, res));case 19:

            expect(mockResponseStatus).toHaveBeenCalledWith(401);
            expect(mockResponseJson).toHaveBeenCalledWith({
              error: "Invalid email or password" });case 21:case "end":return _context3.stop();}}}, _callee3);})));


});

describe("refresh controller", function () {
  it("responds to valid request with new access/refresh tokens", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {var user, refreshToken, req, mockResponseJson, mockResponseStatus, res, accessToken, newRefreshToken;return regeneratorRuntime.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:_context4.next = 2;return (
              (0, _database.initInMemorySequelize)());case 2:_context4.next = 4;return (
              _User.UserFactory.create());case 4:user = _context4.sent;_context4.next = 7;return (
              _Token.TokenFactory.create(user));case 7:refreshToken = _context4.sent;
            req = {
              body: {
                refreshToken: refreshToken.id } };


            mockResponseJson = jest.fn();
            mockResponseStatus = jest.fn().mockReturnValue({
              json: mockResponseJson });

            res = {
              status: mockResponseStatus };

            accessToken = _faker["default"].random.alphaNumeric(20);
            // @ts-expect-error Mock has incorrect type.
            auth.generateAccessToken = jest.fn().mockReturnValue(accessToken);_context4.next = 16;return (

              (0, _auth2.refresh)(req, res));case 16:_context4.t0 =

            expect;_context4.next = 19;return _models.Token.findAll();case 19:_context4.t1 = _context4.sent;(0, _context4.t0)(_context4.t1).toHaveLength(1);_context4.next = 23;return (
              _models.Token.findOne());case 23:newRefreshToken = _context4.sent;
            expect(newRefreshToken.id).not.toBe(refreshToken.id);
            expect(mockResponseStatus).toHaveBeenCalledWith(200);
            expect(mockResponseJson).toHaveBeenCalledWith({
              accessToken: accessToken,
              refreshToken: newRefreshToken.id });case 27:case "end":return _context4.stop();}}}, _callee4);})));



  it("responds to invalid token with an error", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {var req, mockResponseJson, mockResponseStatus, res;return regeneratorRuntime.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.next = 2;return (
              (0, _database.initInMemorySequelize)());case 2:
            req = {
              body: {
                refreshToken: _faker["default"].random.alphaNumeric(64) } };


            mockResponseJson = jest.fn();
            mockResponseStatus = jest.fn().mockReturnValue({
              json: mockResponseJson });

            res = {
              status: mockResponseStatus };_context5.next = 8;return (


              (0, _auth2.refresh)(req, res));case 8:

            expect(mockResponseStatus).toHaveBeenCalledWith(401);
            expect(mockResponseJson).toHaveBeenCalledWith({
              error: "Invalid token" });case 10:case "end":return _context5.stop();}}}, _callee5);})));


});