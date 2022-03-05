import initSequelize from "@app/database";
import User from "@app/models/User";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import {
  SALT_ROUNDS,
  InvalidPasswordException,
  authenticateUser,
  UserNotFoundException,
} from ".";

describe("authenticateUser", () => {
  it("verifies user with given email and password exists", async () => {
    await initSequelize(":memory:");
    const email = faker.internet.email();
    const password = faker.random.alphaNumeric(20);
    await User.create({
      email,
      password: await bcrypt.hash(password, SALT_ROUNDS),
    });
    const user = await User.findOne({
      where: {
        email,
      },
    });
    const result = await authenticateUser(email, password);
    expect(result).toStrictEqual(user);
  });

  it("throws error when password doesn't match", async () => {
    await initSequelize(":memory:");
    const email = faker.internet.email();
    const password = faker.random.alphaNumeric(20);
    const incorrectPassword = password + faker.random.alphaNumeric(1);
    User.create({
      email,
      password: await bcrypt.hash(password, SALT_ROUNDS),
    });
    await expect(authenticateUser(email, incorrectPassword)).rejects.toThrow(
      new InvalidPasswordException()
    );
  });

  it("throws error when email doesn't match any user", async () => {
    await initSequelize(":memory:");
    const email = faker.internet.email();
    const password = faker.random.alphaNumeric(20);
    await expect(authenticateUser(email, password)).rejects.toThrow(
      new UserNotFoundException()
    );
  });
});
