import path from 'path';
import {merge} from 'webpack-merge' //  合并主配置文件
import {Configuration as webpackConfiguration} from 'webpack'
import {Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'
import baseConfig from './webpack.base'; // 引入主配置文件

interface IConfiguration extends webpackConfiguration {
  devServer?: WebpackDevServerConfiguration
}

const host = '127.0.0.1'
const port = '8082'

// 合并公共配置，并添加开发环境配置
const devConfig: IConfiguration  = merge(baseConfig,{
  mode: 'development', // 开发模式，打包更加快速
  devtool:'eval-cheap-module-source-map',
  devServer:{
    host,// 本地服务器地址
    port,// 本地服务器端口号
    open: true, // 是否自动打开
    compress: false, // gzi压缩，开发环境不开启，提升热更新速度
    hot: true,
    historyApiFallback: true, // 解决history路由404问题
    setupExitSignals:  true, // 允许在 SIGINT 和 SIGTERM 信号时关闭开发服务器进程。
    static:{
      directory: path.join(__dirname, '../'), // 整个项目作为静态文件根目录
    },
    headers: {"Access-Control-Allow-Origin": "*" }, // 允许跨域

  }
})

export default devConfig