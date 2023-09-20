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

为什么要使用 `Typescript`

1. 更好的代码质量：`Typescript`的**静态类型系统**可以帮助开发人员在编写代码时**捕获错误**，这可以提高代码**质量和稳定性**。
2. 更好的可读性和可维护性：`Typescript`的静态类型系统和类可以提高代码的可读性和可维护性，特别是在大型项目中。这可以使代码更易于理解和修改。
3. 更好的 `IDE`支持：`TypeScript` 具有出色的IDE支持，包括自动完成，语法突出显示和类型检查。这可以提高开发人员的生产力和准确性。
4. 更好的扩展性：`Typescript`支持面向对象编程，可以帮助开发人员创建复杂的数据类型和接口，并使代码更易于扩展和维护。
5. 更好的协作：`Typescript`可以帮助开发团队更好的协作，因为代码的结构和类型是显式声明的。这可以减少在协作开发中出现的潜在问题和错误。
6. 更好的性能：由于 `Typescript`可以在编译时捕获错误，因此可以减少运行时错误并提高性能。

> 总的来说，`Typescript`可以提高代码质量，可读性，可扩展性和协作，并且可以提高性能，这些优点使得 `Typescript`成为编写大型项目的优秀选择。

安装 `Typescript`依赖

```shell
pnpm add typescript -D
pnpm add babel-loader ts-node @babel/core @babel/preset-react @babel/preset-typescript @babel/preset-env core-js -D
```

> - 由于 `webpack`默认只能识别 `js`文件，不能识别 `jsx`语法，需要配置 `loader`的预设预设 `@babel/preset-typescript` 来先将 `ts`语法转换为 `js`语法，再借助预设 `@babel/preset-react` 来识别 `jsx`语法。
> - `ts-node`：编译 `ts` 文件，它可以立即编译并执行指定的 `TypeScript` 文件，因此不需要单独的编译步骤。
> - `babel-loader`: 使用 `babel` 加载最新 `js` 代码并将其转换为 `ES5`（上面已经安装过）
> - `@babel/corer`: `babel` 编译的核心包
> - `@babel/preset-env`: `babel` 编译的预设，可以转换目前最新的 `js`标准语法
> - `core-js`: 使用低版本 `js`语法模拟高版本的库，也就是垫片
>
> 现在 `js`不断新增很多方便好用的标准语法来方便开发，甚至还有非标准语法比如装饰器，都极大的提升了代码可读性和开发效率。但前者标准语法很多低版本浏览器不支持，后者非标准语法所有的浏览器都不支持。需要把最新的标准语法转换为低版本语法，把非标准语法转换为标准语法才能让浏览器识别解析，而 `babel` 就是来做这件事的，这里只讲配置，更详细的可以看[Babel 那些事儿](https://juejin.cn/post/6992371845349507108)。

初始化 `tsconfig.json`

```shell
tsc --init
```

就会在根目录生成一个 `tsconfig.json`文件

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

> 既然都使用了 `typescript`，那就尽可能都使用 `ts`编写，所以 `webpack`配置文件，我们也将会使用 `ts`来写

安装依赖，属于开发依赖，打包完成之后就不再需要

```shell
pnpm add webpack webpack webpack-cli -D
```

### 5.1 webpack.base.ts

配置 `webpack.base.ts`文件：

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

> PS：[path.resolve 与 path.join 的区别](https://juejin.cn/post/6844903861920989198)

将会出现以下问题： ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/144a1c6f8e7d47e4a7392406537b7be3~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?) 需要我们安装 `@types/node` 这个依赖：

```shell
shell
复制代码pnpm add @types/node -D
```

错误消失~ 错误虽然消失了，但是这个库是干嘛用的呢？看官方 `npm`包的介绍： ![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8f1433102d92480a8b3c8bf59f588136~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

> 这是由于typescript自身的机制，需要一份 `xx.d.ts`声明文件，来说明模块对外公开的方法和属性的类型以及内容。对于内建模块，安装一个 `@types/node`模块可以整体解决模块的声明文件问题。

让我们回到 `TypeScript`的基本理念。`TypeScript`希望所有全局使用的代码都是类型化的，当你的项目有一个合理的配置时，它对你自己的代码也是如此。`TypeScript`库本身只包含 `TypeScript`包的代码类型。你可以为一个库编写自己的类型，但这几乎是不需要的 —— 因为 `TypeScript`社区已经为我们做了这个工作。

与 `npm`一样，`TypeScript`世界也在庆祝开源代码。社区很活跃，不断对常用的 `npm`包的更新和变化做出反应。你几乎总能找到npm包的类型，所以你不必单独为你的成千上万的依赖创建类型。

通常，现有软件包的类型可以从 `npm`内部的 `@types`组织中找到，你可以通过安装一个带有 `@types/`前缀的软件包名称的 `npm`包将相关类型添加到你的项目中。比如说 `npm install --save-dev @types/react @types/express @types/lodash @types/jest @types/mongoose`等等，等等。 `@types/*` 由[Definitely typed](https://link.juejin.cn?target=http%3A%2F%2Fdefinitelytyped.org%2F)维护，这是一个社区项目，目的是在一个地方维护所有的类型。

有时，一个 `npm`包也可以在代码中包含它的类型，在这种情况下，安装相应的 `@types/*` 就没有必要。

> - 由于类型只在编译前使用，所以在生产构建中不需要类型，它们应该放在 `package.json`的 `devDependencies`中。
> - 比如后面我们会用到的全局变量：`process`，是由Node本身定义的，我们从包 `@types/node`中获得其类型。
> - 从 `10.0`版本开始，`ts-node`已经将 `@types/node`定义为一个[对等依赖](https://link.juejin.cn?target=https%3A%2F%2Fdocs.npmjs.com%2Fcli%2Fv8%2Fconfiguring-npm%2Fpackage-json%23peerdependencies)。如果你使用的是npm，npm的版本至少是7.0，那么一个项目的对等依赖就会自动被npm安装。如果你有一个更老的npm，同行依赖必须明确安装。
>
> 关于TypeScript的类型声明，可以阅读这位同学写的入门指南：[TypeScript类型声明完全指南](https://link.juejin.cn?target=https%3A%2F%2Fwww.pengfeixc.com%2Fblogs%2Fjavascript%2Ftypescript-declarations)

另外因为我们在 `App.tsx`中引入了 `css`文件，所以还需要安装相关的 `loader`：

```shell
shell
复制代码pnpm add style-loader css-loader -D
```

作者：_你当像鸟飞往你的山
链接：https://juejin.cn/post/7203169721839042615
来源：稀土掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

因为 `webpack.base.ts`文件承载了基本得配置，随着 `webpack`做的事情越来越多，会逐渐变得很庞大，我们可以将其中得 `bael-loader`相关的配置抽离出来进行管理。在根目录新建 `babel.config.js`

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

然后再 `webpack.base.ts`文件中，就可以将 `babel-loader`配置简化成：

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

typescript自身的机制，需要一份 `xx.d.ts`声明文件，来说明模块对外公开的方法和属性的类型以及内容。对于内建模块，安装一个 `@types/node`模块可以整体解决模块的声明文件问题。

### 5.2 webpack.dev.ts

接下来，我们需要通过 `webpack-dev-server`来启动我们的项目，所以需要安装相关的依赖：

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

然后在 `package.json`中添加启动脚本

```json
"scripts": {
    "dev": "webpack serve -c build/webpack.dev.ts"
},
```

正当我们准备启动项目的时候，发现还有一个错误：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/471b68584ac04d34bc8a1e63b65a894c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

在 `tsconfig.json`中加入一行 `"jsx": "react-jsx"`

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

回到 `App.tsx`，可以发现 `React`的 `import`变灰了：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e682ec872ae4aa3b060a6342c1ad509~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

> 从 `React v17`开始，我们就不需要再显式 `import React from 'react'`了。

运行 `npm run dev`脚本启动项目，就可以看到页面跑出来了！

### 5.3 webpack.prod.ts

配置 `weboack.prod.ts`:

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

在 `package.json`中添加：

```json
"scripts": {
    // ...
    "build": "webpack -c build/webpack.prod.ts"
},
```

### 5.4 copy静态资源

一般 `public`文件夹都会放一些静态资源，可以直接根据绝对路径引入，比如图片、`css`、`js`文件等，不需要 `webpack`进行解析，只需要打包的时候把 `public`下内容复制到构建出口文件夹中，可以借助[copy-webpack-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fcopy-webpack-plugin)插件，安装依赖：

```shell
pnpm add copy-webpack-plugin -D
```

修改 `webpack.base.ts`:

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

> 区分开发模式还是打包构建模式可以用 `process.env.NODE_ENV`，因为很多第三方包里面判断都是采用的这个环境变量。

> 区分项目接口环境可以自定义一个环境变量 `process.env.BASE_ENV`，设置环境变量可以借助[cross-env](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fcross-env) 和 [webpack.DefinePlugin](https://link.juejin.cn/?target=https%3A%2F%2Fwww.webpackjs.com%2Fplugins%2Fdefine-plugin%2F) 来设置。

- `cross-env`：运行跨平台设置和使用环境变量的脚本，兼容各系统的设置环境变量的包
- `webpack.DefinePlugin`：`webpack`内置的插件，可以为业务代码注入环境变量

`cross-env`解决的问题：当您使用 `NODE_ENV=production`，来设置环境变量时，大多数 `windows`命令提示会阻塞（报错），（异常是 `Windows`上的 `Bash`，它使用本机 `Bash`。）同样，`Windows`和 `POSIX`命令如何使用环境变量也有区别。 使用 `POSIX`，您可以使用：`$ ENV_VAR`和使用 `％ENV_VAR％`的 `Windows`。

安装 `cross-env`：

```shell
pnpm add cross-env -D
```

修改 `package.json`中的 `script`:

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

> `process.env.NODE_ENV`环境变量 `webpack`会自动根据设置的 `mode`字段来给业务代码注入对应的 `development`和 `prodction`，这里在命令中再次设置环境变量 `NODE_ENV`是为了在 `webpack`和 `babel`的配置文件中访问到。

当前是打包模式，业务环境是开发环境，这里需要把 `process.env.BASE_ENV`注入到业务代码里面，就可以通过该环境变量设置对应环境的接口地址和其他数据，要借助 `webpack.DefinePlugin`插件。

修改 `webpack.base.ts`

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

然后在 `webpck.base.ts`中引入，然后解析对应环境配置，最后通过 `DefinePlugin`进行注入：

```typescript
new DefinePlugin({
    // 将process.env注入到业务代码中，可以借助 dotenv-webpack 插件自动处理，不需要手动处理
    'process.env': JSON.stringify(envConfig.parsed),
    'process.env.BASE_ENV': JSON.stringify(process.env.BASE_ENV),
}),
```

## 7文件别名

先在 `webpack.base.ts`中配置：

```typescript
// 配置文件别名
alias: {
    src: path.join(__dirname, '../src'),
        modules: [path.resolve(__dirname, '../node_modules')], // 查找第三方模块只在本项目的node_modules中查找
},
```

然后还需要再 `tsconfig.json`中配置：在 `tsconfig.json`中配置映射路径，那么typescript-eslint检查就不会报错了

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

我们发现，每次运行 `pnpm start`命令都会在当前浏览器打开新的 `Tab`，虽然也不影响项目开发，但是很影响开发体验，可以参考 `Create-React-App`的处理方式：

> 参考：[create-react-app](https://link.juejin.cn/?target=https%3A%2F%2Flink.zhihu.com%2F%3Ftarget%3Dhttps%3A%2F%2Fgithub.com%2Ffacebook%2Fcreate-react-app%2Ftree%2Fmain%2Fpackages%2Freact-dev-utils) 的启动方式

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9efc08268a86464dbfeabceaf5bb02d5~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

复制出这两个文件源码，将其放置在 `build`下的 `util`中：

```txt
├── build
	├── util
   		├── openBrowser.js
   		├── openChrome.applescript

```

修改 `webpack.dev.ts`:

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

`less`、`sass（scss）`、`stylus`是三个比较流行的 `CSS Modules` 预处理库。在 `React` 中，使用 `CSS Modules` 的好处在于：

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

在 `webpack.base.ts`添加相关的 `loader`：

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
> 2. 如下的配置（`localIdentName: '[local]__[hash:base64:5]'`）：生成的css类名类似 `class="edit__275ih"`这种，既能达到 `scoped`的效果，又保留原来的 `css`类名(`edit`)。
>
>    推荐阅读：[【Webpack进阶】less-loader、css-loader、style-loader实现原理](https://juejin.cn/post/6944668149849522213)

然后就可以在业务中使用了

重启项目，就会发现生成了带有 `hash`值的 `class`类名，且里面包含了我们自定义的类名，方便日后调试用：

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

虽然 `css3`现在浏览器支持率已经很高了, 但有时候需要兼容一些低版本浏览器，需要给 `css3`加前缀,可以借助插件来自动加前缀，[postcss-loader](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.docschina.org%2Floaders%2Fpostcss-loader%2F) 就是来给 `css3`加浏览器前缀的，安装依赖：

```shell
pnpm add postcss-loader autoprefixer -D
```

为了避免 `webpack.base.ts`文件过于庞大，我们将一些 `loader`配置提取成单独的文件来进行管理，根目录新建 `postcss.config.js`，作为 `postcss-loader`的配置文件，会自动读取配置：

```js
module.exports = {
    ident: "postcss",
    plugins: [require("autoprefixer")],
};
```

修改 `webpack.base.ts`，在解析 `css`和 `less`的规则中添加配置：

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

配置完成后，需要有一份要兼容浏览器的清单，让 `postcss-loader`知道要加哪些浏览器的前缀，在根目录创建 `.browserslistrc`文件：

```txt
IE 9 # 兼容IE 9
chrome 35 # 兼容chrome 35
```

以兼容到 `ie9`和 `chrome35`版本为例，配置好后，在 `app.module.less`中加入一些CSS3的语法，重新启动项目，就可以在浏览器的控制台-Elements 中看到配置成功了。

执行 `pnpm run build:dev`打包，也可以看到打包后的 `css`文件已经加上了 `ie`和谷歌内核的前缀。

## 10 处理其他常用资源

### 10.1处理图片

对于图片文件，`webpack4`使用 `file-loader`和 `url-loader`来处理的，但 `webpack5`不使用这两个 `loader`了，而是采用自带的 [asset-module](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fguides%2Fasset-modules%2F%23root) 来处理，修改 `webpack.base.ts`，添加图片解析配置

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

| 资源模块类型       | 描述                                                                                                                                                                                                    |
| ------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `asset/resource` | 发送一个单独的文件，并导出 `URL`，替代 `file-loader`，相当于 `file-loader`, 将文件转化成 `Webpack`能识别的资源，其他不做处理。                                                                  |
| `asset/inline`   | 导出一个资源的 `data URI`，以前使用 `url-loader` 实现。                                                                                                                                             |
| `asset/source`   | 导出资源的源代码 ，以前是使用 `raw-loader` 实现。                                                                                                                                                     |
| `asset`          | 相当于自动选择 `asset/resource` 或 `asset/inline`，替换 `url-loader` 中的 `limit`，相当于 `url-loader`将文件转化成 `Webpack`能识别的资源，同时小于某个大小的资源会处理成 `data URI`形式。 |

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

字体文件和媒体文件这两种资源处理方式和处理图片是一样的，只需要把匹配的路径和打包后放置的路径修改一下就可以了。修改 `webpack.base.ts`文件：

```typescript
module: {
    rules: [
        // ...
        {
            test:/.(woff2?|eot|ttf|otf)$/, // 匹配字体图标文件
            type: "asset", // type选择asset
            parser: {
                dataUrlCondition: {
                    maxSize: 10 * 1024, // 小于10kb转base64
                }
            },
            generator:{ 
                filename:'static/fonts/[hash][ext][query]', // 文件输出目录和命名
            },
        },
        {
            test:/.(mp4|webm|ogg|mp3|wav|flac|aac)$/, // 匹配媒体文件
            type: "asset", // type选择asset
            parser: {
                dataUrlCondition: {
                    maxSize: 10 * 1024, // 小于10kb转base64
                }
            },
            generator:{ 
                filename:'static/media/[hash][ext][query]', // 文件输出目录和命名
            },
        },
    ]
}

```

**注意：处理iconfont等静态文件时，在devServer上要做如下配置**

```typescript
// 开发环境静态文件托管，也可以在webpack.base.ts借助CopyPlugin插件进行管理
static:{
    directory: path.join(__dirname, '../'), // 整个项目作为静态文件根目录
},
```

### 10.3处理json

```json
// ...
{
    // 匹配json文件
    test: /\.json$/,
    type: "asset/source", // 将json文件视为文件类型,并且输出
    generator: {
        // 这里专门针对json文件的处理
        filename: "static/json/[name].[hash][ext][query]",
    },
},
// ...

```

> 在Webpack中，`asset/source`和 `asset/resource`是两种资源处理模式，用于处理项目中的静态资源（例如图像、字体、视频等）。它们是Webpack 5中新引入的资源处理方式。
>
> 在Webpack中，`asset/source`和 `asset/resource`是两种资源处理模式，用于处理项目中的静态资源（例如图像、字体、视频等）。它们是Webpack 5中新引入的资源处理方式。
>
> 1. `asset/source`: 这个模式会将资源处理为一个JavaScript模块，返回资源内容的字符串。通常适用于处理文本文件，如SVG图像、文本文件等。处理后的资源可以直接在JavaScript中导入并使用
> 2. `asset/resource`: 这个模式会将资源原封不动地复制到输出目录，并返回资源的URL路径。通常适用于处理二进制文件，如图像、字体、视频等。处理后的资源可以通过URL路径进行访问。
> 3. `asset/inline`: 这个模式将资源转换为Data URL，并直接嵌入到生成的文件中。适用于较小的资源文件，这样可以减少HTTP请求，但会增加文件的大小。适用于一些小图标或其他小文件
> 4. `asset`: 这是一个自动选择模式，Webpack会根据资源的大小自动选择是使用 `asset/resource`还是 `asset/inline`，对于较小的资源，它会使用 `asset/inline`，对于较大的资源，它会使用 `asset/resource`。这是Webpack 5中默认的资源处理模式，适用于大多数的资源文件。

> 总结：
>
> - `asset/source`用于将资源处理为JavaScript模块，适用于处理文本文件。
> - `asset/resource`用于将资源原封不动地复制到输出目录，适用于处理二进制文件。
> - `asset/inline`用于将资源转换为Data URL并嵌入到文件中，适用于较小的资源文件。
> - `asset`是自动选择模式，根据资源大小选择 `asset/resource`或 `asset/inline`，是Webpack 5中的默认资源处理模式。

## 11、babel处理js非标准语法

现在 `react`主流开发都是函数组件和 `react-hooks`，但有时也会用类组件，可以用装饰器简化代码。

新增 `Class.tsx`组件，在 `App.tsx`中引入改组件使用

```tsx
import { PureComponent, ReactNode } from "react"

/**
 * @description 装饰器，为组件添加age属性
 * @param Target 
 */
function AddAge(Target: Function) {
    Target.prototype.age = 111
}

// 使用装饰器
@AddAge
export default class Class extends PureComponent<any, any> {
    constructor(props:any){
        super(props)
        this.state = {
            name:'jeff'
        }
    }

    age?: number

    render(): ReactNode {
        return(
            <>
            <h2>我是类组件</h2>
            <h2>我是{this.state.name}</h2>
            <h2>我已经{this.age}</h2>
            </>
        )
    }
}
```

需要开启一下 `ts`装饰器支持

```json
{
    "compilerOptions":{
        // ...
        "experimentalDecorators": true, // 开启装饰器
        // ...
    }

}
```

上面Class组件代码中使用了装饰器目前 `js`标准语法是不支持的，现在运行或者打包会报错，不识别装饰器语法，需要借助 `babel-loader`插件，安装依赖：

```shell
pnpm add @babel/plugin-proposal-decorators -D
```

在 `babel.config.js` 中添加插件：

```typescript
// 装饰器配置
  plugins:[["@babel/plugin-proposal-decorators", { legacy: true }],].filter(Boolean) // 过滤空值
```

## 12、热更新


在之前的章节我们已经在 `devServer`中配置 `hot`为 `true`，在 `webpack4`中，还需要在插件中添加了 `HotModuleReplacementPlugin`，在 `webpack5`中，只要 `devServer.hot`为 `true`了，该插件就已经内置了。

现在开发模式下修改 `css`和 `less`文件，页面样式可以在不刷新浏览器的情况实时生效，因为此时样式都在 `style`标签里面，`style-loader`做了替换样式的热替换功能。但是修改 `App.tsx`，浏览器会自动刷新后再显示修改后的内容，但我们想要的不是刷新浏览器，而是在不需要刷新浏览器的前提下模块热更新，并且能够保留 `react`组件的状态。

在之前的章节我们已经在 `devServer`中配置 `hot`为 `true`，在 `webpack4`中，还需要在插件中添加了 `HotModuleReplacementPlugin`，在 `webpack5`中，只要 `devServer.hot`为 `true`了，该插件就已经内置了。

现在开发模式下修改 `css`和 `less`文件，页面样式可以在不刷新浏览器的情况实时生效，因为此时样式都在 `style`标签里面，`style-loader`做了替换样式的热替换功能。但是修改 `App.tsx`，浏览器会自动刷新后再显示修改后的内容，但我们想要的不是刷新浏览器，而是在不需要刷新浏览器的前提下模块热更新，并且能够保留 `react`组件的状态。

可以借助 [@pmmmwh/react-refresh-webpack-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40pmmmwh%2Freact-refresh-webpack-plugin "https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2F%40pmmmwh%2Freact-refresh-webpack-plugin") 插件来实现，该插件又依赖于[react-refresh](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Freact-refresh "https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Freact-refresh"), 安装依赖：

```powershell
pnpm add @pmmmwh/react-refresh-webpack-plugin react-refresh -D
```

配置 `react`热更新插件，修改 `webpack.dev.ts`：

```typescript
import path from "path";
import { Configuration as WebpackConfiguration } from "webpack";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";
import { merge } from "webpack-merge";
import baseConfig from "./webpack.base";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";

interface Configuration extends WebpackConfiguration {
    devServer?: WebpackDevServerConfiguration;
}

const host = "127.0.0.1";
const port = "8082";

// 合并公共配置,并添加开发环境配置
const devConfig: Configuration = merge(baseConfig, {
    mode: "development", // 开发模式,打包更加快速,省了代码优化步骤
    devtool: "eval-cheap-module-source-map",
    plugins: [
        new ReactRefreshWebpackPlugin(), // 添加热更新插件
    ],
    devServer: {
        host, // 地址
        port, // 端口
        open: true, // 是否自动打开，关闭
        compress: false, // gzip压缩,开发环境不开启,提升热更新速度
        hot: true, // 开启热更新，后面会讲react模块热替换具体配置
        historyApiFallback: true, // 解决history路由404问题
        setupExitSignals: true, // 允许在 SIGINT 和 SIGTERM 信号时关闭开发服务器和退出进程。
        // static: {
        //   directory: path.join(__dirname, "../static"), // 托管静态资源，注意：此处不能让整个根目录作为静态文件的根目录，不然会热更新不生效
        // },
        headers: { "Access-Control-Allow-Origin": "*" },
    }
});
export default devConfig;
```

为 `babel-loader`配置 `react-refesh`刷新插件，修改 `babel.config.js`文件

```typescript
const isDEV = process.env.NODE_ENV === "development"; // 是否是开发模式

module.exports = {
  // 执行顺序由右往左,所以先处理ts,再处理jsx,最后再试一下babel转换为低版本语法
  presets: [
    [
      "@babel/preset-env",
      {
        // 设置兼容目标浏览器版本,这里可以不写,babel-loader会自动寻找上面配置好的文件.browserslistrc
        // "targets": {
        //  "chrome": 35,
        //  "ie": 9
        // },
        targets: { browsers: ["> 1%", "last 2 versions", "not ie <= 8"] },
        useBuiltIns: "usage", // 根据配置的浏览器兼容,以及代码中使用到的api进行引入polyfill按需添加
        corejs: 3, // 配置使用core-js使用的版本
        loose: true,
      },
    ],
    // 如果您使用的是 Babel 和 React 17，您可能需要将 "runtime": "automatic" 添加到配置中。
    // 否则可能会出现错误：Uncaught ReferenceError: React is not defined
    ["@babel/preset-react", { runtime: "automatic" }],
    "@babel/preset-typescript",
  ],
  plugins: [
    ["@babel/plugin-proposal-decorators", { legacy: true }],
    isDEV && require.resolve("react-refresh/babel"), // 如果是开发模式,就启动react热更新插件
  ].filter(Boolean), // 过滤空值
};

```
## 13、webpack构建速度优化

### 13.1webpack进度条

`webpack`这是一款个人十分美观优雅的进度条，很多成名框架都用过他。而且使用起来也极其方便，也可以支持多个并发构建是个十分强大的进度插件。

```shell
pnpm add webpackbar -D
```

```typescript
// ...
import WebpackBar from 'webpackbar';

// ...

const baseConfig: Configuration = {
    // ...

    // plugins 的配置
    plugins: [
        // ...
        new WebpackBar({
            color: "#85d",  // 默认green，进度条颜色支持HEX
            basic: false,   // 默认true，启用一个简单的日志报告器
            profile:false,  // 默认false，启用探查器。
        })
    ],
};

export default baseConfig;

```

当然里面还有一个属性就是 `reporters` 还没有写上，可以在里面注册事件，也可以理解为各种钩子函数。如下：

```typescript
{   // 注册一个自定义记者数组
    start(context) {
      // 在（重新）编译开始时调用
      const { start, progress, message, details, request, hasErrors } = context
    },
    change(context) {
      // 在 watch 模式下文件更改时调用
    },
    update(context) {
      // 在每次进度更新后调用
    },
    done(context) {
      // 编译完成时调用
    },
    progress(context) {
      // 构建进度更新时调用
    },
    allDone(context) {
      // 当编译完成时调用
    },
    beforeAllDone(context) {
      // 当编译完成前调用
    },
    afterAllDone(context) {
      // 当编译完成后调用
    },
}

```

> 其他的工具可看：[聊聊webpack的打包进度展示及美化](https://juejin.cn/post/7055321034454466596)

### 13.1构建耗时

当进行优化的时候，肯定要先知道时间都花费在哪些步骤上了，而 [speed-measure-webpack-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fspeed-measure-webpack-plugin) 插件可以帮我们做到，安装依赖：

```shell
pnpm add speed-measure-webpack-plugin -D
```

使用的时候为了不影响到正常的开发/打包模式，我们选择新建一个配置文件，新增`webpack`构建分析配置文件`build/webpack.analy.ts`

```typescript
const prodConfig = require('./webpack.prod.js') // 引入打包配置
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin'); // 引入webpack打包速度分析插件
const smp = new SpeedMeasurePlugin(); // 实例化分析插件
const { merge } = require('webpack-merge') // 引入合并webpack配置方法

// 使用smp.wrap方法,把生产环境配置传进去,由于后面可能会加分析配置,所以先留出合并空位
module.exports = smp.wrap(merge(prodConfig, {

}))

```

修改`package.json`添加启动`webpack`打包分析脚本命令，在`script`新增：

```json
{
    // ...
    "scripts": {
        // ...
        "build:analy": "cross-env NODE_ENV=production BASE_ENV=production webpack -c build/webpack.analy.ts"
    }
    // ...
}

```

执行`npm run build:analy`命令

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e4a14a7402ba4e2ca3e7a139a371045c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

可以在图中看到各`plugin`和`loader`的耗时时间,现在因为项目内容比较少，所以耗时都比较少，在真正的项目中可以通过这个来分析打包时间花费在什么地方，然后来针对性的优化。

### 13.2 开启持久化存储缓存

在`webpack5`之前做缓存是使用`babel-loader`缓存解决 js 的解析结果，`cache-loader`缓存`css`等资源的解析结果，还有模块缓存插件`hard-source-webpack-plugin`，配置好缓存后第二次打包，通过对文件做哈希对比来验证文件前后是否一致，如果一致则采用上一次的缓存，可以极大地节省时间。

`webpack5` 较于 `webpack4`，新增了持久化缓存、改进缓存算法等优化，通过配置 [webpack 持久化缓存](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.docschina.org%2Fconfiguration%2Fcache%2F%23root)，来缓存生成的 `webpack` 模块和 `chunk`，改善下一次打包的构建速度,可提速 `90%` 左右,配置也简单，修改`webpack.base.ts`：

```ts
ts复制代码// webpack.base.ts
// ...
module.exports = {
  // ...
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
}
```

当前代码的测试结果：

| 模式     | 第一次耗时 | 第二次耗时 |
| -------- | ---------- | ---------- |
| 开发模式 | 4151毫秒   | 1310毫秒   |
| 打包模式 | 4945毫秒   | 590毫秒    |



通过开启`webpack5`持久化存储缓存，极大缩短了启动和打包的时间。缓存的存储位置在`node_modules/.cache/webpack`，里面又区分了`development`和`production`缓存。

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd880d8b1f5b46ffa9d012209f92c6af~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

### 13.3 开启多线程loader

运行在 `Node.js` 之上的 `webpack` 是单线程模式的，也就是说，`webpack` 打包只能逐个文件处理，当 `webpack` 需要打包大量文件时，打包时间就会比较漫长。

多进程/多实例构建的方案比较知名的有以下三种：

- `thread-loader`
- `parallel-webpack`
- `HappyPack`

`webpack`的`loader`默认在单线程执行，现代电脑一般都有多核`cpu`，可以借助多核`cpu`开启多线程`loader`解析，可以极大地提升loader解析的速度，[thread-loader](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.docschina.org%2Floaders%2Fthread-loader%2F%23root)就是用来开启多进程解析`loader`的，安装依赖

```arduino
arduino
复制代码pnpm add thread-loader -D
```

使用时,需将此 `loader` 放置在其他 `loader` 之前。放置在此 `loader` 之后的 `loader` 会在一个独立的 `worker` 池中运行。

修改`webpack.base.ts`

```typescript
module: {
  rules: [
    {
      test: tsxRegex, // 匹配.ts, tsx文件
      use: ['thread-loader', 'babel-loader']
    }
  ]
}
```

由于`thread-loader`不支持抽离`css`插件`MiniCssExtractPlugin.loader`(下面会讲)，所以这里只配置了多进程解析 `ts`。

> 值得注意的是，开启多线程也是需要启动时间，`thread-loader` 会将你的 `loader` 放置在一个 `worker` 池里面运行，每个 `worker` 都是一个单独的有 `600ms` 限制的 node.js 进程。同时跨进程的数据交换也会被限制，所以最好是项目变大到一定程度之时再采用，否则效果反而不好。

### 13.4 缩小构建目标

一般第三库都是已经处理好的,不需要再次使用`loader`去解析，可以按照实际情况合理配置`loader`的作用范围，来减少不必要的`loader`解析，节省时间，通过使用 `include`和`exclude` 两个配置项，可以实现这个功能，常见的例如：

- `include`：只解析该选项配置的模块
- `exclude`：不解该选项配置的模块,优先级更高

修改`webpack.base.ts`

```ts
ts复制代码module: {
  rules: [
    {
      test: tsxRegex, // 匹配.ts, tsx文件
      exclude: /node_modules/,
      use: ['thread-loader', 'babel-loader']
    }
  ]
}
```

其他`loader`也是相同的配置方式，如果除`src`文件外也还有需要解析的，就把对应的目录地址加上就可以了，比如需要引入`antd`的`css`，可以把`antd`的文件目录路径添加解析`css`规则到`include`里面。

### 13.5 devtools配置

开发过程中或者打包后的代码都是`webpack`处理后的代码，如果进行调试肯定希望看到源代码，而不是编译后的代码，`source map`就是用来做源码映射的，不同的映射模式会明显影响到构建和重新构建的速度，`devtool`选项就是`webpack`提供的选择源码映射方式的配置。

`devtool`的命名规则为：

```shell
^(inline-|hidden-|eval-)?(nosources-)?(cheap-(module-)?)?source-map$
```

| 关键字      | 描述                                                         |
| ----------- | ------------------------------------------------------------ |
| `inline`    | 代码内通过 `dataUrl` 形式引入 `SourceMap`                    |
| `hidden`    | 生成 `SourceMap` 文件,但不使用                               |
| `eval`      | `eval(...)` 形式执行代码,通过 `dataUrl` 形式引入 `SourceMap` |
| `nosources` | 不生成 `SourceMap`                                           |
| `cheap`     | 只需要定位到行信息,不需要列信息                              |
| `module`    | 展示源代码中的错误位置                                       |



开发环境推荐：`eval-cheap-module-source-map`

- 本地开发首次打包慢点没关系，因为 `eval` 缓存的原因，热更新会很快
- 开发中，我们每行代码不会写的太长，只需要定位到行就行，所以加上 `cheap`
- 我们希望能够找到源代码的错误，而不是打包后的，所以需要加上 `module`

修改`webpack.dev.ts`

```ts
// webpack.dev.ts
module.exports = {
  // ...
  devtool: 'eval-cheap-module-source-map'
}
```

打包环境推荐：none(就是不配置devtool选项了，不是配置devtool: 'none')

```ts
// webpack.prod.ts
module.exports = {
    // ...
    // devtool: '', // 不用配置devtool此项
}
```

> `none`配置在调试的时候，只能看到编译后的代码，也不会泄露源代码，打包速度也会比较快。只是不方便线上排查问题，但一般都可以根据报错信息在本地环境很快找出问题所在。

## 14 webpack构建产物优化

### 14.1bundle体积分析工具

`webpack-bundle-analyzer`是分析`webpack`打包后文件的插件，使用交互式可缩放树形图可视化`webpack` 输出文件的大小。通过该插件可以对打包后的文件进行观察和分析，可以方便我们对不完美的地方针对性的优化，安装依赖：

```shell
pnpm add webpack-bundle-analyzer -D
```

修改 `webpack.analy.ts`：

```typescript
import prodConfig from './webpack.prod' // 引入打包配置 import才会自动打开页面
// const prodConfig = require('./webpack.prod'); // 引入打包配置
const SpeedMeasurePlugin = require('speed-measure-webpack-plugin'); // 引入webpack打包速度分析插件
const smp = new SpeedMeasurePlugin(); // 实例化分析插件
const { merge } = require('webpack-merge') // 引入合并webpack配置方法

const { BundleAnalyzerPlugin } = require("webpack-bundle-analyzer");

// 使用smp.wrap方法,把生产环境配置传进去,由于后面可能会加分析配置,所以先留出合并空位
module.exports = smp.wrap(merge(prodConfig, {
    plugins:[
        new BundleAnalyzerPlugin()// 配置分析打包
    ]
}))

```

配置好后，执行 `pnpm run build:analy` 命令，打包完成后浏览器会自动打开窗口，可以看到打包文件的分析结果页面，可以看到各个文件所占的资源大小：

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d0b67d7ec1c1456c9460ca97f547fd54~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

### 14.2 样式提取

在开发环境我们希望`css`嵌入在`style`标签里面，方便样式热替换，但打包时我们希望把`css`单独抽离出来,方便配置缓存策略。而插件[mini-css-extract-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fwebpack-contrib%2Fmini-css-extract-plugin)就是来帮我们做这件事的，安装依赖：

```shell
pnpm add mini-css-extract-plugin -D
```

修改 `webpack.base.ts`，根据环境变量设置开发环境使用 `style-looader`，打包模式抽离`css`

```typescript
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const isDev = process.env.NODE_ENV === 'development' // 是否是开发模式

// 模块化样式编译
const moduleStyleLoadersArray = [
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
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
    isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
    'css-loader',
    // 添加 postcss-loader 需要兼容一些低版本浏览器，需要给css3加前缀,可以借助插件来自动加前缀
    // 'postcss-loader',
]
```

再修改`webpack.prod.ts`，打包时添加抽离`css`插件：

```typescript
import { Configuration } from 'webpack' // 引入webpack的类型接口
import { merge } from 'webpack-merge'
import baseConfig from './webpack.base' // 引入基本配置
// const baseConfig = require('./webpack.base') // 引入基本配置
import MiniCssExtractPlugin from 'mini-css-extract-plugin'

const prodConfig: Configuration = merge(baseConfig, {
    mode:'production', // 生产模式，会开启tree-shaking和压缩代码，以及其他优化
    /* 
  打包环境推荐：none（不配置devTool选项了，不是配置devTool:"none"）
  在package.json的scripts中添加  "build": "webpack -c build/webpack.prod.ts"
  */
    plugins:[
        new MiniCssExtractPlugin({
            filename:'css/[name].css'
        })
    ]
})

export default prodConfig
```

配置完成后，在开发模式`css`会嵌入到`style`标签里面，方便样式热替换，打包时会把`css`抽离成单独的`css`文件。

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/92dabe1db7ea482ba14f54785c9299e0~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

### 14.3 样式压缩

可以看到，上面配置了打包时把`css`抽离为单独`css`文件的配置，打开打包后的文件查看，可以看到默认`css`是没有压缩的，需要手动配置一下压缩`css`的插件。

可以借助 [css-minimizer-webpack-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fcss-minimizer-webpack-plugin) 来压缩css，安装依赖：

```shell
复制代码pnpm add css-minimizer-webpack-plugin -D
```

修改 `webpack.prod.ts` 文件， 需要在优化项 [optimization](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Foptimization%2F) 下的 [minimizer](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Foptimization%2F%23optimizationminimizer) 属性中配置：

```ts
// ...
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin'

module.exports = {
  // ...
  optimization: {
    minimizer: [
      new CssMinimizerPlugin(), // 压缩css
    ],
  },
}
```

再次执行打包就可以看到`css`已经被压缩了：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7b24ef715b9e421b90fddaeacdacb7b1~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

### 14.4 js压缩

| 依赖                         | 说明                                                       |
| ---------------------------- | ---------------------------------------------------------- |
| terser-webpack-plugin        | 用于处理 js 的压缩和混淆                                   |
| css-minimizer-webpack-plugin | 压缩css文件                                                |
| compression-webpack-plugin   | 预先准备的资源压缩版本，使用 Content-Encoding 提供访问服务 |



设置mode为production时,webpack会使用内置插件[terser-webpack-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fterser-webpack-plugin)压缩js文件,该插件默认支持多线程压缩,但是上面配置`optimization.minimizer`压缩css后,js压缩就失效了,需要手动再添加一下,`webpack`内部安装了该插件,由于`pnpm`解决了幽灵依赖问题,如果用的`pnpm`的话,需要手动再安装一下依赖。

```shell
pnpm i terser-webpack-plugin compression-webpack-plugin -D
```

修改 `webpack.prod.ts` 文件：

```ts
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
            filename: 'css/[name].css'
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
```

配置完成后再打包，css和js就都可以被压缩了：

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c649350842284fbd8813e20e2bf38b3e~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

### 14.5 文件指纹

项目维护的时候，一般只会修改一部分代码，可以合理配置文件缓存，来提升前端加载页面速度和减少服务器压力，而 `hash` 就是浏览器缓存策略很重要的一部分。`webpack` 打包的 `hash` 分三种：

- `hash`：跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的 `hash` 值都会更改，并且全部文件都共用相同的 `hash` 值
- `chunkhash`：不同的入口文件进行依赖文件解析、构建对应的`chunk`，生成对应的哈希值，文件本身修改或者依赖文件修改，`chunkhash` 值会变化
- `contenthash`：每个文件自己单独的 `hash` 值，文件的改动只会影响自身的 `hash` 值

`hash` 是在输出文件时配置的，格式是 `filename: "[name].[chunkhash:8][ext]"`，`[xx]` 格式是 `webpack` 提供的占位符，`:8` 是生成 `hash` 的长度。

| 占位符        | 解释                         |
| ------------- | ---------------------------- |
| `ext`         | 文件后缀名                   |
| `name`        | 文件名                       |
| `path`        | 文件相对路径                 |
| `folder`      | 文件所在文件夹               |
| `hash`        | 每次构建生成的唯一 `hash` 值 |
| `chunkhash`   | 根据 `chunk` 生成 `hash` 值  |
| `contenthash` | 根据文件内容生成 `hash` 值   |



因为 `js` 我们在生产环境里会把一些公共库和程序入口文件区分开，单独打包构建，采用 `chunkhash` 的方式生成哈希值，那么只要我们不改动公共库的代码，就可以保证其哈希值不会受影响，可以继续使用浏览器缓存，所以js适合使用 `chunkhash`。

`css` 和图片资源媒体资源一般都是单独存在的，可以采用 `contenthash`，只有文件本身变化后会生成新hash值。

修改 `webpack.base.ts`，把js输出的文件名称格式加上 `chunkhash`，把 `css` 和图片媒体资源输出格式加上 `contenthash`：

```typescript
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
```

再修改 `webpack.prod.ts`，修改抽离 `css` 文件名称格式：

```typescript
// 抽离css文件 在开发环境中，css是嵌在style中的 plugins
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:8].css'
    }),
```

### 14.6 代码分割

一般第三方包的代码变化频率比较小，可以单独把 `node_modules` 中的代码单独打包，当第三包代码没变化时，对应 `chunkhash` 值也不会变化，可以有效利用浏览器缓存，还有公共的模块也可以提取出来，避免重复打包加大代码整体体积，`webpack` 提供了代码分隔功能，需要我们手动在优化项 [optimization](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Foptimization%2F) 中手动配置下代码分割 [splitChunks](https://link.juejin.cn/?target=https%3A%2F%2Fwebpack.js.org%2Fconfiguration%2Foptimization%2F%23optimizationsplitchunks) 规则。

修改 `webpack.prod.ts`：

```typescript
// 分隔代码
    splitChunks:{
      cacheGroups:{
        vendors:{ // 提取node_modules代码o
          test:"/node_modules", // 只匹配node_modules里面的模块
          name: "vendors", // 提取文件名为vendors，js后缀和chunkhash会自动加
          minChunks: 1, // 只要使用了一次就提取出来
          chunks: "initial", // 只提取初始化就能获取到的模块，不管异步的
          minSize: 0, // 代码体积大于0就提取出来
          priority: 1, // 提取优先级
        },
        // 提取页面公共代码
        commons:{
          name:"commons", // 提取文件名
          minChunks: 2, // 只要使用两次就提取出来
          chunks: 'initial', // 只提取初始化就能获取到的模块,不管异步的
          minSize: 0, 
        }
      }
    }
```

### 14.7 tree-shaking清理未引用js

js中会有未使用到的代码，css中也会有未被页面使用到的样式，可以通过 [purgecss-webpack-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fpurgecss-webpack-plugin) 插件打包的时候移除未使用到的css样式，这个插件是和 [mini-css-extract-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fmini-css-extract-plugin) 插件配合使用的,在上面已经安装过，还需要 [glob-all](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fglob-all) 来选择要检测哪些文件里面的类名和id还有标签名称，安装依赖:

```shell
pnpm i purgecss-webpack-plugin glob-all -D
```



修改`webpack.prod.ts`:

```typescript
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
      only: ["dist"],
      safelist: {
        standard: [/^ant-/] // 过滤以ant-开头的类名，哪怕没用到也不删除
      }
    }),
```

### 14.8 tree-shaking清理未使用css

js中会有未安装使用到的代码，css中也会有未被页面使用到的样式，可以通过 [purgecss-webpack-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fpurgecss-webpack-plugin) 插件打包的时候移除未使用到的css样式，这个插件是和 [mini-css-extract-plugin](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fmini-css-extract-plugin) 插件配合使用的，在上面已经安装过，还需要 [glob-all](https://link.juejin.cn/?target=https%3A%2F%2Fwww.npmjs.com%2Fpackage%2Fglob-all) 来选择检测哪些文件里面的类名和id还有标签名称，安装依赖：

```shell
pnpm i purgecss-webpack-plugin glob-all -D
```

修改`webpack.prod.ts`：

```typescript
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
    only: ["dist"],
    safelist: {
        standard: [/^ant-/] // 过滤以ant-开头的类名，哪怕没用到也不删除
    }
}),
```

### 14.9 资源懒加载

像`react`，`vue`等单页面应用打包默认回打包到一个js文件中，虽然使用代码分割可以把`node_modules`模块和公共模块分离，但页面初始加载还是会把整个项目的代码下载下来，其实只需要公共资源和当前页面的资源就可以了，其他页面可以等使用到的时候在加载，可以有效提升首屏加载速度。

`webpack`默认支持资源懒加载，只需要引入资源使用`import`语法来引入资源，`webpack`打包的时候就会自动打包为单独的资源文件，等使用到的时候动态加载。

以懒加载组件和`css`为例，新建懒加载组件`src/component/LazyDemo.tsx`：

```tsx
import React from "react";

function LazyDemo() {
    return <h3>我是懒加载组件组件</h3>
}

export default LazyDemo
```

### 14.10 资源预加载（待验证）

上面配置了资源懒加载之后，虽然提升了首屏渲染速度，但是加载到资源的时候会有一个请求去请求资源的延时，如果资源比较大会出现延迟卡顿现象，可以借助link标签的rel属性prefetch和preload，link标签除了加载cs之外也可以加载js资源，设置rel可以规定link提前加载资源，但是加载资源后不执行，等用到了在执行

rel的属性值

- `preload`是告诉浏览器页面必定需要的资源，浏览器一定会加载这些资源。
- `prefetch`是告诉浏览器页面可能需要的资源，浏览器不一定会加载这些资源，会在空闲时加载。

借助`preload-webpack-plugin`插件

#### 1.基础配置

```javascript
javascript
复制代码const PreloadWebpackPlugin = require('preload-webpack-plugin');
```

必须用在HtmlWebpackPlugin插件之后：

```javascript
javascript复制代码plugins: [
  new HtmlWebpackPlugin(),
  new PreloadWebpackPlugin()
]
```

#### 2.配置项

##### as

当[](https://link.juejin.cn?target=https%3A%2F%2Fdeveloper.mozilla.org%2Fzh-CN%2Fdocs%2FWeb%2FHTML%2FElement%2Flink)元素设置了 `rel="preload"` 或者 `rel="prefetch"` 时,可以使用as属性用来规定加载的内容的类型。

在预加载文件的时候，插件会根据每个文件的类型使用不同的as属性：

- `.css`结尾，`as=style`;
- `.woff2`结尾，`as=font`;
- 其他，`as=script`;

```html
html
复制代码<link href="xx/xx/chunk-xxx.f01555ba.css" rel="preload" as="style">
```

如果不希望as取自文件名的后缀，也可以使用as显示命名：

```javascript
javascript复制代码plugins: [
  new HtmlWebpackPlugin(),
  new PreloadWebpackPlugin({
    rel: 'preload',
    as: 'script'
  })
]
```

也可以使用一个函数来进行更细粒度的控制：

```javascript
javascript复制代码plugins: [
  new HtmlWebpackPlugin(),
  new PreloadWebpackPlugin({
    rel: 'preload',
    as(entry) {
      if (/.css$/.test(entry)) return 'style';
      if (/.woff$/.test(entry)) return 'font';
      if (/.png$/.test(entry)) return 'image';
      return 'script';
    }
  })
]
```

##### include 需要预加载的模块

有以下几个值可以选择：

- `asyncChunks`：异步模块对应生成的chunk文件；
- `allChunks`：所有的chunk文件(vendor, async, and normal chunks)；
- `initial`：entry项对应生成的chunk文件；
- `allAssets`：所有chunk文件 + loaders生成的文件；
- `[文件name]`：如果chunks是显示命名的，可以使用这种方式；

```javascript
javascript复制代码plugins: [
  new HtmlWebpackPlugin(),
  new PreloadWebpackPlugin({
    rel: 'preload',
    include: 'allChunks' // or 'initial', or 'allAssets'
  })
]
javascript复制代码plugins: [
  new HtmlWebpackPlugin(),
  new PreloadWebpackPlugin({
    rel: 'preload',
    include: ['home']
  })
]
```

结果：

```html
html
复制代码<link rel="preload" as="script" href="home.31132ae6680e598f8879.js">
```

##### fileBlacklist黑名单

1.默认值，不会加载任何sourcemaps：

```javascript
javascript复制代码new PreloadWebpackPlugin({
  fileBlacklist: [/\.map/]
})
```

2.其他例子：

```javascript
javascript复制代码new PreloadWebpackPlugin({
  fileBlacklist: [/.map/, /.whatever/]
})
```

##### excludeHtmlNames 需要忽略的html文件

```javascript
javascript复制代码plugins: [
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: 'src/index.html',
    chunks: ['main']
  }),
  new HtmlWebpackPlugin({
    filename: 'example.html',
    template: 'src/example.html',
    chunks: ['exampleEntry']
  }),
  // Only apply the plugin to index.html, not example.html.
  new PreloadWebpackPlugin({
    excludeHtmlNames: ['example.html'],
  })
```

##### prefetch

```javascript
javascript复制代码plugins: [
  new HtmlWebpackPlugin(),
  new PreloadWebpackPlugin({
    rel: 'prefetch'
  })
]
```

### media

```javascript
javascript复制代码plugins: [
  new HtmlWebpackPlugin(),
  new PreloadWebpackPlugin({
    rel: 'preload',
    media: '(min-width: 600px)'
  })
]
```



### 14.11 gzip压缩

见 14.4

## 15 webpack其他优化

优化并不是一蹴而就的，一般是随着项目的发展逐步针对性优化，本系列主要谈论一个项目的基本架子，故只对 `webpack` 做基础的优化。除了上面的配置外，`webpack`还提供了其他的一些优化方式，可以在真正实际开发的时候逐步实践，网上已经有大量的资源来对这个方面多深入的实践，可以参考如下：

- 优化点
  - [DllPlugin](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.docschina.org%2Fplugins%2Fdll-plugin%23root)：动态链接库
  - [sideEffect](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.docschina.org%2Fconfiguration%2Foptimization%2F%23optimizationsideeffects)：副作用
  - [externals](https://link.juejin.cn?target=https%3A%2F%2Fwww.webpackjs.com%2Fconfiguration%2Fexternals%2F): 外包拓展，打包时会忽略配置的依赖，会从上下文中寻找对应变量
  - [module.noParse](https://link.juejin.cn?target=https%3A%2F%2Fwww.webpackjs.com%2Fconfiguration%2Fmodule%2F%23module-noparse): 匹配到设置的模块，将不进行依赖解析，适合`jquery`，`boostrap`这类不依赖外部模块的包
  - [ignorePlugin](https://link.juejin.cn?target=https%3A%2F%2Fwebpack.js.org%2Fplugins%2Fignore-plugin%2F%23root): 可以使用正则忽略一部分文件，常在使用多语言的包时可以把非中文语言包过滤掉

## 16 代码规范

一套完善的开发环境配置可以极大的提升开发效率，提高代码质量，方便多人合作，以及后期的项目迭代和维护。所以说，前端代码格式规范和语法检测的工具可以提高代码的质量和可读性，减少低级错误和维护成本，提高团队的协作效率和开发效率，是非常有必要的。

### 16.1 代码规范格式规范和语法检测工具

1. [**EditorConfig**](https://link.juejin.cn?target=https%3A%2F%2Feditorconfig.org%2F)：`EditorConfig` 是一个用于统一编辑器和 IDE 的配置文件的工具。它可以帮助团队协作中的开发人员保持一致的编码风格，无论他们使用的是哪个编辑器或 IDE。`EditorConfig` 支持配置文件的语法规则、缩进、换行符、字符编码等，可以通过在项目中添加一个 `.editorconfig` 文件来使用。

2. [**ESLint**](https://link.juejin.cn?target=https%3A%2F%2Feslint.org%2F)：`ESLint` 是一个广泛使用的 JavaScript 代码检查工具，它可以帮助开发人员遵循代码风格规范，并发现代码中潜在的问题。`ESLint` 有很多可定制的规则，可以根据团队的代码风格和项目的要求进行配置。ESLint 还支持集成到许多编辑器和 IDE 中，如 Visual Studio Code、Sublime Text、Atom、WebStorm 等，以提供实时的语法和格式错误检查。

3. [**Prettier**](https://link.juejin.cn?target=https%3A%2F%2Fprettier.io%2F)：`Prettier` 是一个代码格式化工具，它可以自动化地将代码格式化为一致的风格。与 `ESLint` 不同的是，`Prettier` 不关心代码的语义或质量，只关心代码的外观。`Prettier` 与 `ESLint` 集成使用可以让代码保持一致性和规范性。

4. [**Stylelint**](https://link.juejin.cn?target=https%3A%2F%2Fstylelint.io%2F)：`Stylelint` 是一个 CSS 样式检查工具，它可以帮助开发人员遵循 CSS 代码风格规范，并发现代码中潜在的问题。`Stylelint` 有很多可定制的规则，可以根据团队的代码风格和项目的要求进行配置。`Stylelint` 也支持集成到许多编辑器和 IDE 中，如 Visual Studio Code、Sublime Text、Atom、WebStorm 等，以提供实时的语法和格式错误检查。

5. [**Markdownlint**](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2FDavidAnson%2Fmarkdownlint)：`Markdownlint` 是一个用于检查 `Markdown` 文件中语法和格式的工具，它可以帮助你保证 `Markdown` 文件的一致性和可读性。`Markdownlint` 支持在命令行、编辑器和 `CI/CD` 工具中使用。

这些工具都有相似的目标：

- 使代码本身和团队成员之间更加一致
- 检测可能导致潜在错误的有问题的代码

总的来说：

- `EditorConfig`: 跨编辑器和IDE编写代码，保持一致的简单编码风格；

- `Prettier`: 专注于代码格式化的工具，美化代码；

- `ESLint`：专注于代码质量检测、编码风格约束等；

- `Stylelint`：专注于样式代码语法检查和格式错误检查；

- `Markdownlint`：专注作为 `Markdown` 的 `linter`；

### 16.2 代码提交规范工具

1. [**Commitizen**](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fcommitizen%2Fcz-cli)：`Commitizen` 是一个 Git 提交信息格式化工具，可以通过命令行交互式地创建符合规范的 Git 提交信息。`Commitizen` 支持自定义提交信息的格式，并且可以与其他规范工具（如 `ESLint` 和 `Prettier`）集成使用。
2. [**Conventional Commits**](https://link.juejin.cn?target=https%3A%2F%2Fwww.conventionalcommits.org%2Fen%2Fv1.0.0%2F)：`Conventional Commits` 是一个 Git 提交信息规范标准，规定了 Git 提交信息的格式和内容，包括提交类型、作用域、描述、消息体和消息页脚等部分。`Conventional Commits` 规范可以帮助团队协作中的开发人员更好地理解和管理代码变更历史。
3. [**Husky**](https://link.juejin.cn?target=https%3A%2F%2Ftypicode.github.io%2Fhusky%2F%23%2F) 和 [**Commitlint**](https://link.juejin.cn?target=https%3A%2F%2Fcommitlint.js.org%2F%23%2F)：`Husky` 和 `Commitlint` 是两个工具，可以结合使用来规范 Git 提交信息。`Husky` 可以在 Git 提交前执行一些预定义的钩子（如 `pre-commit` 和 `pre-push`），而 `Commitlint` 可以检查 Git 提交信息是否符合规范。
4. [**Git Hooks**](https://link.juejin.cn?target=https%3A%2F%2Fgit-scm.com%2Fbook%2Fzh%2Fv2)：`Git Hooks` 是 Git 自带的一个钩子系统，可以在 Git 的各个生命周期（如 `pre-commit` 和 `post-commit`）执行自定义的脚本。开发人员可以使用 `Git Hooks` 来规范化 Git 提交信息，例如在 `pre-commit` 钩子中执行提交信息的格式检查。

代码 Git 提交规范工具是非常有用的，可以帮助开发人员更好地管理代码变更历史，提高代码可维护性和协作效率。开发人员可以根据自己的需求和团队的规范选择合适的工具和标准来使用。

## 17 editorconfig

在项目中引入 `editorconfig` 是为了在多人协作开发中保持代码的风格和一致性。不同的开发者使用不同的编辑器或IDE，可能会有不同的缩进（比如有的人喜欢4个空格，有的喜欢2个空格）、换行符、编码格式等。甚至相同的编辑器因为开发者自定义配置的不同也会导致不同风格的代码，这会导致代码的可读性降低，增加代码冲突的可能性，降低了代码的可维护性。

> **EditorConfig 使不同编辑器可以保持同样的配置。因此，我们得以无需在每次编写新代码时，再依靠 Prettier 来按照团队约定格式化一遍（出现保存时格式化突然改变的情况）** 。当然这需要在你的 IDE 上安装了必要的 EditorConfig 插件或扩展。

### 17.2 安装EditorConfig for VS Code

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/15a8c49a6bf7484c98e48acd426909ab~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

目前主流的编辑器或者 IDE 基本上都有对应的 `EditorConfig` 插件，有的是内置支持的（比如，`WebStorm` 不需要独立安装 `EditorConfig` 的插件），有的需要独立安装。

> 需要注意的是，不同的插件对 `EditorConfig` 属性的支持度不一样，笔者使用的是 `VS Code`。

然后在插件的介绍页上点击**设置的齿轮**，并且选择**Add to Workspace Recommendations**，就可以将其加入清单。也可以直接开启 `.vscode/extensions.json` 进行编辑：

```json
json复制代码{ 
    "recommendations": ["editorconfig.editorconfig"] 
}
```

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9229abfe671149cd8c31712b5260c84c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

> **为什么要做这个操作？** 假如哪天项目新来一个协同开发的同学，当他拉取取项目，用 `vscode` 打开项目的时候，编辑器就会自动提醒他安装这个插件，并将相关的配置做设定。下面的 `eslint` 和 `prettier` 插件也是类似。

### 17.3 新建.editorconfig

在根目录新建`.editorconfig`文件：

```ini
ini复制代码# https://editorconfig.org
root = true # 设置为true表示根目录，控制配置文件 .editorconfig 是否生效的字段

[*] # 匹配全部文件，匹配除了 `/` 路径分隔符之外的任意字符串
charset = utf-8                  # 设置字符编码，取值为 latin1，utf-8，utf-8-bom，utf-16be 和 utf-16le，当然 utf-8-bom 不推荐使用
end_of_line = lf                 # 设置使用的换行符，取值为 lf，cr 或者 crlf
indent_size = 2                  # 设置缩进的大小，即缩进的列数，当 indexstyle 取值 tab 时，indentsize 会使用 tab_width 的值
indent_style = space             # 缩进风格，可选space｜tab
insert_final_newline = true      # 设为true表示使文件以一个空白行结尾
trim_trailing_whitespace = true  # 删除一行中的前后空格

[*.md] # 匹配全部 .md 文件
trim_trailing_whitespace = false
```

上面的配置可以规范本项目中文件的缩进风格，和缩进空格数等，会覆盖 `vscode` 的配置，来达到不同编辑器中代码默认行为一致的作用。

VS Code 的 `EditorConfig` 目前支持下列属性：

- `indent_style`
- `indent_size`
- `tab_width`
- `end_of_line`(on save)
- `insert_final_newline`(on save)
- `trim_trailing_whitespace`(on save)

## 18 prettier

每个人写代码的风格习惯不一样，比如代码换行，结尾是否带分号，单双引号，缩进等，并且不能只靠口头规范来约束，项目紧急的时候可能会不太注意代码格式，这时候需要有工具来帮我们自动格式化代码，而perttier就是帮我们做这件事的

### 18.1 安装VS Code 插件和 prettier

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/feee906b19e94483ba5c9a04b5de18b3~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e5cf587fefc4481830078f28cc83b92~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

安装 `prettier`：

```shell
pnpm add prettier -D
```

### 18.2 新建.prettier.js

在根目录下新建 `.prettierrc.js` 和 `.prettierignore` 文件：

```javascript
// .prettierrc.js
module.exports = {
    tabWidth: 2, // 一个tab代表几个空格数，默认就是2
    useTabs: false, // 是否启用tab取代空格符缩进，.editorconfig设置空格缩进，所以设置为false
    printWidth: 100, // 一行的字符数，如果超过会进行换行
    semi: false, // 行尾是否使用分号，默认为true
    singleQuote: true, // 字符串是否使用单引号
    trailingComma: 'none', // 对象或数组末尾是否添加逗号 none| es5| all
    jsxSingleQuote: true, // 在jsx里是否使用单引号，你看着办
    bracketSpacing: true, // 对象大括号直接是否有空格，默认为true，效果：{ foo: bar }
    arrowParens: 'avoid' // 箭头函数如果只有一个参数则省略括号
}

```

```txt
// .prettierignore
node_modules
dist
env
.gitignore
pnpm-lock.yaml
README.md

```

### 18.3 配置.vscode/setting.json

配置前两步后，虽然已经配置`prettier`格式化规则，但还需要让`vscode`来支持保存后出发格式化，在项目根目录新建`.vscode`文件夹，内部新建`settings.json`文件配置文件，代码如下：

```json
{
  "search.exclude": {
    "/node_modules": true,
    "dist": true,
    "pnpm-lock.yaml": true
  },
  "files.autoSave": "onFocusChange",
  "editor.formatOnSave": true,
  "editor.formatOnType": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "vscode.json-language-features"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[markdown]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "javascript.validate.enable": false,
}

```

- 若配置 `"prettier.requireConfig": true` 则要求根目录下有 `Prettier` 的配置文件，它会覆盖 `Prettier扩展` 中的默认配置，**否则保存时不会自动格式化**。可以参考[这里](https://link.juejin.cn/?target=https%3A%2F%2Fgithub.com%2Fprettier%2Fprettier-vscode%2Fissues%2F1161%23issuecomment-579415976)。
- 若配置 `"prettier.requireConfig": false` 则不要求根目录下有配置文件，若有的话也会被感知到并以配置文件的内容为准。

> 这些代码的作用是：在编辑后保存 `[xxx]` 文件时，自动应用 `Prettier` 进行格式化，以确保代码风格的一致性。

先配置了忽略哪些文件不进行格式化，又添加了保存代码后触发格式化代码配置，以及各类型文件格式化使用的格式。这一步配置完成后，修改项目代码，把格式打乱，点击保存时就会看到编辑器自动把代码格式规范化了。

若设置需要配置文件，则必须要求根目录下有配置文件 `.prettierrc.js` 或 `.editorconfig` 中的一个或者两个同时存在，否则代码保存不会进行格式化。

可能你会对上面 `.editorconfig` 文件作为 `Prettier` 的配置文件感到疑惑，`vscode` 的 `Prettier` 插件中有关配置文件有这样的一段描述，如下图：

![img](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/961ae2c8a65842f4b9cdd7d9a3b46f0d~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp)

- 可以看出Prettier插件获取配置文件有一个优先级：`.prettierrc > .editorconfig > vscode默认配置`。
- 上面的前两者并不是说 `.prettierrc` 和 `.editorconfig` 同时存在时，后者的配置内容就被忽略，实际的表现：
- `.prettierrc.js` 和 `.editorconfig` 同时存在时，二者内容会进行合并，若配置项有冲突，这 `.prettierrc` 的优先级更高。

为了保证我们的编辑器是使用 `prettier` 作为默认格式化的工具，最好是手动配置一下默认的格式化插件：

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/03bd2465491d4aeda0cba72184fb7f4c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/890dbba10da64a25a6bdce52d6ed2800~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3ea82691c9dc43ccbddb797869e37f6c~tplv-k3u1fbpfcp-zoom-in-crop-mark:1512:0:0:0.awebp?)

### 18.4 脚本命令检查和修复格式

在 `package.json` 的 `"scripts"` 中加入以下脚本命令：

```json
"lint:prettier": "prettier --write --loglevel warn \"src/**/*.{js,ts,json,tsx,css,less,scss,stylus,html,md}\""
```

这段代码是一个脚本命令，用于运行 `Prettier` 工具来格式化指定目录下的文件。具体解释如下：

- `"--write"`: 表示将格式化后的结果直接写回原文件中，而不是输出到控制台。
- `"--loglevel warn"`: 表示只输出警告级别的日志信息。
- `"src/**/*.{js,ts,json,tsx,css,less,scss,stylus,html,md}"`: 是要格式化的文件的路径，这里指定了在 `src` 目录下，所有扩展名为 `.js`、`.ts`、`.json`、`.tsx`、`.css`、`.less`、`.scss`、`.stylus`、`.html`、`.md` 的文件。

> 这个脚本命令的作用是：运行 Prettier 工具来格式化指定目录下的文件，并将格式化后的结果直接写回原文件中。同时，只输出警告级别的日志信息。

现在可以测试一下，将 `.prettierrc.js` 中的 `tabWidth` 值修改为 4（缩进为 4 个空格），然后运行 `pnpm run lint:prettier`，随便打开一个 `src` 下的文件，你就会发现缩进从 2 变成 4 了。
