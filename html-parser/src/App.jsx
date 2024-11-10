import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import WebContentExtractor from './WebContentExtractor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <WebContentExtractor/>
    </>
  )
}

export default App
