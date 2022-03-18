import { PasswordResetToken, User } from "@app/models";
import { randomTokenValue } from "@app/models/helpers";
import { defaults } from "lodash";
import { InferAttributes, InferCreationAttributes } from "sequelize/types";

export class PasswordResetTokenFactory {
  static build(
    user: User,
    attributes?: Partial<InferAttributes<PasswordResetToken>>
  ) {
    const idLength = 64;

    return PasswordResetToken.build(
      defaults(attributes, {
        id: randomTokenValue(idLength),
        userID: user.id,
      })
    );
  }

  static async create(
    user: User,
    attributes?: Partial<InferCreationAttributes<PasswordResetToken>>
  ) {
    const { id } = await PasswordResetToken.create(
      defaults(attributes, {
        userID: user.id,
      })
    );
    return (await PasswordResetToken.findByPk(id)) as PasswordResetToken;
  }
}
