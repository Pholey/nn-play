"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _alt = require("alt");

var _alt2 = _interopRequireDefault(_alt);

var _session = require("./actions/session");

var _session2 = _interopRequireDefault(_session);

var _site = require("./actions/site");

var _site2 = _interopRequireDefault(_site);

var _session3 = require("./stores/session");

var _session4 = _interopRequireDefault(_session3);

var _site3 = require("./stores/site");

var _site4 = _interopRequireDefault(_site3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Actions


// Stores


var Flux = function (_Alt) {
  _inherits(Flux, _Alt);

  function Flux() {
    _classCallCheck(this, Flux);

    // Add action creators

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Flux).call(this));

    _this.addActions("Session", _session2.default);
    _this.addActions("Site", _site2.default);

    // Add stores
    _this.addStore("Session", _session4.default);
    _this.addStore("Site", _site4.default);

    // If in development; instantiate the ALT development tool
    if (process.env.NODE_ENV === "development") {
      require("alt/utils/chromeDebug")(_this);
    }
    return _this;
  }

  return Flux;
}(_alt2.default);

exports.default = Flux;