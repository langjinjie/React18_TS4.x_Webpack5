import { useEffect } from 'react'
import { test } from '../utils/base'
import './App.css'

function App() {
  useEffect(() => {
    test()
  }, [])
  return <h2>App</h2>
}

export default App
