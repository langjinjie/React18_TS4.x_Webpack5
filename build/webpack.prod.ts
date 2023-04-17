import { Configuration } from 'webpack' // 引入webpack的类型接口
import { merge } from 'webpack-merge'
import baseConfig from './webpack.base' // 引入基本配置

const prodConfig: Configuration = merge(baseConfig, {
  mode:'production' // 生产模式，会开启tree-shaking和压缩代码，以及其他优化
  /* 
  打包环境推荐：none（不配置devTool选项了，不是配置devTool:"none"）
  在package.json的scripts中添加  "build": "webpack -c build/webpack.prod.ts"
  */
})

export default prodConfig