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