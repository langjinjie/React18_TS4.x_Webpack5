import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import { merge } from "webpack-merge";
import baseConfig from "./webpack.base";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}

const host = "127.0.0.1";
const port = "8082";

// 合并公共配置,并添加开发环境配置
const devConfig: Configuration = merge(baseConfig, {
  mode: "development", // 开发模式,打包更加快速,省了代码优化步骤
  devtool: "eval-cheap-module-source-map",
  plugins: [
    new ReactRefreshWebpackPlugin(), // 添加热更新插件
  ],
  devServer: {
    host, // 地址
    port, // 端口
    open: true, // 是否自动打开，关闭
    compress: false, // gzip压缩,开发环境不开启,提升热更新速度
    hot: true, // 开启热更新，后面会讲react模块热替换具体配置
    historyApiFallback: true, // 解决history路由404问题
    setupExitSignals: true, // 允许在 SIGINT 和 SIGTERM 信号时关闭开发服务器和退出进程。
    // static: {
    //   directory: path.join(__dirname, "../static"), // 托管静态资源，注意：此处不能让整个根目录作为静态文件的根目录，不然会热更新不生效
    // },
    headers: { "Access-Control-Allow-Origin": "*" },
  }
});
export default devConfig;