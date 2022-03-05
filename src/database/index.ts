import { Sequelize } from "sequelize";
import { initUser } from "@app/models/User";

export const getSQLiteSequelize = (storage: string) =>
  new Sequelize({
    dialect: "sqlite",
    storage,
    logging: false,
  });

export const initModels = async (sequelize: Sequelize) => {
  initUser(sequelize);
  await sequelize.sync();
};

const initSequelize = async (storage: string) => {
  const sequelize = getSQLiteSequelize(storage);
  await initModels(sequelize);
  return sequelize;
};

export default initSequelize;
