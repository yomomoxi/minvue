
module.exports = {
  outputDir: 'ei',
  publicPath: '',
  productionSourceMap: false,
  lintOnSave: false,
  devServer: {
    open: false,
    // 跨域
    proxy: {
      '/*': {
        target: `http://www.aoinf.com:8899`,
        // target: "http://127.0.0.1:8899",
        // target: 'http://192.168.0.51:8081',
        // target:"http://350e75ae.nat123.fun",
        changeOrigin: true,
      },
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },


};
