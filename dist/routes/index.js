"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _express = require("express");

var indexRouter = (0, _express.Router)();
indexRouter.get("/", function (_, res) {
  res.send("Hello World!");
});
var _default = indexRouter;
exports["default"] = _default;