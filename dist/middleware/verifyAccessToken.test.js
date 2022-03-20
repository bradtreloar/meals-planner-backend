"use strict";var _auth = require("../auth");
var _database = require("../database");
var _User = require("../factories/User");
var _verifyAccessToken = _interopRequireDefault(require("./verifyAccessToken"));
var _models = require("../models");
var _faker = _interopRequireDefault(require("@faker-js/faker"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}


describe("verifyAccessToken middleware", function () {
  it("calls next middleware when token is valid", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {var users, user, token, encodedToken, req, next;return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:_context.next = 2;return (
              (0, _database.initInMemorySequelize)());case 2:_context.next = 4;return (
              _User.UserFactory.create());case 4:_context.next = 6;return (
              _models.User.findAll());case 6:users = _context.sent;
            user = users.shift();
            token = (0, _auth.generateAccessToken)(user);
            encodedToken = Buffer.from(token).toString("base64");
            req = {
              headers: {
                authorization: "Bearer ".concat(encodedToken) } };


            next = jest.fn();

            (0, _verifyAccessToken["default"])(req, {}, next);

            expect(next).toHaveBeenCalled();case 14:case "end":return _context.stop();}}}, _callee);})));


  it("decorates request with user payload", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {var users, user, token, encodedToken, req, next;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:_context2.next = 2;return (
              (0, _database.initInMemorySequelize)());case 2:_context2.next = 4;return (

              _User.UserFactory.create());case 4:_context2.next = 6;return (
              _models.User.findAll());case 6:users = _context2.sent;
            user = users.shift();
            token = (0, _auth.generateAccessToken)(user);
            encodedToken = Buffer.from(token).toString("base64");
            req = {
              headers: {
                authorization: "Bearer ".concat(encodedToken) } };


            next = jest.fn();

            (0, _verifyAccessToken["default"])(req, {}, next);

            expect(next).toHaveBeenCalled();
            expect(req.user).toStrictEqual({
              id: user.id,
              email: user.email });case 15:case "end":return _context2.stop();}}}, _callee2);})));



  it("sets 401 response and error when token not found", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee3() {var req, mockResponseJson, mockResponseStatus, res, next;return regeneratorRuntime.wrap(function _callee3$(_context3) {while (1) {switch (_context3.prev = _context3.next) {case 0:
            req = {
              headers: {} };

            mockResponseJson = jest.fn();
            mockResponseStatus = jest.fn().mockReturnValue({
              json: mockResponseJson });

            res = {
              status: mockResponseStatus };

            next = jest.fn();

            (0, _verifyAccessToken["default"])(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(mockResponseStatus).toHaveBeenCalledWith(401);
            expect(mockResponseJson).toHaveBeenCalledWith({
              error: "Access token not found" });case 9:case "end":return _context3.stop();}}}, _callee3);})));



  it("sets 401 response and error when authZ header is invalid", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee4() {var req, mockResponseJson, mockResponseStatus, res, next;return regeneratorRuntime.wrap(function _callee4$(_context4) {while (1) {switch (_context4.prev = _context4.next) {case 0:
            req = {
              headers: {
                authorization: "".concat(_faker["default"].random.alphaNumeric(20)) } };


            mockResponseJson = jest.fn();
            mockResponseStatus = jest.fn().mockReturnValue({
              json: mockResponseJson });

            res = {
              status: mockResponseStatus };

            next = jest.fn();

            (0, _verifyAccessToken["default"])(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(mockResponseStatus).toHaveBeenCalledWith(401);
            expect(mockResponseJson).toHaveBeenCalledWith({
              error: "Invalid access token" });case 9:case "end":return _context4.stop();}}}, _callee4);})));



  it("sets 401 response and error when token is invalid", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee5() {var token, encodedToken, req, mockResponseJson, mockResponseStatus, res, next;return regeneratorRuntime.wrap(function _callee5$(_context5) {while (1) {switch (_context5.prev = _context5.next) {case 0:
            token = _faker["default"].random.alphaNumeric(20);
            encodedToken = Buffer.from(token).toString("base64");
            req = {
              headers: {
                authorization: "Bearer ".concat(encodedToken) } };


            mockResponseJson = jest.fn();
            mockResponseStatus = jest.fn().mockReturnValue({
              json: mockResponseJson });

            res = {
              status: mockResponseStatus };

            next = jest.fn();

            (0, _verifyAccessToken["default"])(req, res, next);

            expect(next).not.toHaveBeenCalled();
            expect(mockResponseStatus).toHaveBeenCalledWith(401);
            expect(mockResponseJson).toHaveBeenCalledWith({
              error: "Could not verify access token" });case 11:case "end":return _context5.stop();}}}, _callee5);})));


});