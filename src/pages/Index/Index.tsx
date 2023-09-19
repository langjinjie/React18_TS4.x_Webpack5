import { Suspense, lazy, useEffect, useState } from 'react'
import { test } from 'src/utils/base'
import { Icon, Demo1 } from 'src/components'
import Class from 'src/pages/Class/Class'
import jsonTest from 'src/assets/json/test.json'
import lessStyle from './style.module.less'
import scssStyle from './style.module.scss'

const LazyDemo = lazy(() => import('src/pages/LazyDemo/LazyDemo'))
const PrefetchDemo = lazy(() => import('src/pages/PrefetchDemo/PrefetchDemo'))
const PreloadDemo = lazy(() => import('src/pages/PreloadDemo/PreloadDemo'))

function Index() {
  const [count, setCount] = useState(1)
  const [show, setShow] = useState(false)
  const [prefetchShow, setPrefetchShow] = useState(false)
  const [preloadShow, setPreloadShow] = useState(false)

  // 计数器+1
  const addCount = () => {
    setCount(count + 1)
  }

  // 显示/隐藏
  const showHandle = () => {
    setShow(!show)
  }

  // 预加载prefetch
  const prefetchShowHanle = () => {
    setPrefetchShow(!prefetchShow)
  }

  // 预加载preload
  const preloadShowHanle = () => {
    setPreloadShow(!preloadShow)
  }

  useEffect(() => {
    test()
    // @ts-ignore
    console.log('jsonTest', JSON.parse(jsonTest as string))
    console.log('123')
  }, [])
  return (
    <>
      <h1>1122</h1>
      <h1 className='noModuleCss'>Index</h1>
      <h2>样式测试</h2>
      <div className={lessStyle.lessStyleBox}>less样式测试</div>
      <div className={scssStyle.scssStyleBox}>scss样式测试</div>
      <div>
        <div>img处理测试</div>
        <div>
          <div>
            <img src={require('src/assets/image/1cc35821-7988-410f-88e7-ace8abcc7f38.jpg')} alt='' />
          </div>
          <div>
            <img src={require('src/assets/image/3c5c6aaa3a0be16af90fdf3b9a87487.png')} alt='' />
          </div>
          <div>
            <img src={require('src/assets/image/6ac.jpg')} alt='' />
          </div>
        </div>
      </div>
      <h2>图片引入测试</h2>
      <div>
        <div>背景图片引入测试11</div>
        <div className={lessStyle.bgImgTest}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
      <h2>iconfont引入测试</h2>
      <div>
        <Icon name='icon-fangzi-copy' />
      </div>
      <h2>字体引入测试</h2>
      <div className={lessStyle.fontTest}>文字字体测试哈哈哈</div>
      <Class />
      <h2>热更新测试111</h2>
      <button className={lessStyle.btn} onClick={addCount}>
        count：{count}
      </button>
      <Demo1 />
      <h2>懒1加载测试</h2>
      <button onClick={showHandle}>{show ? '隐藏' : '显示'}</button>
      {show && (
        <Suspense fallback='组件加载中...'>
          <LazyDemo />
        </Suspense>
      )}
      <h2>Prefetch预加载</h2>
      <button onClick={prefetchShowHanle}>{prefetchShow ? '隐藏' : '显示'}</button>
      {prefetchShow && (
        <Suspense fallback='组件加载中...'>
          <PrefetchDemo />
        </Suspense>
      )}
      <h2>Preload预加载</h2>
      <button onClick={preloadShowHanle}>{preloadShow ? '隐藏' : '显示'}</button>
      {preloadShow && (
        <Suspense fallback='组件加载中...'>
          <PreloadDemo />
        </Suspense>
      )}
    </>
  )
}

export default Index
