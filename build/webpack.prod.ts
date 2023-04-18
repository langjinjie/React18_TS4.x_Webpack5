import path from 'path'
import { Configuration, sources } from 'webpack' // 引入webpack的类型接口
import { merge } from 'webpack-merge'
import baseConfig from './webpack.base' // 引入基本配置
import CopyPlugin  from 'copy-webpack-plugin'

const prodConfig: Configuration = merge(baseConfig, {
  mode:'production', // 生产模式，会开启tree-shaking和压缩代码，以及其他优化
  /* 
  打包环境推荐：none（不配置devTool选项了，不是配置devTool:"none"）
  在package.json的scripts中添加  "build": "webpack -c build/webpack.prod.ts"
  */
  plugins:[
    // 处理生产的
    new CopyPlugin({
      patterns:[
        {
          from: path.join(__dirname, '../public'), // 静态文件入口
          to: path.join(__dirname, '../dist'), // 静态文件输出
          filter:(sources)=> !sources.includes('index.html') // 过滤掉 index.html
        }
      ]
    })
  ]
})

export default prodConfig