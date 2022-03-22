import createApp from "./app";
import supertest from "supertest";
import { initInMemorySequelize } from "./database";
import { UserFactory } from "./factories/User";
import faker from "@faker-js/faker";
import { hashPassword } from "./auth";
import { modelToJSON } from "./models/helpers";
import { User } from "@app/models";
import { TokenFactory } from "./factories/Token";

jest.mock("@app/mail");

beforeEach(async () => {
  await initInMemorySequelize();
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
  it("/login responds with user, access token and refresh token", async () => {
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
    expect(res.status).toBe(200);
    expect(res.body.user).toStrictEqual(modelToJSON(user));
    expect(res.body.accessToken).not.toBeUndefined();
    expect(res.body.refreshToken).not.toBeUndefined();
  });

  it("/refresh responds with access token and refresh token", async () => {
    const user = await UserFactory.create();
    const token = await TokenFactory.create(user);
    const app = createApp();
    const res = await supertest(app).post("/auth/refresh").send({
      refreshToken: token.id,
    });
    expect(res.status).toBe(200);
    expect(res.body.accessToken).not.toBeUndefined();
    expect(res.body.refreshToken).not.toBeUndefined();
  });

  it("/reset-password responds with no content", async () => {
    const user = await UserFactory.create();
    const app = createApp();
    const res = await supertest(app).post("/auth/reset-password").send({
      email: user.email,
    });
    expect(res.status).toBe(204);
  });
});
