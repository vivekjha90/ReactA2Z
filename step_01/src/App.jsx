import { useState } from 'react'
import First from './day_01/First'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h1>Hello react</h1>
      <First/>
    </>
  )
}

export default App
