const _ = require("lodash")

// NOTE: Adjust this for additional projects
const portOffset = 0

module.exports = _.extend({
  name: "Foobar",
  host: "localhost",

  // URL of the API
  api: "localhost:9001",

  ports: {
    server: 8001 + portOffset,
    webpack: 7001 + portOffset,
    connect: 9001 + portOffset,
    livereload: 32001 + portOffset,
  },
})
