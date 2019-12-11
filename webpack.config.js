const path = require("path")

const LOADER_NAME = "loader2"

// console.log("process.env.NODE_ENV", process.env.NODE_ENV)
// console.log("__dirname", process.cwd())

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./src/index.js",
  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: path.resolve(__dirname, `./loader/${LOADER_NAME}`),
            options: {
              aaa: "aaa",
              bbb: "bbb"
            }
          }
        ]
      }
    ]
  }
}
