const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  // Si publican en una subcarpeta (ej. GitHub Pages), cambiar publicPath
  publicPath: '/'
})
