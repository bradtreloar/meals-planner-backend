import {
  BelongsToGetAssociationMixin,
  CreationOptional,
  DataTypes,
  HasManyCreateAssociationMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import {
  primaryKey,
  randomRefreshTokenValue,
  requiredForeignKey,
  timestamps,
} from "./helpers";

export const initModels = async (sequelize: Sequelize) => {
  initUser(sequelize);
  initRefreshToken(sequelize);
  await sequelize.sync();
};

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare password: string;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare createRefreshToken: HasManyCreateAssociationMixin<RefreshToken>;
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
      ...timestamps(),
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
};

export class RefreshToken extends Model<
  InferAttributes<RefreshToken>,
  InferCreationAttributes<RefreshToken>
> {
  declare id: CreationOptional<number>;
  declare userID: number;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getUser: BelongsToGetAssociationMixin<User>;
}

export const initRefreshToken = (sequelize: Sequelize) => {
  const idLength = 64;

  RefreshToken.init(
    {
      id: {
        type: DataTypes.STRING(idLength),
        defaultValue: () => randomRefreshTokenValue(idLength),
        primaryKey: true,
      },
      userID: requiredForeignKey(),
      ...timestamps(),
    },
    {
      sequelize,
    }
  );
  User.hasMany(RefreshToken, {
    foreignKey: "userID",
  });
  RefreshToken.belongsTo(User, {
    foreignKey: {
      name: "userID",
      allowNull: false,
    },
  });
};
