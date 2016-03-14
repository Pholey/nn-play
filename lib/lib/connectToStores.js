"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = connectToStores;

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _altReact = require("alt-react");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function connectToStores(component) {
  if (component.contextTypes == null) component.contextTypes = {};
  if (component.contextTypes.flux == null) {
    component.contextTypes.flux = _react2.default.PropTypes.object.isRequired;
  }

  var storeNames = [];
  if (component.getStores != null) storeNames = component.getStores();
  if (component.stores != null) storeNames = component.stores;
  if (component.store) storeNames = [component.store];

  return (0, _altReact.connect)(component, function (__, flux) {
    return {
      listenTo: function listenTo(__, context) {
        var stores = [];

        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
          for (var _iterator = storeNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
            var storeName = _step.value;

            stores.push(flux.stores[storeName]);
          }
        } catch (err) {
          _didIteratorError = true;
          _iteratorError = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion && _iterator.return) {
              _iterator.return();
            }
          } finally {
            if (_didIteratorError) {
              throw _iteratorError;
            }
          }
        }

        return stores;
      },
      getProps: function getProps(__, context) {
        if (component.getPropsFromStores != null) {
          return component.getPropsFromStores.apply(this, arguments);
        }

        var props = {};
        var _iteratorNormalCompletion2 = true;
        var _didIteratorError2 = false;
        var _iteratorError2 = undefined;

        try {
          for (var _iterator2 = storeNames[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
            var storeName = _step2.value;

            props[storeName] = flux.stores[storeName].getState();
          }
        } catch (err) {
          _didIteratorError2 = true;
          _iteratorError2 = err;
        } finally {
          try {
            if (!_iteratorNormalCompletion2 && _iterator2.return) {
              _iterator2.return();
            }
          } finally {
            if (_didIteratorError2) {
              throw _iteratorError2;
            }
          }
        }

        return props;
      }
    };
  });
}