
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
        target: 'http://192.168.0.51:8081',
        changeOrigin: true,
      },
    },
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },


};
