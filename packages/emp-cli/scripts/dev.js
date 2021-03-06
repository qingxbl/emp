const {setPaths} = require('../helpers/paths')
const {getProjectConfig} = require('../helpers/project')
const Webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
//

module.exports = async args => {
  const {src, public} = args
  setPaths({src, public})
  const config = await getProjectConfig('development', args)
  //::Fix 新版本需要加入一下配置 支持 liveReload 和 hot reload
  WebpackDevServer.addDevServerEntrypoints(config, config.devServer)
  //
  const compiler = Webpack(config)
  const server = new WebpackDevServer(compiler, config.devServer)
  const host = config.devServer.host || 'localhost'
  server.listen(config.devServer.port, host, () => {
    console.log(`Starting server on http://${host}:${config.devServer.port}`)
  })
  //
  /* webpack(config, (err, stats) => {
    if (err) {
      console.error(err.stack || err)
      if (err.details) {
        console.error(err.details)
      }
      return
    }
    const info = stats.toJson()

    if (stats.hasErrors()) {
      console.error(info.errors)
    }

    if (stats.hasWarnings()) {
      console.warn(info.warnings)
    }
    // console.log(info)
  }) */
}
