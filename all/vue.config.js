// vue.config.js
module.exports = {
  // 打包的根路径 使用的是相对
  publicPath: './',
  // 移除map文件
  productionSourceMap: false,

  devServer: {
    open:true,
    proxy: {
      '/api': {
        target: 'http://wthrcdn.etouch.cn/weather_mini', //目标地址
        ws: true, //// 是否启用websockets
        changeOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRewrite: {
          '^/api': '/'  //这里重写路径
        } 
      }
    }
  }
}