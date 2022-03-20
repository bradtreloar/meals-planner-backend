import faker from "@faker-js/faker";
import {
  EnvironmentVariableNotSetException,
  getSMTPSettings,
  renderPasswordResetMessage,
} from ".";

describe("renderPasswordResetMessage", () => {
  it("renders password reset message template", () => {
    const passwordResetURL = faker.internet.url();
    const message = renderPasswordResetMessage({
      passwordResetURL,
    });

    expect(message).toMatch(/reset password/i);
    expect(message).toMatch(/set new password/i);
    expect(message).toMatch(passwordResetURL);
  });
});

describe("getSMTPSettings", () => {
  it("gets SMTP settings from environment", () => {
    const result = getSMTPSettings();

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
    "SMTP_PASSWORD",
  ].forEach((variableName) => {
    it(`throws error if ${variableName} is missing from environment`, () => {
      process.env[variableName] = undefined;

      expect(getSMTPSettings).toThrow(
        new EnvironmentVariableNotSetException(variableName)
      );
    });
  });
});
