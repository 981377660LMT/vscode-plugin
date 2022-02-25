import * as React from 'react'
import { useEffect, useState } from 'react'

interface VideoPlayerProps {}

const VideoPlayer: React.FC<VideoPlayerProps> = props => {
  const { children } = props
  const [count, setCount] = useState(0)

  console.log(typeof vscode)
  useEffect(() => {
    document.title = `You clicked ${count} times`
  })

  return (
    <>
      <p>You clicked {count} times</p>
      {/* vscode-webview://f2daa318-b108-471c-aa23-2d26ba1e6e45/assets/part-100.mp4 */}
      {/* <video src="../assets/part-100.mp4"></video> */}
    </>
  )
}

export { VideoPlayer }
