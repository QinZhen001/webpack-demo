module.exports = (config, resolve) => {
  return (lang,test)=>{
    const baseRule = config.module.rule(lang).test(test)
    console.log("baseRule",baseRule)
    const normalRule = baseRule.oneOf("normal")
    console.log("normalRule",normalRule)
    applyLoaders(normalRule)

    function applyLoaders(rule) {
        rule
          .use('extract-css-loader')
          .loader(require("mini-css-extract-plugin").loader)
          .options({
            publicPath: './'
          })

      rule
        .use('css-loader')
        .loader('css-loader')
        .options({})
    }
  }
}
