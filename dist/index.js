"use strict";require("core-js/stable");
require("regenerator-runtime/runtime");
var _dotenv = _interopRequireDefault(require("dotenv"));
var _app = _interopRequireDefault(require("./app"));
var _database = require("./database");function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}

_dotenv["default"].config();

var port = process.env.PORT || 3000;

var sqliteDBPath = process.env.DB_PATH;
if (sqliteDBPath !== undefined) {
  (0, _database.initSQLiteSequelize)(sqliteDBPath);
  console.log("Connected to SQLite DB at ".concat(sqliteDBPath));
} else {
  throw new Error("DB_PATH not set in environment.");
}

var app = (0, _app["default"])();

app.listen(port, function () {
  console.log("Listening on port ".concat(port));
});