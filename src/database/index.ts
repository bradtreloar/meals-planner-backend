import { initModels } from "@app/models";
import { Sequelize } from "sequelize";

export const getSQLiteSequelize = (storage: string) =>
  new Sequelize({
    dialect: "sqlite",
    storage,
    logging: false,
  });

const initSequelize = async (storage: string) => {
  const sequelize = getSQLiteSequelize(storage);
  await initModels(sequelize);
  return sequelize;
};

export default initSequelize;
