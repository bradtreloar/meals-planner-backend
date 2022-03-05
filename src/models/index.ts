import { DataTypes } from "sequelize";

export const primaryKey = () => ({
  type: DataTypes.INTEGER,
  autoIncrement: true,
  primaryKey: true,
});
