import { createApi, createEvent, createStore } from 'effector'
import { useCallback, useState } from 'react'

type Props = {
  defaultIsOpen?: boolean
}

export function createDisclosure(options: Props = {}) {
  const { defaultIsOpen = false } = options

  const toggle = createEvent()

  const $isOpen = createStore(defaultIsOpen)
  const { open, close } = createApi($isOpen, {
    open: () => true,
    close: () => false,
  })

  $isOpen.on(toggle, (isOpen) => !isOpen)

  return {
    $isOpen,
    open,
    close,
    toggle,
  }
}

export const useDisclosure = (options: Props = {}) => {
  const { defaultIsOpen = false } = options

  const [isOpen, setOpen] = useState(defaultIsOpen)

  const toggle = useCallback(() => {
    setOpen((prev) => !prev)
  }, [])

  const close = useCallback(() => {
    setOpen(false)
  }, [])

  const open = useCallback(() => {
    setOpen(true)
  }, [])

  return {
    open,
    close,
    toggle,
    isOpen,
  }
}
