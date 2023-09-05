import { Configuration } from 'webpack' // 引入webpack的类型接口
import { merge } from 'webpack-merge'
import baseConfig from './webpack.base' // 引入基本配置
// const baseConfig = require('./webpack.base') // 引入基本配置
import MiniCssExtractPlugin from 'mini-css-extract-plugin'
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'
import TerserPlugin from 'terser-webpack-plugin' // 多线程压缩混淆
import CompressionPlugin from 'compression-webpack-plugin' // 压缩css js

const prodConfig: Configuration = merge(baseConfig, {
  mode: 'production', // 生产模式，会开启tree-shaking和压缩代码，以及其他优化
  /* 
  打包环境推荐：none（不配置devTool选项了，不是配置devTool:"none"）
  在package.json的scripts中添加  "build": "webpack -c build/webpack.prod.ts"
  */
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    }),
    new CompressionPlugin({
      test: /\.(js|css)$/, // 压缩js和css文件
      filename: '[path][base].gz', // 文件命名
      algorithm: 'gzip', // 压缩格式,默认是gzip
      threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
      minRatio: 0.8 // 压缩率,默认值是 0.8
    })
  ],
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // 压缩css
      new TerserPlugin({
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            pure_funcs: ['console.log'] // 删除console.log
          }
        }
      })
    ],
  },
})

export default prodConfig