"use strict";var _User = require("../factories/User");
var _faker = _interopRequireDefault(require("@faker-js/faker"));
var _ = require(".");





var _nodemailer = _interopRequireDefault(require("nodemailer"));
var _database = require("../database");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {try {var info = gen[key](arg);var value = info.value;} catch (error) {reject(error);return;}if (info.done) {resolve(value);} else {Promise.resolve(value).then(_next, _throw);}}function _asyncToGenerator(fn) {return function () {var self = this,args = arguments;return new Promise(function (resolve, reject) {var gen = fn.apply(self, args);function _next(value) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);}function _throw(err) {asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);}_next(undefined);});};}

describe("renderPasswordResetMessage", function () {
  it("renders password reset message template", function () {
    var passwordResetURL = _faker["default"].internet.url();
    var message = (0, _.renderPasswordResetMessage)({
      passwordResetURL: passwordResetURL });


    expect(message).toMatch(/reset password/i);
    expect(message).toMatch(/set new password/i);
    expect(message).toMatch(passwordResetURL);
  });
});

describe("getSMTPSettings", function () {
  it("gets SMTP settings from environment", function () {
    var result = (0, _.getSMTPSettings)();

    expect(result.fromAddress).toBe(process.env.SMTP_FROM_ADDRESS);
    expect(result.fromName).toBe(process.env.SMTP_FROM_NAME);
    expect(result.host).toBe(process.env.SMTP_HOST);
    expect(result.port).toBe(parseInt(process.env.SMTP_PORT));
    expect(result.username).toBe(process.env.SMTP_USERNAME);
    expect(result.password).toBe(process.env.SMTP_PASSWORD);
  });

  [
  "SMTP_FROM_ADDRESS",
  "SMTP_FROM_NAME",
  "SMTP_HOST",
  "SMTP_PORT",
  "SMTP_USERNAME",
  "SMTP_PASSWORD"].
  forEach(function (variableName) {
    it("throws error if ".concat(variableName, " is missing from environment"), function () {
      process.env[variableName] = undefined;

      expect(_.getSMTPSettings).toThrow(
      new _.EnvironmentVariableNotSetException(variableName));

    });
  });
});

describe("sendMail", function () {
  beforeEach( /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee() {return regeneratorRuntime.wrap(function _callee$(_context) {while (1) {switch (_context.prev = _context.next) {case 0:
            jest.mock("nodemailer");_context.next = 3;return (
              (0, _database.initInMemorySequelize)());case 3:case "end":return _context.stop();}}}, _callee);})));


  it("sends HTML email to user via SMTP", /*#__PURE__*/_asyncToGenerator( /*#__PURE__*/regeneratorRuntime.mark(function _callee2() {var user, subject, message, mockTransporter;return regeneratorRuntime.wrap(function _callee2$(_context2) {while (1) {switch (_context2.prev = _context2.next) {case 0:
            user = _User.UserFactory.build();
            subject = _faker["default"].random.alphaNumeric(30);
            message = _faker["default"].random.alphaNumeric(30);
            mockTransporter = {
              sendMail: jest.fn() };

            jest.spyOn(_nodemailer["default"], "createTransport").mockReturnValue(
            // @ts-expect-error Mock has incorrect type.
            mockTransporter);_context2.next = 7;return (


              (0, _.sendMail)(user, subject, message));case 7:
            expect(_nodemailer["default"].createTransport).toHaveBeenCalledWith({
              host: process.env.SMTP_HOST,
              port: parseInt(process.env.SMTP_PORT),
              secure: true,
              auth: {
                user: process.env.SMTP_USERNAME,
                pass: process.env.SMTP_PASSWORD } });


            expect(mockTransporter.sendMail).toHaveBeenCalledWith({
              from: "\"".concat(process.env.SMTP_FROM_NAME, "\" <").concat(process.env.SMTP_FROM_ADDRESS, ">"),
              to: user.email,
              subject: subject,
              html: message });case 9:case "end":return _context2.stop();}}}, _callee2);})));


});