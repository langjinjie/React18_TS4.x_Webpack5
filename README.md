
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

