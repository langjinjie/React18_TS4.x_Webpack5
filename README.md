
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

```typescript
// 配置文件别名
alias: {
    src: path.join(__dirname, '../src'),
        modules: [path.resolve(__dirname, '../node_modules')], // 查找第三方模块只在本项目的node_modules中查找
},
```

然后还需要再`tsconfig.json`中配置：在`tsconfig.json`中配置映射路径，那么typescript-eslint检查就不会报错了

```json
{
    "compilerOptions": {
        ...
        "baseUrl": "./",
        "paths": {
            "src/*": [
                "src/*"
            ]
        }
    }
}
```

然后就可以在项目中使用了

```tsx
// 引入App组件
import App from 'src/App'
```

## 8 重启项目时在同一个浏览器Tab中打开页面

windows下不生效



我们发现，每次运行`pnpm start`命令都会在当前浏览器打开新的`Tab`，虽然也不影响项目开发，但是很影响开发体验，可以参考`Create-React-App`的处理方式：

> 参考：[create-react-app](https://link.juejin.cn/?target=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttps%3A%2F%2Fgithub.com%2Ffacebook%2Fcreate-react-app%2Ftree%2Fmain%2Fpackages%2Freact-dev-utils) 的启动方式

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9efc08268a86464dbfeabceaf5bb02d5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

复制出这两个文件源码，将其放置在`build`下的`util`中：

```txt
├── build
	├── util
   		├── openBrowser.js
   		├── openChrome.applescript

```

修改`webpack.dev.ts`:

```typescript
import path from "path";
import { merge } from "webpack-merge";
import webpack, { Configuration as WebpackConfiguration } from "webpack";
import WebpackDevServer from "webpack-dev-server";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import baseConfig from "./webpack.base";

// 运行命令的时候重启一次打开一个tab 页很烦，所以呢优化一下
// 参考：create-react-app 的启动方式
// https://github.com/facebook/create-react-app/blob/main/packages/react-dev-utils/openChrome.applescript
// 记得关闭webpack-dev-server的配置中的自动打开 open: false 或者注释
const openBrowser = require("./util/openBrowser");

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const host = "127.0.0.1";
const port = "8082";

// 合并公共配置,并添加开发环境配置
const devConfig: Configuration = merge(baseConfig, {
    mode: "development", // 开发模式,打包更加快速,省了代码优化步骤
    /**
    开发环境推荐：eval-cheap-module-source-map
    - 本地开发首次打包慢点没关系,因为 eval 缓存的原因, 热更新会很快
    - 开发中,我们每行代码不会写的太长,只需要定位到行就行,所以加上 cheap
    - 我们希望能够找到源代码的错误,而不是打包后的,所以需要加上 module
   */
    devtool: "eval-cheap-module-source-map",
});

const devServer = new WebpackDevServer(
    {
        host, // 地址
        port, // 端口
        open: false, // 是否自动打开，关闭
        setupExitSignals: true, // 允许在 SIGINT 和 SIGTERM 信号时关闭开发服务器和退出进程。
        compress: false, // gzip压缩,开发环境不开启,提升热更新速度
        hot: true, // 开启热更新，后面会讲react模块热替换具体配置
        historyApiFallback: true, // 解决history路由404问题
        static: {
            directory: path.join(__dirname, "../public"), // 托管静态资源public文件夹
        },
        headers: { "Access-Control-Allow-Origin": "*" },
    },
    webpack(devConfig)
);

devServer.start().then(() => {
    // 启动界面
    openBrowser(`http://${host}:${port}`);
});

export default devConfig;

```

## 9 引入less、sass（scss）、stylus

`less`、`sass（scss）`、`stylus`是三个比较流行的 `CSS Modules` 预处理库。在 `React` 中，使用`CSS Modules` 的好处在于：

1. 避免全局样式冲突：使用 `CSS Modules` 可以确保样式只应用于特定组件，避免全局样式冲突。
2. 更好的可维护性：`CSS Modules` 使得样式与组件代码紧密关联，方便代码维护。
3. 提高代码可重用性：`CSS Modules` 可以轻松地将样式从一个组件复制到另一个组件，提高代码可重用性。
4. 支持动态样式：使用 `CSS Modules` 可以轻松地生成动态样式，例如根据组件状态或属性更改样式。
5. 更好的性能：`CSS Modules` 使用模块化的方式加载样式，提高了页面加载速度和性能

### 9.1 基本用法

先安装相关的依赖

```shell
pnpm add less less-loader sass-loader sass stylus stylus-loader -D
```

在`webpack.base.ts`添加相关的`loader`：

```typescript
// ...
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
    'style-loader',
    {
        loader: 'css-loader',
        options: {
            modules: {
                // localIdentName: '[path][name]__[local]_[hash:5]',
                localIdentName: '[local]_[hash:5]',
            },
        },
    },
    // 添加 postcss-loader 需要兼容一些低版本浏览器，需要给css3加前缀,可以借助插件来自动加前缀
    'postcss-loader',
]

// 非模块化样式编译
const styleLoadersArray = [
    'style-loader',
    'css-loader',
    // 添加 postcss-loader 需要兼容一些低版本浏览器，需要给css3加前缀,可以借助插件来自动加前缀
    // 'postcss-loader',
]

const baseConfig: Configuration = {
    // ...
    module: {
        rules: [
            // ...
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
            // ...
            };

            export default baseConfig;

```

> webpack配置说明
>
> 1. `localIdenName`：配置生成的css类名组成（`path`路径，`name`文件名，`local`原来的css类名，``）
>
> 2. 如下的配置（`localIdentName: '[local]__[hash:base64:5]'`）：生成的css类名类似 `class="edit__275ih"`这种，既能达到`scoped`的效果，又保留原来的`css`类名(`edit`)。
>
>    推荐阅读：[【Webpack进阶】less-loader、css-loader、style-loader实现原理](https://juejin.cn/post/6944668149849522213)

然后就可以在业务中使用了

重启项目，就会发现生成了带有`hash`值的`class`类名，且里面包含了我们自定义的类名，方便日后调试用：

> **Tips**：虽然我们在样式文件名上加一个 `.module` 的后缀，可以明确这是 `css modules`，但也带来了额外的码字开销。可以在 `global.d.ts` 加入样式文件的声明，就可以避免写 `.module` 后缀。

```typescript
// src/typings/global.d.ts

/* CSS MODULES */
declare module '*.css' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.scss' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.sass' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.less' {
    const classes: { [key: string]: string };
    export default classes;
}

declare module '*.styl' {
    const classes: { [key: string]: string };
    export default classes;
}

```

### 9.2 处理CSS3前缀在浏览器中的兼容

虽然`css3`现在浏览器支持率已经很高了, 但有时候需要兼容一些低版本浏览器，需要给`css3`加前缀,可以借助插件来自动加前缀，[postcss-loader](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.docschina.org%2Floaders%2Fpostcss-loader%2F) 就是来给`css3`加浏览器前缀的，安装依赖：

```shell
pnpm add postcss-loader autoprefixer -D
```

为了避免`webpack.base.ts`文件过于庞大，我们将一些`loader`配置提取成单独的文件来进行管理，根目录新建`postcss.config.js`，作为`postcss-loader`的配置文件，会自动读取配置：

```js
module.exports = {
    ident: "postcss",
    plugins: [require("autoprefixer")],
};
```

修改`webpack.base.ts`，在解析`css`和`less`的规则中添加配置：

```typescript
// ...
const styleLoadersArray = [
    "style-loader",
    {
        loader: "css-loader",
        options: {
            modules: {
                localIdentName: "[path][name]__[local]--[hash:5]",
            },
        },
    },
    // 添加 postcss-loader
    'postcss-loader'
];
```

配置完成后，需要有一份要兼容浏览器的清单，让`postcss-loader`知道要加哪些浏览器的前缀，在根目录创建`.browserslistrc`文件：

```txt
IE 9 # 兼容IE 9
chrome 35 # 兼容chrome 35
```

以兼容到`ie9`和`chrome35`版本为例，配置好后，在`app.module.less`中加入一些CSS3的语法，重新启动项目，就可以在浏览器的控制台-Elements 中看到配置成功了。

执行`pnpm run build:dev`打包，也可以看到打包后的`css`文件已经加上了`ie`和谷歌内核的前缀。

## 10 处理其他常用资源

### 10.1处理图片

对于图片文件，`webpack4`使用`file-loader`和`url-loader`来处理的，但`webpack5`不使用这两个`loader`了，而是采用自带的 [asset-module](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fguides%2Fasset-modules%2F%23root) 来处理，修改`webpack.base.ts`，添加图片解析配置

```typescript
{
    output: {
        // ... 这里自定义输出文件名的方式是，将某些资源发送到指定目录
        assetModuleFilename: 'images/[hash][ext][query]'
    },
        module: {
            rules: [
                // ...
                {
                    test: /\.(png|jpe?g|gif|svg)$/i, // 匹配图片文件
                    type: "asset", // type选择asset
                    parser: {
                        dataUrlCondition: {
                            maxSize: 20 * 1024, // 小于10kb转base64
                        }
                    },
                    generator:{ 
                        filename:'static/images/[hash][ext][query]', // 文件输出目录和命名
                    },
                },
            ]
        }
}

```

| 资源模块类型     | 描述                                                         |
| ---------------- | ------------------------------------------------------------ |
| `asset/resource` | 发送一个单独的文件，并导出 `URL`，替代 `file-loader`，相当于`file-loader`, 将文件转化成`Webpack`能识别的资源，其他不做处理。 |
| `asset/inline`   | 导出一个资源的 `data URI`，以前使用 `url-loader` 实现。      |
| `asset/source`   | 导出资源的源代码 ，以前是使用 `raw-loader` 实现。            |
| `asset`          | 相当于自动选择 `asset/resource` 或 `asset/inline`，替换 `url-loader` 中的 `limit`，相当于`url-loader`将文件转化成`Webpack`能识别的资源，同时小于某个大小的资源会处理成`data URI`形式。 |

> 将文件编译为 `Data URI` 使用，可以节省 `HTTP` 请求，是一个性能优化的点。但是将图片文件经过 `base64` 编码转为 `Data URI`，体积会增加大约33%。所以，我们一般只针对小图片做Base64的处理，对于一些比较大的文件来说，转为 `Data URI` 会明显增加打包后文件的体积，反而会加大对带宽资源和流量的需求。

由于我们希望通过 `ES6` 的新语法 `ESModule` 的方式导入资源，为了使 `TypeScript` 可以识别图片模块，需要在 `src/typings/global.d.ts` 中加入声明：

```typescript
// ...

/* IMAGES */
declare module '*.svg' {
    const ref: string;
    export default ref;
}

declare module '*.bmp' {
    const ref: string;
    export default ref;
}

declare module '*.gif' {
    const ref: string;
    export default ref;
}

declare module '*.jpg' {
    const ref: string;
    export default ref;
}

declare module '*.jpeg' {
    const ref: string;
    export default ref;
}

declare module '*.png' {
    const ref: string;
    export default ref;
}

```

### 10.2 处理字体和媒体

字体文件和媒体文件这两种资源处理方式和处理图片是一样的，只需要把匹配的路径和打包后放置的路径修改一下就可以了。修改`webpack.base.ts`文件：

```typescript
```

