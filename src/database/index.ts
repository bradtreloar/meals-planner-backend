import { initModels } from "@app/models";
import { Sequelize } from "sequelize";

export const getSQLiteSequelize = (storage: string) =>
  new Sequelize({
    dialect: "sqlite",
    storage,
    logging: false,
  });

const initInMemorySequelize = async () => {
  const sequelize = getSQLiteSequelize(":memory:");
  await initModels(sequelize);
  return sequelize;
};

export default initInMemorySequelize;
