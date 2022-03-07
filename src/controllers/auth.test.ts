import { hashPassword } from "@app/auth";
import initSequelize from "@app/database";
import { UserFactory } from "@app/factories/User";
import User from "@app/models/User";
import faker from "@faker-js/faker";
import assert from "assert";
import { Response } from "express";
import { login } from "./auth";
import * as auth from "@app/auth";
import { LoginRequest } from "./types";

describe("login controller", () => {
  it("responds to valid request with user and access token", async () => {
    await initSequelize(":memory:");
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
    const token = faker.random.alphaNumeric(20);
    // @ts-expect-error
    auth.generateAccessToken = jest.fn().mockReturnValue(token);

    await login(req, res);

    expect(mockResponseStatus).toHaveBeenCalledWith(200);
    expect(mockResponseJson).toHaveBeenCalledWith({
      user: user.toJSON(),
      accessToken: token,
    });
  });

  it("responds to invalid email with an error", async () => {
    await initSequelize(":memory:");
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
    await initSequelize(":memory:");
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
