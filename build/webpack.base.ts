import { Configuration, DefinePlugin } from 'webpack' // 引入webpack
import HtmlWebpackPlugin from 'html-webpack-plugin'
import dotenv from 'dotenv'
import CopyPlugin from 'copy-webpack-plugin'
import WebPackBar from 'webpackbar' // 进度条
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const path = require('path') // 需要安装@types/node -D
const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式

const cssModuleRegex = /\module.css$/
const cssRegex = /\.css$/
const sassModuleRegex = /\module.(scss|sass)$/
const sassRegex = /\.(scss|sass)$/
const lessModuleRegex = /\.module.less$/
const lesseRegex = /\.less$/
const stylModuleRegex = /\module.styl$/
const stylRegex = /\.styl$/

// 模块化样式编译
const moduleStyleLoadersArray = [
  isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
  {
    loader: 'css-loader',
    options: {
      modules: {
        // localIdentName: '[path][name]__[local]_[hash:5]',
        localIdentName: '[local]_[hash:5]', // 样式名称
      },
    },
  },
  // 添加 postcss-loader 需要兼容一些低版本浏览器，需要给css3加前缀,可以借助插件来自动加前缀
  'postcss-loader',
]

// 非模块化样式编译
const styleLoadersArray = [
  isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
  'css-loader',
  // 添加 postcss-loader 需要兼容一些低版本浏览器，需要给css3加前缀,可以借助插件来自动加前缀
  // 'postcss-loader',
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
    filename: 'js/[name].[chunkhash:8].js', // 每个输出的文件名
    path: path.join(__dirname, '../dist'), // 打包的输出路径
    clean: true, // webpack4需要配置clear-webpack-plugin来删除dist文件，webpack5内置了
    publicPath: '/', // 打包后文件的公共前缀路径
    // ... 这里自定义输出文件名的方式是，将某些资源发送到指定目录
    assetModuleFilename: 'images/[hash][ext][query]',
  },
  // loader 配置
  module: {
    rules: [

      {
        test: /.(ts|tsx)$/, // 正则匹配 .ts .tsx文件
        exclude:'/node_modules/', // 不解该选项配置的模块,优先级更高
        use: ['thread-loader', 'babel-loader'], // 配置文件 thread-loader 多线程打包 由于thread-loader不支持抽离css插件MiniCssExtractPlugin.loader
      },

      /* ---------- 处理样式 ---------- */
      {
        test: cssRegex, // 匹配非模块化css文件
        exclude: cssModuleRegex, // 排除模块化css文件
        use: styleLoadersArray,
      },
      {
        test: cssModuleRegex, // 匹配模块化css文件
        use: moduleStyleLoadersArray,
      },
      {
        test: lesseRegex, // 匹配非模块化less文件
        exclude: lessModuleRegex, // 排除模块化less文件
        use: [...styleLoadersArray, 'less-loader'],
      },
      {
        test: lessModuleRegex, // 匹配模块化less文件
        use: [
          ...moduleStyleLoadersArray,
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
        test: sassRegex, // 匹配非模块化sass文件
        exclude: sassModuleRegex, // 排除模块化sass文件
        use: [...styleLoadersArray, 'sass-loader'],
      },
      {
        test: sassModuleRegex, // 匹配模块化sass文件
        use: [...moduleStyleLoadersArray, 'sass-loader'],
      },
      {
        test: stylRegex, // 匹配非模块化stylus文件
        exclude: stylModuleRegex, // 排除模块化stylus文件
        use: [...styleLoadersArray, 'stylus-loader'],
      },
      {
        test: stylModuleRegex, // 匹配模块化stylus文件
        use: [...moduleStyleLoadersArray, 'stylus-loader'],
      },

      /* ---------- 处理图片 ---------- */
      {
        test: /\.(png|jpe?g|gif|svg)$/i, // 匹配图片文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 20 * 1024, // 小于10kb转base64
          },
        },
        generator: {
          filename: 'assets/images/[name].[contenthash:8][ext][query]', // 文件输出目录和命名,不加[ext]会没有后缀名
        },
      },

      /* ---------- 处理字体 ---------- */
      {
        test: /.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
        type: "asset", // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10k转base64
          }
        },
        generator: {
          filename: "assets/fonts/[hash][ext][query]", // 文件输出目录和命名
        }
      },

      /* ---------- 处理媒体文件 ---------- */
      {
        test: /.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
        type: 'asset', // type选择asset
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024, // 小于10kb转base64
          }
        },
        generator: {
          filename: 'assets/media/[hash][ext][query]', // 文件输出目录和命名
        },
      },
      /* 处理json文件 */
      {
        // 匹配json文件
        test: /\.json$/,
        type: "asset/source", // 将json文件视为文件类型
        generator: {
          // 这里专门针对json文件的处理
          filename: "assets/json/[name][hash][ext][query]",
        },
      },
    ],
  },
  resolve: {
    // 不需要添加后缀的文件
    extensions: ['.tsx', '.ts', '.jsx', '.js', '.css', '.less'],
    // 配置文件别名，别名需要配置两个地方，这里和tsconfig.json 需要给tsconfig.json配置映射路径，那么typescript-eslint检查就不会报错了
    alias: {
      src: path.join(__dirname, '../src'),
      assets: path.join(__dirname, '../assets'),
      modules: [path.resolve(__dirname, '../node_modules')], // 查找第三方模块只在本项目的node_modules中查找
    },
  },
  // plugin 的配置
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack5-react-ts',
      favicon: path.join(__dirname, '../public/favicon.ico'), // 引入icon文件，自动会打包到跟index.html同目录下
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
    // 处理静态文件
    new CopyPlugin({
      patterns:[
        {
          from: path.join(__dirname, '../static'), // 静态文件入口
          to: path.join(__dirname, '../dist/static'), // 静态文件输出
          filter:(sources)=> !sources.includes('index.html') // 过滤掉 index.html
        }
      ]
    }),
    // 打包进度条
    new WebPackBar({
      color: "#85d", // 默认green,进度条颜色支持hex
      basic:false, // 默认true,启用一个简单的日志报告器
      profile:false,  // 默认false，启用探查器。
    })
  ],
  // 开启持持久化存储缓存
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
}
// 导出
export default baseConfig
