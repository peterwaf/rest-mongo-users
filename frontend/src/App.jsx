import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello world</h1>
      <div className="grid grid-cols-2">
        <div className="bg-red-400">Column 1</div>
        <div className="bg-green-400">Column 1</div>
      </div>
    </>
  )
}

export default App
