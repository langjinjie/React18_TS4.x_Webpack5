import { Configuration, DefinePlugin } from 'webpack' // 引入webpack
import HtmlWebpackPlugin from 'html-webpack-plugin'
const path = require('path') // 需要安装@types/node -D

const baseConfig: Configuration = {
  // 入口文件  __dirname 可以用来动态获取当前文件所属目录的绝对路径
  entry: path.join(__dirname, '../src/Index.tsx'),
  // 打包出口文件
  output: {
    filename: 'js/[name].js', // 每个输出的文件名
    path: path.join(__dirname, '../dist'), // 打包的输出路径
    clean: true, // webpack4需要配置clear-webpack-plugin来删除dist文件，webpack5内置了
    publicPath: '/', // 打包后文件的公共前缀路径
  },
  // loader 配置
  module: {
    rules: [
      {
        test: /.(ts|tsx)$/, // 正则匹配 .ts .tsx文件
        use: 'babel-loader', // 配置文件
      },
      {
        test: /.(css)$/, // 匹配css文件
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    // 不需要添加后缀的文件
    extensions: ['.tsx', '.ts', '.jsx', '.js'],
  },
  // plugin 的配置
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack5-react-ts',
      favicon: path.join(__dirname, '../static/favicon.ico'), // 引入icon文件，自动会打包到跟index.html同目录下
      filename: 'index.html',
      // 复制 index.html文件，并自动引入打包输出的所有资源(js/css)
      template: path.join(__dirname, '../public/index.html'),
      inject: true, // 自动注入静态资源, 一般在有多个人口文件的时候才会设置为false
      hash: true,
      // 压缩html资源
      minify: {
        removeAttributeQuotes: true, // 删除HTML中属性值周围的引号
        collapseWhitespace: true, // 去空格
        removeComments: true, // 去注释
        minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript
        minifyCSS: true, // 缩小css样式元素和样式属性
      },
    }),
    new DefinePlugin({
      // 将process.env注入到业务代码中，可以借助 dotenv-webpack 插件自动处理，不需要手动处理
      'process.env': JSON.stringify(process.env),
    }),
  ],
}
// 导出
export default baseConfig
