import { Token, User } from "@app/models";
import { randomTokenValue } from "@app/models/helpers";
import { mockNow } from "@app/setupTestsAfterEnv";
import { defaults } from "lodash";
import { InferAttributes, InferCreationAttributes } from "sequelize/types";

export class TokenFactory {
  static build(user: User, attributes?: Partial<InferAttributes<Token>>) {
    const idLength = 64;

    return Token.build(
      defaults(attributes, {
        id: randomTokenValue(idLength),
        userID: user.id,
        expiresAt: mockNow.plus({ minutes: 15 }).toJSDate(),
      })
    );
  }

  static async create(
    user: User,
    attributes?: Partial<InferCreationAttributes<Token>>
  ) {
    const { id } = await Token.create(
      defaults(attributes, {
        userID: user.id,
        expiresAt: mockNow.plus({ minutes: 15 }).toJSDate(),
      })
    );
    return (await Token.findByPk(id)) as Token;
  }
}
