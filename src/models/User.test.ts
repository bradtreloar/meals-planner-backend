import { getSQLiteSequelize } from "@app/database";
import { faker } from "@faker-js/faker";
import { initUser } from "./User";

describe("initUser", () => {
  it("returns model", async () => {
    const sequelize = getSQLiteSequelize(":memory:");
    const User = initUser(sequelize);
    await sequelize.sync();
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
