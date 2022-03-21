"use strict";function _typeof(obj) {"@babel/helpers - typeof";return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {return typeof obj;} : function (obj) {return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;}, _typeof(obj);}var auth = _interopRequireWildcard(require("../auth"));
var _database = require("../database");
var _User = require("../factories/User");
var _models = require("../models");
var _faker = _interopRequireDefault(require("@faker-js/faker"));
var _assert = _interopRequireDefault(require("assert"));

var _auth2 = require("./auth");


var _Token = require("../factories/Token");
var mail = _interopRequireWildcard(require("../mail"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function _getRequireWildcardCache(nodeInterop) {if (typeof WeakMap !== "function") return null;var cacheBabelInterop = new WeakMap();var cacheNodeInterop = new WeakMap();return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {return nodeInterop ? cacheNodeInterop : cacheBabelInterop;})(nodeInterop);}function _interopRequireWildcard(obj, nodeInterop) {if (!nodeInterop && obj && obj.__esModule) {return obj;}if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {return { "default": obj };}var cache = _getRequireWildcardCache(nodeInterop);if (cache && cache.has(obj)) {return cache.get(obj);}var newObj = {};var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;for (var key in obj) {if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;if (desc && (desc.get || desc.set)) {Object.defineProperty(newObj, key, desc);} else {newObj[key] = obj[key];}}}newObj["default"] = obj;if (cache) {cache.set(obj, newObj);}return newObj;}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

jest.mock("../mail");

beforeEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
            (0, _database.initInMemorySequelize)());case 2:case "end":return _context.stop();}}}, _callee);})));


describe("login controller", function () {
  it("responds to valid request with user and access/refresh tokens", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {var plainPassword, hashedPassword, user, req, mockResponseJson, mockResponseStatus, res, accessToken, refreshToken;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
            plainPassword = _faker["default"].random.alphaNumeric(20);_context2.next = 3;return (
              (0, auth.hashPassword)(plainPassword));case 3:hashedPassword = _context2.sent;_context2.next = 6;return (
              _User.UserFactory.create({
                password: hashedPassword }));case 6:_context2.next = 8;return (

              _models.User.scope("public").findOne());case 8:user = _context2.sent;
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
            auth.generateAccessToken = jest.fn().mockReturnValue(accessToken);_context2.next = 18;return (

              (0, _auth2.login)(req, res));case 18:_context2.next = 20;return (

              _models.Token.findOne());case 20:refreshToken = _context2.sent;
            expect(mockResponseStatus).toHaveBeenCalledWith(200);
            expect(mockResponseJson).toHaveBeenCalledWith({
              user: user.toJSON(),
              accessToken: accessToken,
              refreshToken: refreshToken.id });case 23:case "end":return _context2.stop();}}}, _callee2);})));



  it("responds to invalid email with an error", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {var email, password, req, mockResponseJson, mockResponseStatus, res;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
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
              status: mockResponseStatus };_context3.next = 8;return (


              (0, _auth2.login)(req, res));case 8:

            expect(mockResponseStatus).toHaveBeenCalledWith(401);
            expect(mockResponseJson).toHaveBeenCalledWith({
              error: "Invalid email or password" });case 10:case "end":return _context3.stop();}}}, _callee3);})));



  it("responds to invalid password with an error", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {var plainPassword, incorreCtPassword, hashedPassword, user, req, mockResponseJson, mockResponseStatus, res;return regeneratorRuntime.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
            plainPassword = _faker["default"].random.alphaNumeric(20);
            incorreCtPassword = _faker["default"].random.alphaNumeric(20);_context4.next = 4;return (
              (0, auth.hashPassword)(plainPassword));case 4:hashedPassword = _context4.sent;_context4.next = 7;return (
              _User.UserFactory.create({
                password: hashedPassword }));case 7:_context4.next = 9;return (

              _models.User.scope("public").findOne());case 9:user = _context4.sent;
            (0, _assert["default"])(user !== null);
            req = {
              body: {
                email: user.email,
                password: incorreCtPassword } };


            mockResponseJson = jest.fn();
            mockResponseStatus = jest.fn().mockReturnValue({
              json: mockResponseJson });

            res = {
              status: mockResponseStatus };_context4.next = 17;return (


              (0, _auth2.login)(req, res));case 17:

            expect(mockResponseStatus).toHaveBeenCalledWith(401);
            expect(mockResponseJson).toHaveBeenCalledWith({
              error: "Invalid email or password" });case 19:case "end":return _context4.stop();}}}, _callee4);})));


});

describe("refresh controller", function () {
  it("responds to valid request with new access/refresh tokens", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {var user, refreshToken, req, mockResponseJson, mockResponseStatus, res, accessToken, newRefreshToken;return regeneratorRuntime.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:_context5.next = 2;return (
              _User.UserFactory.create());case 2:user = _context5.sent;_context5.next = 5;return (
              _Token.TokenFactory.create(user));case 5:refreshToken = _context5.sent;
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
            auth.generateAccessToken = jest.fn().mockReturnValue(accessToken);_context5.next = 14;return (

              (0, _auth2.refresh)(req, res));case 14:_context5.t0 =

            expect;_context5.next = 17;return _models.Token.findAll();case 17:_context5.t1 = _context5.sent;(0, _context5.t0)(_context5.t1).toHaveLength(1);_context5.next = 21;return (
              _models.Token.findOne());case 21:newRefreshToken = _context5.sent;
            expect(newRefreshToken.id).not.toBe(refreshToken.id);
            expect(mockResponseStatus).toHaveBeenCalledWith(200);
            expect(mockResponseJson).toHaveBeenCalledWith({
              accessToken: accessToken,
              refreshToken: newRefreshToken.id });case 25:case "end":return _context5.stop();}}}, _callee5);})));



  it("responds to invalid token with an error", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee6() {var req, mockResponseJson, mockResponseStatus, res;return regeneratorRuntime.wrap(function _callee6$(_context6) {while (1) {switch (_context6.prev = _context6.next) {case 0:
            req = {
              body: {
                refreshToken: _faker["default"].random.alphaNumeric(64) } };


            mockResponseJson = jest.fn();
            mockResponseStatus = jest.fn().mockReturnValue({
              json: mockResponseJson });

            res = {
              status: mockResponseStatus };_context6.next = 6;return (


              (0, _auth2.refresh)(req, res));case 6:

            expect(mockResponseStatus).toHaveBeenCalledWith(401);
            expect(mockResponseJson).toHaveBeenCalledWith({
              error: "Invalid token" });case 8:case "end":return _context6.stop();}}}, _callee6);})));


});

describe("resetPassword controller", function () {
  it("responds to a valid request with no content", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee7() {var user, req, mockResponseStatus, res;return regeneratorRuntime.wrap(function _callee7$(_context7) {while (1) {switch (_context7.prev = _context7.next) {case 0:_context7.next = 2;return (
              _User.UserFactory.create());case 2:user = _context7.sent;
            req = {
              body: {
                email: user.email } };


            mockResponseStatus = jest.fn();
            res = {
              status: mockResponseStatus };_context7.next = 8;return (


              (0, _auth2.resetPassword)(req, res));case 8:

            expect(mockResponseStatus).toHaveBeenCalledWith(204);case 9:case "end":return _context7.stop();}}}, _callee7);})));


  it("sends password reset email to user", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee8() {var user, req, mockResponseStatus, res, message;return regeneratorRuntime.wrap(function _callee8$(_context8) {while (1) {switch (_context8.prev = _context8.next) {case 0:_context8.next = 2;return (
              _User.UserFactory.create());case 2:user = _context8.sent;
            req = {
              body: {
                email: user.email } };


            mockResponseStatus = jest.fn();
            res = {
              status: mockResponseStatus };

            jest.spyOn(mail, "sendMail");
            message = _faker["default"].random.words(5);
            jest.spyOn(mail, "renderPasswordResetMessage").mockReturnValue(message);_context8.next = 11;return (

              (0, _auth2.resetPassword)(req, res));case 11:

            expect(mail.sendMail).toHaveBeenCalledWith(
            user,
            "Reset your password",
            message);case 12:case "end":return _context8.stop();}}}, _callee8);})));



  it("rejects a request with an invalid email address", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee9() {var req, mockResponseJson, mockResponseStatus, res;return regeneratorRuntime.wrap(function _callee9$(_context9) {while (1) {switch (_context9.prev = _context9.next) {case 0:
            req = {
              body: {
                email: _faker["default"].internet.email() } };


            mockResponseJson = jest.fn();
            mockResponseStatus = jest.fn().mockReturnValue({
              json: mockResponseJson });

            res = {
              status: mockResponseStatus };_context9.next = 6;return (


              (0, _auth2.resetPassword)(req, res));case 6:

            expect(mockResponseStatus).toHaveBeenCalledWith(422);
            expect(mockResponseJson).toHaveBeenCalledWith({
              error: "No user with this email address" });case 8:case "end":return _context9.stop();}}}, _callee9);})));


});