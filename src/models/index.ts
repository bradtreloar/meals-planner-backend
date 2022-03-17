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

type ModelDefinition = (sequelize: Sequelize) => void;
type AssociationsDefinition = () => void;

const models = {
  modelDefinitions: [] as ModelDefinition[],
  associationsDefinitions: [] as AssociationsDefinition[],
};

const addModel = (
  modelDefinition: ModelDefinition,
  associationsDefinition: AssociationsDefinition
) => {
  models.modelDefinitions.push(modelDefinition);
  models.associationsDefinitions.push(associationsDefinition);
};

export const initModels = async (sequelize: Sequelize) => {
  for (let modelDefinition of models.modelDefinitions) {
    modelDefinition(sequelize);
  }
  for (let associationsDefinition of models.associationsDefinitions) {
    associationsDefinition();
  }
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

addModel(
  (sequelize: Sequelize) => {
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
  },
  () => {
    User.hasMany(RefreshToken, {
      foreignKey: "userID",
    });
  }
);

export class RefreshToken extends Model<
  InferAttributes<RefreshToken>,
  InferCreationAttributes<RefreshToken>
> {
  declare id: CreationOptional<string>;
  declare userID: number;

  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;

  declare getUser: BelongsToGetAssociationMixin<User>;
}

addModel(
  (sequelize: Sequelize) => {
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
  },
  () => {
    RefreshToken.belongsTo(User, {
      foreignKey: {
        name: "userID",
        allowNull: false,
      },
    });
  }
);
