"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SiteStore = function () {
  function SiteStore() {
    _classCallCheck(this, SiteStore);

    this.state = {
      hamburgerOpen: false
    };

    this.bindActions(this.alt.actions.Site);
  }

  _createClass(SiteStore, [{
    key: "onToggleHamburger",
    value: function onToggleHamburger() {
      this.state.hamburgerOpen = !this.state.hamburgerOpen;
    }
  }]);

  return SiteStore;
}();

exports.default = SiteStore;