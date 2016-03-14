"use strict";

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _reactDom = require("react-dom");

var _reactRouter = require("react-router");

var _altReact = require("alt-react");

var _createBrowserHistory = require("history/lib/createBrowserHistory");

var _createBrowserHistory2 = _interopRequireDefault(_createBrowserHistory);

var _routes = require("./routes");

var _routes2 = _interopRequireDefault(_routes);

var _alt = require("./alt");

var _alt2 = _interopRequireDefault(_alt);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

global.regeneratorRuntime = require("regenerator/runtime");
console.log("gfdgfdgdfgdsfgdsfgd");
var alt = new _alt2.default();

function main() {
  var RouterAlt = (0, _altReact.supplyFluxContext)(alt)(_reactRouter.Router);

  // Render the application
  (0, _reactDom.render)(_react2.default.createElement(RouterAlt, {
    history: (0, _createBrowserHistory2.default)(),
    routes: (0, _routes2.default)(alt)
  }), document.getElementById("root"));
}

main();