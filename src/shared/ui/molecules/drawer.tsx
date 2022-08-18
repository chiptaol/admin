/* eslint-disable @typescript-eslint/no-empty-function */
import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import cn from 'classnames'
import { CgClose } from 'react-icons/cg'

import { IconButton, Overlay } from '../atoms'

type DrawerProps = {
  isOpen: boolean
  onClose(): void
  /**
   * Placement of drawer
   * @default left
   */
  placement?: 'left' | 'right'
  /**
   * tw utility-classnames for dialog panel
   */
  className?: string
  /**
   * if 'true' overlay will be without background color
   * @default false
   */
  transparentOverlay?: boolean
  closeOnOverlayClick?: boolean
  children?: React.ReactNode
}

/**
 * Simple drawer component,
 * @remark if you want to render more than one drawer, render by nesting them
 * @see https://github.com/tailwindlabs/headlessui/issues/426
 */
const Drawer: React.FC<DrawerProps> = ({
  onClose,
  isOpen,
  placement = 'left',
  children,
  className = '',
  transparentOverlay = false,
  closeOnOverlayClick = true,
}) => {
  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog onClose={closeOnOverlayClick ? onClose : () => {}} as="div" className="z-50 relative">
        <Overlay transparent={transparentOverlay} />
        <div className="fixed inset-0 overflow-y-auto overflow-x-hidden">
          <div
            className={cn('flex min-h-full', {
              'justify-end': placement === 'right',
            })}
          >
            <Transition.Child as={Fragment} {...getDrawerAnimationConfig(placement)}>
              <Dialog.Panel
                className={cn(
                  'w-full max-w-[435px] overflow-hidden bg-white shadow-xl mobileMin:relative',
                  className
                )}
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  )
}

export { Drawer }

function getDrawerAnimationConfig(placement: DrawerProps['placement']) {
  const defaultConfig = {
    enter: 'ease-out duration-300',
    enterFrom: '-translate-x-full',
    enterTo: 'translate-x-0',
    leave: 'ease-in duration-200',
    leaveFrom: 'translate-x-0',
    leaveTo: '-translate-x-full',
  }

  return placement === 'left'
    ? defaultConfig
    : {
        ...defaultConfig,
        enter: 'ease-in duration-0',
        enterFrom: 'translate-x-full',
        leaveTo: 'translate-x-full',
      }
}
