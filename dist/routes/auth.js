"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _auth = require("../controllers/auth");

var _express = require("express");

var authRouter = (0, _express.Router)();
authRouter.post("/login", _auth.login);
var _default = authRouter;
exports["default"] = _default;