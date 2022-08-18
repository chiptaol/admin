import { Menu } from '@headlessui/react'
import { FiChevronDown } from 'react-icons/fi'
import cn from 'classnames'

type Props = {
  /**
   * right icon
   * @default ChevronDown
   * @type React.ReactNode
   */
  icon?: React.ReactNode
  className?: string
  children: React.ReactNode
  withIcon?: boolean
}

const Button = (props: Props) => {
  const {
    children,
    className = '',
    icon = (
      <FiChevronDown
        className="ml-1 -mr-1 h-5 w-5 text-white hover:text-violet-100 mobileMax:ml-1 mobileMax:h-4 mobileMax:w-4"
        aria-hidden="true"
      />
    ),
    withIcon = false,
  } = props
  return (
    <Menu.Button
      className={cn(
        'flex w-full justify-center items-center rounded-md bg-opacity-20 px-4 py-2 text-sm font-medium hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75',
        className
      )}
    >
      {children}
      {withIcon && icon}
    </Menu.Button>
  )
}

export { Button }
