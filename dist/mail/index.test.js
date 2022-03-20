"use strict";var _faker = _interopRequireDefault(require("@faker-js/faker"));
var _ = require(".");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}





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
    expect(result.port).toBe(process.env.SMTP_PORT);
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