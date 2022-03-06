import User, { UserAttributes } from "@app/models/User";
import faker from "@faker-js/faker";
import { defaults } from "lodash";
import { randomID } from "./random";

export class UserFactory {
  static build(attributes?: Partial<UserAttributes>) {
    return User.build(
      defaults(attributes, {
        id: randomID(),
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(20),
      })
    );
  }

  static create(attributes?: Partial<UserAttributes>) {
    return User.create(
      defaults(attributes, {
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(20),
      })
    );
  }
}
