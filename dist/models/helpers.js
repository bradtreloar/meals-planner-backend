"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.modelToJSON = void 0;

/**
 * Serialises and deserialises model JSON to ensure date fields are strings.
 */
var modelToJSON = function modelToJSON(model) {
  return JSON.parse(JSON.stringify(model.toJSON()));
};

exports.modelToJSON = modelToJSON;