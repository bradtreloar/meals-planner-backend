import { User } from "@app/models";
import faker from "@faker-js/faker";
import { defaults } from "lodash";
import { InferAttributes, InferCreationAttributes } from "sequelize/types";
import { randomID } from "./random";

export class UserFactory {
  static build(attributes?: Partial<InferAttributes<User>>) {
    return User.build(
      defaults(attributes, {
        id: randomID(),
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(20),
      })
    );
  }

  static async create(attributes?: Partial<InferCreationAttributes<User>>) {
    const { id } = await User.create(
      defaults(attributes, {
        email: faker.internet.email(),
        password: faker.random.alphaNumeric(20),
      })
    );
    return (await User.findByPk(id)) as User;
  }
}
