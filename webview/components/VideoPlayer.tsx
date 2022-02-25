import * as React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import ReactPanel from '../../typings/ReactPanel'

interface VideoPlayerProps {}

const VideoPlayer: React.FC<VideoPlayerProps> = props => {
  const [videoSrc, setVideoSrc] = useState<string>('')
  const onDidReceiveMessage = useCallback(
    (event: MessageEvent<ReactPanel.Message>) => {
      const { type, payload } = event.data
      switch (type) {
        case 'START':
          setVideoSrc(payload.videoSrc)
          break
        default:
          break
      }
    },
    [videoSrc]
  )

  useEffect(() => {
    window.addEventListener('message', onDidReceiveMessage)
    return () => {
      window.removeEventListener('message', onDidReceiveMessage)
    }
  }, [])

  const videoRef = useRef<HTMLVideoElement>(null)
  videoRef.current?.addEventListener('canplay', e => console.log(e))

  // 这些api需要在context/store里暴露 所有状态集中管理
  const loadVideo = () => {
    vscode.postMessage({
      type: 'START',
      payload: {},
    })
  }

  return (
    <>
      <button onClick={loadVideo}>点击发送消息</button>
      {/* vscode-webview://f2daa318-b108-471c-aa23-2d26ba1e6e45/assets/part-100.mp4 */}
      {videoSrc && <video ref={videoRef} autoPlay loop controls src={videoSrc}></video>}
    </>
  )
}

export { VideoPlayer }
