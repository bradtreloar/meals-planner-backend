import { DataTypes, Model, Optional, Sequelize } from "sequelize";
import { primaryKey } from ".";

export interface UserAttributes {
  id: number;
  email: string;
  password: string;
}

export interface UserInput extends Optional<UserAttributes, "id"> {}

export interface UserOutput extends Required<UserAttributes> {}

class User extends Model<UserAttributes, UserInput> {
  declare id: number;
  declare email: string;
  declare password: string;

  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
  declare readonly deletedAt: Date;
}

export const initUser = (sequelize: Sequelize) =>
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
      tableName: "Users",
    }
  );

export default User;
