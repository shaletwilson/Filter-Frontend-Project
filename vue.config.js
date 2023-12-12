const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  chainWebpack: (config) => {
    config.module
      .rule("svg")
      .set('generator', {
        filename: "[contenthash][ext]"
      })

    config.module
    .rule('file')
    .test(/\.(xlsx|xls|csv)(\?.*)?$/)
    .set('type', 'asset')
    .set('generator', {
      filename: "[contenthash][ext]"
    })
  },
},)
