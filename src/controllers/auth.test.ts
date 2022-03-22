import { hashPassword } from "@app/auth";
import { initInMemorySequelize } from "@app/database";
import { UserFactory } from "@app/factories/User";
import { Token, User } from "@app/models";
import faker from "@faker-js/faker";
import assert from "assert";
import { Response } from "express";
import { login, refresh, resetPassword } from "./auth";
import * as auth from "@app/auth";
import { LoginRequest, RefreshRequest, ResetPasswordRequest } from "./types";
import { TokenFactory } from "@app/factories/Token";
import * as mail from "@app/mail";

jest.mock("@app/mail");

const mockResponse = () => {
  const json = jest.fn();
  const send = jest.fn();
  const status = jest.fn();

  const res = {
    status,
    json,
    send,
  };

  json.mockReturnValue(res);
  send.mockReturnValue(res);
  status.mockReturnValue(res);

  return res as unknown as Response;
};

beforeEach(async () => {
  await initInMemorySequelize();
});

describe("login controller", () => {
  it("responds to valid request with user and access/refresh tokens", async () => {
    const plainPassword = faker.random.alphaNumeric(20);
    const hashedPassword = await hashPassword(plainPassword);
    await UserFactory.create({
      password: hashedPassword,
    });
    const user = await User.scope("public").findOne();
    assert(user !== null);
    const req = {
      body: {
        email: user.email,
        password: plainPassword,
      },
    } as LoginRequest;
    const res = mockResponse();
    const accessToken = faker.random.alphaNumeric(20);
    // @ts-expect-error Mock has incorrect type.
    auth.generateAccessToken = jest.fn().mockReturnValue(accessToken);

    await login(req, res);

    const refreshToken = (await Token.findOne()) as Token;
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      user: user.toJSON(),
      accessToken,
      refreshToken: refreshToken.id,
    });
  });

  it("responds to invalid email with an error", async () => {
    const email = faker.internet.email();
    const password = faker.random.alphaNumeric(20);
    const req = {
      body: {
        email,
        password,
      },
    } as LoginRequest;
    const res = mockResponse();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid email or password",
    });
  });

  it("responds to invalid password with an error", async () => {
    const plainPassword = faker.random.alphaNumeric(20);
    const incorreCtPassword = faker.random.alphaNumeric(20);
    const hashedPassword = await hashPassword(plainPassword);
    await UserFactory.create({
      password: hashedPassword,
    });
    const user = await User.scope("public").findOne();
    assert(user !== null);
    const req = {
      body: {
        email: user.email,
        password: incorreCtPassword,
      },
    } as LoginRequest;
    const res = mockResponse();

    await login(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid email or password",
    });
  });
});

describe("refresh controller", () => {
  it("responds to valid request with new access/refresh tokens", async () => {
    const user = await UserFactory.create();
    const refreshToken = await TokenFactory.create(user);
    const req = {
      body: {
        refreshToken: refreshToken.id,
      },
    } as RefreshRequest;
    const res = mockResponse();
    const accessToken = faker.random.alphaNumeric(20);
    // @ts-expect-error Mock has incorrect type.
    auth.generateAccessToken = jest.fn().mockReturnValue(accessToken);

    await refresh(req, res);

    expect(await Token.findAll()).toHaveLength(1);
    const newRefreshToken = (await Token.findOne()) as Token;
    expect(newRefreshToken.id).not.toBe(refreshToken.id);
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      accessToken,
      refreshToken: newRefreshToken.id,
    });
  });

  it("responds to invalid token with an error", async () => {
    const req = {
      body: {
        refreshToken: faker.random.alphaNumeric(64),
      },
    } as RefreshRequest;
    const res = mockResponse();

    await refresh(req, res);

    expect(res.status).toHaveBeenCalledWith(401);
    expect(res.json).toHaveBeenCalledWith({
      error: "Invalid token",
    });
  });
});

describe("resetPassword controller", () => {
  it("responds to a valid request with no content", async () => {
    const user = await UserFactory.create();
    const req = {
      body: {
        email: user.email,
      },
    } as ResetPasswordRequest;
    const res = mockResponse();

    await resetPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(204);
    expect(res.send).toHaveBeenCalled();
  });

  it("sends password reset email to user", async () => {
    const user = await UserFactory.create();
    const req = {
      body: {
        email: user.email,
      },
    } as ResetPasswordRequest;
    const res = mockResponse();
    jest.spyOn(mail, "sendMail");
    const message = faker.random.words(5);
    jest.spyOn(mail, "renderPasswordResetMessage").mockReturnValue(message);

    await resetPassword(req, res);

    expect(mail.sendMail).toHaveBeenCalledWith(
      user,
      "Reset your password",
      message
    );
  });

  it("rejects a request with an invalid email address", async () => {
    const req = {
      body: {
        email: faker.internet.email(),
      },
    } as ResetPasswordRequest;
    const res = mockResponse();

    await resetPassword(req, res);

    expect(res.status).toHaveBeenCalledWith(422);
    expect(res.json).toHaveBeenCalledWith({
      error: "No user with this email address",
    });
  });
});
