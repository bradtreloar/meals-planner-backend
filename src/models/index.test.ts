import { initInMemorySequelize, getSQLiteSequelize } from "@app/database";
import { UserFactory } from "@app/factories/User";
import { mockNow } from "@app/setupTestsAfterEnv";
import { faker } from "@faker-js/faker";
import { initModels, Token, User } from ".";

describe("initModels", () => {
  it("defines models for sequelize instance", async () => {
    const sequelize = getSQLiteSequelize(":memory:");
    await initModels(sequelize);
    const attributes = {
      email: faker.internet.email(),
      password: faker.random.alphaNumeric(20),
    };
    await User.create(attributes);

    const result = await User.findOne();
    expect(result?.email).toStrictEqual(attributes.email);
    expect(result?.password).toStrictEqual(attributes.password);
  });
});

describe("User", () => {
  beforeEach(async () => {
    await initInMemorySequelize();
  });

  it("creates instance of User", async () => {
    const attributes = {
      email: faker.internet.email(),
      password: faker.random.alphaNumeric(20),
    };

    await User.create(attributes);
    const result = await User.findOne();

    expect(result?.email).toStrictEqual(attributes.email);
    expect(result?.password).toStrictEqual(attributes.password);
  });

  it("omits password from public scope", async () => {
    const attributes = {
      email: faker.internet.email(),
      password: faker.random.alphaNumeric(20),
    };

    await User.create(attributes);
    const result = await User.scope("public").findOne();

    expect(result?.email).toStrictEqual(attributes.email);
    expect(result?.password).toBeUndefined();
  });
});

describe("Token", () => {
  beforeEach(async () => {
    await initInMemorySequelize();
  });

  it("creates instance of Token owned by User", async () => {
    const user = await UserFactory.create();

    await Token.create({
      userID: user.id,
      expiresAt: mockNow.toJSDate(),
    });
    const result = await Token.findOne();

    expect(result?.userID).toStrictEqual(user.id);
    expect(await result?.getUser()).toStrictEqual(user);
  });
});
