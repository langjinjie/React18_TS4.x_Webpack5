import { Configuration, DefinePlugin } from 'webpack' // 引入webpack
import HtmlWebpackPlugin from 'html-webpack-plugin'
import dotenv from 'dotenv'

const path = require('path') // 需要安装@types/node -D
const cssRegex = /\.css$/
const sassRegex = /\.(scss|sass)$/
const lessRegex = /\.less$/
const stylRegex = /\.styl$/

// 样式编译
const styleLoadersArray = [
  'style-loader',
  {
    loader: 'css-loader',
    option: {
      module: {
        localIdentName: '[path][name]__[local]--[hash:5]',
      },
    },
  },
]

// 加载配置文件
const envConfig = dotenv.config({
  path: path.resolve(__dirname, '../evn/.env.' + process.env.BASE_ENV),
})

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
        test: cssRegex, // 匹配css文件
        use: styleLoadersArray,
      },
      {
        test: lessRegex, // 匹配less文件
        use: [
          ...styleLoadersArray,
          {
            loader: 'less-loader',
            options: {
              lessOptions: {
                // 如果要在less中写类型js的语法，需要加这一个配置
                javascriptEnabled: true,
              },
            },
          },
        ],
      },
      {
        test: sassRegex, // 匹配sass文件
        use: [...styleLoadersArray, 'sass-loader'],
      },
      {
        test: stylRegex, // 匹配stylus文件
        use: [...styleLoadersArray, 'stylus-loader'],
      },
    ],
  },
  resolve: {
    // 不需要添加后缀的文件
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.css', '.less'],
    // 配置文件别名，别名需要配置两个地方，这里和tsconfig.json 需要给tsconfig.json配置映射路径，那么typescript-eslint检查就不会报错了
    alias: {
      src: path.join(__dirname, '../src'),
      modules: [path.resolve(__dirname, '../node_modules')], // 查找第三方模块只在本项目的node_modules中查找
    },
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
      'process.env': JSON.stringify(envConfig.parsed),
      'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
    }),
  ],
}
// 导出
export default baseConfig
