"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.timestamps = exports.requiredForeignKey = exports.randomRefreshTokenValue = exports.primaryKey = exports.modelToJSON = void 0;var _crypto = _interopRequireDefault(require("crypto"));
var _sequelize = require("sequelize");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}

var primaryKey = function primaryKey() {return {
    type: _sequelize.DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true };};exports.primaryKey = primaryKey;


var requiredForeignKey = function requiredForeignKey() {return {
    type: _sequelize.DataTypes.INTEGER,
    allowNull: false };};exports.requiredForeignKey = requiredForeignKey;


var timestamps = function timestamps() {return {
    createdAt: _sequelize.DataTypes.DATE,
    updatedAt: _sequelize.DataTypes.DATE };};exports.timestamps = timestamps;


var randomRefreshTokenValue = function randomRefreshTokenValue(length) {return (
    _crypto["default"].randomBytes(length).toString("base64").slice(0, length));};

/**
 * Serialises and deserialises model JSON to ensure date fields are strings.
 */exports.randomRefreshTokenValue = randomRefreshTokenValue;
var modelToJSON = function modelToJSON(model) {return (
    JSON.parse(JSON.stringify(model.toJSON())));};exports.modelToJSON = modelToJSON;