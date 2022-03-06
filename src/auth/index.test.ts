import initSequelize from "@app/database";
import User from "@app/models/User";
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
} from ".";
import { UserFactory } from "@app/factories/User";

describe("authenticatePassword", () => {
  it("returns user when password is correct", async () => {
    await initSequelize(":memory:");
    const email = faker.internet.email();
    const password = faker.random.alphaNumeric(20);
    await UserFactory.create({
      email,
      password: await hashPassword(password),
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
      password: await hashPassword(password),
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
