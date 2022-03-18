import Crypto from "crypto";
import { DataTypes, Model } from "sequelize";

export const primaryKey = () => ({
  type: DataTypes.INTEGER,
  autoIncrement: true,
  primaryKey: true,
});

export const requiredForeignKey = () => ({
  type: DataTypes.INTEGER,
  allowNull: false,
});

export const timestamps = () => ({
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
});

export const randomTokenValue = (length: number) =>
  Crypto.randomBytes(length).toString("base64").slice(0, length);

/**
 * Serialises and deserialises model JSON to ensure date fields are strings.
 */
export const modelToJSON = (model: Model) =>
  JSON.parse(JSON.stringify(model.toJSON()));
