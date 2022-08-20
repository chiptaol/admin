import { Dialog, Transition } from '@headlessui/react'
import { Fragment } from 'react'
import cn from 'classnames'

import { Overlay } from '../atoms'

type ModalProps = {
  open: boolean
  onClose(): void
  /**
   * tw utility-classnames for dialog panel
   */
  className?: string
  closeOnOverlayClick?: boolean
  children: React.ReactNode
}

/**
 * Simple modal component,
 * @remark if you want to render more than one modal, render by nesting them
 * @see https://github.com/tailwindlabs/headlessui/issues/426
 *
 */
const Modal: React.FC<ModalProps> = ({
  open,
  onClose,
  children,
  className = '',
  closeOnOverlayClick = true,
}) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog onClose={closeOnOverlayClick ? onClose : () => {}} as="div" className="z-50 relative">
        <Overlay />
        <div className="fixed inset-0 overflow-y-auto overflow-x-hidden">
          <div className="flex min-h-full justify-center items-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel
                className={cn(
                  'w-full max-w-[435px] overflow-hidden bg-white p-6 shadow-xl',
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

export { Modal }
