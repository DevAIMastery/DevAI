import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ImageCompressor from './ImageCompressor'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ImageCompressor/>
    </>
  )
}

export default App
