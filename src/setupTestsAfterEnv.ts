import faker from "@faker-js/faker";
import { DateTime } from "luxon";
import MockDate from "mockdate";

const ENV = process.env;

export const mockNow = DateTime.fromObject({
  year: 2020,
  month: 1,
  day: 1,
  hour: 0,
  minute: 0,
  second: 0,
  millisecond: 0,
});

beforeAll(() => {
  MockDate.set(mockNow.toJSDate());
});

beforeEach(() => {
  jest.resetModules();

  process.env = {
    SECRET: faker.random.alphaNumeric(20),
    SMTP_HOST: faker.internet.url(),
    SMTP_PORT: faker.internet.port().toString(),
    SMTP_USERNAME: faker.random.alphaNumeric(12),
    SMTP_PASSWORD: faker.random.alphaNumeric(12),
    SMTP_FROM_ADDRESS: faker.internet.email(),
    SMTP_FROM_NAME: faker.random.words(2),
    ...ENV,
  };
});

afterAll(() => {
  // Restore environment.
  process.env = ENV;

  // Restore date.
  MockDate.reset();
});
