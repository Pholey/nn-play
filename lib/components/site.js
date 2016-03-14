"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _classnames = require("classnames");

var _classnames2 = _interopRequireDefault(_classnames);

var _header = require("./header");

var _connectToStores = require("../lib/connectToStores");

var _connectToStores2 = _interopRequireDefault(_connectToStores);

var _reactRouter = require("react-router");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Site = function (_React$Component) {
  _inherits(Site, _React$Component);

  function Site() {
    _classCallCheck(this, Site);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Site).apply(this, arguments));

    _this.toggleHamburger = function () {
      _this.context.flux.actions.Site.toggleHamburger();
    };

    return _this;
  }

  _createClass(Site, [{
    key: "render",
    value: function render() {
      var expandedClass = this.props.Site.hamburgerOpen ? "expanded" : "";

      return _react2.default.createElement(
        "div",
        { className: "site" },
        _react2.default.createElement(
          "div",
          { className: (0, _classnames2.default)("hamburger-menu", expandedClass) },
          _react2.default.createElement(
            "div",
            { className: "hamburger-menu-contents" },
            _react2.default.createElement(
              "div",
              { className: "header" },
              _react2.default.createElement(
                "div",
                { className: "title" },
                _react2.default.createElement("i", { onClick: this.toggleHamburger, className: "fa fa-bars" }),
                _react2.default.createElement(
                  _reactRouter.Link,
                  { to: "/" },
                  "bit.dj"
                )
              )
            ),
            _react2.default.createElement(
              "div",
              { className: "items" },
              _react2.default.createElement(
                _reactRouter.Link,
                { to: "/channels", className: "nav-item" },
                _react2.default.createElement("i", { className: "fa fa-hashtag" }),
                "Channels"
              )
            )
          )
        ),
        _react2.default.createElement(
          "div",
          { className: "site-content" },
          this.props.children
        )
      );
    }
  }]);

  return Site;
}(_react2.default.Component);

Site.contextTypes = {
  flux: _react2.default.PropTypes.object.isRequired
};
Site.stores = ["Site"];
exports.default = (0, _connectToStores2.default)(Site);