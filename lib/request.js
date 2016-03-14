"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _fetchival = require("fetchival");

var _fetchival2 = _interopRequireDefault(_fetchival);

var _config = require("config");

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Configure the default, top-level request
exports.default = (0, _fetchival2.default)(_config2.default.api);