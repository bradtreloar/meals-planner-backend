"use strict";Object.defineProperty(exports, "__esModule", { value: true });exports.renderPasswordResetMessage = void 0;var _pug = require("pug");

var compileTemplate = function compileTemplate(name) {return (
    (0, _pug.compileFile)("".concat(__dirname, "/templates/").concat(name, ".pug")));};

var renderPasswordResetMessage = compileTemplate("passwordReset");exports.renderPasswordResetMessage = renderPasswordResetMessage;