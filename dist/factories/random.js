"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.randomID = void 0;

var randomID = function randomID() {
  return Math.ceil(Math.random() * 1000);
};

exports.randomID = randomID;