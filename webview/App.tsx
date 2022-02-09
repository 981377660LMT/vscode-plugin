import * as React from 'react'
import { useEffect, useState } from 'react'

interface AppProps {}

const App: React.FC<AppProps> = props => {
  const { children } = props
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`
  })

  return (
    <>
      <h1>Hello World</h1>
      <p className="text-cyan-400 text-lg">You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </>
  )
}

export { App }