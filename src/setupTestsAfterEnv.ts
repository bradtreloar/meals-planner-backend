import faker from "@faker-js/faker";

const ENV = process.env;

beforeEach(() => {
  jest.resetModules();
  process.env = { ...ENV }; // Make a copy
  process.env.SECRET = faker.random.alphaNumeric(20);
});

afterAll(() => {
  // Restore environment.
  process.env = ENV;
});
