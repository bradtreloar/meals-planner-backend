import initSequelize, { getSQLiteSequelize, initModels } from ".";
import { faker } from "@faker-js/faker";
import User from "@app/models/User";

describe("getSQLiteSequelize", () => {
  it("connects to database", async () => {
    const sequelize = getSQLiteSequelize(":memory:");
    await sequelize.authenticate();
  });
});

describe("initModels", () => {
  it("defines models for sequelize instance", async () => {
    const sequelize = getSQLiteSequelize(":memory:");
    await initModels(sequelize);
    const attributes = {
      email: faker.internet.email(),
      password: faker.random.alphaNumeric(20),
    };
    await User.create(attributes);
    const results = await User.findAll();
    const result = results[0];
    expect(result.email).toStrictEqual(attributes.email);
    expect(result.password).toStrictEqual(attributes.password);
  });
});

describe("initSequelize", () => {
  it("initialises Sequelize instance and defines models", async () => {
    await initSequelize(":memory:");
    const attributes = {
      email: faker.internet.email(),
      password: faker.random.alphaNumeric(20),
    };
    await User.create(attributes);
    const results = await User.findAll();
    const result = results[0];
    expect(result.email).toStrictEqual(attributes.email);
    expect(result.password).toStrictEqual(attributes.password);
  });
});
