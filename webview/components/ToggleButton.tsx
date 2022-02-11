import * as React from 'react'
import { useEffect, useState } from 'react'

interface ToggleButtonProps {}

const ToggleButton: React.FC<ToggleButtonProps> = props => {
  const { children } = props
  const [count, setCount] = useState(0)

  useEffect(() => {
    document.title = `You clicked ${count} times`
  })

  return (
    <>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>Click me</button>
    </>
  )
}

export { ToggleButton }
