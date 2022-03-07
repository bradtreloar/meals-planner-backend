"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var _auth = _interopRequireDefault(require("./auth"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var indexRouter = (0, _express.Router)();
indexRouter.get("/", function (_, res) {
  res.send("Hello World!");
});
indexRouter.use("/auth", _auth["default"]);
var _default = indexRouter;
exports["default"] = _default;