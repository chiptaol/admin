import { Menu, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import cn from 'classnames'

type Props = {
  children: React.ReactNode
  className?: string
}

const Items = (props: Props) => {
  const { children, className = '' } = props

  return (
    <Transition
      as={Fragment}
      enter="transition ease-out duration-100"
      enterFrom="transform opacity-0 scale-95"
      enterTo="transform opacity-100 scale-100"
      leave="transition ease-in duration-75"
      leaveFrom="transform opacity-100 scale-100"
      leaveTo="transform opacity-0 scale-95"
    >
      <Menu.Items
        className={cn(
          'absolute z-10 right-0 mt-2 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden',
          className
        )}
      >
        {children}
      </Menu.Items>
    </Transition>
  )
}

export { Items }
