"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.primaryKey = void 0;

var _sequelize = require("sequelize");

var primaryKey = function primaryKey() {
  return {
    type: _sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  };
};

exports.primaryKey = primaryKey;