import { initInMemorySequelize, getSQLiteSequelize } from ".";
import { faker } from "@faker-js/faker";
import { User } from "@app/models";

describe("getSQLiteSequelize", () => {
  it("connects to database", async () => {
    const sequelize = getSQLiteSequelize(":memory:");
    await sequelize.authenticate();
  });
});

describe("initSequelize", () => {
  it("initialises Sequelize instance and defines models", async () => {
    await initInMemorySequelize();
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
