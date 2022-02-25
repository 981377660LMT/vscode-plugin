import * as React from 'react'
import { useCallback, useEffect, useRef, useState } from 'react'
import { throttle } from 'lodash-es'

/**
 *
 * @param defaultSize 初始化尺寸，单位为px
 * @param onResize sidebar收缩时的方向
 * @param minSize sidebar最小尺寸
 * @param maxSize sidebar最大尺寸
 */
function useResizableSidebar(
  defaultSize: number,
  shrinkDirection: 'top' | 'right' | 'bottom' | 'left',
  minSize = 0,
  maxSize = Infinity
) {
  const sidebarRef = useRef<HTMLElement>(null)
  const [isResizing, setIsResizing] = useState(false)
  const [sidebarSize, setsidebarSize] = useState(defaultSize)

  const startResizing = useCallback(() => setIsResizing(true), [])
  const stopResizing = useCallback(() => setIsResizing(false), [])

  const resize = useCallback(
    throttle((e: MouseEvent) => {
      if (isResizing) {
        if (!sidebarRef.current) {
          throw new Error('需要绑定sidebarRef!')
        }

        const curPos = ['left', 'right'].includes(shrinkDirection) ? e.clientX : e.clientY
        const sidebarPos = sidebarRef.current.getBoundingClientRect()[shrinkDirection]
        const newSize = curPos - sidebarPos
        if (newSize >= maxSize || newSize <= minSize) {
          return
        }

        setsidebarSize(newSize)
      }
    }, 50),
    [isResizing]
  )

  useEffect(() => {
    window.addEventListener('mousemove', resize)
    window.addEventListener('mouseup', stopResizing)
    return () => {
      window.removeEventListener('mousemove', resize)
      window.removeEventListener('mouseup', stopResizing)
    }
  }, [resize, stopResizing])

  const Resizer = React.memo<React.HTMLAttributes<HTMLDivElement>>(props => {
    return <div onMouseDown={startResizing} {...props}></div>
  })
  // const { sidebarRef, sidebarSize, Resizer, isResizing } = useResizableSidebar(
  //   280,
  //   'left',
  //   280,
  //   576
  // )
  //    {/* resizer */}
  //    <Resizer
  //    className={classNames(
  //      isResizing && 'border-l-2',
  //      'flex-grow-0 flex-shrink-0 w-4 h-screen ml-1 hover:border-l-2 cursor-col-resize'
  //    )}
  //  />

  return {
    Resizer,
    sidebarRef,
    sidebarSize,
    setsidebarSize,
    isResizing,
  }
}

export { useResizableSidebar }
