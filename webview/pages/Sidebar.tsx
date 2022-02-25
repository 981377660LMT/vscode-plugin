import * as React from 'react'
import classNames from 'classnames'
import tree from '../assets/photo-1582053433976-25c00369fc93.jpg'

const tabs = [
  { name: 'Tab0', href: '#', current: true },
  { name: 'Tab1', href: '#', current: false },
  { name: 'Tab2', href: '#', current: false },
  { name: 'Tab3', href: '#', current: false },
]

// 画廊
const files = [
  {
    name: 'IMG_4985.HEIC1',
    size: '3.9 MB',
    source: tree,
    current: false,
  },
  {
    name: 'IMG_4985.HEIC2',
    size: '3.9 MB',
    source: tree,
    current: true,
  },

  {
    name: 'IMG_4985.HEIC3',
    size: '3.9 MB',
    source: tree,
    current: true,
  },
  {
    name: 'IMG_4985.HEIC4',
    size: '3.9 MB',
    source: tree,
    current: true,
  },
  {
    name: 'IMG_4985.HEIC5',
    size: '3.9 MB',
    source: tree,
    current: true,
  },
  {
    name: 'IMG_4985.HEIC6',
    size: '3.9 MB',
    source: tree,
    current: true,
  },
  {
    name: 'IMG_4985.HEIC7',
    size: '3.9 MB',
    source: tree,
    current: true,
  },
  {
    name: 'IMG_4985.HEIC8',
    size: '3.9 MB',
    source: tree,
    current: true,
  },
  // More files...
]

const Sidebar = React.memo(props => (
  <main className="w-64 bg-gray-800 overflow-y-auto h-screen">
    <div className="pt-2 mx-auto px-4 ">
      {/* Tabs */}
      <div className="mt-3 sm:mt-2">
        <div className="flex items-center">
          <nav className="flex-1 flex space-x-4" aria-label="Tabs">
            {tabs.map(tab => (
              <button
                key={tab.name}
                aria-current={tab.current ? 'page' : undefined}
                className={classNames(
                  tab.current
                    ? 'border-gray-100 text-white'
                    : 'border-transparent text-gray-400 hover:text-white ',
                  'whitespace-nowrap py-4  border-b-2 font-medium text-sm '
                )}
              >
                {tab.name}
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Gallery:TabItem 0 */}
      <section className="mt-8 pb-16" aria-labelledby="gallery-heading">
        {/* 这里的grid好像有问题 */}
        <ul role="list">
          {files.map(file => (
            <li key={file.name} className="relative my-8">
              <div
                className={classNames(
                  file.current
                    ? 'ring-2 ring-offset-2 ring-indigo-500'
                    : 'focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-offset-gray-100 focus-within:ring-indigo-500',
                  'group block w-full aspect-w-10 aspect-h-7 rounded-md bg-gray-100 overflow-hidden'
                )}
              >
                <img
                  src={file.source}
                  alt=""
                  className={classNames(
                    file.current && 'pointer-events-none',
                    'object-cover  group-hover:opacity-80'
                  )}
                />
              </div>
              <p className="mt-2 text-xs font-medium text-gray-400 truncate pointer-events-none">
                {file.size}-{file.name}
              </p>
            </li>
          ))}
        </ul>
      </section>
    </div>
  </main>
))

export { Sidebar }
