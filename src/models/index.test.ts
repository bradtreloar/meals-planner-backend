import initSequelize, { getSQLiteSequelize } from "@app/database";
import { UserFactory } from "@app/factories/User";
import { faker } from "@faker-js/faker";
import { initModels, RefreshToken, User } from ".";

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
    await initSequelize(":memory:");
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

describe("RefreshToken", () => {
  beforeEach(async () => {
    await initSequelize(":memory:");
  });

  it("creates instance of RefreshToken", async () => {
    const user = await UserFactory.create();

    await RefreshToken.create({
      userID: user.id,
    });
    const result = await RefreshToken.findOne();

    expect(result?.userID).toStrictEqual(user.id);
  });

  it("creates instance of RefreshToken owned by User", async () => {
    const user = await UserFactory.create();

    await RefreshToken.create({
      userID: user.id,
    });
    const result = await RefreshToken.findOne();

    expect(result?.userID).toStrictEqual(user.id);
    expect(await result?.getUser()).toStrictEqual(user);
  });

  it("creates instance of RefreshToken using User", async () => {
    const user = await UserFactory.create();

    await user.createRefreshToken();
    const result = await RefreshToken.findOne();

    expect(result?.userID).toStrictEqual(user.id);
    expect(await result?.getUser()).toStrictEqual(user);
  });
});
