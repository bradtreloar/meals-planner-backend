"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports["default"] = void 0;var _express = _interopRequireDefault(require("express"));
var _routes = _interopRequireDefault(require("./routes"));function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { "default": obj };}

var createApp = function createApp() {
  var app = (0, _express["default"])();

  // Middleware.
  app.use(_express["default"].json());
  app.use(_routes["default"]);

  return app;
};var _default =

createApp;exports["default"] = _default;