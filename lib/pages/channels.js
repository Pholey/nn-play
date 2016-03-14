"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var loadpng = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee(index) {
    return regeneratorRuntime.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve) {
              var img = new Image();
              img.onload = function () {
                var c = document.createElement("canvas");
                c.width = img.naturalWidth;
                c.height = img.naturalHeight;
                var ctx = c.getContext("2d");
                ctx.drawImage(img, 0, 0);
                var idat = ctx.getImageData(0, 0, c.width, c.height).data;
                var odat = [];
                var max = Math.max(c.width, c.height);
                var s = 1.0 / (max - 1.0);
                var ps = 1.0 / 255.0;
                for (var y = 0; y < c.height; ++y) {
                  for (var x = 0; x < c.width; ++x) {
                    var bi = (y * c.width + x) * 4;
                    var res = [x * s, y * s, idat[bi] * ps, idat[bi + 1] * ps, idat[bi + 2] * ps];
                    odat.push({ input: [res[0], res[1]], output: [res[2], res[3], res[4]] });
                  }
                }
                resolve(odat);
              };
              img.src = "images/training-data/" + index + ".png";
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function loadpng(_x) {
    return ref.apply(this, arguments);
  };
}();

var loadTrainingData = function () {
  var ref = _asyncToGenerator(regeneratorRuntime.mark(function _callee2(n) {
    var iPromises, i, shit;
    return regeneratorRuntime.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            iPromises = [];

            for (i = 1; i < n + 1; ++i) {
              iPromises.push(loadpng(i));
            }
            _context2.next = 4;
            return Promise.all(iPromises);

          case 4:
            shit = _context2.sent;
            return _context2.abrupt("return", shit.reduce(function (a, b) {
              return a.concat(b);
            }));

          case 6:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, this);
  }));

  return function loadTrainingData(_x2) {
    return ref.apply(this, arguments);
  };
}();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

var _lodash = require("lodash");

var _lodash2 = _interopRequireDefault(_lodash);

var _site = require("../components/site");

var _header = require("../components/header");

var _header2 = _interopRequireDefault(_header);

var _synaptic = require("synaptic");

var _fastSha = require("fast-sha256");

var _fastSha2 = _interopRequireDefault(_fastSha);

var _moment = require("moment");

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { return step("next", value); }, function (err) { return step("throw", err); }); } } return step("next"); }); }; }

var med = function med(values) {
  values = (0, _lodash2.default)(values).map(parseInt).filter(function (x) {
    return x.toString() !== "NaN";
  }).sort(function (a, b) {
    return a - b;
  }).value();

  var h = Math.floor(values.length / 2);

  var ret = void 0;
  if (values.length % 2) ret = values[h];else ret = (values[h - 1] + values[h]) / 2;

  return ret;
};

var ChannelListing = function (_React$Component) {
  _inherits(ChannelListing, _React$Component);

  function ChannelListing() {
    var _Object$getPrototypeO,
        _this2 = this;

    var _temp, _this, _ret;

    _classCallCheck(this, ChannelListing);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ChannelListing)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.train = _asyncToGenerator(regeneratorRuntime.mark(function _callee3() {
      var trainingSet, network, learningRate, runSets, MSE, currentError, runTimes, lastTime, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, i, err, medDifInt, estimatedEnd;

      return regeneratorRuntime.wrap(function _callee3$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              console.log("Loading test set");
              _context3.next = 3;
              return loadTrainingData(1);

            case 3:
              trainingSet = _context3.sent;

              console.log("Finished loading training data, size is", trainingSet.length);
              console.log("Creating Network");
              network = _this.createNetwork(2, 15, 3);

              console.log("Starting training");
              learningRate = 0.1;

              runSets = function runSets() {
                return trainingSet.map(function (set, i) {
                  var ret = _this.trainInputNet(learningRate, set.input, set.output, network);
                  return {
                    input: set.input,
                    ideal: set.output,
                    actual: ret
                  };
                });
              };

              // Calculates the mean square error between two results


              MSE = function MSE(ideal, actual) {
                return (0, _lodash2.default)(_lodash2.default.zip(actual, ideal)).map(function (p) {
                  return Math.pow(p[0] - p[1], 2);
                }).sum() / actual.length;
              };

              currentError = 0;
              runTimes = [];
              lastTime = void 0;
              _iteratorNormalCompletion = true;
              _didIteratorError = false;
              _iteratorError = undefined;
              _context3.prev = 17;

              for (_iterator = _lodash2.default.range(1, 101)[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                i = _step.value;

                lastTime = new Date();
                err = _lodash2.default.last(runSets());
                // Calculate the amount of time passed and record it

                runTimes.push(new Date().getTime() - lastTime.getTime());

                learningRate = .01 / (1 + .0005 * i);
                if (i % 100 === 0) {
                  medDifInt = med(runTimes);
                  estimatedEnd = (0, _moment2.default)(new Date(medDifInt * (101 - i)));


                  console.log("Time remaining: ", estimatedEnd.format("HH:MM:ss.SSSS"));

                  console.log("Checkpoint: Iteration", i, "MSE ", MSE(err.ideal, err.actual), "Learning Rate ", learningRate);
                }
                // this.trainWithWorker(network, trainingSet, .1).activate()
              }

              _context3.next = 25;
              break;

            case 21:
              _context3.prev = 21;
              _context3.t0 = _context3["catch"](17);
              _didIteratorError = true;
              _iteratorError = _context3.t0;

            case 25:
              _context3.prev = 25;
              _context3.prev = 26;

              if (!_iteratorNormalCompletion && _iterator.return) {
                _iterator.return();
              }

            case 28:
              _context3.prev = 28;

              if (!_didIteratorError) {
                _context3.next = 31;
                break;
              }

              throw _iteratorError;

            case 31:
              return _context3.finish(28);

            case 32:
              return _context3.finish(25);

            case 33:
              _this._network = network;

            case 34:
            case "end":
              return _context3.stop();
          }
        }
      }, _callee3, _this2, [[17, 21, 25, 33], [26,, 28, 32]]);
    })), _this.generate = function () {
      var pixelFunc = _this._network.standalone();
      var c = _this._pCanvas;
      var ctx = c.getContext("2d");
      var idata = ctx.createImageData(c.width, c.height);
      var idat = idata.data;
      _this.fillRandom(idat);
      var max = Math.max(c.width, c.height);
      var imax = 1.0 / max;
      for (var k = 0; k < 1; ++k) {
        console.log("Running pixel funcs");
        for (var y = 0; y < c.height; ++y) {
          for (var x = 0; x < c.width; ++x) {
            var _i = (y * c.width + x) * 4;
            var pixel = pixelFunc([x * imax, y * imax]);
            idat[_i] = pixel[0] * 255.0;
            idat[_i + 1] = pixel[1] * 255.0;
            idat[_i + 2] = pixel[2] * 255.0;
            idat[_i + 3] = 255.0;
          }
        }
        //window.open(c.toDataURL());
      }
      ctx.putImageData(idata, 0, 0);
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ChannelListing, [{
    key: "createNetwork",
    value: function createNetwork() {
      for (var _len2 = arguments.length, topology = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        topology[_key2] = arguments[_key2];
      }

      var layers = topology.map(function (x) {
        return new _synaptic.Layer(x);
      });

      // Chain our layers together
      layers.reduce(function (a, b) {
        a.project(b);
        return b;
      });

      var _layers = _toArray(layers);

      var input = _layers[0];

      var hidden = _layers.slice(1);

      var output = hidden.pop();

      return new _synaptic.Network({ input: input, hidden: hidden, output: output });
    }
  }, {
    key: "trainInputNet",
    value: function trainInputNet(rate, input, expected, Network) {
      var ret = Network.activate(input);
      Network.propagate(rate, expected);
      return ret;
    }
  }, {
    key: "fillRandom",
    value: function fillRandom(idat) {
      for (var i = 0; i < idat.length; i += 4) {
        idat[i] = Math.random() * 255.0;
        idat[i + 1] = Math.random() * 255.0;
        idat[i + 2] = Math.random() * 255.0;
      }
    }
  }, {
    key: "generateFromInput",
    value: function generateFromInput(actualOut) {
      console.log(actualOut);
    }
  }, {
    key: "render",
    value: function render() {
      var _this3 = this;

      return _react2.default.createElement(
        "div",
        { className: "channel-listing" },
        _react2.default.createElement(_header2.default, { title: "Channels" }),
        _react2.default.createElement(
          "div",
          { className: "content-wrapper" },
          _react2.default.createElement(
            "h1",
            null,
            "Channels"
          ),
          _react2.default.createElement(
            "div",
            { className: "channel" },
            _react2.default.createElement(
              "div",
              { className: "cover-image-container" },
              _react2.default.createElement("img", { className: "channel-image" })
            ),
            _react2.default.createElement(
              "div",
              { className: "channel-information" },
              "Channel Name",
              _react2.default.createElement("img", { src: "images/training-data/1.png" })
            ),
            _react2.default.createElement(
              "div",
              { className: "currently-playing" },
              "Nothing!"
            ),
            _react2.default.createElement(
              "button",
              { onClick: this.train },
              "Train"
            ),
            _react2.default.createElement(
              "button",
              { onClick: this.generate },
              "Generate"
            )
          ),
          _react2.default.createElement(
            "div",
            { className: "canvas-container" },
            _react2.default.createElement("canvas", { height: "160", width: "160", ref: function ref(x) {
                _this3._pCanvas = x;
              } })
          )
        )
      );
    }
  }]);

  return ChannelListing;
}(_react2.default.Component);

exports.default = ChannelListing;