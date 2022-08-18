import { Menu } from '@headlessui/react'

type Props = {
  className?: string
  children:
    | (({ isActive, isDisabled }: { isActive: boolean; isDisabled: boolean }) => React.ReactNode)
    | React.ReactNode
}

const Item = (props: Props) => {
  const { children, className = '' } = props
  return (
    <div className={className}>
      <Menu.Item>
        {({ active, disabled }) =>
          typeof children === 'function'
            ? children({ isActive: active, isDisabled: disabled })
            : children
        }
      </Menu.Item>
    </div>
  )
}

export { Item }
