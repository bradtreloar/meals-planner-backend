import { hashPassword } from "@app/auth";
import { initInMemorySequelize } from "@app/database";
import { UserFactory } from "@app/factories/User";
import { Token, User } from "@app/models";
import faker from "@faker-js/faker";
import assert from "assert";
import { Response } from "express";
import { login, refresh } from "./auth";
import * as auth from "@app/auth";
import { LoginRequest, RefreshRequest } from "./types";
import { TokenFactory } from "@app/factories/Token";

describe("login controller", () => {
  it("responds to valid request with user and access/refresh tokens", async () => {
    await initInMemorySequelize();
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
    const mockResponseJson = jest.fn();
    const mockResponseStatus = jest.fn().mockReturnValue({
      json: mockResponseJson,
    });
    const res = {
      status: mockResponseStatus,
    } as unknown as Response;
    const accessToken = faker.random.alphaNumeric(20);
    // @ts-expect-error
    auth.generateAccessToken = jest.fn().mockReturnValue(accessToken);

    await login(req, res);

    const refreshToken = (await Token.findOne()) as Token;
    expect(mockResponseStatus).toHaveBeenCalledWith(200);
    expect(mockResponseJson).toHaveBeenCalledWith({
      user: user.toJSON(),
      accessToken,
      refreshToken: refreshToken.id,
    });
  });

  it("responds to invalid email with an error", async () => {
    await initInMemorySequelize();
    const email = faker.internet.email();
    const password = faker.random.alphaNumeric(20);
    const req = {
      body: {
        email,
        password,
      },
    } as LoginRequest;
    const mockResponseJson = jest.fn();
    const mockResponseStatus = jest.fn().mockReturnValue({
      json: mockResponseJson,
    });
    const res = {
      status: mockResponseStatus,
    } as unknown as Response;

    await login(req, res);

    expect(mockResponseStatus).toHaveBeenCalledWith(401);
    expect(mockResponseJson).toHaveBeenCalledWith({
      error: "Invalid email or password",
    });
  });

  it("responds to invalid password with an error", async () => {
    await initInMemorySequelize();
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
    const mockResponseJson = jest.fn();
    const mockResponseStatus = jest.fn().mockReturnValue({
      json: mockResponseJson,
    });
    const res = {
      status: mockResponseStatus,
    } as unknown as Response;

    await login(req, res);

    expect(mockResponseStatus).toHaveBeenCalledWith(401);
    expect(mockResponseJson).toHaveBeenCalledWith({
      error: "Invalid email or password",
    });
  });
});

describe("refresh controller", () => {
  it("responds to valid request with new access/refresh tokens", async () => {
    await initInMemorySequelize();
    const user = await UserFactory.create();
    const refreshToken = await TokenFactory.create(user);
    const req = {
      body: {
        refreshToken: refreshToken.id,
      },
    } as RefreshRequest;
    const mockResponseJson = jest.fn();
    const mockResponseStatus = jest.fn().mockReturnValue({
      json: mockResponseJson,
    });
    const res = {
      status: mockResponseStatus,
    } as unknown as Response;
    const accessToken = faker.random.alphaNumeric(20);
    // @ts-expect-error
    auth.generateAccessToken = jest.fn().mockReturnValue(accessToken);

    await refresh(req, res);

    expect(await Token.findAll()).toHaveLength(1);
    const newRefreshToken = (await Token.findOne()) as Token;
    expect(newRefreshToken.id).not.toBe(refreshToken.id);
    expect(mockResponseStatus).toHaveBeenCalledWith(200);
    expect(mockResponseJson).toHaveBeenCalledWith({
      accessToken,
      refreshToken: newRefreshToken.id,
    });
  });

  it("responds to invalid token with an error", async () => {
    await initInMemorySequelize();
    const req = {
      body: {
        refreshToken: faker.random.alphaNumeric(64),
      },
    } as RefreshRequest;
    const mockResponseJson = jest.fn();
    const mockResponseStatus = jest.fn().mockReturnValue({
      json: mockResponseJson,
    });
    const res = {
      status: mockResponseStatus,
    } as unknown as Response;

    await refresh(req, res);

    expect(mockResponseStatus).toHaveBeenCalledWith(401);
    expect(mockResponseJson).toHaveBeenCalledWith({
      error: "Invalid token",
    });
  });
});
