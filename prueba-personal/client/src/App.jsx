import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [data, setData] = useState("nada")
  
  useEffect(() => {
    fetch("http://localhost:3000/hola-mundo")
      .then(res => res.text())
      .then(result => setData(result))
  }, [])

  return (
    <>
      {data}
    </>
  )
}

export default App
