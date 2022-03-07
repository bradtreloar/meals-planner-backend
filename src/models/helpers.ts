import { Model } from "sequelize/types";

/**
 * Serialises and deserialises model JSON to ensure date fields are strings.
 */
export const modelToJSON = (model: Model) =>
  JSON.parse(JSON.stringify(model.toJSON()));
