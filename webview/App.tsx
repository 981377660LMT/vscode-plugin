import * as React from 'react'

import {
  CogIcon,
  CollectionIcon,
  HeartIcon,
  HomeIcon,
  PhotographIcon,
  PlusSmIcon as Plus,
  UserGroupIcon,
  ViewGridIcon as ViewGridIconOutline,
} from '@heroicons/react/outline'
import {
  PencilIcon,
  PlusSmIcon as PlusSmIconSolid,
  ViewGridIcon as ViewGridIconSolid,
  ViewListIcon,
} from '@heroicons/react/solid'
import classNames from 'classnames'

import smile from './assets/photo-1494790108377-be9c29b29330.jpg'
import finger from './assets/photo-1502685104226-ee32379fefbe.jpg'
import tree from './assets/photo-1582053433976-25c00369fc93.jpg'
import { useResizableSidebar } from './hooks/useResizableSidebar'

const navigation = [
  { name: 'Home', href: '#', icon: HomeIcon, current: false },
  { name: 'All Files', href: '#', icon: ViewGridIconOutline, current: false },
  { name: 'Photos', href: '#', icon: PhotographIcon, current: true },
  { name: 'Shared', href: '#', icon: UserGroupIcon, current: false },
  { name: 'Albums', href: '#', icon: CollectionIcon, current: false },
  { name: 'Settings', href: '#', icon: CogIcon, current: false },
]
const userNavigation = [
  { name: 'Your profile', href: '#' },
  { name: 'Sign out', href: '#' },
]
const tabs = [
  { name: 'Tab0', href: '#', current: true },
  { name: 'Tab1', href: '#', current: false },
  { name: 'Tab2', href: '#', current: false },
  { name: 'Tab3', href: '#', current: false },
]

// 画廊
const files = [
  {
    name: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: tree,
    current: false,
  },
  {
    name: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: tree,
    current: true,
  },
  // {
  //   name: 'IMG_4985.HEIC',
  //   size: '3.9 MB',
  //   source: tree,
  //   current: true,
  // },
  // {
  //   name: 'IMG_4985.HEIC',
  //   size: '3.9 MB',
  //   source: tree,
  //   current: true,
  // },
  // {
  //   name: 'IMG_4985.HEIC',
  //   size: '3.9 MB',
  //   source: tree,
  //   current: true,
  // },
  // {
  //   name: 'IMG_4985.HEIC',
  //   size: '3.9 MB',
  //   source: tree,
  //   current: true,
  // },
  // {
  //   name: 'IMG_4985.HEIC',
  //   size: '3.9 MB',
  //   source: tree,
  //   current: true,
  // },
  // {
  //   name: 'IMG_4985.HEIC',
  //   size: '3.9 MB',
  //   source: tree,
  //   current: true,
  // },
  // {
  //   name: 'IMG_4985.HEIC',
  //   size: '3.9 MB',
  //   source: tree,
  //   current: true,
  // },
  // {
  //   name: 'IMG_4985.HEIC',
  //   size: '3.9 MB',
  //   source: tree,
  //   current: true,
  // },
  {
    name: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: tree,
    current: true,
  },
  {
    name: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: tree,
    current: true,
  },
  {
    name: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: tree,
    current: true,
  },
  {
    name: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: tree,
    current: true,
  },
  {
    name: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: tree,
    current: true,
  },
  {
    name: 'IMG_4985.HEIC',
    size: '3.9 MB',
    source: tree,
    current: true,
  },
  // More files...
]
const currentFile = {
  name: 'IMG_4985.HEIC',
  size: '3.9 MB',
  source: tree,
  information: {
    'Uploaded by': 'Marie Culver',
    Created: 'June 8, 2020',
    'Last modified': 'June 8, 2020',
    Dimensions: '4032 x 3024',
    Resolution: '72 x 72',
  },
  sharedWith: [
    {
      id: 1,
      name: 'Aimee Douglas',
      imageUrl: finger,
    },
    {
      id: 2,
      name: 'Andrea McMillan',
      imageUrl: smile,
    },
  ],
}
interface AppProps {}

const Sidebar = React.memo(props => (
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

const App: React.FC<AppProps> = props => {
  return (
    <>
      {/*
        This example requires updating your template:

        ```
        <html class="h-full bg-gray-50">
        <body class="h-full overflow-hidden">
        ```
      */}
      <div className="h-full flex select-none">
        {/* left sidebar */}
        <Sidebar />

        {/* main and aside */}
        <div className="flex-1 flex">
          {/* main panel */}
          <main className="flex-1 max-w-xl bg-gray-800 overflow-y-auto h-screen">
            <div className="pt-2 mx-auto px-4 md:px-6 lg:px-8">
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
                          'whitespace-nowrap py-4  border-b-2 font-medium text-sm md:text-lg lg:text-xl'
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
                <ul
                  role="list"
                  className="grid grid-cols-1 gap-y-8 md:grid-cols-2 sm:gap-x-4 md:gap-x-6 lg:grid-cols-3"
                >
                  {files.map(file => (
                    <li key={file.name} className="relative">
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

          {/* Details sidebar */}
          <aside className="flex-1 p-8 overflow-y-auto h-screen">
            <div className="pb-16 space-y-6">
              <div>
                <div className="block w-full aspect-w-10 aspect-h-7 rounded-lg overflow-hidden">
                  <img src={currentFile.source} alt="" className="object-cover" />
                </div>
                <div className="mt-4 flex items-start justify-between">
                  <div>
                    <h2 className="text-lg font-medium text-gray-900">
                      <span className="sr-only">Details for </span>
                      {currentFile.name}
                    </h2>
                    <p className="text-sm font-medium text-gray-500">{currentFile.size}</p>
                  </div>
                  <button
                    type="button"
                    className="ml-4 bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <HeartIcon className="h-6 w-6" aria-hidden="true" />
                    <span className="sr-only">Favorite</span>
                  </button>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Information</h3>
                <dl className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200">
                  {Object.keys(currentFile.information).map(key => (
                    <div key={key} className="py-3 flex justify-between text-sm font-medium">
                      <dt className="text-gray-500">{key}</dt>
                      <dd className="text-gray-900">{(currentFile.information as any)[key]}</dd>
                    </div>
                  ))}
                </dl>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Description</h3>
                <div className="mt-2 flex items-center justify-between">
                  <p className="text-sm text-gray-500 italic">Add a description to this image.</p>
                  <button
                    type="button"
                    className="bg-white rounded-full h-8 w-8 flex items-center justify-center text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <PencilIcon className="h-5 w-5" aria-hidden="true" />
                    <span className="sr-only">Add description</span>
                  </button>
                </div>
              </div>
              <div>
                <h3 className="font-medium text-gray-900">Shared with</h3>
                <ul
                  role="list"
                  className="mt-2 border-t border-b border-gray-200 divide-y divide-gray-200"
                >
                  {currentFile.sharedWith.map(person => (
                    <li key={person.id} className="py-3 flex justify-between items-center">
                      <div className="flex items-center">
                        <img src={person.imageUrl} alt="" className="w-8 h-8 rounded-full" />
                        <p className="ml-4 text-sm font-medium text-gray-900">{person.name}</p>
                      </div>
                      <button
                        type="button"
                        className="ml-6 bg-white rounded-md text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      >
                        Remove<span className="sr-only"> {person.name}</span>
                      </button>
                    </li>
                  ))}
                  <li className="py-2 flex justify-between items-center">
                    <button
                      type="button"
                      className="group -ml-1 bg-white p-1 rounded-md flex items-center focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    >
                      <span className="w-8 h-8 rounded-full border-2 border-dashed border-gray-300 flex items-center justify-center text-gray-400">
                        <PlusSmIconSolid className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span className="ml-4 text-sm font-medium text-indigo-600 group-hover:text-indigo-500">
                        Share
                      </span>
                    </button>
                  </li>
                </ul>
              </div>
              <div className="flex">
                <button
                  type="button"
                  className="flex-1 bg-indigo-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Download
                </button>
                <button
                  type="button"
                  className="flex-1 ml-3 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Delete
                </button>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </>
  )
}

export { App }
