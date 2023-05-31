
# webpack项目搭建

## 1、依赖管理

使用 `pnpm`，`pnpm`、`npm`和 `yarn`都是 `Node.js`和 `Javascript`项目的包管理器。每种都有自己的优缺点，以下是 `pnpm`与 `npm`和 `yarn`相比的一些优势：总的来说，对于具有大量依赖关系或使用 `monorepo`结构的项目，`pnpm`是一个不错的选择。但是，值得注意的是，`pnpm`不像 `npm`和 `yarn`那样广泛使用，因此也可能会遇到某些包货工具的兼容性问题

```shell
# 我的pnpm版本
pnpm -v

# 初始package.json文件
pnpm init

```

会在根目录生成一个 `package.json`文件：

```json
{
    "name": "React18_TS4.x_Webpack5",
    "version": "1.0.0",
    "description": "",
    "main": "index.js",
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1"
    },
    "keywords": [],
    "author": "",
    "license": "ISC"
}

```

## 2、基本项目结构

```txt
├── build
|   ├── webpack.base.ts # 公共配置
|   ├── webpack.dev.ts  # 开发环境配置
|   └── webpack.prod.ts # 打包环境配置
├── public
│   └── index.html # html模板
├── src
|   ├── App.tsx 
|   ├── App.css
│   └── index.tsx # react应用入口页面
└── package.json
```

`index.html`内容：

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>webpack5-react-ts</title>
    </head>
    <body>
        <!-- 容器节点 -->
        <div id="root"></div>
    </body>
</html>
```

## 3、引入React

安装依赖：

```shell
pnpm add react react-dom
# 声明依赖
pnpm add @types/react @types/react-dom
```

接下来先将入口文件 `src.index.tsx`写好：

```tsx
import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App'

const root = document.getElementById('root')

if( root){
    creatRoot(root).render(<App/>)
}
```

`App.css`

```css
h2{
    color: red
}
```

`App.tsx`

```tsx
import React from 'react'
import './App.css'

function App (){
    return <h2>App</h2>
}
export default App
```

## 4、引入Typescript

为什么要使用`Typescript`

1. 更好的代码质量：`Typescript`的**静态类型系统**可以帮助开发人员在编写代码时**捕获错误**，这可以提高代码**质量和稳定性**。
2. 更好的可读性和可维护性：`Typescript`的静态类型系统和类可以提高代码的可读性和可维护性，特别是在大型项目中。这可以使代码更易于理解和修改。
3. 更好的`IDE`支持：`TypeScript` 具有出色的IDE支持，包括自动完成，语法突出显示和类型检查。这可以提高开发人员的生产力和准确性。
4. 更好的扩展性：`Typescript`支持面向对象编程，可以帮助开发人员创建复杂的数据类型和接口，并使代码更易于扩展和维护。
5. 更好的协作：`Typescript`可以帮助开发团队更好的协作，因为代码的结构和类型是显式声明的。这可以减少在协作开发中出现的潜在问题和错误。
6. 更好的性能：由于`Typescript`可以在编译时捕获错误，因此可以减少运行时错误并提高性能。

> 总的来说，`Typescript`可以提高代码质量，可读性，可扩展性和协作，并且可以提高性能，这些优点使得`Typescript`成为编写大型项目的优秀选择。

安装`Typescript`依赖

```shell
pnpm add typescript -D
pnpm add babel-loader ts-node @babel/core @babel/preset-react @babel/preset-typescript @babel/preset-env core-js -D
```

> - 由于`webpack`默认只能识别`js`文件，不能识别`jsx`语法，需要配置`loader`的预设预设 `@babel/preset-typescript` 来先将`ts`语法转换为`js`语法，再借助预设 `@babel/preset-react` 来识别`jsx`语法。
> - `ts-node`：编译 `ts` 文件，它可以立即编译并执行指定的 `TypeScript` 文件，因此不需要单独的编译步骤。
> - `babel-loader`: 使用 `babel` 加载最新 `js` 代码并将其转换为 `ES5`（上面已经安装过）
> - `@babel/corer`: `babel` 编译的核心包
> - `@babel/preset-env`: `babel` 编译的预设，可以转换目前最新的`js`标准语法
> - `core-js`: 使用低版本`js`语法模拟高版本的库，也就是垫片
>
> 现在`js`不断新增很多方便好用的标准语法来方便开发，甚至还有非标准语法比如装饰器，都极大的提升了代码可读性和开发效率。但前者标准语法很多低版本浏览器不支持，后者非标准语法所有的浏览器都不支持。需要把最新的标准语法转换为低版本语法，把非标准语法转换为标准语法才能让浏览器识别解析，而 `babel` 就是来做这件事的，这里只讲配置，更详细的可以看[Babel 那些事儿](https://juejin.cn/post/6992371845349507108)。

初始化`tsconfig.json`

```shell
tsc --init
```

就会在根目录生成一个`tsconfig.json`文件

```json
{
    "compilerOptions": {
        "target": "es2016",                                  /* Set the JavaScript language version for emitted JavaScript and include compatible library declarations. */
        "module": "commonjs",                                /* Specify what module code is generated. */
        "esModuleInterop": true,                             /* Emit additional JavaScript to ease support for importing CommonJS modules. This enables 'allowSyntheticDefaultImports' for type compatibility. */
        "forceConsistentCasingInFileNames": true,            /* Ensure that casing is correct in imports. */
        "strict": true,                                      /* Enable all strict type-checking options. */
        "skipLibCheck": true                                 /* Skip type checking all .d.ts files. */
    }
}
```

## 5、webpack配置

> 既然都使用了`typescript`，那就尽可能都使用`ts`编写，所以`webpack`配置文件，我们也将会使用`ts`来写

安装依赖，属于开发依赖，打包完成之后就不再需要

```shell
pnpm add webpack webpack webpack-cli -D
```

### 5.1 webpack.base.ts

配置`webpack.base.ts`文件：

```typescript
// 引入webpack
import { Configuration } from 'webpack'
// 引入html-webpack-plugin处理html文件
import HtmlWebpackPlugin from 'html-webpack-plugin'
const path = require('path') // 需要安装@types/node -D

const baseConfig: Configuration = {
    // 入口文件  __dirname 可以用来动态获取当前文件所属目录的绝对路径
    entry: path.join(__dirname, '../src/Index.tsx'),
    // 打包出口文件
    output: {
        filename: "js/[name].js",// 每个输出的文件名
        path: path.join(__dirname, '../dist'), // 打包的输出路径
        clean: true, // webpack4需要配置clear-webpack-plugin来删除dist文件，webpack5内置了
        publicPath: '/' // 打包后文件的公共前缀路径
    },
    // loader 配置
    module: {
        rules: [
            {
                test: /.(ts|tsx)$/, //匹配ts/tsx文件
                use:{
                    loader:"bael-loader",
                    options:{
                        // 预设执行顺序从右到左，所以先处理ts，在处理jsx
                        presets:[
                            [
                                "@babel/preset-env",
                                {
                                    // 设置兼容目标浏览器，也可以在根目录配置.browserslistrc文件，babel-loader会自动寻找上面配置好的文件.browserlistrc
                                    targets:{browsers: [">1%", "last 2 versions", "not ie <= 8"]},
                                    useBuiltIns: "usage", // 根据配置的浏览器兼容，以及代码中使用到的api进行引入polyfill按需添加
                                    corejs: 3, // 配置使用core-js的版本
                                    loose: true // 松散模式
                                }
                            ],
                            // 如果使用的是babel和react17,可能需要将"runtime":"automotic"添加到配置中,否则可能会出现Uncaught ReferenceError: React is not defined
                            ["@babel/presest-react",{runtime:"automatic"}],
                            "@babel/preset-typescript"
                        ]
                    }
                }
            },
            {
                test:/.(css)$/, // 匹配css文件
                use:["style-loader", "css-loader"]
            }
        ]
    },
    resolve: {
        // tsx/ts/jsx/js引用的时候不用添加后缀
        extensions: ['.tsx', '.ts', '.jsx', '.js']
    },
    // plugin 的配置
    plugins: [
        new htmlWebpackPlugin({
            // 复制index.html文件，并自动引入打包输出的所有资源（js/css）
            // __dirname 当前文件夹的路径
            template: path.join(__dirname, '../')
        })
    ]
}


```

因为`webpack.base.ts`文件承载了基本得配置，随着`webpack`做的事情越来越多，会逐渐变得很庞大，我们可以将其中得`bael-loader`相关的配置抽离出来进行管理。在根目录新建`babel.config.js`

```js
module.exports = {
  // 预设执行顺序从右到左，所以先处理ts，在处理jsx
  presets: [
    [
      "@babel/preset-env",
      {
        // 设置兼容目标浏览器，也可以在根目录配置.browserslistrc文件，babel-loader会自动寻找上面配置好的文件.browserlistrc
        targets: { browsers: [">1%", "last 2 versions", "not ie <= 8"] },
        useBuiltIns: "usage", // 根据配置的浏览器兼容，以及代码中使用到的api进行引入polyfill按需添加
        corejs: 3, // 配置使用core-js的版本
        loose: true // 松散模式
      }
    ],
    // 如果使用的是babel和react17,可能需要将"runtime":"automotic"添加到配置中,否则可能会出现Uncaught ReferenceError: React is not defined
    ["@babel/presest-react", { runtime: "automatic" }],
    "@babel/preset-typescript"
  ]
}
```

然后再`webpack.base.ts`文件中，就可以将`babel-loader`配置简化成：

```js
// ...
// loader 配置
module: {
    rules: [
        {
            test: /.(ts|tsx)$/, // 正则匹配 .ts .tsx文件
            use: 'babel-loader' // 配置文件
        },
        // ...
    ]
}
//...
```

### 5.2 webpack.dev.ts

接下来，我们需要通过`webpack-dev-server`来启动我们的项目，所以需要安装相关的依赖：

```shell
pnpm add webpack-dev-server webpack-merge -D
```

接着，配置开发环境配置：`webpack.dev.ts`

```typescript
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
            directory: path.join(__dirname, '../public') // 托管静态资源public文件夹
        },
        headers: {"Access-Control-Allow-Origin": "*" }, // 允许跨域

    }
})

export default devConfig
```

> 开发环境推荐：`eval-cheap-module-source-map`
>
> - 本地开发首次打包慢点没关系，因为eval缓存的原因，热更新会更快
> - 开发中，我们每行到吗不会写的太长，只需要定位到行就行，所以加上cheap
> - 我们希望能够找到源代码的错误，而不是打包后的，所以需要加上 module

然后在`package.json`中添加启动脚本

```json
"scripts": {
  "dev": "webpack serve -c build/webpack.dev.ts"
},
```

正当我们准备启动项目的时候，发现还有一个错误：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/471b68584ac04d34bc8a1e63b65a894c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

在`tsconfig.json`中加入一行`"jsx": "react-jsx"`

```json
{
    "compilerOptions": {
        "target": "es2016",
        "esModuleInterop": true,
        "module": "commonjs",
        "forceConsistentCasingInFileNames": true,
        "strict": true,
        "skipLibCheck": true,
        "jsx": "react-jsx" // 这里改成react-jsx，就不需要在tsx文件中手动引入React了
    },
    "include": ["./src"]
}
```

回到`App.tsx`，可以发现`React`的`import`变灰了：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e682ec872ae4aa3b060a6342c1ad509~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

> 从`React v17`开始，我们就不需要再显式`import React from 'react'`了。

运行`npm run dev`脚本启动项目，就可以看到页面跑出来了！

### 5.3 webpack.prod.ts

配置`weboack.prod.ts`:

```typescript
import { Configuration } from "webpack";
import { merge } from "webpack-merge";
import baseConfig from "./webpack.base";

const prodConfig: Configuration = merge(baseConfig, {
    mode: "production", // 生产模式,会开启tree-shaking和压缩代码,以及其他优化
});

export default prodConfig;
```

> 打包环境推荐：`none(就是不配置devtool选项了，不是配置devtool: 'none')`
>
> 1. `none`话调试只能看到编译后的代码，也不会泄露源代码，打包速度也会比较快。
> 2. 只是不方便线上排查问题, 但一般都可以根据报错信息在本地环境很快找出问题所在

在`package.json`中添加：

```json
"scripts": {
    // ...
    "build": "webpack -c build/webpack.prod.ts"
},
```

### 5.4 copy静态资源

一般`public`文件夹都会放一些静态资源，可以直接根据绝对路径引入，比如图片、`css`、`js`文件等，不需要`webpack`进行解析，只需要打包的时候把`public`下内容复制到构建出口文件夹中，可以借助[copy-webpack-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fcopy-webpack-plugin)插件，安装依赖：

```shell
pnpm add copy-webpack-plugin -D
```

修改`webpack.base.ts`:

```typescript
// plugin 的配置
  plugins: [
    new HtmlWebpackPlugin({
      title: 'webpack5-react-ts',
      favicon: path.join(__dirname, '../src/assets/favicon.ico'), // 引入icon文件，自动会打包到跟index.html同目录下
      filename: 'index.html',
      // 复制 index.html文件，并自动引入打包输出的所有资源(js/css)
      template: path.join(__dirname,'../public/index.html'),
      inject: true, // 自动注入静态资源, 一般在有多个人口文件的时候才会设置为false
      hash: true,
      // 压缩html资源
      minify:{
        removeAttributeQuotes: true, // 删除HTML中属性值周围的引号
        collapseWhitespace: true, // 去空格
        removeComments: true, // 去注释
        minifyJS: true, // 在脚本元素和事件属性中缩小JavaScript
        minifyCSS: true, // 缩小css样式元素和样式属性
      }
    }),
    // new DefinePlugin({
    //   "process.env": JSON.stringify(envConfig.parsed),
    //   "process.env.BASE_ENV": JSON.stringify(process.env.BASE_ENV),
    //   "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV),
    // })
  ]
```

## 6 配置环境变量

### 6.1 corss-env + DefinePlugin

环境变量按作用分为两种

1. 区分是开发模式还是打包构建模式
2. 区分项目业务环境，开发/测试/预测/正式环境

> 区分开发模式还是打包构建模式可以用`process.env.NODE_ENV`，因为很多第三方包里面判断都是采用的这个环境变量。

> 区分项目接口环境可以自定义一个环境变量`process.env.BASE_ENV`，设置环境变量可以借助[cross-env](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fcross-env) 和 [webpack.DefinePlugin](https://link.juejin.cn/?target=https%3A%2F%2Fwww.webpackjs.com%2Fplugins%2Fdefine-plugin%2F) 来设置。

- `cross-env`：运行跨平台设置和使用环境变量的脚本，兼容各系统的设置环境变量的包
- `webpack.DefinePlugin`：`webpack`内置的插件，可以为业务代码注入环境变量

`cross-env`解决的问题：当您使用`NODE_ENV=production`，来设置环境变量时，大多数`windows`命令提示会阻塞（报错），（异常是`Windows`上的`Bash`，它使用本机`Bash`。）同样，`Windows`和`POSIX`命令如何使用环境变量也有区别。 使用`POSIX`，您可以使用：`$ ENV_VAR`和使用`％ENV_VAR％`的`Windows`。

安装`cross-env`：

```shell
pnpm add cross-env -D
```

修改`package.json`中的`script`:

```json
...
"scripts": {
    "start": "cross-env NODE_ENV=development BASE_ENV=dev webpack serve -c build/webpack.dev.ts",
    "build:test": "cross-env NODE_ENV=production BASE_ENV=test webpack -c build/webpack.prod.ts",
    "build:pre": "cross-env NODE_ENV=production BASE_ENV=pre webpack -c build/webpack.prod.ts",
    "build": "cross-env NODE_ENV=development BASE_ENV=development webpack -c build/webpack.prod.ts"
},
...
```

> `process.env.NODE_ENV`环境变量`webpack`会自动根据设置的`mode`字段来给业务代码注入对应的`development`和`prodction`，这里在命令中再次设置环境变量`NODE_ENV`是为了在`webpack`和`babel`的配置文件中访问到。

当前是打包模式，业务环境是开发环境，这里需要把`process.env.BASE_ENV`注入到业务代码里面，就可以通过该环境变量设置对应环境的接口地址和其他数据，要借助`webpack.DefinePlugin`插件。

修改`webpack.base.ts`

```json
...
new DefinePlugin({
    // 将process.env注入到业务代码中，可以借助 dotenv-webpack 插件自动处理，不需要手动处理
    'process.env': JSON.stringify(process.env),
}),
...
```

### 6.2 配置多环境运行配置

安装依赖

```shell
pnpm add dotenv
```

在根目录下新建一个多文件配置文件夹

```txt
├── env
   ├── .env.dev # 开发环境
   ├── .env.test # 测试环境
   ├── .env.pre # 预发布环境
   └── .env.prod # 生产环境
```

文件中可以配置任意我们需要的变量：

```txt
// env/.env.dev
REACT_APP_API_URL=https://api-dev.com

// env/.env.test
REACT_APP_API_URL=https://api-test.com

// env/.env.pre
REACT_APP_API_URL=https://api-pre.com

// env/.env.prod
REACT_APP_API_URL=https://api-prod.com

```

然后在`webpck.base.ts`中引入，然后解析对应环境配置，最后通过`DefinePlugin`进行注入：

```typescript
new DefinePlugin({
    // 将process.env注入到业务代码中，可以借助 dotenv-webpack 插件自动处理，不需要手动处理
    'process.env': JSON.stringify(envConfig.parsed),
    'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
}),
```

## 7文件别名

先在`webpack.base.ts`中配置：

