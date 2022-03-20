import { UserFactory } from "@app/factories/User";
import faker from "@faker-js/faker";
import {
  EnvironmentVariableNotSetException,
  getSMTPSettings,
  renderPasswordResetMessage,
  sendMail,
} from ".";
import nodemailer from "nodemailer";
import { initInMemorySequelize } from "@app/database";

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
    expect(result.port).toBe(parseInt(process.env.SMTP_PORT as string));
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

describe("sendMail", () => {
  beforeEach(async () => {
    jest.mock("nodemailer");
    await initInMemorySequelize();
  });

  it("sends HTML email to user via SMTP", async () => {
    const user = UserFactory.build();
    const subject = faker.random.alphaNumeric(30);
    const message = faker.random.alphaNumeric(30);
    const mockTransporter = {
      sendMail: jest.fn(),
    };
    jest.spyOn(nodemailer, "createTransport").mockReturnValue(
      // @ts-expect-error Mock has incorrect type.
      mockTransporter
    );

    await sendMail(user, subject, message);
    expect(nodemailer.createTransport).toHaveBeenCalledWith({
      host: process.env.SMTP_HOST,
      port: parseInt(process.env.SMTP_PORT as string),
      secure: true,
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
    });
    expect(mockTransporter.sendMail).toHaveBeenCalledWith({
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_ADDRESS}>`,
      to: user.email,
      subject,
      html: message,
    });
  });
});
