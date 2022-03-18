import { initInMemorySequelize } from "@app/database";
import { Token, User } from "@app/models";
import jwt from "jsonwebtoken";
import { JwtPayload, JsonWebTokenError } from "jsonwebtoken";
import { faker } from "@faker-js/faker";
import { random } from "lodash";
import {
  InvalidPasswordException,
  authenticatePassword,
  UserNotFoundException,
  generateAccessToken,
  verifyAccessToken,
  hashPassword,
  generateRefreshToken,
  InvalidTokenException,
  revokeToken,
  ExpiredTokenException,
  generatePasswordResetToken,
  authenticateToken,
} from ".";
import { UserFactory } from "@app/factories/User";
import { TokenFactory } from "@app/factories/Token";
import { mockNow } from "@app/setupTestsAfterEnv";

describe("authenticatePassword", () => {
  beforeEach(async () => {
    await initInMemorySequelize();
  });

  it("returns user when password is correct", async () => {
    const email = faker.internet.email();
    const password = faker.random.alphaNumeric(20);
    const { id } = await UserFactory.create({
      email,
      password: await hashPassword(password),
    });
    const user = (await User.scope("public").findByPk(id)) as User;

    const result = await authenticatePassword(email, password);

    expect(result.toJSON()).toStrictEqual(user?.toJSON());
  });

  it("throws error when password is incorrect", async () => {
    const email = faker.internet.email();
    const password = faker.random.alphaNumeric(20);
    const incorrectPassword = password + faker.random.alphaNumeric(1);
    await UserFactory.create({
      email,
      password: await hashPassword(password),
    });

    await expect(
      authenticatePassword(email, incorrectPassword)
    ).rejects.toThrow(InvalidPasswordException);
  });

  it("throws error when email doesn't match any user", async () => {
    const email = faker.internet.email();
    const password = faker.random.alphaNumeric(20);

    await expect(authenticatePassword(email, password)).rejects.toThrow(
      UserNotFoundException
    );
  });
});

describe("generateAccessToken", () => {
  it("generates an access token from a user", () => {
    const secret = process.env.SECRET as string;
    const user = UserFactory.build({
      id: Math.floor(random(1, 100)),
      email: faker.internet.email(),
    });

    const token = generateAccessToken(user);
    const payload = jwt.verify(token, secret) as JwtPayload;

    expect(payload.user).toStrictEqual({
      id: user.id,
      email: user.email,
    });
  });
});

describe("verifyAccessToken", () => {
  it("return payload from a valid access token", () => {
    const user = UserFactory.build({
      id: Math.floor(random(1, 100)),
      email: faker.internet.email(),
    });
    const token = generateAccessToken(user);

    const payload = verifyAccessToken(token) as JwtPayload;

    expect(payload.user).toStrictEqual({
      id: user.id,
      email: user.email,
    });
  });

  it("throws an error when access token is invalid", () => {
    expect(() => verifyAccessToken(faker.random.alphaNumeric(20))).toThrow(
      JsonWebTokenError
    );
  });
});

describe("generateRefreshToken", () => {
  beforeEach(async () => {
    await initInMemorySequelize();
  });

  it("generates a refresh token for a user", async () => {
    const user = await UserFactory.create();

    const token = await generateRefreshToken(user);

    expect(token.userID).toBe(user.id);
  });
});

describe("generatePasswordResetToken", () => {
  beforeEach(async () => {
    await initInMemorySequelize();
  });

  it("creates password reset token", async () => {
    const user = await UserFactory.create();

    const returnedToken = await generatePasswordResetToken(user);

    const token = (await Token.findOne()) as Token;
    expect(returnedToken.toJSON()).toStrictEqual(token.toJSON());
  });
});

describe("authenticateToken", () => {
  beforeEach(async () => {
    await initInMemorySequelize();
  });

  it("returns token and user when token exists", async () => {
    const user = await UserFactory.create();
    const token = await TokenFactory.create(user);

    const [retrievedToken, owner] = await authenticateToken(token.id);

    expect(retrievedToken?.toJSON()).toStrictEqual(token.toJSON());
    expect(owner?.toJSON()).toStrictEqual(user?.toJSON());
  });

  it("throws error when token does not exist", async () => {
    const tokenID = faker.random.alphaNumeric(64);

    await expect(authenticateToken(tokenID)).rejects.toThrow(
      InvalidTokenException
    );
  });

  it("returns user when token at maximum age", async () => {
    const user = await UserFactory.create();
    const token = await TokenFactory.create(user, {
      createdAt: mockNow.minus({ minutes: 15 }).toJSDate(),
      updatedAt: mockNow.minus({ minutes: 15 }).toJSDate(),
      expiresAt: mockNow.toJSDate(),
    });

    const [retrievedToken, owner] = await authenticateToken(token.id);

    expect(retrievedToken?.toJSON()).toStrictEqual(token?.toJSON());
    expect(owner?.toJSON()).toStrictEqual(user?.toJSON());
  });

  it("throws error when token has expired", async () => {
    const user = await UserFactory.create();
    const token = await TokenFactory.create(user, {
      createdAt: mockNow.minus({ minutes: 15 }).toJSDate(),
      updatedAt: mockNow.minus({ minutes: 15 }).toJSDate(),
      expiresAt: mockNow.minus({ milliseconds: 1 }).toJSDate(),
    });

    await expect(authenticateToken(token.id)).rejects.toThrow(
      ExpiredTokenException
    );
  });

  it("deletes expired token", async () => {
    const user = await UserFactory.create();
    const token = await TokenFactory.create(user, {
      createdAt: mockNow.minus({ minutes: 15 }).toJSDate(),
      updatedAt: mockNow.minus({ minutes: 15 }).toJSDate(),
      expiresAt: mockNow.minus({ milliseconds: 1 }).toJSDate(),
    });

    await expect(authenticateToken(token.id)).rejects.toThrow(
      ExpiredTokenException
    );

    const tokens = await Token.findAll();
    expect(tokens).toHaveLength(0);
  });
});

describe("revokeToken", () => {
  beforeEach(async () => {
    await initInMemorySequelize();
  });

  it("deletes token", async () => {
    const user = await UserFactory.create();
    const token = await TokenFactory.create(user);

    revokeToken(token);

    const result = await Token.findAll();
    expect(result).toHaveLength(0);
  });
});
