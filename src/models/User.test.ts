import initSequelize from "@app/database";
import { faker } from "@faker-js/faker";
import User from "./User";

beforeEach(async () => {
  await initSequelize(":memory:");
});

it("creates instance of model", async () => {
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
