const path = require("path")
const fs = require("fs")


// console.log("111", process.cwd())
// console.log("222", __dirname)

module.exports = function (source) {
  let cb = this.async()

  let headerPath = path.resolve(process.cwd(), './src/header.js')

  this.addDependency(headerPath)

  fs.readFile(headerPath, "utf-8", (err, header) => {
    if (err) {
      return cb(err)
    }
    cb(null, header + "\n" + source)
  })
}
