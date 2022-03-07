import createApp from "./app";
import supertest from "supertest";
import initSequelize from "./database";
import { UserFactory } from "./factories/User";
import faker from "@faker-js/faker";
import { hashPassword } from "./auth";
import User from "./models/User";
import { modelToJSON } from "./models/helpers";

beforeEach(() => {
  initSequelize(":memory:");
});

describe("example endpoint", () => {
  it("/ returns Hello World", async () => {
    const app = createApp();
    const res = await supertest(app).get("/");
    expect(res.status).toBe(200);
    expect(res.text).toBe("Hello World!");
  });
});

describe("/auth endpoints", () => {
  it("/auth/login calls auth.login controller", async () => {
    const plainPassword = faker.random.alphaNumeric(20);
    const { id } = await UserFactory.create({
      password: await hashPassword(plainPassword),
    });
    const user = (await User.scope("public").findByPk(id)) as User;
    const app = createApp();
    const res = await supertest(app).post("/auth/login").send({
      email: user.email,
      password: plainPassword,
    });
    expect(res.body.user).toStrictEqual(modelToJSON(user));
  });
});
