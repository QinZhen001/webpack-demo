const {getOptions} = require("loader-utils")
const validateOptions = require("schema-utils")

const schema = {
  type: "object",
  properties: {
    test: {
      type: "string"
    }
  }
}

module.exports = function (source) {
  // console.log("source ", typeof source)

  // console.log("this,this", this.query)


  const options = getOptions(this)

  // console.log("options", options)

  validateOptions(schema, options, "Example Loader")
  //
  // 对资源进行一些转换

  return `export default ${ JSON.stringify(source) }`;
}
