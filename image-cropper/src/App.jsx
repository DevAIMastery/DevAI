import { useState } from 'react'
import './App.css'
import ImageCropper from './imagecropper'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ImageCropper/>
    </>
  )
}

export default App
