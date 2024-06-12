import { Configuration } from 'webpack'; // 引入webpack的类型接口
import { merge } from 'webpack-merge';
import CompressionPlugin from 'compression-webpack-plugin'; // 压缩css js
import TerserPlugin from 'terser-webpack-plugin'; // 多线程压缩混淆
// const baseConfig = require('./webpack.base') // 引入基本配置
import MiniCssExtractPlugin from 'mini-css-extract-plugin'; // css样式提取及css的tree-shaking
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import baseConfig from './webpack.base'; // 引入基本配置

const globAll = require('glob-all'); // 用于css的tree-shaking（树摇）
const { PurgeCSSPlugin } = require('purgecss-webpack-plugin'); // 用于css的tree-shaking(树摇)
const path = require('path'); // 需要安装@types/node -D

// const PreloadWebpackPlugin = require('@vue/preload-webpack-plugin');

const prodConfig: Configuration = merge(baseConfig, {
  mode: 'production', // 生产模式，会开启tree-shaking和压缩代码，以及其他优化
  performance: { maxAssetSize: 30 * 1024 * 1024 },
  /*
  打包环境推荐：none（不配置 devTool 选项了，不是配置devTool:"none"）
  在package.json的scripts中添加  "build": "webpack -c build/webpack.prod.ts"
  */
  plugins: [
    // 抽离css文件 在开发环境中，css是嵌在style中的
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    }),
    new CompressionPlugin({
      test: /\.(js|css)$/, // 压缩js和css文件
      filename: '[path][name][base].gz', // 文件命名 加上[path]，就会自动打包到对应的目录
      algorithm: 'gzip', // 压缩格式,默认是gzip
      threshold: 10240, // 只有大小大于该值的资源会被处理。默认值是 10k
      minRatio: 0.8 // 压缩率,默认值是 0.8
    }),
    // 清理无用css，检测src下所有tsx文件和public下index.html中使用的类名和id和标签名称
    // 只打包这些文件中用到的样式
    new PurgeCSSPlugin({
      paths: globAll.sync(
        [`${path.join(__dirname, '../src')}/**/*`, path.join(__dirname, '../public/index.html')],
        {
          nodir: true
        }
      ),
      // 用 only 来指定 purgecss-webpack-plugin 的入口
      // https://github.com/FullHuman/purgecss/tree/main/packages/purgecss-webpack-plugin
      only: ['dist'],
      safelist: {
        standard: [/^ant-/] // 过滤以ant-开头的类名，哪怕没用到也不删除
      }
    })
    // ,new PreloadWebpackPlugin({
    //   rel: 'preload',
    //   as(entry: string) {
    //     if (/.css$/.test(entry)) return 'style';
    //     if (/.woff$/.test(entry)) return 'font';
    //     if (/.png$/.test(entry)) return 'image';
    //     return 'script';
    //   },
    //   include: 'initial'
    // })
  ],
  // 优化
  optimization: {
    // 压缩混淆
    minimizer: [
      new CssMinimizerPlugin(), // 压缩css
      new TerserPlugin({
        // 压缩jss
        parallel: true, // 开启多线程压缩
        terserOptions: {
          compress: {
            pure_funcs: ['console.log'] // 删除console.log
          }
        }
      })
    ],
    // 分隔代码
    splitChunks: {
      cacheGroups: {
        vendors: {
          // 提取node_modules代码o
          test: '/node_modules', // 只匹配node_modules里面的模块
          name: 'vendors', // 提取文件名为vendors，js后缀和chunkhash会自动加
          minChunks: 1, // 只要使用了一次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块，不管异步的
          minSize: 0, // 代码体积大于0就提取出来
          priority: 1 // 提取优先级
        },
        // 提取页面公共代码
        commons: {
          name: 'commons', // 提取文件名
          minChunks: 2, // 只要使用两次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0
        }
      }
    }
  }
});

export default prodConfig;
