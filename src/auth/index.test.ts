import initSequelize from "@app/database";
import User from "@app/models/User";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JwtPayload, JsonWebTokenError } from "jsonwebtoken";
import { faker } from "@faker-js/faker";
import { random } from "lodash";
import {
  PASSWORD_SALT_ROUNDS,
  InvalidPasswordException,
  authenticatePassword,
  UserNotFoundException,
  generateAccessToken,
  verifyAccessToken,
} from ".";
import { UserFactory } from "@app/factories/User";

describe("authenticatePassword", () => {
  it("returns user when password is correct", async () => {
    await initSequelize(":memory:");
    const email = faker.internet.email();
    const password = faker.random.alphaNumeric(20);
    await UserFactory.create({
      email,
      password: await bcrypt.hash(password, PASSWORD_SALT_ROUNDS),
    });
    const user = await User.findOne({
      where: {
        email,
      },
    });

    const result = await authenticatePassword(email, password);

    expect(result).toStrictEqual(user);
  });

  it("throws error when password is incorrect", async () => {
    await initSequelize(":memory:");
    const email = faker.internet.email();
    const password = faker.random.alphaNumeric(20);
    const incorrectPassword = password + faker.random.alphaNumeric(1);
    await UserFactory.create({
      email,
      password: await bcrypt.hash(password, PASSWORD_SALT_ROUNDS),
    });

    await expect(
      authenticatePassword(email, incorrectPassword)
    ).rejects.toThrow(new InvalidPasswordException());
  });

  it("throws error when email doesn't match any user", async () => {
    await initSequelize(":memory:");
    const email = faker.internet.email();
    const password = faker.random.alphaNumeric(20);

    await expect(authenticatePassword(email, password)).rejects.toThrow(
      new UserNotFoundException()
    );
  });
});

describe("generateAccessToken", () => {
  it("generates an access token from a user", () => {
    const secret = faker.random.alphaNumeric(20);
    const user = UserFactory.build({
      id: Math.floor(random(1, 100)),
      email: faker.internet.email(),
    });

    const token = generateAccessToken(user, secret);
    const payload = jwt.verify(token, secret) as JwtPayload;

    expect(payload.user).toStrictEqual({
      id: user.id,
      email: user.email,
    });
  });
});

describe("verifyAccessToken", () => {
  it("return payload from a valid access token", () => {
    const secret = faker.random.alphaNumeric(20);
    const user = UserFactory.build({
      id: Math.floor(random(1, 100)),
      email: faker.internet.email(),
    });
    const token = generateAccessToken(user, secret);

    const payload = verifyAccessToken(token, secret) as JwtPayload;

    expect(payload.user).toStrictEqual({
      id: user.id,
      email: user.email,
    });
  });

  it("throws an error when access token is invalid", () => {
    const secret = faker.random.alphaNumeric(20);
    const differentSecret = faker.random.alphaNumeric(20);
    const user = UserFactory.build();
    const token = generateAccessToken(user, differentSecret);

    expect(() => verifyAccessToken(token, secret)).toThrow(JsonWebTokenError);
  });
});
