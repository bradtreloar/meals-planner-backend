import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { primaryKey } from ".";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: string;
}

export const initUser = (sequelize: Sequelize) => {
  User.init(
    {
      id: primaryKey(),
      email: {
        type: new DataTypes.STRING(128),
        allowNull: false,
      },
      password: {
        type: new DataTypes.STRING(2048),
        allowNull: false,
      },
    },
    {
      scopes: {
        public: {
          attributes: {
            exclude: ["password"],
          },
        },
      },
      sequelize,
    }
  );
  return User;
};

export default User;
