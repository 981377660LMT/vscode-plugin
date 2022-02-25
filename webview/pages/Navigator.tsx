import * as React from 'react'
import {
  CogIcon,
  CollectionIcon,
  HomeIcon,
  PhotographIcon,
  UserGroupIcon,
  ViewGridIcon as ViewGridIconOutline,
  PlusSmIcon as Plus,
} from '@heroicons/react/outline'

import classNames from 'classnames'

const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: false },
  { name: 'All Files', href: '#', icon: ViewGridIconOutline, current: false },
  { name: 'Photos', href: '#', icon: PhotographIcon, current: true },
  { name: 'Shared', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Albums', href: '#', icon: CollectionIcon, current: false },
  { name: 'Settings', href: '#', icon: CogIcon, current: false },
]

const Navigator = React.memo(props => (
  <nav className="w-18 ">
    <div className="w-full py-6 flex flex-col items-center">
      {/* Add Button */}
      <div className="flex-shrink-0 flex items-center">
        <button
          type="button"
          className="inline-flex items-center p-3 border border-white rounded-full shadow-sm text-white  focus:outline-none hover:ring-2 hover:ring-offset-2 hover:ring-indigo-500"
        >
          <Plus className="h-6 w-6" aria-hidden="true" />
        </button>
      </div>

      {/* Items */}
      <div className="flex-1 mt-4 w-full space-y-1">
        {navigation.map(item => (
          <button
            key={item.name}
            className={classNames(
              item.current ? 'text-white bg-gray-800' : 'text-gray-400 hover:text-white',
              'group w-full p-3  flex flex-col items-center text-xs font-medium',
              'focus:outline-none'
            )}
            aria-current={item.current ? 'page' : undefined}
          >
            <item.icon
              className={classNames(
                item.current ? 'text-white bg-gray-800' : 'text-gray-400 group-hover:text-white',
                'h-6 w-6'
              )}
              aria-hidden="true"
            />
            <span className="mt-2">{item.name}</span>
          </button>
        ))}
      </div>
    </div>
  </nav>
))

export { Navigator }
