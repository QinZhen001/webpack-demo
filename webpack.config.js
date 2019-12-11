const path = require("path")
const FileListPlugin = require("./plugin/file-list-plugin")
const PrintPlugin = require("./plugin/print-plugin")


module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: []
      }
    ]
  },
  plugins: [
    // new FileListPlugin()
    new PrintPlugin()
  ]
}
