"use strict";

var _app = _interopRequireDefault(require("./app"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = 3000;
var app = (0, _app["default"])();
app.listen(PORT, function () {
  console.log("Listening on port ".concat(PORT));
});