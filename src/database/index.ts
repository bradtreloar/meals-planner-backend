import { initModels } from "@app/models";
import { Sequelize } from "sequelize";

export const getSQLiteSequelize = (storage: string) =>
  new Sequelize({
    dialect: "sqlite",
    storage,
    logging: false,
  });

export const initInMemorySequelize = async () => {
  const sequelize = getSQLiteSequelize(":memory:");
  await initModels(sequelize);
  return sequelize;
};

export const initSQLiteSequelize = async (storage: string) => {
  const sequelize = getSQLiteSequelize(storage);
  await initModels(sequelize);
  return sequelize;
};
