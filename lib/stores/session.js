"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var SessionStore = function SessionStore() {
  _classCallCheck(this, SessionStore);

  this.bindActions(this.alt.actions.Session);
};

exports.default = SessionStore;