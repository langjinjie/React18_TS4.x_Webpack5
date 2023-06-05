import { useEffect } from 'react'
import { test } from 'src/utils/base'
import lessStyle from 'src/style.module.less'
import scssStyle from 'src/style.module.scss'
import 'src/App.css'
import 'src/App.less'
// import 'src/App.module.css'

function App() {
  useEffect(() => {
    test()
  }, [])
  return (
    <>
      <h2 className="noModuleCss">App</h2>
      <div className={lessStyle.lessStyleBox}>less样式测试</div>
      <div className={scssStyle.scssStyleBox}>scss样式测试</div>
      <div>
        <div>img处理测试</div>
        <div>
          <div>
            <img src={require('src/assets/image/1cc35821-7988-410f-88e7-ace8abcc7f38.jpg')} alt="" />
          </div>
          <div>
            <img src={require('src/assets/image/3c5c6aaa3a0be16af90fdf3b9a87487.png')} alt="" />
          </div>
          <div>
            <img src={require('src/assets/image/6ac.jpg')} alt="" />
          </div>
        </div>
      </div>
      <div>
        <div>背景图片引入测试</div>
        <div className={lessStyle.bgImgTest}>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    </>
  )
}

export default App
