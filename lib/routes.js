"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactRouter = require("react-router");

var _home = require("./pages/home");

var _home2 = _interopRequireDefault(_home);

var _site = require("./components/site");

var _site2 = _interopRequireDefault(_site);

var _channels = require("./pages/channels");

var _channels2 = _interopRequireDefault(_channels);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (flux) {
  return _react2.default.createElement(
    _reactRouter.Route,
    { component: _site2.default, path: "/" },
    _react2.default.createElement(_reactRouter.IndexRoute, { component: _home2.default }),
    _react2.default.createElement(_reactRouter.Route, { component: _channels2.default, path: "/channels" })
  );
};