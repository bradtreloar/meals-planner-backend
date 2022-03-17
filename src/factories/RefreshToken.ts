import { RefreshToken, User } from "@app/models";
import { randomRefreshTokenValue } from "@app/models/helpers";
import { defaults } from "lodash";
import { InferAttributes, InferCreationAttributes } from "sequelize/types";

export class RefreshTokenFactory {
  static build(
    user: User,
    attributes?: Partial<InferAttributes<RefreshToken>>
  ) {
    const idLength = 64;

    return RefreshToken.build(
      defaults(attributes, {
        id: randomRefreshTokenValue(idLength),
        userID: user.id,
      })
    );
  }

  static async create(
    user: User,
    attributes?: Partial<InferCreationAttributes<RefreshToken>>
  ) {
    const { id } = await RefreshToken.create(
      defaults(attributes, {
        userID: user.id,
      })
    );
    return (await RefreshToken.findByPk(id)) as RefreshToken;
  }
}
