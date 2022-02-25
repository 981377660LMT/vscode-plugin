import * as React from 'react'
import { VideoPlayer } from './components/VideoPlayer'

import { Navigator } from './pages/Navigator'
import { Sidebar } from './pages/Sidebar'

interface AppProps {}

const App: React.FC<AppProps> = props => {
  return (
    <>
      <div className="h-full flex select-none">
        {/* left navigator */}
        <Navigator />

        {/* main */}
        <div className="flex-1 flex">
          {/* main panel */}
          {<Sidebar />}

          {/* Details sidebar */}
          <aside className="flex-1 p-8 overflow-y-auto h-screen ">
            <VideoPlayer />
          </aside>
        </div>
      </div>
    </>
  )
}

export { App }
