/**
 * 处理CSS前缀在浏览器中的兼容
 * 为了避免webpack.base.ts文件过于庞大，我们将一些loader配置提取成单独的文件来进行管理，根目录新建postcss.config.js，作为postcss-loader的配置文件，会自动读取配置：
 */
module.exports = {
  ident: 'postcss',
  plugins: [require('autoprefixer')],
}
