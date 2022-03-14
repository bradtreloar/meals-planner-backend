import { generateAccessToken } from "@app/auth";
import initSequelize from "@app/database";
import { UserFactory } from "@app/factories/User";
import verifyAccessTokenMiddleware from "@app/middleware/verifyAccessToken";
import { User } from "@app/models";
import faker from "@faker-js/faker";
import { Request, Response } from "express";

describe("verifyAccessToken middleware", () => {
  it("calls next middleware when token is valid", async () => {
    await initSequelize(":memory:");
    await UserFactory.create();
    const users = await User.findAll();
    const user = users.shift() as User;
    const token = generateAccessToken(user);
    const encodedToken = Buffer.from(token).toString("base64");
    const req = {
      headers: {
        authorization: `Bearer ${encodedToken}`,
      },
    } as Request;
    const next = jest.fn();

    verifyAccessTokenMiddleware(req, {} as Response, next);

    expect(next).toHaveBeenCalled();
  });

  it("decorates request with user payload", async () => {
    await initSequelize(":memory:");

    await UserFactory.create();
    const users = await User.findAll();
    const user = users.shift() as User;
    const token = generateAccessToken(user);
    const encodedToken = Buffer.from(token).toString("base64");
    const req = {
      headers: {
        authorization: `Bearer ${encodedToken}`,
      },
    } as Request;
    const next = jest.fn();

    verifyAccessTokenMiddleware(req, {} as Response, next);

    expect(next).toHaveBeenCalled();
    expect(req.user).toStrictEqual({
      id: user.id,
      email: user.email,
    });
  });

  it("sets 401 response and error when token not found", async () => {
    const req = {
      headers: {},
    } as Request;
    const mockResponseJson = jest.fn();
    const mockResponseStatus = jest.fn().mockReturnValue({
      json: mockResponseJson,
    });
    const res = {
      status: mockResponseStatus,
    } as unknown as Response;
    const next = jest.fn();

    verifyAccessTokenMiddleware(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(mockResponseStatus).toHaveBeenCalledWith(401);
    expect(mockResponseJson).toHaveBeenCalledWith({
      error: "Access token not found",
    });
  });

  it("sets 401 response and error when authZ header is invalid", async () => {
    const req = {
      headers: {
        authorization: `${faker.random.alphaNumeric(20)}`,
      },
    } as Request;
    const mockResponseJson = jest.fn();
    const mockResponseStatus = jest.fn().mockReturnValue({
      json: mockResponseJson,
    });
    const res = {
      status: mockResponseStatus,
    } as unknown as Response;
    const next = jest.fn();

    verifyAccessTokenMiddleware(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(mockResponseStatus).toHaveBeenCalledWith(401);
    expect(mockResponseJson).toHaveBeenCalledWith({
      error: "Invalid access token",
    });
  });

  it("sets 401 response and error when token is invalid", async () => {
    const token = faker.random.alphaNumeric(20);
    const encodedToken = Buffer.from(token).toString("base64");
    const req = {
      headers: {
        authorization: `Bearer ${encodedToken}`,
      },
    } as Request;
    const mockResponseJson = jest.fn();
    const mockResponseStatus = jest.fn().mockReturnValue({
      json: mockResponseJson,
    });
    const res = {
      status: mockResponseStatus,
    } as unknown as Response;
    const next = jest.fn();

    verifyAccessTokenMiddleware(req, res, next);

    expect(next).not.toHaveBeenCalled();
    expect(mockResponseStatus).toHaveBeenCalledWith(401);
    expect(mockResponseJson).toHaveBeenCalledWith({
      error: "Could not verify access token",
    });
  });
});
