import { Transition } from '@headlessui/react'
import { Fragment } from 'react'
import cn from 'classnames'

type Props = {
  className?: string
  transparent?: boolean
}

const Overlay = ({ className = '', transparent = false }: Props) => {
  return (
    <Transition.Child
      as={Fragment}
      enter="ease-out duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="ease-in duration-200"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
    >
      <div
        className={cn(
          'inset-0 fixed bg-opacity-50',
          {
            'bg-gray-900': !transparent,
            'bg-transparent': transparent,
          },
          className
        )}
      />
    </Transition.Child>
  )
}

export { Overlay }
