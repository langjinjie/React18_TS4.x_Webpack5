declare module '*.less'
declare module '*.scss'

// 由于我们希望通过 ES6 的新语法 ESModule 的方式导入资源，为了使 TypeScript 可以识别图片模块，需要在 src/typings/global.d.ts 中加入声明：
/* IMAGES */
declare module '*.svg' {
  const ref: string
  export default ref
}

declare module '*.bmp' {
  const ref: string
  export default ref
}

declare module '*.gif' {
  const ref: string
  export default ref
}

declare module '*.jpg' {
  const ref: string
  export default ref
}

declare module '*.jpeg' {
  const ref: string
  export default ref
}

declare module '*.png' {
  const ref: string
  export default ref
}
