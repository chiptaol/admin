import { Menu as HeadlessMenu } from '@headlessui/react'
import cn from 'classnames'

type Props = {
  children: React.ReactNode
  className?: string
}

const Menu = (props: Props) => {
  const { children, className = '' } = props

  return (
    <HeadlessMenu as="div" className={cn('relative inline-block text-left', className)}>
      {children}
    </HeadlessMenu>
  )
}

export { Menu }
