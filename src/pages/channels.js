
import React from "react"
import _ from "lodash";
import {Site} from "../components/site"
import SiteHeader from "../components/header"
import {Neuron, Layer, Network, Trainer, Architect} from "synaptic"
import sha256 from "fast-sha256"
import m from "moment"
import op from "operative"

async function loadpng(index) {
  return new Promise((resolve) => {
    let img = new Image();
    img.onload = () => {
      let c = document.createElement("canvas");
      c.width = img.naturalWidth;
      c.height = img.naturalHeight;
      let ctx = c.getContext("2d");
      ctx.drawImage(img, 0, 0);
      let idat = ctx.getImageData(0, 0, c.width, c.height).data;
      let odat = [];
      let max = Math.max(c.width, c.height);
      let s = 1.0 / (max - 1.0);
      const ps = 1.0 / 255.0;
      for (let y = 0; y < c.height; ++y) {
        for (let x = 0; x < c.width; ++x) {
          let bi = ((y * c.width) + x) * 4;
          let res = [x * s, y * s, idat[bi] * ps, idat[bi + 1] * ps, idat[bi + 2] * ps];
          odat.push({input: [res[0], res[1]], output: [res[2], res[3], res[4]]});
        }
      }
      resolve(odat);
    };
    img.src = `images/training-data/${index}.png`;
  });
}
async function loadTrainingData(n) {
  let iPromises = [];
  for (let i = 1; i < (n + 1); ++i) {
    iPromises.push(loadpng(i));
  }
  let shit = await Promise.all(iPromises);
  return shit.reduce((a, b) => a.concat(b));
}

const med = (values) => {
  values =
    _(values)
      .map(parseInt)
      .filter(x => x.toString() !== "NaN")
      .sort((a, b) => a - b)
      .value()

  const h = Math.floor(values.length / 2)

  let ret
  if (values.length % 2) ret = values[h];
  else                   ret = (values[h - 1] + values[h]) / 2

  return ret
}

const getLadyParts = (x) => {
  let float = new Float64Array(1),
      bytes = new Uint8Array(float.buffer)

  float[0] = x

  let exponent = ((bytes[7] & 0x7f) << 4 | bytes[6] >> 4) - 0x3ff
  bytes[7] = 0x3f
  bytes[6] |= 0xf0

  return {
    exponent,
    mantissa: float[0],
  }
}

class ChannelListing extends React.Component {
  initPlot = () => {
    this._plotCtx = this._plot.getContext("2d")
    this._plotCtx.fillStyle = "#FFFFFF"
    this._plotCtx.fillRect(0, 0, this._plot.width, this._plot.height);
  }

  errorPlot = (error) => {
    let errParts = getLadyParts(error)
    let errScaled = errParts.mantissa * (this._plot.height / 2)
    console.log(errScaled, this._plot.height)
    this._plotCtx.drawImage(this._plot, -1, 0)
    this._plotCtx.fillRect(this._plot.width - 1, 0, 1, this._plot.height)
    this._plotCtx.fillStyle = "#FF0000"
    this._plotCtx.fillRect(this._plot.width - 1, this._plot.height - errScaled, 1, errScaled)
  }

  trainWithWorker(rate, sets, Network) {
    const o =  operative({
      network: Network,
      trainInputNet: this.trainInputNet,
      runSets: this.runSetWorker,
      mse: this.mse,
    })

    o.runSets(sets, r => console.log(r))
  }

  // Calculates the mean square error between two results
  MSE = (ideal, actual) => _(_.zip(actual, ideal))
    .map(p => Math.pow(p[0] - p[1], 2))
    .sum() / actual.length


  runSetWorker = function(rate, network, set, i) {
    set = _.cloneDeep(set)

    var ret = this.trainInputNet(rate, set.input, set.output, network)

    return {
      network: network,
      input: set.input,
      ideal: set.output,
      actual: ret,
    }
  }

  train = async () => {
    this.initPlot()
    console.log("Loading test set");
    let trainingSet = await loadTrainingData(1);
    console.log("Finished loading training data, size is", trainingSet.length);
    console.log("Creating Network")
    const network = this.createNetwork(2, 5, 3)
    console.log("Starting training")
    let learningRate = 0.1

    const runSets = () => trainingSet.map(this.runSetWorker.bind(this, learningRate, network))
    // this.trainWithWorker(learningRate, trainingSet, network)
    // Calculates the mean square error between two results
    const MSE = (ideal, actual) => _(_.zip(actual, ideal))
      .map(p => Math.pow(p[0] - p[1], 2))
      .sum() / actual.length

    let currentError = 0
    let runTimes = []
    let lastTime
    for (var i of _.range(1, 500)) {
      lastTime = new Date()
      var err = _.last(runSets())
      // Calculate the amount of time passed and record it
      runTimes.push(new Date().getTime() - lastTime.getTime())

      learningRate = .01 / (1 + .0005 * i)
      if (i % 100 === 0) {
        let errRate = MSE(err.ideal, err.actual)
        console.log(
          "Checkpoint: Iteration", i,
          "MSE ", errRate,
          "Learning Rate ", learningRate
        );
        this.errorPlot(errRate)
      }
      // this.trainWithWorker(network, trainingSet, .1).activate()
    }

    this._network = network;
  }

  createNetwork(...topology) {
    const layers = topology.map(x => new Layer(x));

    // Chain our layers together
    layers.reduce((a, b) => {
        a.project(b)
        return b
    });

    let [input, ...hidden] = layers;
    let output = hidden.pop();

    return new Network({input, hidden, output})
  }

  trainInputNet(rate, input, expected, Network) {
    const ret = Network.activate(input);
    Network.propagate(rate, expected)
    return ret
  }

  fillRandom(idat) {
    for (let i = 0; i < idat.length; i += 4) {
      idat[i] = Math.random() * 255.0;
      idat[i + 1] = Math.random() * 255.0;
      idat[i + 2] = Math.random() * 255.0;
    }
  }

  generateFromInput(actualOut) {
    console.log(actualOut)
  }

  generate = () => {
    let pixelFunc = this._network.standalone()
    let c = this._pCanvas;
    let ctx = c.getContext("2d");
    let idata = ctx.createImageData(c.width, c.height);
    let idat = idata.data;
    this.fillRandom(idat);
    let max = Math.max(c.width, c.height);
    let imax = 1.0 / max;
    for (let k = 0; k < 1; ++k) {
      console.log("Running pixel funcs")
      for (let y = 0; y < c.height; ++y) {
        for (let x = 0; x < c.width; ++x) {
          let i = ((y * c.width) + x) * 4;
          let pixel = pixelFunc([x * imax, y * imax]);
          idat[i] = pixel[0] * 255.0;
          idat[i + 1] = pixel[1] * 255.0;
          idat[i + 2] = pixel[2] * 255.0;
          idat[i + 3] = 255.0;
        }
      }
      //window.open(c.toDataURL());
    }
    ctx.putImageData(idata, 0, 0);
  }
  render() {
    return (
      <div className="channel-listing">
        <SiteHeader title="Channels" />
        <div className="content-wrapper">
          <h1>Channels</h1>
          <div className="channel">
            <div className="cover-image-container">
              <img className="channel-image"></img>
            </div>
            <div className="channel-information">
              Channel Name
              <canvas ref={x => this._plot = x} width="615" height="315" className="plot" />
              <img src="images/training-data/1.png" />
            </div>
            <div className="currently-playing">
              Nothing!
            </div>
            <button onClick={this.train}>
              Train
            </button>
            <button onClick={this.generate}>
              Generate
            </button>
          </div>
          <div className="canvas-container">
            <canvas height="500" width="500" ref={(x) => {this._pCanvas = x}} />
          </div>
        </div>
      </div>
    )
  }
}
export default ChannelListing
