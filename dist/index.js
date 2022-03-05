"use strict";

var _express = _interopRequireDefault(require("express"));

var _routes = _interopRequireDefault(require("./routes"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = 3000;
var app = (0, _express["default"])();
app.use(_routes["default"]);
app.listen(PORT, function () {
  console.log("Example app listening on port ".concat(PORT));
});