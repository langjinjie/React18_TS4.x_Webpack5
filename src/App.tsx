import { useEffect } from 'react'
import { test } from 'src/utils/base'
import 'src/App.css'

function App() {
  useEffect(() => {
    test()
  }, [])
  return <h2>App</h2>
}

export default App
