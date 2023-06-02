import { useEffect } from 'react'
import { test } from 'src/utils/base'
import lessStyle from 'src/style.less'
import scssStyle from 'src/style.module.scss'
import 'src/App.css'

function App() {
  useEffect(() => {
    test()
  }, [])
  return (
    <>
      <h2>App</h2>
      <div className={lessStyle.lessStyleBox}>less样式测试</div>
      <div className={scssStyle.scssStyleBox}>scss样式测试</div>
    </>
  )
}

export default App
